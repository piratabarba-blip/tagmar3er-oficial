import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(process.cwd());
const outputRoot = path.resolve(process.argv[2] ?? path.join(os.tmpdir(), "tagmar3er-packs-novo-id"));
const oldId = process.argv[3] ?? "tagmar_rpg";
const newId = process.argv[4] ?? "tagmar3er_oficial";
const manifest = JSON.parse(await fs.readFile(path.join(root, "system.json"), "utf8"));
const foundryModules = process.env.TAGMAR_FOUNDRY_MODULES;

if (!foundryModules) throw new Error("Defina TAGMAR_FOUNDRY_MODULES com o diretório node_modules do Foundry.");

const require = createRequire(path.join(foundryModules, "package.json"));
const { ClassicLevel } = require("classic-level");

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });

for (const pack of manifest.packs) {
  const sourcePath = path.join(root, pack.path);
  const readCopy = await fs.mkdtemp(path.join(os.tmpdir(), `${pack.name}-id-leitura-`));
  const outputPath = path.join(outputRoot, path.basename(pack.path));
  let replacements = 0;

  try {
    await fs.cp(sourcePath, readCopy, { recursive: true });
    const currentPath = path.join(readCopy, "CURRENT");
    await fs.writeFile(currentPath, `${(await fs.readFile(currentPath, "utf8")).trim()}\n`, "utf8");

    const source = new ClassicLevel(readCopy, { keyEncoding: "utf8", valueEncoding: "json", readOnly: true });
    const target = new ClassicLevel(outputPath, { keyEncoding: "utf8", valueEncoding: "json" });
    await source.open();
    await target.open();

    let count = 0;
    let batch = [];
    for await (const [key, value] of source.iterator()) {
      const migratedKey = key.includes(oldId) ? key.replaceAll(oldId, newId) : key;
      const serialized = JSON.stringify(value);
      const migratedSerialized = serialized.includes(oldId) ? serialized.replaceAll(oldId, newId) : serialized;
      if (migratedKey !== key || migratedSerialized !== serialized) replacements += 1;
      batch.push({ type: "put", key: migratedKey, value: JSON.parse(migratedSerialized) });
      count += 1;
      if (batch.length >= 500) {
        await target.batch(batch);
        batch = [];
      }
    }
    if (batch.length) await target.batch(batch);
    await source.close();
    await target.close();
    process.stdout.write(`${pack.name}: ${count} registros; ${replacements} registros ajustados\n`);
  } finally {
    await fs.rm(readCopy, { recursive: true, force: true });
  }
}

process.stdout.write(`Compêndios migrados em: ${outputRoot}\n`);
