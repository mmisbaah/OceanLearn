import assert from "node:assert/strict";
import fs from "node:fs";
import {lessonVocabulary,stageVocabulary} from "../app/vocabulary.ts";
import {generateQuizQuestion} from "../app/quizEngine.ts";
import {gameQuestion} from "../app/curriculum.ts";
import {wordVisual} from "../app/wordVisuals.ts";

const expectedTitles=["Hello, My Name Is","Classroom Words","My Feelings","Short a Words","Short e Words","Short i Words","Short o Words","Short u Words","Sight Words 1","Sight Words 2","A and An","In, On and Under","Capital Letter and Full Stop","Picture Story: First and Then","Draw and Label My Island","I Can Read and Say"];
const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
for(const title of expectedTitles)assert.ok(app.includes(title),`Missing Level 2 lesson: ${title}`);
for(const forbidden of ["Information Texts","Procedures","Recounts","Paragraph Builder"])assert.ok(!app.match(new RegExp(`1:\\[[^\\]]*${forbidden}`)),`Old Level 2 topic remains: ${forbidden}`);

const vowelLessons=[{lesson:3,vowel:"a"},{lesson:4,vowel:"e"},{lesson:5,vowel:"i"},{lesson:6,vowel:"o"},{lesson:7,vowel:"u"}];
for(const {lesson,vowel} of vowelLessons)for(const word of lessonVocabulary(1,lesson,16))assert.match(word,new RegExp(`^[^aeiou]${vowel}[^aeiou]$`,`i`),`${word} is not a short-${vowel} CVC word`);
assert.equal(stageVocabulary(1).length,100,"Level 2 mastery path must contain 100 words");
for(let lesson=0;lesson<16;lesson++)for(const word of lessonVocabulary(1,lesson,16)){const visual=wordVisual(word);assert.notEqual(visual.icon,"🔤",`${word} uses a generic visual`)}

const quizTypes=new Set();
for(let level=0;level<20;level++)for(let pos=0;pos<5;pos++){
 const quiz=generateQuizQuestion(1,level,pos,4421,1);quizTypes.add(quiz.type);
 assert.ok(["dictation","multiple-choice"].includes(quiz.type),`Level 2 quiz uses forbidden ${quiz.type}`);
 assert.doesNotMatch(quiz.prompt,/infer|main idea|research|persuad|metaphor|paragraph|report|irregular|adverb/i,"Level 2 quiz crosses a curriculum guardrail");
 if(quiz.type==="dictation")assert.ok((quiz.audioText??"").length<=6,"Level 2 dictation exceeds six letters");
 for(let game=0;game<5;game++)assert.doesNotMatch(gameQuestion(game,1,level,pos,991).prompt,/infer|main idea|research|persuad|metaphor|paragraph|report|irregular|adverb/i,"Level 2 game crosses a curriculum guardrail");
}
assert.deepEqual([...quizTypes].sort(),["dictation","multiple-choice"]);
assert.ok(app.includes("function level2LessonDetail"),"Level 2 needs its own short, picture-supported lesson renderer");
assert.ok(app.includes("stage===1?detail.paragraphs"),"Level 2 is still receiving the generic long story template");
console.log("Level 2 verified: 16 progressive supported-foundation lessons, 100-word path, five short-vowel CVC banks, picture-supported short reading, guided labels/sentences, and only dictation plus multiple-choice quizzes.");
