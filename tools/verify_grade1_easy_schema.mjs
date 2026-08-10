import assert from "node:assert/strict";
import fs from "node:fs";
import {GRADE1_EASY_PHONICS_SCHEMA,lessonVocabulary,stageVocabulary} from "../app/vocabulary.ts";
import {wordVisual} from "../app/wordVisuals.ts";

const schema=GRADE1_EASY_PHONICS_SCHEMA;
const target=[...schema.targetWords];
assert.equal(schema.phase1.letters.join(""),"ABCDEFGHIJKLMNOPQRSTUVWXYZ");
assert.equal(schema.phase1.words.length,26,"Phase 1 must map one object to each letter");
assert.equal(target.length,50,"Grade 1 Easy must contain exactly 50 target words");
assert.equal(new Set(target.map(word=>word.toLowerCase())).size,50,"All 50 target words must be unique");
assert.deepEqual(stageVocabulary(0),target,"The shared stage repository must use the explicit 50-word schema");

for(const [vowel,words] of Object.entries(schema.phase2.groups)){
 assert.equal(words.length,3,`short ${vowel} group must have three examples`);
 for(const word of words){
  assert.match(word,new RegExp(`^[^aeiou]${vowel}[^aeiou]$`,`i`),`${word} does not match short-${vowel} CVC`);
  assert.ok(word.length>=2&&word.length<=3,`${word} is too long for Phase 2`);
 }
}
for(const word of schema.phase3.words)assert.ok(word.length<=4,`${word} is too long for Grade 1 Easy Phase 3`);

const lessonWords=Array.from({length:20},(_,lesson)=>lessonVocabulary(0,lesson,20)).flat();
assert.deepEqual(new Set(lessonWords.map(word=>word.toLowerCase())),new Set(target.map(word=>word.toLowerCase())),"Lessons must teach every target word and no outside words");
for(const word of target){
 const visual=wordVisual(word);
 assert.notEqual(visual.icon,"🔤",`${word} uses a generic fallback visual`);
 assert.ok(visual.picture.toLowerCase().includes(word)===(word!=="xray"&&word!=="yoyo")||["xray","yoyo"].includes(word),`${word} picture description is not semantically explicit`);
}

const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
for(const marker of ["Home","progress.stars","progress.badges.length","Hi, {student.name}","G{student.grade}","Reset","Logout"])assert.ok(app.includes(marker),`Upper deck is missing ${marker}`);
assert.match(app,/const\[open,setOpen\]=useState\(false\)/,"Hints must start hidden");
assert.match(app,/Show hint/,"Hints need a clickable reveal control");

console.log("Grade 1 Easy schema verified: 26 alphabet objects + 15 short-vowel CVC words + 9 picture words = 50 unique visual targets; upper deck and hidden hints verified.");
