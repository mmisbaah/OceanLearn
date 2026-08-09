import assert from "node:assert/strict";
import fs from "node:fs";
import {gameQuestion,STAGES} from "../app/curriculum.ts";

const engine=fs.readFileSync(new URL("../app/quizEngine.ts",import.meta.url),"utf8");
assert.match(engine,/if\(type==="dictation"\)[\s\S]*?return hinted\(/,"dictation hint missing");
assert.match(engine,/if\(type==="fill-blank"\)return hinted\(/,"fill-blank hint missing");
assert.match(engine,/if\(type==="reading-comprehension"\)[\s\S]*?return hinted\(/,"reading hint missing");
for(let stage=0;stage<7;stage++)for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++)assert.match((await import("../app/curriculum.ts")).quizQuestion(stage,set,pos,12345).prompt,/💡 Hint:/);
const quizCount=700;let gameCount=0;
for(let game=0;game<5;game++)for(let stage=0;stage<7;stage++)for(let level=0;level<20;level++)for(let pos=0;pos<5;pos++){
 const q=gameQuestion(game,stage,level,pos,12345);
 assert.match(q.prompt,/💡 Hint:/,`game hint missing at ${game}/${stage}/${level}/${pos}`);gameCount++;
}
console.log(`Hints verified: ${quizCount} quiz questions and ${gameCount} game puzzles.`);
