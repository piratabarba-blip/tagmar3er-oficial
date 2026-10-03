import assert from "node:assert/strict";
import {readFile,readdir,access} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {spawnSync} from "node:child_process";
import {migrateOfficialValue, OLD_ID, NEW_ID} from "./release/official-id.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const manifest = JSON.parse(await readFile(path.join(root,"system.json"),"utf8"));
assert.equal(manifest.id,NEW_ID);
assert.match(manifest.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
assert.equal(manifest.packs.length,9);
assert.ok(manifest.packs.every(p=>p.system===NEW_ID));
assert.ok(manifest.download.includes(manifest.version));
assert.match(manifest.manifest,/raw\.githubusercontent\.com\/piratabarba-blip\/tagmar3er-oficial\/main\/system\.json$/);
assert.ok(!manifest.manifest.includes("releases/latest"),"Não oferecer o novo ID pelo endpoint das instalações antigas");

const input={_id:"same-id",system:{quant:10,ef:40,flag:false},flags:{[OLD_ID]:{portraitVideo:"worlds/game/actor.webm",other:7},theatre:{insert:"keep.png"}},items:[{img:`systems/${OLD_ID}/x.png`,uuid:`Compendium.${OLD_ID}.criaturas-t3er.Actor.abc`,_stats:{systemId:OLD_ID}}],command:`game.settings.get('${OLD_ID}', 'autoBars')`,nullable:null};
const before=JSON.stringify(input),result=migrateOfficialValue(input);
assert.equal(JSON.stringify(input),before,"Conversão não pode mutar o original");
assert.deepEqual(result.system,input.system); assert.equal(result._id,input._id);
assert.deepEqual(result.flags[NEW_ID],input.flags[OLD_ID]); assert.deepEqual(result.flags.theatre,input.flags.theatre);
assert.equal(result.items[0].uuid,`Compendium.${NEW_ID}.criaturas-t3er.Actor.abc`);
assert.equal(result.items[0]._stats.systemId,NEW_ID);
assert.deepEqual(migrateOfficialValue(result),result,"Conversão idempotente");
assert.throws(()=>migrateOfficialValue({[OLD_ID]:1,[NEW_ID]:2}),/Colisão/);
assert.equal(Object.getPrototypeOf(migrateOfficialValue(JSON.parse('{"__proto__":{"x":1}}'))),Object.prototype);

let checked=0;
async function inspect(dir){for(const d of await readdir(dir,{withFileTypes:true})){
  const p=path.join(dir,d.name); if(d.isDirectory()){await inspect(p);continue;}
  if(!/\.(?:js|json|hbs|css)$/.test(p))continue;
  const content=await readFile(p,"utf8"); assert.ok(!content.includes(OLD_ID),`ID antigo no runtime: ${p}`);
  for(const m of content.matchAll(/systems\/tagmar3er-oficial\/([a-zA-Z0-9_./-]+\.hbs)/g)) await access(path.join(root,m[1]));
  checked++;
}}
for(const d of ["modules","templates","css"])await inspect(path.join(root,d));
// Safety guards: validation happens before any database output is created.
for(const output of [root,path.join(root,"packs"),path.dirname(root)]){
  const run=spawnSync(process.execPath,[path.join(root,"tools/release/migrate-pack-system-id.mjs"),`--root=${root}`,`--output=${output}`],{encoding:"utf8"});
  assert.notEqual(run.status,0); assert.match(run.stderr,/fora do sistema/);
}
const modulesRoot=process.env.TAGMAR_TEST_MODULES_REPO;
assert.ok(modulesRoot,"Defina TAGMAR_TEST_MODULES_REPO para conferir os três módulos auxiliares");
for(const id of ["tagmar-calendario","tagmartrade","tagmar-ammu-nation"]){
  const moduleRoot=path.join(modulesRoot,id);
  const m=JSON.parse(await readFile(path.join(moduleRoot,"module.json"),"utf8"));
  assert.ok(m.relationships.systems.some(s=>s.id===NEW_ID),id);
  assert.ok(m.relationships.systems.some(s=>s.id===OLD_ID),`${id}: preservar a edição anterior`);
  assert.equal(manifest.relationships.requires.find(r=>r.id===id).compatibility.minimum,m.version);
  if(id!=="tagmar-calendario"){
    const source=await readFile(path.join(moduleRoot,"scripts/main.js"),"utf8");
    const guard=source.match(/(\[[^\]\r\n]+\])\.includes\(game\.system\.id\)/);
    assert.ok(guard,id); const ids=JSON.parse(guard[1]);
    assert.ok(ids.includes(NEW_ID));assert.ok(ids.includes(OLD_ID));
  }
}
console.log(`PASS: novo ID, ${checked} arquivos de runtime, templates, flags, UUIDs, conversão sem mutação, proteção de caminhos e três dependências.`);
