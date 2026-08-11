import assert from "node:assert/strict";
import {assessmentLessonCount,assessmentPhase,assessmentVocabulary} from "../app/vocabulary.ts";
import {gameQuestion} from "../app/curriculum.ts";
import {generateQuizQuestion} from "../app/quizEngine.ts";

const quizSignatures=new Set(),gameSignatures=new Set();
for(let stage=0;stage<7;stage++){
 const total=stage===0?20:16;
 let previous=[];
 for(let level=0;level<20;level++){
  const phase=assessmentPhase(level),expected=level<7?1:level<14?2:3;
  assert.equal(phase,expected,`wrong phase at stage ${stage}, level ${level+1}`);
  const count=assessmentLessonCount(stage,level),pool=assessmentVocabulary(stage,level);
  assert.ok(count>=1&&count<=total,`invalid lesson count at stage ${stage}, level ${level+1}`);
  for(const word of previous)assert.ok(pool.includes(word),`level ${level+1} lost earlier curriculum word ${word}`);
  previous=pool;
  for(let pos=0;pos<5;pos++){
   const quiz=generateQuizQuestion(stage,level,pos,17391,stage<2?1:stage);
   const quizSignature=JSON.stringify([stage,quiz.type,quiz.prompt,quiz.audioText??"",quiz.options]);
   assert.ok(!quizSignatures.has(quizSignature),`repeated quiz at stage ${stage}, level ${level+1}, question ${pos+1}`);quizSignatures.add(quizSignature);
   for(let game=0;game<5;game++){
    const mission=gameQuestion(game,stage,level,pos,29471),signature=JSON.stringify([stage,game,mission.prompt,mission.options]);
    assert.ok(!gameSignatures.has(signature),`repeated game at stage ${stage}, game ${game}, level ${level+1}`);gameSignatures.add(signature);
   }
  }
 }
 assert.equal(assessmentLessonCount(stage,19),total,`level 20 does not cover the complete stage ${stage} curriculum`);
}
for(let level=0;level<7;level++)for(let pos=0;pos<5;pos++){
 const quiz=generateQuizQuestion(0,level,pos,71,1),game=gameQuestion(pos%5,0,level,pos,93);
 if(quiz.type==="dictation"){
  assert.match(quiz.audioText??"",/^[A-Z]$/,`Grade 1 Easy quiz level ${level+1} dictation is not a single letter`);
  assert.match(quiz.prompt,/listen.*tap the letter/i,`Grade 1 Easy quiz level ${level+1} dictation is not oral tap-to-select`);
  assert.equal(quiz.options.length,3,`Grade 1 Easy quiz level ${level+1} requires typing`);
 }else{
  assert.match(quiz.prompt,/letter|uppercase|choose/i,`Grade 1 Easy quiz level ${level+1} is not alphabet focused`);
  assert.ok(quiz.options.every(option=>/^[A-Z]$/.test(option)),`Grade 1 Easy quiz level ${level+1} includes a non-letter option`);
 }
 assert.match(game.prompt,/letter|starts|match|sound/i,`Grade 1 Easy game level ${level+1} is not alphabet/object focused`);
}
for(let level=7;level<20;level++)for(let pos=0;pos<5;pos++){
 const quiz=generateQuizQuestion(0,level,pos,71,1);
 if(quiz.type==="dictation"){assert.ok((quiz.audioText??"").length>1,`Grade 1 Easy quiz level ${level+1} dictation must use a spoken word`);assert.equal(quiz.options.length,3,"Level 1 dictation must remain tap-to-select");}
}
console.log(JSON.stringify({stages:7,quizQuestions:quizSignatures.size,gameMissions:gameSignatures.size,phaseBands:{phase1:"levels 1-7",phase2:"levels 8-14",phase3:"levels 15-20"},level20:"complete curriculum",grade1Easy:"alphabet and initial-object sounds in levels 1-7"},null,2));
