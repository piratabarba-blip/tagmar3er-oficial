import { createRequire } from "node:module";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const foundryModules = process.env.TAGMAR_FOUNDRY_MODULES;
if (!foundryModules) throw new Error("Defina TAGMAR_FOUNDRY_MODULES para a pasta node_modules do Foundry.");
const { ClassicLevel } = require(`${foundryModules}/classic-level`);
const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const rootArgument = process.argv.find(argument => argument.startsWith("--root="))?.slice(7);
const packsArgument = process.argv.find(argument => argument.startsWith("--packs="))?.slice(8);
const root = resolve(rootArgument ?? defaultRoot);
const packsRoot = packsArgument ? resolve(packsArgument) : null;
const system = JSON.parse(await readFile(join(root, "system.json"), "utf8"));
const imagePattern = /(?:https?:\/\/[^\s"'<>]+|(?:systems\/tagmar3er_oficial|modules\/[^/\s]+|icons)\/[^\s"'<>]+?)\.(?:png|jpe?g|webp|gif|svg|avif|webm|mp4|wav|mp3|ogg|cur)(?:\?[^\s"'<>]*)?/gi;
const references = new Map();

function category(reference) {
  if (reference.startsWith("icons/")) return "foundry-core";
  if (reference.startsWith("systems/tagmar3er_oficial/")) return "system-local";
  if (reference.startsWith("modules/")) return "module";
  if (/^https?:\/\//i.test(reference)) return "external";
  return "other";
}

function inspect(value, packName, documentKey) {
  if (typeof value === "string") {
    for (const match of value.matchAll(imagePattern)) {
      const reference = match[0];
      const entry = references.get(reference) ?? { reference, category: category(reference), occurrences: 0, packs: new Set(), examples: [] };
      entry.occurrences += 1;
      entry.packs.add(packName);
      if (entry.examples.length < 3) entry.examples.push(documentKey);
      references.set(reference, entry);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) inspect(item, packName, documentKey);
    return;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) inspect(item, packName, documentKey);
  }
}

for (const pack of system.packs ?? []) {
  const source = packsRoot ? resolve(packsRoot, pack.name) : resolve(root, pack.path);
  const temporaryRoot = await mkdtemp(join(tmpdir(), "tagmar-official-assets-"));
  const databasePath = join(temporaryRoot, pack.name);
  try {
    await cp(source, databasePath, { recursive: true });
    const currentPath = join(databasePath, "CURRENT");
    await writeFile(currentPath, `${(await readFile(currentPath, "utf8")).trim()}\n`, "utf8");
    const database = new ClassicLevel(databasePath, { keyEncoding: "utf8", valueEncoding: "json", readOnly: true });
    try {
      await database.open();
      for await (const [key, value] of database.iterator()) inspect(value, pack.name, key);
    } finally {
      await database.close();
    }
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

const entries = [...references.values()]
  .map(entry => ({ ...entry, packs: [...entry.packs].sort() }))
  .sort((a, b) => a.category.localeCompare(b.category) || b.occurrences - a.occurrences || a.reference.localeCompare(b.reference));
const summary = Object.groupBy(entries, entry => entry.category);
const report = {
  generatedAt: new Date().toISOString(),
  totals: Object.fromEntries(Object.entries(summary).map(([key, values]) => [key, {
    uniqueReferences: values.length,
    occurrences: values.reduce((total, value) => total + value.occurrences, 0)
  }])),
  references: entries
};
await writeFile(join(root, "auditoria_recursos_oficial.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report.totals, null, 2));
