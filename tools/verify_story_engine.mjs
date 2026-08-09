import {maldivianLessonParagraphs,maldivianLessonStory,maldivianQuizPassage} from "../app/storyEngine.ts";
import assert from "node:assert/strict";

const islandWords=/island|lagoon|reef|beach|jetty|coconut|dhoni|palm|atoll|fish|coral|harbour/i;
const lessonStories=[];
for(let stage=0;stage<7;stage++){
 const count=stage===0?20:16;
 for(let lesson=0;lesson<count;lesson++)for(let step=0;step<5;step++){
  const story=maldivianLessonStory(stage,lesson,step,"English skill").join(" ");
  const paragraphs=maldivianLessonParagraphs(stage,lesson,step,"English skill").join(" ");
  assert.match(story,islandWords,`lesson story lacks Maldivian context: ${stage}/${lesson}/${step}`);
  assert.match(paragraphs,islandWords,`lesson prose lacks Maldivian context: ${stage}/${lesson}/${step}`);
  lessonStories.push(story);
 }
}
assert.equal(new Set(lessonStories).size,lessonStories.length,"a lesson story repeats");

const quizStories=[];
for(let stage=3;stage<7;stage++)for(let set=0;set<20;set++)for(const pos of [0,3]){
 const passage=maldivianQuizPassage(stage,set,pos,"headline","the title of a news story","The headline tells the main event.");
 assert.match(passage,islandWords,`quiz passage lacks Maldivian context: ${stage}/${set}/${pos}`);
 quizStories.push(passage);
}
assert.equal(new Set(quizStories).size,quizStories.length,"a quiz passage repeats");
assert.equal(new Set([...lessonStories,...quizStories]).size,lessonStories.length+quizStories.length,"a story repeats across modules");
console.log(`Story engine verified: ${lessonStories.length} unique lesson stories and ${quizStories.length} unique quiz passages.`);
