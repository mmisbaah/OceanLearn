import assert from "node:assert/strict";
import fs from "node:fs";
import {GRADE1_EASY_PHONICS_SCHEMA,lessonVocabulary,stageVocabulary} from "../app/vocabulary.ts";
import {wordVisual} from "../app/wordVisuals.ts";
import {generateQuizQuestion} from "../app/quizEngine.ts";
import {gameQuestion} from "../app/curriculum.ts";

const schema=GRADE1_EASY_PHONICS_SCHEMA,target=[...schema.targetWords];
assert.equal(schema.phase1.letters.join(""),"ABCDEFGHIJKLMNOPQRSTUVWXYZ");
assert.equal(schema.phase1.words.length,26,"Phase 1 must map one picture object to every letter");
assert.equal(target.length,50,"Level 1 must contain exactly 50 oral/picture targets");
assert.equal(new Set(target.map(word=>word.toLowerCase())).size,50,"Level 1 targets must be unique");
assert.deepEqual(stageVocabulary(0),target,"The Level 1 repository must use the explicit 50-word schema");
assert.equal(Object.values(schema.phase2.groups).flat().length,12,"Oral/social phase must contain 12 targets");
assert.equal(schema.phase3.words.length,12,"Listen/look/move phase must contain 12 targets");

const lessonWords=Array.from({length:20},(_,lesson)=>lessonVocabulary(0,lesson,20)).flat();
assert.deepEqual(new Set(lessonWords.map(word=>word.toLowerCase())),new Set(target.map(word=>word.toLowerCase())),"Lessons must cover the 50-word repository without outside targets");
for(const word of target){const visual=wordVisual(word);assert.notEqual(visual.icon,"🔤",`${word} uses a generic fallback visual`);assert.ok(visual.picture,`${word} is missing a picture description`)}

for(let level=0;level<20;level++)for(let pos=0;pos<5;pos++){
 const quiz=generateQuizQuestion(0,level,pos,901,1);
 assert.ok(["dictation","multiple-choice"].includes(quiz.type),`Level 1 quiz uses forbidden ${quiz.type}`);
 assert.ok(quiz.options.length===3,"Level 1 quiz must be tap-to-select, not typed spelling");
 assert.doesNotMatch(quiz.prompt,/type|spell|grammar|main idea|infer|paragraph/i,"Level 1 quiz crosses a curriculum guardrail");
 for(let game=0;game<5;game++)assert.doesNotMatch(gameQuestion(game,0,level,pos,617).prompt,/spell|grammar|paragraph|main idea|infer/i,"Level 1 game crosses a curriculum guardrail");
}

const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
for(const text of ["Alphabet Awareness","Oral Language & Social Words","Listen, Look & Move","Family, Feelings & Review","FOUNDATION_SKILLS","Picture Match","Sound Splash","Letter Lagoon","Rhyme Reef","Action Adventure"])assert.ok(app.includes(text),`Missing Level 1 feature: ${text}`);
assert.match(app,/detail\.paragraphs=stage===0\?\[\]/,"Level 1 must not show connected-text lesson paragraphs");
console.log("Level 1 verified: 50 picture/oral targets; alphabet, social language, feelings and one-step actions; no formal spelling, writing, grammar, connected-text reading or comprehension.");
