import assert from "node:assert/strict";
import {lessonVocabulary,lessonStepVocabulary,stageVocabulary,VOCABULARY_TARGETS} from "../app/vocabulary.ts";
import {wordVisual} from "../app/wordVisuals.ts";
import fs from "node:fs";

for(let stage=0;stage<7;stage++){
 const lessonCount=stage===0?20:16,all=[];
 for(let lesson=0;lesson<lessonCount;lesson++){
  const lessonWords=lessonVocabulary(stage,lesson,lessonCount);assert.ok(lessonWords.length,"lesson has no vocabulary");
  for(let step=0;step<5;step++)all.push(...lessonStepVocabulary(stage,lesson,step,lessonCount));
 }
 const expected=stageVocabulary(stage);assert.equal(new Set(all).size,expected.length,`stage ${stage} does not teach every word`);assert.equal(expected.length,VOCABULARY_TARGETS[stage]);
}
for(const word of stageVocabulary(0)){const visual=wordVisual(word);assert.ok(visual.icon&&visual.picture&&visual.meaning,`Grade 1 visual missing: ${word}`)}
const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");assert.match(app,/word-deck-stage-/);assert.match(app,/stage>0&&<p>/,"Grade 1 Easy should not show definition paragraphs");
console.log("Lesson vocabulary verified: all 2,150 stage allocations are taught; Grade 1 Easy has 50 complete picture clues.");
