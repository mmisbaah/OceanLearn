import {MASTER_VOCABULARY,VOCABULARY_TARGETS,stageVocabulary,lessonVocabulary,quizVocabulary} from "../app/vocabulary.ts";
if(MASTER_VOCABULARY.length<600)throw new Error("Vocabulary bank has fewer than 600 words");
for(let stage=0;stage<7;stage++){
 const words=stageVocabulary(stage),target=VOCABULARY_TARGETS[stage];
 if(words.length!==target||new Set(words.map(w=>w.toLowerCase())).size!==target)throw new Error(`Stage ${stage} does not contain ${target} unique words`);
 const lessonWords=Array.from({length:stage===0?20:16},(_,i)=>lessonVocabulary(stage,i,stage===0?20:16)).flat();
 if(stage===0&&(new Set(lessonWords.map(w=>w.toLowerCase())).size!==target))throw new Error("Grade 1 Easy lessons must teach all 50 foundation words");
 if(lessonWords.some(word=>!words.map(w=>w.toLowerCase()).includes(word.toLowerCase())))throw new Error(`Stage ${stage} lesson uses an out-of-level word`);
 const quizWords=Array.from({length:100},(_,i)=>quizVocabulary(stage,Math.floor(i/5),i%5));
 if(quizWords.some(word=>!words.includes(word)))throw new Error(`Stage ${stage} quiz uses an out-of-level word`);
}
const engine=(await import("node:fs")).readFileSync(new URL("../app/quizEngine.ts",import.meta.url),"utf8");
if(!engine.includes("const heard=quizVocabulary(stage,set,pos)")||engine.includes("Type the sentence"))throw new Error("Dictation is not restricted to vocabulary words");
console.log(JSON.stringify({targets:VOCABULARY_TARGETS,totalUnique:MASTER_VOCABULARY.length,dictation:"single words only",allocation:"shared by lessons and quizzes"},null,2));
