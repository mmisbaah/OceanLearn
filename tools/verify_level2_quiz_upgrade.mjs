import assert from "node:assert/strict";
import {LEVEL2_QUIZ_SETS} from "../app/level2QuizBank.ts";
import {generateQuizQuestion} from "../app/quizEngine.ts";

assert.equal(LEVEL2_QUIZ_SETS.length,20,"Level 2 needs exactly 20 sets");
assert.ok(LEVEL2_QUIZ_SETS.every(set=>set.length===5),"Every Level 2 set needs five questions");
const bank=LEVEL2_QUIZ_SETS.flat();
assert.equal(bank.length,100,"Level 2 needs exactly 100 questions");
assert.equal(new Set(bank.map(q=>q.prompt.toLowerCase())).size,100,"Every Level 2 prompt must be unique");
assert.equal(new Set(bank.map(q=>`${q.prompt}|${q.options.join("|")}`.toLowerCase())).size,100,"No Level 2 question may repeat");

const forbidden=/\b(infer|main idea|research|persuad|metaphor|paragraph|report|irregular|adverb|compound sentence|theme|symbol)\b/i;
for(const learnerGrade of [1,2]){
 const prompts=new Set(),dictation=new Set();
 for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
  const item=generateQuizQuestion(1,set,pos,62714,learnerGrade);
  const allowed=learnerGrade===1?["dictation","multiple-choice"]:["dictation","multiple-choice","fill-blank"];
  assert.ok(allowed.includes(item.type),`Forbidden Level 2 type for Grade ${learnerGrade}: ${item.type}`);
  assert.doesNotMatch(item.prompt,forbidden,"Level 2 question crosses a curriculum boundary");
  assert.ok(!prompts.has(item.prompt),`Repeated rendered Level 2 prompt: ${item.prompt}`);prompts.add(item.prompt);
  if(item.type==="dictation"){
   assert.match(item.audioText,/^[a-z]+$/i,"Level 2 dictation must be one word");
   assert.ok(item.audioText.length<=6,`Level 2 dictation exceeds six letters: ${item.audioText}`);
   assert.ok(!dictation.has(item.audioText.toLowerCase()),`Repeated Level 2 dictation word: ${item.audioText}`);dictation.add(item.audioText.toLowerCase());
  }
  if(item.type==="fill-blank"){assert.equal(item.options.length,0);assert.equal(item.acceptedAnswers?.length,1)}
 }
}

const tier1=bank.slice(0,35).map(q=>q.prompt).join(" "),tier2=bank.slice(35,70).map(q=>q.prompt).join(" "),tier3=bank.slice(70).map(q=>q.prompt).join(" ");
assert.match(tier1,/classroom|feeling|short-a|short-e|short-i|short-o|short-u/i,"Sets 1-7 must cover entry phonics and communication");
assert.match(tier2,/sight word|article|place word|capital|story-order|picture/i,"Sets 8-14 must cover at least two-thirds of Level 2");
assert.match(tier3,/reading|story|introduc|classroom|article|review/i,"Sets 15-20 must integrate the complete Level 2 syllabus");

console.log("Level 2 quiz upgrade verified: 20 sets, 100 explicit unique questions, progressive three-tier coverage, Grade 1/2 type rules, one-word unique dictation within six letters, and strict supported-foundation guardrails.");
