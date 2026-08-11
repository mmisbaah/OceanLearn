import assert from "node:assert/strict";
import fs from "node:fs";
import {generateQuizQuestion} from "../app/quizEngine.ts";

const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
assert.doesNotMatch(app,/\[detail\.title,\.\.\.detail\.paragraphs,\.\.\.story/,"Lesson audio must not read the reusable story template");
assert.match(app,/\[detail\.title,\.\.\.beginnerWords,\.\.\.detail\.examples,detail\.practice\]/,"Lesson audio must follow current step vocabulary and practice");
assert.match(app,/prompt\.split\("\\n💡 Hint: "\)/,"Quiz UI must separate hints from question text");
assert.match(app,/Show hint/,"Quiz UI must expose a clickable hint control");

let checked=0;
for(let stage=0;stage<7;stage++){
 const grade=stage===0?1:stage===1?2:Math.min(5,stage);
 for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
  const q=generateQuizQuestion(stage,set,pos,24680+stage,grade);
  const pieces=q.prompt.split("\n💡 Hint: ");
  assert.equal(pieces.length,2,`Missing hint at stage ${stage+1}, set ${set+1}, question ${pos+1}`);
  assert.ok(pieces[1].trim().length>10,"Hint must be useful");
  checked++;
 }
}
assert.equal(checked,700);
console.log("Lesson audio and quiz hints verified: current step content only, reusable stories excluded, and 700/700 quiz questions have hidden clickable hints.");
