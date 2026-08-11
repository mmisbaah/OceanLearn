import assert from "node:assert/strict";
import {LEVEL1_QUIZ_SETS} from "../app/level1QuizBank.ts";
import {generateQuizQuestion} from "../app/quizEngine.ts";

assert.equal(LEVEL1_QUIZ_SETS.length,20,"Level 1 needs exactly 20 quiz sets");
assert.ok(LEVEL1_QUIZ_SETS.every(set=>set.length===5),"Every Level 1 set needs exactly five questions");
const questions=LEVEL1_QUIZ_SETS.flat();
assert.equal(questions.length,100,"Level 1 needs exactly 100 questions");
assert.equal(new Set(questions.map(q=>q.prompt.toLowerCase())).size,100,"Every Level 1 prompt must be unique");
assert.equal(new Set(questions.map(q=>`${q.prompt}|${q.options.join("|")}`.toLowerCase())).size,100,"No Level 1 question may repeat");

const forbidden=/\b(type|spell|grammar|noun|verb|tense|paragraph|main idea|infer|motivation|report|procedure|persuad|apostrophe)\b/i;
const quizPrompts=new Set();
for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
 const q=generateQuizQuestion(0,set,pos,51827,1);
 assert.ok(["dictation","multiple-choice"].includes(q.type),`Forbidden Level 1 type: ${q.type}`);
 assert.equal(q.options.length,3,"Every Level 1 question must be tap-to-select");
 assert.doesNotMatch(q.prompt,forbidden,"Level 1 question crosses a curriculum boundary");
 assert.ok(!quizPrompts.has(q.prompt),`Repeated rendered prompt: ${q.prompt}`);quizPrompts.add(q.prompt);
 assert.ok(q.answer>=0&&q.answer<3,"Answer index must remain valid after scrambling");
 if(q.type==="dictation")assert.ok(q.audioText,"Every Level 1 listening question needs audio");
}

const tier1=questions.slice(0,35).map(q=>q.prompt).join(" ");
const tier2=questions.slice(35,70).map(q=>q.prompt).join(" ");
const tier3=questions.slice(70).map(q=>q.prompt).join(" ");
assert.match(tier1,/letter|begins|uppercase|picture/i,"Sets 1-7 must focus on alphabet and picture foundations");
assert.match(tier2,/letter|picture|hello|feeling|action/i,"Sets 8-14 must broaden foundation coverage");
assert.match(tier3,/family|body|number|rhyme|instruction|water/i,"Sets 15-20 must integrate the full Level 1 syllabus");

console.log("Level 1 quiz upgrade verified: 20 sets, 100 explicit non-repeating tap questions, progressive three-tier coverage, audio listening tasks, scrambled answers, and strict pre-literacy guardrails.");
