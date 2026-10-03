export const OLD_ID = "tagmar3er_oficial";
export const NEW_ID = "tagmar3er-oficial";

/** Build-time conversion only. Does not run in a world or mutate the input. */
export function migrateOfficialValue(value) {
  if (typeof value === "string") return value.replaceAll(OLD_ID, NEW_ID);
  if (Array.isArray(value)) return value.map(migrateOfficialValue);
  if (value && typeof value === "object") {
    const out = {};
    for (const [key,child] of Object.entries(value)) {
      const next = key.replaceAll(OLD_ID, NEW_ID);
      if (Object.hasOwn(out,next)) throw new Error(`Colisão de propriedades durante a conversão: ${next}`);
      Object.defineProperty(out,next,{value:migrateOfficialValue(child),enumerable:true,writable:true,configurable:true});
    }
    return out;
  }
  return value;
}
