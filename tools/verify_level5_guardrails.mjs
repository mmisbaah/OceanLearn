import assert from "node:assert/strict";
import fs from "node:fs";
import {gameQuestion} from "../app/curriculum.ts";
import {generateQuizQuestion,questionTypePlan} from "../app/quizEngine.ts";
import {lessonVocabulary,stageVocabulary} from "../app/vocabulary.ts";
import {wordVisual} from "../app/wordVisuals.ts";

const titles=["Follow a Fiction Series","Explore Mood and Tone","Write an Island Report","Explain How and Why","Solve Narrative Problems","Create Poetry and Imagery","Use Information Text Features","Compare Two Texts","Perform Reader’s Theatre","Choose Language for an Audience","Read Charts and Tables","Explain Cause and Effect","Navigate Headings and Diagrams","Link Ideas with Connectives","Compare Story Characters","Grade 4 Strategy Review"];
const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
for(const title of titles)assert.ok(app.includes(title),`Missing Level 5 lesson: ${title}`);
assert.ok(app.includes("function level5LessonDetail"),"Level 5 needs a dedicated strategic-reader renderer");
assert.match(app,/stage===4\?level5LessonDetail/,"Level 5 lesson renderer is not connected");
assert.equal(stageVocabulary(4).length,400,"Level 5 mastery path must contain 400 words");
for(let lesson=0;lesson<16;lesson++)for(const word of lessonVocabulary(4,lesson,16))assert.notEqual(wordVisual(word).icon,"🔤",`Generic picture used for Level 5 lesson word: ${word}`);

assert.deepEqual(questionTypePlan(4),["reading-comprehension","dictation","fill-blank","reading-comprehension","multiple-choice"]);
const quizPrompts=new Set(),passages=new Set(),quizDictation=new Set();
for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
 const q=generateQuizQuestion(4,set,pos,42816,4);
 assert.ok(["dictation","multiple-choice","fill-blank","reading-comprehension"].includes(q.type));
 assert.doesNotMatch(q.prompt,/thesis|rhetoric|corroborat|citation|independent research|source credibility/i,"Level 5 quiz crosses into advanced Level 6/7 work");
 assert.ok(!quizPrompts.has(q.prompt),`Repeated Level 5 quiz prompt: ${q.prompt}`);quizPrompts.add(q.prompt);
 if(q.type==="reading-comprehension"){assert.ok(q.passage?.length>100);assert.ok(!passages.has(q.passage),"Repeated Level 5 passage");passages.add(q.passage)}
 if(q.type==="dictation"){assert.match(q.audioText,/^[a-z]+$/i);assert.ok(q.audioText.length<=8,`Level 5 dictation exceeds 8 letters: ${q.audioText}`);assert.ok(!quizDictation.has(q.audioText.toLowerCase()),`Repeated Level 5 quiz dictation: ${q.audioText}`);quizDictation.add(q.audioText.toLowerCase())}
}

const gamePrompts=new Set(),gameDictation=new Set();
for(let level=0;level<20;level++)for(let game=0;game<5;game++)for(let pos=0;pos<5;pos++){
 const q=gameQuestion(game,4,level,pos,75319);
 assert.doesNotMatch(q.prompt,/thesis|rhetoric|corroborat|citation|independent research|source credibility/i,"Level 5 game crosses into advanced Level 6/7 work");
 assert.ok(!gamePrompts.has(q.prompt),`Repeated Level 5 game prompt: ${q.prompt}`);gamePrompts.add(q.prompt);
 if(q.audioText){assert.ok(q.audioText.length<=8,`Level 5 game dictation exceeds 8 letters: ${q.audioText}`);assert.ok(!quizDictation.has(q.audioText.toLowerCase()),`Dictation repeats between Level 5 quiz and game: ${q.audioText}`);assert.ok(!gameDictation.has(q.audioText.toLowerCase()),`Repeated Level 5 game dictation: ${q.audioText}`);gameDictation.add(q.audioText.toLowerCase())}
}

console.log("Level 5 verified: 16 strategic Grade 4 lessons, 400-word path, four assessment modes, unique Maldivian passages and prompts, five game mechanics, semantic visuals, and unique dictation within the 8-letter limit.");
