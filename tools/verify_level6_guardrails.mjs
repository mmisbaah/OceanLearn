import assert from "node:assert/strict";
import fs from "node:fs";
import {gameQuestion} from "../app/curriculum.ts";
import {generateQuizQuestion,questionTypePlan} from "../app/quizEngine.ts";
import {lessonVocabulary,stageVocabulary} from "../app/vocabulary.ts";
import {wordVisual} from "../app/wordVisuals.ts";

const titles=["Write a Maldivian Memoir","Develop an Opinion","Understand Media Messages","Write and Perform a Play","Craft Poetry and Imagery","Research an Island Report","Write a Process Explanation","Shape a Strong Narrative","Join a Structured Discussion","Use Evidence to Infer","Explore Symbols in Stories","Explain Character Motivation","Build a Persuasive Case","Use Figurative Language","Reflect and Revise","Grade 5 Critical Reading Review"];
const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
for(const title of titles)assert.ok(app.includes(title),`Missing Level 6 lesson: ${title}`);
assert.ok(app.includes("function level6LessonDetail"),"Level 6 needs a dedicated critical-reader renderer");
assert.match(app,/stage===5\?level6LessonDetail/,"Level 6 lesson renderer is not connected");
assert.equal(stageVocabulary(5).length,500,"Level 6 mastery path must contain 500 words");
for(let lesson=0;lesson<16;lesson++)for(const word of lessonVocabulary(5,lesson,16))assert.notEqual(wordVisual(word).icon,"🔤",`Generic picture used for Level 6 lesson word: ${word}`);

const reserved=/synthesi|rhetoric|corroborat|denotation|connotation|thesis|citation|register|source credibility|qualif(?:y|ier)/i;
assert.deepEqual(questionTypePlan(5),["reading-comprehension","dictation","fill-blank","reading-comprehension","multiple-choice"]);
const quizPrompts=new Set(),passages=new Set(),quizDictation=new Set();
for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
 const q=generateQuizQuestion(5,set,pos,68241,5);
 assert.ok(["dictation","multiple-choice","fill-blank","reading-comprehension"].includes(q.type));
 assert.doesNotMatch(q.prompt,reserved,"Level 6 quiz crosses into Level 7 extension work");
 assert.ok(!quizPrompts.has(q.prompt),`Repeated Level 6 quiz prompt: ${q.prompt}`);quizPrompts.add(q.prompt);
 if(q.type==="reading-comprehension"){assert.ok(q.passage?.length>120);assert.ok(!passages.has(q.passage),"Repeated Level 6 passage");passages.add(q.passage)}
 if(q.type==="dictation"){assert.match(q.audioText,/^[a-z]+$/i,"Dictation must contain one ordinary word");assert.doesNotMatch(q.audioText,/ology$|ography$|scientific|technical/i,"Dictation word is unnecessarily complex");assert.ok(!quizDictation.has(q.audioText.toLowerCase()),`Repeated Level 6 quiz dictation: ${q.audioText}`);quizDictation.add(q.audioText.toLowerCase())}
}

const gamePrompts=new Set(),gameDictation=new Set();
for(let level=0;level<20;level++)for(let game=0;game<5;game++)for(let pos=0;pos<5;pos++){
 const q=gameQuestion(game,5,level,pos,93517);
 assert.doesNotMatch(q.prompt,reserved,"Level 6 game crosses into Level 7 extension work");
 assert.ok(!gamePrompts.has(q.prompt),`Repeated Level 6 game prompt: ${q.prompt}`);gamePrompts.add(q.prompt);
 if(q.audioText){assert.match(q.audioText,/^[a-z]+$/i);assert.ok(!quizDictation.has(q.audioText.toLowerCase()),`Dictation repeats between Level 6 quiz and game: ${q.audioText}`);assert.ok(!gameDictation.has(q.audioText.toLowerCase()),`Repeated Level 6 game dictation: ${q.audioText}`);gameDictation.add(q.audioText.toLowerCase())}
}

console.log("Level 6 verified: 16 Grade 5 critical-reading lessons, 500-word path, four assessment modes, unique Maldivian passages and prompts, five game mechanics, semantic visuals, child-friendly unique dictation, and Level 7 concepts reserved.");
