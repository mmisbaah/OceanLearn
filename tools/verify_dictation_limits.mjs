import assert from "node:assert/strict";
import {generateQuizQuestion} from "../app/quizEngine.ts";
import {gameQuestion} from "../app/curriculum.ts";

const limits=[4,6,6,8,8,Infinity,Infinity],dictationWords=new Set(),questionSignatures=new Set();
let checked=0;
for(let stage=0;stage<7;stage++)for(let level=0;level<20;level++)for(let pos=0;pos<5;pos++){
 const grade=stage<2?1:stage;
 const quiz=generateQuizQuestion(stage,level,pos,147,grade);
 if(quiz.type==="dictation"){
  const word=quiz.audioText??"";
  if(stage===0&&level<7)assert.match(word,/^[A-Z]$/);
  else{
   assert.match(word,/^[A-Za-z]+$/);
   if(stage===0&&level<14)assert.ok(word.length>=2&&word.length<=3,`Grade 1 Easy level ${level+1}: ${word}`);
   else assert.ok(word.length<=limits[stage],`Stage ${stage} level ${level+1}: ${word}`);
  }
  if(!(stage===0&&level<7)){assert.ok(!dictationWords.has(word.toLowerCase()),`Repeated dictation word: ${word}`);dictationWords.add(word.toLowerCase())}
  checked++;
 }
 const game=gameQuestion(1,stage,level,pos,258);
 if(stage===0&&level<7||pos!==0)assert.equal(game.audioText,undefined);
 else{
  const word=game.audioText??"";assert.match(word,/^[A-Za-z]+$/);
  if(stage===0&&level<14)assert.ok(word.length>=2&&word.length<=3,`Grade 1 Easy game level ${level+1}: ${word}`);
  else assert.ok(word.length<=limits[stage],`Game stage ${stage} level ${level+1}: ${word}`);
  assert.ok(!dictationWords.has(word.toLowerCase()),`Repeated dictation word: ${word}`);dictationWords.add(word.toLowerCase());
  checked++;
 }
 for(let gameIndex=0;gameIndex<5;gameIndex++){
  const question=gameQuestion(gameIndex,stage,level,pos,258),signature=JSON.stringify([question.prompt,question.options]);
  assert.ok(!questionSignatures.has(signature),`Repeated game question at stage ${stage}, level ${level+1}, game ${gameIndex+1}`);questionSignatures.add(signature);
 }
 const quizSignature=JSON.stringify([quiz.prompt,quiz.options,quiz.audioText??""]);
 assert.ok(!questionSignatures.has(quizSignature),`Repeated quiz question at stage ${stage}, level ${level+1}`);questionSignatures.add(quizSignature);
}
console.log(JSON.stringify({checked,uniqueDictationWords:dictationWords.size,uniqueQuestions:questionSignatures.size,limits:{grade1Easy:"levels 8-14: 2-3; later: 4",grades1and2:6,grades3and4:8,grade5:"friendly unrestricted"}},null,2));
