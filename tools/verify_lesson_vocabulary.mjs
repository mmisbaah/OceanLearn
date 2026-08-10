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
 const minimumDistinct=stage===0?50:60;
 assert.ok(new Set(all.map(word=>word.toLowerCase())).size>=minimumDistinct,`stage ${stage} has too little lesson vocabulary`);
 assert.equal(stageVocabulary(stage).length,VOCABULARY_TARGETS[stage]);
}
const cvcChecks=[
 {lesson:5,vowel:"a",words:["bat","cap","mat"]},{lesson:6,vowel:"e",words:["bed","hen","pen"]},
 {lesson:7,vowel:"i",words:["fin","pig","sit"]},{lesson:8,vowel:"o",words:["log","pot","top"]},
 {lesson:9,vowel:"u",words:["bus","cup","run"]},
];
for(const check of cvcChecks){
 const actual=lessonVocabulary(0,check.lesson,20);
 assert.deepEqual(actual,check.words,`short ${check.vowel} lesson has the wrong words`);
 for(const word of actual){
  assert.match(word,new RegExp(`^[^aeiou]${check.vowel}[^aeiou]$`,`i`),`${word} is not a short ${check.vowel} CVC word`);
 }
}
assert.equal(new Set(Array.from({length:20},(_,lesson)=>lessonVocabulary(0,lesson,20)).flat().map(word=>word.toLowerCase())).size,50,"Grade 1 Easy must teach exactly 50 distinct words");

// Independent semantic anchors: each lesson must contain a word central to its named topic.
const topicAnchors=[
 ["apple","fish","key","palm","wave","bat","bed","fin","log","bus","reef","sand","book","crab","home","rain","read","reef","boat","sea"],
 ["hello","book","family","wash","cat","red","rice","teacher","rain","shirt","walk","doctor","healthy","cat","favourite","school"],
 ["listen","kind","story","information","first","island","habitat","morning","Eid","lagoon","visited","hero","rhyme","next","sentence","story"],
 ["retell","adjective","greeting","diary","setting","fact","rhyme","summary","main-idea","past","happy","moral","diagram","voice","topic-sentence","paragraph"],
 ["series","mood","report","cause","conflict","imagery","heading","compare","script","audience","chart","effect","diagram","however","trait","explanation"],
 ["memoir","opinion","media","script","imagery","report","process","narrative","discussion","infer","symbol","motivation","persuade","metaphor","reflect","reflection"],
 ["synthesise","nuance","ethos","credible","corroborate","ambiguity","connotation","irony","foreshadow","perspective","cohesion","thesis","qualify","evaluate","citation","critical"],
];
for(let stage=0;stage<topicAnchors.length;stage++){
 for(let lesson=0;lesson<topicAnchors[stage].length;lesson++){
  const words=lessonVocabulary(stage,lesson,stage===0?20:16).map(word=>word.toLowerCase());
  assert.ok(words.includes(topicAnchors[stage][lesson].toLowerCase()),`stage ${stage}, lesson ${lesson+1} does not match its topic`);
  for(let step=0;step<5;step++)for(const word of lessonStepVocabulary(stage,lesson,step,stage===0?20:16))assert.ok(words.includes(word.toLowerCase()),`stage ${stage}, lesson ${lesson+1}, step ${step+1} escaped its topic bank`);
 }
}
for(const word of stageVocabulary(0)){const visual=wordVisual(word);assert.ok(visual.icon&&visual.picture&&visual.meaning,`Grade 1 visual missing: ${word}`)}
const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");assert.match(app,/word-deck-stage-/);assert.match(app,/stage>0&&<p>/,"Grade 1 Easy should not show definition paragraphs");
assert.match(app,/detail\.paragraphs=stage===0\?\[\]/,"Grade 1 Easy still renders explanation paragraphs");
assert.match(app,/stage===0\?\(practiceDone\?</,"Grade 1 Easy still renders the advanced practice block");
assert.doesNotMatch(app,/\{foundation&&<section className="read-learn"/,"Grade 1 Easy still renders long stories");
console.log("Lesson vocabulary verified: every lesson uses a curated topic bank; all five short-vowel CVC banks match their phoneme; Grade 1 Easy teaches 50 picture words.");
