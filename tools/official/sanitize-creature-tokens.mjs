import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const foundryModules = process.env.TAGMAR_FOUNDRY_MODULES;
if (!foundryModules) throw new Error("Defina TAGMAR_FOUNDRY_MODULES para a pasta node_modules do Foundry.");
const { ClassicLevel } = require(`${foundryModules}/classic-level`);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const packArgument = process.argv.find(argument => argument.startsWith("--pack="))?.slice(7);
const packPath = resolve(packArgument ?? resolve(root, "packs", "criaturas-t3er"));
const placeholder = "icons/svg/mystery-man.svg";
const database = new ClassicLevel(packPath, { keyEncoding: "utf8", valueEncoding: "json" });
let changed = 0;

try {
  await database.open();
  for await (const [key, actor] of database.iterator()) {
    if (!key.includes("!actors!")) continue;
    actor.img = placeholder;
    actor.prototypeToken ??= {};
    actor.prototypeToken.randomImg = false;
    actor.prototypeToken.texture ??= {};
    actor.prototypeToken.texture.src = placeholder;
    actor.prototypeToken.texture.tint = "#ffffff";
    await database.put(key, actor);
    changed += 1;
  }
} finally {
  await database.close();
}

if (changed !== 414) throw new Error(`Esperados 414 atores, mas ${changed} foram atualizados.`);
console.log(JSON.stringify({ pack: "criaturas-t3er", changed, placeholder }, null, 2));
