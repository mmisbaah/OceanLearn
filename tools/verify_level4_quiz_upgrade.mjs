import assert from "node:assert/strict";
import {LEVEL4_QUIZ_SETS} from "../app/level4QuizBank.ts";
import {generateQuizQuestion,questionTypePlan} from "../app/quizEngine.ts";
assert.equal(LEVEL4_QUIZ_SETS.length,20);for(const [i,s] of LEVEL4_QUIZ_SETS.entries())assert.equal(s.length,5,`Set ${i+1}`);
const prompts=LEVEL4_QUIZ_SETS.flat().map(q=>q.prompt.toLowerCase());assert.equal(new Set(prompts).size,100,"Prompts must be unique");
const allowed={2:new Set(["dictation","multiple-choice","fill-blank"]),3:new Set(["dictation","multiple-choice","fill-blank","reading-comprehension"]),4:new Set(["dictation","multiple-choice","fill-blank","reading-comprehension"])};
const seenWords=new Set(),seenPositions=new Set();
for(const grade of [2,3,4])for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
 const item=generateQuizQuestion(3,set,pos,41987+grade,grade);assert.ok(allowed[grade].has(item.type));
 assert.doesNotMatch(item.prompt,/metaphor|simile|symbolism|thesis|independent research|passive voice|perfect tense/i);
 if(item.type==="dictation"){assert.match(item.audioText,/^[a-z]+$/i);assert.ok(item.audioText.length<=6);const key=`${set}-${pos}`;if(!seenPositions.has(key)){assert.ok(!seenWords.has(item.audioText.toLowerCase()),`Repeated dictation ${item.audioText}`);seenWords.add(item.audioText.toLowerCase());seenPositions.add(key)}}
 if(item.type==="fill-blank"){assert.equal(item.options.length,0);assert.ok(item.acceptedAnswers?.length)}
 if(item.type==="reading-comprehension")assert.ok(item.passage?.split(/\s+/).length>=7);
}
const a=prompts.slice(0,35).join(" "),b=prompts.slice(35,70).join(" "),c=prompts.slice(70).join(" ");
assert.match(a,/root|compound|prefix|suffix|ea sound|discussion|poster/);assert.match(b,/summary|compare|heading|paragraph|begin|problem|description/);assert.match(c,/report|opinion|explain|comma|apostrophe|chart|recount/);
console.log("Level 4 quiz upgrade verified: 20 sets, 100 unique questions, progressive three-tier coverage, Grade 2/3/4 assessment rules, unique short dictation, supported comprehension, and strict curriculum guardrails.");
