import { createRequire } from "node:module";
import { resolve } from "node:path";
import { nativeMagicIcon } from "./native-magic-icon.mjs";
import { nativeSkillIcon, nativeTechniqueIcon } from "./native-action-icon.mjs";

const require = createRequire(import.meta.url);
const foundryModules = process.env.TAGMAR_FOUNDRY_MODULES;
if (!foundryModules) throw new Error("Defina TAGMAR_FOUNDRY_MODULES para a pasta node_modules do Foundry.");
const { ClassicLevel } = require(`${foundryModules}/classic-level`);
const packArgument = process.argv.find(argument => argument.startsWith("--pack="))?.slice(7);
if (!packArgument) throw new Error("Informe --pack=<caminho-do-banco>.");
const packPath = resolve(packArgument);
const forbiddenExact = /^(?:systems\/tagmar3er_oficial\/|https?:\/\/).+\.(?:png|jpe?g|webp|gif|svg|avif|webm|mp4|wav|mp3|ogg|cur)(?:\?.*)?$/i;
const forbiddenEmbedded = /(?:systems\/tagmar3er_oficial\/[^"'<>]+?|https?:\/\/[^\s"'<>]+?)\.(?:png|jpe?g|webp|gif|svg|avif|webm|mp4|wav|mp3|ogg|cur)(?:\?[^\s"'<>]*)?/gi;
const forbiddenImageTag = /<img\b[^>]*(?:systems\/tagmar3er_oficial\/|https?:\/\/)[^>]*>/gi;

function normalize(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

function iconFor(document, inherited = "icons/svg/item-bag.svg") {
  const type = String(document?.type ?? "").toLocaleLowerCase("pt-BR");
  const name = String(document?.name ?? "");
  if (type === "npc") return "icons/svg/mystery-man.svg";
  if (type === "combate") return "icons/svg/sword.svg";
  if (type === "defesa") return "icons/svg/shield.svg";
  if (type === "habilidade") return nativeSkillIcon(name, "");
  if (type === "magia") return nativeMagicIcon(name, "");
  if (type === "tecnica_combate") return nativeTechniqueIcon(name, "");
  if (type === "pertence") {
    if (/pocao|veneno|antidoto|elixir|oleo/.test(normalize(name))) return "icons/consumables/potions/potion-vial-corked-purple.webp";
    return "icons/svg/item-bag.svg";
  }
  if (type === "profissao" || type === "raca") return "icons/environment/people/group.webp";
  if (type === "transporte") return "icons/svg/wing.svg";
  return inherited;
}

function sanitizeString(value, fallback) {
  if (forbiddenExact.test(value)) return fallback;
  return value.replace(forbiddenImageTag, "").replace(forbiddenEmbedded, fallback);
}

function sanitize(value, inheritedFallback) {
  if (typeof value === "string") return sanitizeString(value, inheritedFallback);
  if (Array.isArray(value)) return value.map(item => sanitize(item, inheritedFallback));
  if (!value || typeof value !== "object") return value;
  const fallback = iconFor(value, inheritedFallback);
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "string" && (key === "img" || key === "src") && forbiddenExact.test(item)) value[key] = fallback;
    else value[key] = sanitize(item, fallback);
  }
  return value;
}

const database = new ClassicLevel(packPath, { keyEncoding: "utf8", valueEncoding: "json" });
let records = 0;
let changed = 0;
try {
  await database.open();
  for await (const [key, value] of database.iterator()) {
    records += 1;
    const before = JSON.stringify(value);
    const fallback = key.includes("!journal") ? "icons/svg/book.svg" : iconFor(value);
    const updated = sanitize(value, fallback);
    if (JSON.stringify(updated) === before) continue;
    await database.put(key, updated);
    changed += 1;
  }
} finally {
  await database.close();
}
console.log(JSON.stringify({ packPath, records, changed }, null, 2));
