import assert from "node:assert/strict";
import fs from "node:fs";
import {gameQuestion} from "../app/curriculum.ts";
import {generateQuizQuestion,questionTypePlan} from "../app/quizEngine.ts";
import {lessonVocabulary,stageVocabulary} from "../app/vocabulary.ts";
import {wordVisual} from "../app/wordVisuals.ts";

const titles=["Retell an Island Story","Describe People and Places","Write a Friendly Letter","Write a Diary Entry","Build a Clear Narrative","Read an Information Text","Poems, Rhyme and Rhythm","Write a Short Summary","Find the Main Idea","Use the Past Tense","Share Feelings and Opinions","Find a Story Message","Read Facts and Diagrams","Speak Clearly to a Group","Build a Short Paragraph","Grade 3 Reading Review"];
const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
for(const title of titles)assert.ok(app.includes(title),`Missing Level 4 lesson: ${title}`);
assert.ok(app.includes("function level4LessonDetail"),"Level 4 needs its own fluent-reader lesson renderer");
assert.match(app,/stage===3\?level4LessonDetail/,"Level 4 lesson renderer is not connected");
assert.equal(stageVocabulary(3).length,300,"Level 4 mastery path must contain 300 words");
for(let lesson=0;lesson<16;lesson++)for(const word of lessonVocabulary(3,lesson,16))assert.notEqual(wordVisual(word).icon,"🔤",`Generic picture used for Level 4 lesson word: ${word}`);

assert.deepEqual(questionTypePlan(3),["reading-comprehension","dictation","fill-blank","reading-comprehension","multiple-choice"]);
const quizPrompts=new Set(),passages=new Set(),quizDictation=new Set();
for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
 const q=generateQuizQuestion(3,set,pos,86420,3);
 assert.ok(["dictation","multiple-choice","fill-blank","reading-comprehension"].includes(q.type));
 assert.doesNotMatch(q.prompt,/metaphor|bias|thesis|rhetoric|corroborat|independent research/i,"Level 4 quiz crosses a curriculum guardrail");
 assert.ok(!quizPrompts.has(q.prompt),`Repeated Level 4 quiz prompt: ${q.prompt}`);quizPrompts.add(q.prompt);
 if(q.type==="reading-comprehension"){assert.ok(q.passage?.length>80,"Reading passage is too short");assert.ok(!passages.has(q.passage),"Repeated Level 4 reading passage");passages.add(q.passage)}
 if(q.type==="dictation"){assert.match(q.audioText,/^[a-z]+$/i);assert.ok(q.audioText.length<=8,`Level 4 dictation exceeds 8 letters: ${q.audioText}`);assert.ok(!quizDictation.has(q.audioText.toLowerCase()),`Repeated Level 4 quiz dictation: ${q.audioText}`);quizDictation.add(q.audioText.toLowerCase())}
}

const gamePrompts=new Set(),gameDictation=new Set();
for(let level=0;level<20;level++)for(let game=0;game<5;game++)for(let pos=0;pos<5;pos++){
 const q=gameQuestion(game,3,level,pos,97531);
 assert.doesNotMatch(q.prompt,/metaphor|bias|thesis|rhetoric|corroborat|independent research/i,"Level 4 game crosses a curriculum guardrail");
 assert.ok(!gamePrompts.has(q.prompt),`Repeated Level 4 game prompt: ${q.prompt}`);gamePrompts.add(q.prompt);
 if(q.audioText){assert.ok(q.audioText.length<=8,`Level 4 game dictation exceeds 8 letters: ${q.audioText}`);assert.ok(!quizDictation.has(q.audioText.toLowerCase()),`Dictation repeats between Level 4 quiz and game: ${q.audioText}`);assert.ok(!gameDictation.has(q.audioText.toLowerCase()),`Repeated Level 4 game dictation: ${q.audioText}`);gameDictation.add(q.audioText.toLowerCase())}
}

console.log("Level 4 verified: 16 fluent Grade 3 lessons, 300-word path, four quiz modes, unique realistic passages, five distinct game mechanics, semantic visuals, and unique dictation within the 8-letter limit.");
