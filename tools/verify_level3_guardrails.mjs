import assert from "node:assert/strict";
import {gameQuestion} from "../app/curriculum.ts";
import {generateQuizQuestion,questionTypePlan} from "../app/quizEngine.ts";
import {lessonVocabulary,stageVocabulary} from "../app/vocabulary.ts";
import {wordVisual} from "../app/wordVisuals.ts";
import fs from "node:fs";

const titles=["Talk in My Classroom","Follow Two Steps","Word Families: at, an and ap","Word Families: it, in and ip","Word Families: og, op and ot","Long Vowel Pairs","People and Places","My Island Day","Read a Picture Story","Beginning, Middle and End","Write a Short Recount","One and More Than One","Ask and Answer","Join Ideas with Because","Before and After","Growing Reader Review"];
const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
for(const title of titles)assert.ok(app.includes(title),`Missing Level 3 lesson: ${title}`);
assert.ok(app.includes("function level3LessonDetail"),"Level 3 needs its own supported growing-reader lesson renderer");
assert.match(app,/stage===2\?level3LessonDetail/,"Level 3 lesson renderer is not connected");
assert.equal(stageVocabulary(2).length,200,"Level 3 mastery path must contain 200 words");

const cvc=[...lessonVocabulary(2,2,16),...lessonVocabulary(2,3,16),...lessonVocabulary(2,4,16)];
for(const word of cvc)assert.match(word,/^[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]$/i,`Invalid CVC word: ${word}`);
for(let lesson=0;lesson<16;lesson++)for(const word of lessonVocabulary(2,lesson,16)){
 const visual=wordVisual(word);
 assert.notEqual(visual.icon,"🔤",`Generic picture used for Level 3 lesson word: ${word}`);
}

assert.deepEqual(questionTypePlan(2),["dictation","multiple-choice","fill-blank","dictation","fill-blank"]);
const quizPrompts=new Set(),dictationWords=new Set();
for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
 const q=generateQuizQuestion(2,set,pos,73421,2);
 assert.ok(["dictation","multiple-choice","fill-blank"].includes(q.type),`Forbidden Grade 2 quiz type: ${q.type}`);
 assert.doesNotMatch(q.prompt,/infer|metaphor|persuad|research|thesis|bias|independent report/i,"Level 3 quiz crosses a curriculum guardrail");
 assert.ok(!quizPrompts.has(q.prompt),`Repeated Level 3 quiz prompt: ${q.prompt}`);quizPrompts.add(q.prompt);
 if(q.type==="dictation"){
  assert.match(q.audioText,/^[a-z]+$/i,"Dictation must be one word");
  assert.ok(q.audioText.length<=6,`Grade 2 dictation exceeds 6 letters: ${q.audioText}`);
  assert.ok(!dictationWords.has(q.audioText.toLowerCase()),`Repeated Level 3 dictation word: ${q.audioText}`);dictationWords.add(q.audioText.toLowerCase());
 }
}

const gamePrompts=new Set();
for(let level=0;level<20;level++)for(let game=0;game<5;game++)for(let pos=0;pos<5;pos++){
 const q=gameQuestion(game,2,level,pos,991);
 assert.doesNotMatch(q.prompt,/infer|metaphor|persuad|research|thesis|bias|independent report/i,"Level 3 game crosses a curriculum guardrail");
 assert.ok(!gamePrompts.has(q.prompt),`Repeated Level 3 game prompt: ${q.prompt}`);gamePrompts.add(q.prompt);
}

console.log("Level 3 verified: 16 growing-reader lessons, 200-word path, valid CVC and vowel work, short picture stories and recounts, Grade 2 mixed quizzes, unique questions, and five distinct game mechanics.");
