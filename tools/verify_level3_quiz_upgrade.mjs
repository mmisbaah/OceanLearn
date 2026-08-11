import assert from "node:assert/strict";
import {LEVEL3_QUIZ_SETS,LEVEL3_DICTATION_WORDS} from "../app/level3QuizBank.ts";
import {generateQuizQuestion,questionTypePlan} from "../app/quizEngine.ts";

assert.equal(LEVEL3_QUIZ_SETS.length,20,"Level 3 must have 20 sets");
for(const [set,items] of LEVEL3_QUIZ_SETS.entries())assert.equal(items.length,5,`Set ${set+1} must have five questions`);
const prompts=LEVEL3_QUIZ_SETS.flat().map(item=>item.prompt);
assert.equal(prompts.length,100);
assert.equal(new Set(prompts.map(item=>item.toLowerCase())).size,100,"All 100 Level 3 prompts must be unique");

assert.deepEqual(questionTypePlan(1),["dictation","multiple-choice","dictation","multiple-choice","multiple-choice"]);
assert.deepEqual(questionTypePlan(2),["dictation","multiple-choice","fill-blank","dictation","fill-blank"]);
assert.deepEqual(questionTypePlan(3),["reading-comprehension","dictation","fill-blank","reading-comprehension","multiple-choice"]);
const allowed={1:new Set(["dictation","multiple-choice"]),2:new Set(["dictation","multiple-choice","fill-blank"]),3:new Set(["dictation","multiple-choice","fill-blank","reading-comprehension"])};
const dictation=new Set(),dictationPositions=new Set();
for(const grade of [1,2,3])for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
 const item=generateQuizQuestion(2,set,pos,81237+grade,grade);
 assert.ok(allowed[grade].has(item.type),`Grade ${grade} received forbidden type ${item.type}`);
 assert.doesNotMatch(item.prompt,/persuad|metaphor|simile|thesis|research|symbolism|passive voice/i,"Level 3 crossed a guardrail");
 if(item.type==="dictation"){
  assert.match(item.audioText,/^[a-z]+$/i,"Dictation must contain one word");
  assert.ok(item.audioText.length<=6,`Dictation exceeds six letters: ${item.audioText}`);
  const position=`${set}-${pos}`;
  if(!dictationPositions.has(position)){
   assert.ok(!dictation.has(item.audioText.toLowerCase()),`Repeated Level 3 dictation word: ${item.audioText}`);
   dictation.add(item.audioText.toLowerCase());dictationPositions.add(position);
  }
 }
 if(item.type==="fill-blank"){
  assert.equal(item.options.length,0,"Fill-in must accept typed input");
  assert.ok(item.acceptedAnswers?.length,"Fill-in needs an accepted answer");
 }
 if(item.type==="reading-comprehension")assert.ok(item.passage?.split(/\s+/).length>=7,"Reading comprehension needs a short passage");
}
const tier1=prompts.slice(0,35).join(" "),tier2=prompts.slice(35,70).join(" "),tier3=prompts.slice(70).join(" ");
assert.match(tier1,/instruction|magic-e|th sound|oo sound|word family|show-and-tell/i,"Tier 1 foundation coverage missing");
assert.match(tier2,/adjective|caption|map|chart|beginning|recount|plural|question/i,"Tier 2 core coverage missing");
assert.match(tier3,/because|before|feel|title|heading|report|problem|mastery/i,"Tier 3 comprehensive coverage missing");
assert.equal(LEVEL3_DICTATION_WORDS.flat().length,80,"Every relevant Level 3 position needs a dedicated dictation word");
console.log("Level 3 quiz upgrade verified: 20 sets, 100 explicit unique questions, three progressive tiers, Grade 1/2/3 type rules, short one-word dictation, supported reading passages, and strict curriculum guardrails.");
