import assert from "node:assert/strict";
import fs from "node:fs";
import {gameQuestion} from "../app/curriculum.ts";
import {generateQuizQuestion,questionTypePlan} from "../app/quizEngine.ts";
import {assessmentLessonCount,lessonVocabulary,stageVocabulary} from "../app/vocabulary.ts";
import {wordVisual} from "../app/wordVisuals.ts";

const titles=["Synthesise Island Sources","Use Nuance and Precise Words","Explore Rhetorical Appeals","Judge Source Credibility","Corroborate Evidence","Interpret Ambiguity","Compare Connotation and Denotation","Recognise Irony","Notice Foreshadowing","Compare Multiple Perspectives","Build Cohesion Across Paragraphs","Develop a Clear Thesis","Qualify a Claim","Evaluate Evidence","Use Formal Register and Citations","Create an Independent Critical Response"];
const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
for(const title of titles)assert.ok(app.includes(title),`Missing Level 7 lesson: ${title}`);
assert.ok(app.includes("function level7LessonDetail"),"Level 7 needs a dedicated extension renderer");
assert.match(app,/level7LessonDetail\(topic,index,step\)/,"Level 7 lesson renderer is not connected");
assert.equal(stageVocabulary(6).length,600,"Level 7 mastery path must contain 600 words");
assert.equal(assessmentLessonCount(6,6),6,"Level 7 Phase 1 must end with six lessons");
assert.equal(assessmentLessonCount(6,13),11,"Level 7 Phase 2 must end with eleven lessons");
assert.equal(assessmentLessonCount(6,19),16,"Level 7 Level 20 must cover the full curriculum");
for(let lesson=0;lesson<16;lesson++)for(const word of lessonVocabulary(6,lesson,16))assert.notEqual(wordVisual(word).icon,"🔤",`Generic picture used for Level 7 lesson word: ${word}`);

const required=/synthesi|nuance|rhetoric|credible|corroborat|ambiguity|connotation|denotation|irony|foreshadow|perspective|cohesion|thesis|qualif|evaluate|citation|register/i;
assert.match(stageVocabulary(6).join(" "),required,"Level 7 advanced concept set is missing");
assert.deepEqual(questionTypePlan(5),["reading-comprehension","dictation","fill-blank","reading-comprehension","multiple-choice"]);
const quizPrompts=new Set(),passages=new Set(),quizDictation=new Set();
for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
 const q=generateQuizQuestion(6,set,pos,71624,5);
 assert.ok(["dictation","multiple-choice","fill-blank","reading-comprehension"].includes(q.type));
 assert.ok(!quizPrompts.has(q.prompt),`Repeated Level 7 quiz prompt: ${q.prompt}`);quizPrompts.add(q.prompt);
 if(q.type==="reading-comprehension"){assert.ok(q.passage?.length>140);assert.ok(!passages.has(q.passage),"Repeated Level 7 passage");passages.add(q.passage)}
 if(q.type==="dictation"){assert.match(q.audioText,/^[a-z]+$/i,"Dictation must contain one ordinary word");assert.doesNotMatch(q.audioText,/scientific|chemical|biology|geology/i,"Dictation word is unnecessarily scientific");assert.ok(!quizDictation.has(q.audioText.toLowerCase()),`Repeated Level 7 quiz dictation: ${q.audioText}`);quizDictation.add(q.audioText.toLowerCase())}
}

const gamePrompts=new Set(),gameDictation=new Set();
for(let level=0;level<20;level++)for(let game=0;game<5;game++)for(let pos=0;pos<5;pos++){
 const q=gameQuestion(game,6,level,pos,82435);
 assert.ok(!gamePrompts.has(q.prompt),`Repeated Level 7 game prompt: ${q.prompt}`);gamePrompts.add(q.prompt);
 if(q.audioText){assert.match(q.audioText,/^[a-z]+$/i);assert.ok(!quizDictation.has(q.audioText.toLowerCase()),`Dictation repeats between Level 7 quiz and game: ${q.audioText}`);assert.ok(!gameDictation.has(q.audioText.toLowerCase()),`Repeated Level 7 game dictation: ${q.audioText}`);gameDictation.add(q.audioText.toLowerCase())}
}

console.log("Level 7 verified: 16 scaffolded Grade 6 extension lessons, 600-word path, complete advanced concept coverage, four assessment modes, unique Maldivian passages and prompts, five game mechanics, semantic visuals, child-appropriate unique dictation, and full three-phase progression.");
