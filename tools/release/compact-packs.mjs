import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(process.cwd());
const outputRoot = path.resolve(process.argv[2] ?? path.join(os.tmpdir(), "tagmar3er-oficial-packs-compactados"));
const manifest = JSON.parse(await fs.readFile(path.join(root, "system.json"), "utf8"));
const foundryModules = process.env.TAGMAR_FOUNDRY_MODULES;

if (!foundryModules) throw new Error("Defina TAGMAR_FOUNDRY_MODULES com o diretório node_modules do Foundry.");

const require = createRequire(path.join(foundryModules, "package.json"));
const { ClassicLevel } = require("classic-level");

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });

for (const pack of manifest.packs) {
  const sourcePath = path.join(root, pack.path);
  const readCopy = await fs.mkdtemp(path.join(os.tmpdir(), `${pack.name}-leitura-`));
  const outputPath = path.join(outputRoot, path.basename(pack.path));

  try {
    await fs.cp(sourcePath, readCopy, { recursive: true });
    const currentPath = path.join(readCopy, "CURRENT");
    const current = (await fs.readFile(currentPath, "utf8")).trim();
    await fs.writeFile(currentPath, `${current}\n`, "utf8");

    const source = new ClassicLevel(readCopy, {
      keyEncoding: "utf8",
      valueEncoding: "json",
      readOnly: true
    });
    const target = new ClassicLevel(outputPath, {
      keyEncoding: "utf8",
      valueEncoding: "json"
    });

    await source.open();
    await target.open();

    let count = 0;
    let batch = [];
    for await (const [key, value] of source.iterator()) {
      batch.push({ type: "put", key, value });
      count += 1;
      if (batch.length >= 500) {
        await target.batch(batch);
        batch = [];
      }
    }
    if (batch.length) await target.batch(batch);

    await source.close();
    await target.close();
    process.stdout.write(`${pack.name}: ${count} registros\n`);
  } finally {
    await fs.rm(readCopy, { recursive: true, force: true });
  }
}

process.stdout.write(`Compêndios compactados em: ${outputRoot}\n`);
