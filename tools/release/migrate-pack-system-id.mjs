import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { migrateOfficialValue, OLD_ID, NEW_ID } from "./official-id.mjs";

const option = name => process.argv.find(arg => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
const root = path.resolve(option("root") ?? process.cwd());
if (!option("output")) throw new Error("Informe --output=<pasta NOVA> fora do sistema.");
const outputRoot = path.resolve(option("output"));
const manifest = JSON.parse(await fs.readFile(path.join(root, "system.json"), "utf8"));
if (![OLD_ID, NEW_ID].includes(manifest.id)) throw new Error("Este conversor atende somente à edição oficial.");
const inside = (parent, child) => {
  const rel = path.relative(parent, child);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
};
if (inside(root, outputRoot) || inside(outputRoot, root)) throw new Error("A saída deve ficar fora do sistema original.");
const foundryModules = process.env.TAGMAR_FOUNDRY_MODULES;

if (!foundryModules) throw new Error("Defina TAGMAR_FOUNDRY_MODULES com o diretório node_modules do Foundry.");

const require = createRequire(path.join(foundryModules, "package.json"));
const { ClassicLevel } = require("classic-level");

const names = new Set();
for (const pack of manifest.packs) {
  const candidate = path.resolve(root, pack.path);
  if (!inside(path.join(root, "packs"), candidate) || candidate === path.join(root, "packs")) throw new Error("Caminho de compêndio inválido.");
  if (names.has(path.basename(pack.path))) throw new Error("Nomes de saída duplicados.");
  names.add(path.basename(pack.path));
}
// Exclusive creation: no deletion or overwrite of user-supplied paths.
await fs.mkdir(outputRoot);

for (const pack of manifest.packs) {
  const sourcePath = path.join(root, pack.path);
  const readCopy = await fs.mkdtemp(path.join(os.tmpdir(), `${pack.name}-id-leitura-`));
  const outputPath = path.join(outputRoot, path.basename(pack.path));
  let replacements = 0;
  let source, target;

  try {
    await fs.cp(sourcePath, readCopy, { recursive: true });
    const currentPath = path.join(readCopy, "CURRENT");
    await fs.writeFile(currentPath, `${(await fs.readFile(currentPath, "utf8")).trim()}\n`, "utf8");

    source = new ClassicLevel(readCopy, { keyEncoding: "utf8", valueEncoding: "json", readOnly: true });
    target = new ClassicLevel(outputPath, { keyEncoding: "utf8", valueEncoding: "json", errorIfExists: true });
    await source.open();
    await target.open();

    let count = 0;
    let batch = [];
    for await (const [key, value] of source.iterator()) {
      const migratedKey = migrateOfficialValue(key);
      const serialized = JSON.stringify(value);
      const migratedSerialized = JSON.stringify(migrateOfficialValue(value));
      if (migratedKey !== key || migratedSerialized !== serialized) replacements += 1;
      batch.push({ type: "put", key: migratedKey, value: JSON.parse(migratedSerialized) });
      count += 1;
      if (batch.length >= 500) {
        await target.batch(batch);
        batch = [];
      }
    }
    if (batch.length) await target.batch(batch);
    let verified = 0;
    for await (const [key, value] of source.iterator()) {
      if (JSON.stringify(await target.get(migrateOfficialValue(key))) !== JSON.stringify(migrateOfficialValue(value))) {
        throw new Error(`Verificação falhou: ${pack.name}/${key}`);
      }
      verified++;
    }
    let written = 0;
    for await (const key of target.keys()) written++;
    if (written !== count || verified !== count) throw new Error("Contagem de registros divergente.");
    process.stdout.write(`${pack.name}: ${count} registros; ${replacements} registros ajustados\n`);
  } finally {
    await source?.close();
    await target?.close();
    if (inside(os.tmpdir(), readCopy) && path.basename(readCopy).startsWith(`${pack.name}-id-leitura-`)) {
      await fs.rm(readCopy, { recursive: true, force: true });
    }
  }
}

process.stdout.write(`Compêndios migrados em: ${outputRoot}\n`);
