import assert from "node:assert/strict";
import fs from "node:fs";
import {gameQuestion} from "../app/curriculum.ts";

const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
assert.equal((app.match(/key=\{`\$\{q\.token\}-\$\{i\}`\}/g)??[]).length,2,"quiz and game buttons need question-specific keys");
assert.match(app,/\[q\.token\]/,"game selection is not reset when the puzzle changes");
for(let game=0;game<5;game++)for(let stage=0;stage<7;stage++)for(let level=0;level<20;level++)for(let pos=0;pos<5;pos++){
 const q=gameQuestion(game,stage,level,pos,77);
 assert.equal(new Set(q.options).size,q.options.length,`duplicate options at ${game}/${stage}/${level}/${pos}`);
}
console.log("Option identity verified across 3,500 game puzzles; no duplicate choices or reusable cross-question keys.");
