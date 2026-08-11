"use client";

import { useEffect, useMemo, useState } from "react";
import { STAGES, stageIndex, gameQuestion, type CurriculumQuestion as Question } from "./curriculum";
import {generateQuizQuestion,type QuizQuestion} from "./quizEngine";
import {assessmentLessonCount,assessmentPhaseLabel,lessonPhase,lessonVocabulary,lessonStepVocabulary,VOCABULARY_TARGETS} from "./vocabulary";
import {maldivianLessonStory} from "./storyEngine";
import {wordVisual} from "./wordVisuals";

type Difficulty = "easy" | "medium" | "hard";
type Section = "home" | "lessons" | "quizzes" | "games" | "rewards" | "progress";
type Student = { name: string; grade: number; difficulty: Difficulty; avatar: number };
type Progress = { completed: string[]; stars: number; badges: number[]; streak: number };

const MASCOTS = ["dolphin", "turtle", "crab", "starfish", "coconut","dolphin", "turtle", "crab", "starfish", "coconut","dolphin", "turtle", "crab", "starfish", "coconut","dolphin", "turtle", "crab"];
const NAV: { id: Exclude<Section,"home">; label: string; icon: string }[] = [
  { id:"lessons",label:"Lessons",icon:"📚" },{ id:"quizzes",label:"Quizzes",icon:"❓" },{ id:"games",label:"Games",icon:"🎮" },{ id:"rewards",label:"Rewards",icon:"🏆" },{ id:"progress",label:"Progress",icon:"📈" },
];
const BADGES = ["Starfish Scholar","Dolphin Reader","Reef Explorer","Coconut Hero","Lagoon Champion","Coral Writer","Turtle Thinker","Palm Protector","Crab Collector","Seashell Genius","Wave Rider","Sunbeam Achiever","Reef Guardian","Ocean Adventurer","Island Innovator","Sandcastle Builder","Pearl Finder","Atoll Artist","Sea Breeze Master","OceanLearn Legend"];
const BADGE_SYMBOLS = ["⭐","🐬","🤿","🥥","🌴","🪸","🐢","🛡️","🦀","🐚","🏄","☀️","🌊","🐙","⛵","🏰","🦪","🎨","🪁","📖"];
const avatarPath=(index:number)=>`/assets/generated/student-avatars/avatar-${String(index%18+1).padStart(2,"0")}.png`;
const scrollTop=()=>window.scrollTo({top:0,left:0,behavior:"smooth"});

const LESSONS: Record<number,string[]> = {
  1:["Hello, My Name Is","Classroom Words","My Feelings","Short a Words","Short e Words","Short i Words","Short o Words","Short u Words","Sight Words 1","Sight Words 2","A and An","In, On and Under","Capital Letter and Full Stop","Picture Story: First and Then","Draw and Label My Island","I Can Read and Say"],
  2:["Talk in My Classroom","Follow Two Steps","Word Families: at, an and ap","Word Families: it, in and ip","Word Families: og, op and ot","Long Vowel Pairs","People and Places","My Island Day","Read a Picture Story","Beginning, Middle and End","Write a Short Recount","One and More Than One","Ask and Answer","Join Ideas with Because","Before and After","Growing Reader Review"],
  3:["Retell an Island Story","Describe People and Places","Write a Friendly Letter","Write a Diary Entry","Build a Clear Narrative","Read an Information Text","Poems, Rhyme and Rhythm","Write a Short Summary","Find the Main Idea","Use the Past Tense","Share Feelings and Opinions","Find a Story Message","Read Facts and Diagrams","Speak Clearly to a Group","Build a Short Paragraph","Grade 3 Reading Review"],
  4:["Follow a Fiction Series","Explore Mood and Tone","Write an Island Report","Explain How and Why","Solve Narrative Problems","Create Poetry and Imagery","Use Information Text Features","Compare Two Texts","Perform Reader’s Theatre","Choose Language for an Audience","Read Charts and Tables","Explain Cause and Effect","Navigate Headings and Diagrams","Link Ideas with Connectives","Compare Story Characters","Grade 4 Strategy Review"],
  5:["Write a Maldivian Memoir","Develop an Opinion","Understand Media Messages","Write and Perform a Play","Craft Poetry and Imagery","Research an Island Report","Write a Process Explanation","Shape a Strong Narrative","Join a Structured Discussion","Use Evidence to Infer","Explore Symbols in Stories","Explain Character Motivation","Build a Persuasive Case","Use Figurative Language","Reflect and Revise","Grade 5 Critical Reading Review"],
};
const FIRST_ENGLISH=["Letters A–E","Letters F–J","Letters K–O","Letters P–T","Letters U–Z","Hello & Goodbye","Yes & No","I, You & My Name","Please, Thank You & Help","Happy & Sad","Sit & Stand","Clap & Jump","Book & Pencil","Bag & Home","Water","My Family","Mum & Dad","Polite Words","Feeling Words","Action Words"];
type PracticeChoice={label:string;picture:string};
type FoundationActivity={prompt:string;choices:PracticeChoice[];answer:number;success:string};
type FoundationLesson={tier:1|2|3|4;title:string;outcome:string;focus:string[];story:string[];activities:FoundationActivity[]};
const LETTER_PICTURES:Record<string,[string,string]>={A:["🍎","apple"],B:["⚽","ball"],C:["🐱","cat"],D:["🐶","dog"],E:["🥚","egg"],F:["🐟","fish"],G:["🎁","gift"],H:["🏠","house"],I:["🏝️","island"],J:["🧃","juice"],K:["🔑","key"],L:["🦁","lion"],M:["🌙","moon"],N:["🪺","nest"],O:["🐙","octopus"],P:["🌴","palm"],Q:["👑","queen"],R:["🐇","rabbit"],S:["☀️","sun"],T:["🐢","turtle"],U:["☂️","umbrella"],V:["🚐","van"],W:["🌊","wave"],X:["🩻","x-ray"],Y:["🪀","yo-yo"],Z:["🦓","zebra"]};
const FIRST_100_WORDS=["a","I","am","an","and","are","at","away","big","blue","book","boy","can","cat","come","coconut","day","dhoni","do","down","eat","fish","for","friend","girl","go","good","happy","has","have","he","hello","help","here","home","in","is","island","it","jump","lagoon","like","little","look","me","my","name","no","not","on","one","palm","play","read","red","reef","run","said","sand","school","sea","see","she","sit","small","sun","the","this","to","two","up","walk","want","water","we","what","where","white","with","yes","you","your","bag","ball","bird","boat","crab","dog","family","food","house","kind","mother","pencil","shell","stand","teacher","tree","turtle","wave"];
function letterActivity(letters:string[],step:number):FoundationActivity{
 const target=letters[step%letters.length],other=letters[(step+1)%letters.length],third=letters[(step+2)%letters.length],[picture,word]=LETTER_PICTURES[target];
 const modes=[
  {prompt:`Tap uppercase ${target}.`,choices:[{label:target,picture:"🔠"},{label:target.toLowerCase(),picture:"🔡"},{label:other,picture:"🔠"}],answer:0,success:`This is uppercase ${target}.`},
  {prompt:`Match ${target} to its small letter.`,choices:[{label:other.toLowerCase(),picture:"🔡"},{label:target.toLowerCase(),picture:"🔡"},{label:third.toLowerCase(),picture:"🔡"}],answer:1,success:`${target} matches ${target.toLowerCase()}.`},
  {prompt:`Tap the picture for ${target}.`,choices:[{label:LETTER_PICTURES[other][1],picture:LETTER_PICTURES[other][0]},{label:word,picture},{label:LETTER_PICTURES[third][1],picture:LETTER_PICTURES[third][0]}],answer:1,success:`${target} is for ${word}.`},
  {prompt:`Find the ${target} pair.`,choices:[{label:`${other} ${other.toLowerCase()}`,picture:LETTER_PICTURES[other][0]},{label:`${third} ${third.toLowerCase()}`,picture:LETTER_PICTURES[third][0]},{label:`${target} ${target.toLowerCase()}`,picture}],answer:2,success:`${target} and ${target.toLowerCase()} are a pair.`},
  {prompt:`Which begins ${word}?`,choices:[{label:target,picture},{label:other,picture:LETTER_PICTURES[other][0]},{label:third,picture:LETTER_PICTURES[third][0]}],answer:0,success:`${word} begins with ${target}.`},
 ];return modes[step];
}
const FOUNDATION_FIRST_FIVE:Array<Omit<FoundationLesson,"activities">&{letters:string[]}>= [
 {tier:1,title:"Letters A–E",outcome:"I can name A, B, C, D and E.",focus:["A a","B b","C c","D d","E e"],letters:["A","B","C","D","E"],story:["A is for apple.","A cat and a dog see an egg.","The ball is big."]},
 {tier:1,title:"Letters F–J",outcome:"I can name F, G, H, I and J.",focus:["F f","G g","H h","I i","J j"],letters:["F","G","H","I","J"],story:["A fish is by the island.","I go home with a gift.","I have juice."]},
 {tier:1,title:"Letters K–O",outcome:"I can name K, L, M, N and O.",focus:["K k","L l","M m","N n","O o"],letters:["K","L","M","N","O"],story:["A lion looks at the moon.","An octopus is near a nest.","I have a key."]},
 {tier:1,title:"Letters P–T",outcome:"I can name P, Q, R, S and T.",focus:["P p","Q q","R r","S s","T t"],letters:["P","Q","R","S","T"],story:["The sun is by the palm.","A turtle sees a rabbit.","The queen is happy."]},
 {tier:1,title:"Letters U–Z",outcome:"I can name U, V, W, X, Y and Z.",focus:["U u","V v","W w","X x","Y y","Z z"],letters:["U","V","W","X","Y","Z"],story:["A wave is by the van.","I see a yo-yo and a zebra.","The umbrella is up."]},
];
const GRADE1_EASY_FIRST_FIVE:FoundationLesson[]=FOUNDATION_FIRST_FIVE.map(item=>({...item,activities:Array.from({length:5},(_,step)=>letterActivity(item.letters,step))}));
const GRADE1_EASY_PATH={tiers:[{id:1,name:"Alphabet Awareness",lessons:[1,2,3,4,5]},{id:2,name:"Oral Language & Social Words",lessons:[6,7,8,9,10]},{id:3,name:"Listen, Look & Move",lessons:[11,12,13,14,15]},{id:4,name:"Family, Feelings & Review",lessons:[16,17,18,19,20]}],lexicon:FIRST_100_WORDS.slice(0,50),masteryTarget:50,firstFive:GRADE1_EASY_FIRST_FIVE};
const ADVANCED_G5=["Synthesise Island Sources","Use Nuance and Precise Words","Explore Rhetorical Appeals","Judge Source Credibility","Corroborate Evidence","Interpret Ambiguity","Compare Connotation and Denotation","Recognise Irony","Notice Foreshadowing","Compare Multiple Perspectives","Build Cohesion Across Paragraphs","Develop a Clear Thesis","Qualify a Claim","Evaluate Evidence","Use Formal Register and Citations","Create an Independent Critical Response"];
const lessonsForStage=(stage:number)=>stage===0?FIRST_ENGLISH:stage===6?ADVANCED_G5:LESSONS[STAGES[stage].grade];

const SKILLS = ["Listen","Look","Say","Do","Check"];
const FOUNDATION_SKILLS = ["Listen","Look","Say","Move","Celebrate"];
const GAME_META = [
  {name:"Word Match",art:"🐬",props:"🐚  A B C",description:"Match each word with its meaning."},
  {name:"Spelling Bee",art:"🐝",props:"B E E",description:"Choose the correctly spelled word."},
  {name:"Reading Race",art:"🐢",props:"📖  💨",description:"Read the clue and find the answer."},
  {name:"Story Builder",art:"⭐",props:"📚  ✨",description:"Choose what happens next in the story."},
  {name:"Grammar Hero",art:"🦀",props:"✏️  🛡️",description:"Repair sentences and save the reef."},
];
const FOUNDATION_GAME_META = [
  {name:"Picture Match",art:"🐬",props:"🖼️  🐚",description:"Listen and tap the matching picture."},
  {name:"Sound Splash",art:"🐳",props:"👂  💦",description:"Hear a sound and choose what starts with it."},
  {name:"Letter Lagoon",art:"🐢",props:"A B C",description:"Find matching letters and pictures."},
  {name:"Rhyme Reef",art:"⭐",props:"👏  🎵",description:"Listen for words that sound alike."},
  {name:"Action Adventure",art:"🦀",props:"👋  🏃",description:"Follow one simple action at a time."},
];
const WORDS = [
  ["sun","a bright star in our sky"],["reef","rocks and coral beneath the sea"],["kind","helpful and caring"],["journey","a trip from one place to another"],["predict","say what may happen next"],["enormous","very large"],["whisper","speak very quietly"],["habitat","a place where an animal lives"],["evidence","details that support an idea"],["persuade","help someone agree with you"],
];

const blankProgress: Progress = {completed:[],stars:0,badges:[],streak:1};
const curriculumStage=(student:Student)=>stageIndex(student.grade,student.difficulty);
const effectiveGrade = (student: Student) => STAGES[curriculumStage(student)].grade;

const QUIZ_WORDS = [
  ["island","land surrounded by water","The green island rests in the lagoon."],
  ["gentle","soft and careful","The gentle wave touched the sand."],
  ["observe","look closely","We observe the turtle near the reef."],
  ["sequence","put events in order","First, next and finally show a sequence."],
  ["describe","tell what something is like","Describe the bright coral with clear details."],
  ["habitat","a living thing’s natural home","The reef is a fish’s habitat."],
  ["predict","say what may happen next","Dark clouds help us predict rain."],
  ["compare","notice how things are alike and different","Compare the dolphin and the turtle."],
  ["summary","the most important ideas in a short form","Her summary tells the story in three sentences."],
  ["evidence","a detail that supports an answer","The wet sand is evidence that a wave came."],
  ["mood","the feeling created by a text","Soft moonlight creates a peaceful mood."],
  ["audience","the people who read, watch or listen","The speaker chose words for a young audience."],
  ["contrast","show an important difference","However can signal a contrast."],
  ["infer","use clues to understand an unstated idea","We infer that the crab is hiding because it looks afraid."],
  ["imagery","words that make a picture in the mind","Silver waves is bright imagery."],
  ["persuade","help someone agree using reasons","The poster tries to persuade us to protect turtles."],
  ["symbol","an object that represents a bigger idea","A sunrise can be a symbol of hope."],
  ["reflect","think carefully about an experience","In a memoir, writers reflect on an important day."],
  ["motivation","the reason a character acts","Kindness is the character’s motivation for helping."],
  ["viewpoint","the position from which an idea is understood","Two characters can have a different viewpoint."],
];

function makeQuestion(grade:number,set:number,pos:number):Question {
  const [word,meaning,example]=QUIZ_WORDS[(set+(grade-1)*3)%QUIZ_WORDS.length];
  const tier=set<7?"Easy":set<14?"Medium":"Hard";
  const wrongA=QUIZ_WORDS[(set+7)%20][1], wrongB=QUIZ_WORDS[(set+13)%20][1];
  const items:Question[]=[
    {prompt:`${tier} Set ${set+1}: What does “${word}” mean?`,options:[meaning,wrongA,wrongB],answer:0,explanation:`“${word}” means ${meaning}.`},
    {prompt:`${tier} Set ${set+1}: Which sentence uses “${word}” clearly?`,options:[example,`The ${word} quickly blue.`,`We ${word} because.`],answer:0,explanation:`This complete sentence shows the meaning of “${word}” in context.`},
    {prompt:`${tier} Set ${set+1}: Which clue best helps a reader understand “${word}”?`,options:[`It means ${meaning}.`,`It is always a number.`,`It has no meaning.`],answer:0,explanation:"A useful context clue explains the unfamiliar word."},
    {prompt:`${tier} Set ${set+1}: Complete the idea: “Today we will learn to ___ ${word}.”`,options:["understand and use","forget every","hide the"],answer:0,explanation:"Learners understand a word and then use it in meaningful speech or writing."},
    {prompt:`${tier} Set ${set+1}: Which answer proves you understand “${word}”?`,options:[`I can explain that it means ${meaning}.`,`I can copy it without reading.`,`I can skip every clue.`],answer:0,explanation:"Explaining a word in your own words shows real understanding."},
  ];
  return rotateQuestion(items[pos],set*5+pos+grade);
}

function rotateQuestion(question:Question,seed:number):Question{
  const order=[[0,1,2],[1,2,0],[2,0,1]][seed%3];
  return {...question,options:order.map(i=>question.options[i]),answer:order.indexOf(question.answer)};
}

function lessonDetail(topic:string,grade:number,step:number){
  const focus=topic.toLowerCase();
  const simple=grade===1?"Use a short sentence and say it slowly.":grade===2?"Use a complete sentence and add one describing word.":grade===3?"Connect two clear ideas and explain why.":grade===4?"Organise details and support the main idea.":"Explain, analyse and support your thinking with evidence.";
  const sections=[
    {title:"Meet the idea",paragraphs:[`${topic} helps us use English for a real purpose. We will listen first, say the important words, read a clear example, and then create an idea of our own.`,simple,`By the end, you should be able to explain ${focus} to another learner.`],examples:[`Say the topic aloud: “${topic}.”`,`Name one thing you already know about it.`,`Listen for the first and last sounds in the important words.`],practice:`Tell an island friend one thing you expect to learn about ${focus}.`,answer:`A good answer is one clear sentence connected to ${focus}.`},
    {title:"Build understanding",paragraphs:[`A strong learner asks: Who or what is this about? What is happening? Which detail is most important?`,`For ${focus}, begin with the main idea. Add details one at a time so the listener or reader can follow.`,simple],examples:[`Main idea first: “This is about ${focus}.”`,`Add a detail with because, and, first or next.`,`Check that every word helps the meaning.`],practice:`Choose a main idea for ${focus}, then add one useful detail.`,answer:`The detail should explain, describe or support the main idea.`},
    {title:"Study clear examples",paragraphs:[`Examples show us how English works. Read each one slowly and notice the word order, capital letter and punctuation.`,`Ask what makes the example easy to understand. Then cover it and try to say the idea in your own words.`,simple],examples:[`“I am learning about ${focus}.”`,`“First, I notice the main idea. Next, I add a detail.”`,`“My answer is clear because I checked every word.”`],practice:`Improve this unfinished idea: “${topic} is…”`,answer:`Finish it with a meaningful detail and correct punctuation.`},
    {title:"Practise together",paragraphs:[`Now we use the skill. Say your answer before writing it. This helps you hear missing or mixed-up words.`,`Point to or imagine each word as you speak. Add detail only when the first sentence is clear.`,simple],examples:[`Think: What do I want to say?`,`Say: Speak the complete sentence.`,`Check: Does it match ${focus}?`],practice:`Create two connected sentences about ${focus}. Use “and”, “because”, “next” or “however” when it suits your grade.`,answer:`Sentence one gives the main idea. Sentence two adds a connected detail.`},
    {title:"Show and reflect",paragraphs:[`You are ready to show what you know. Explain the topic without copying the examples.`,`A strong final answer is clear, connected to the topic and checked carefully. Mistakes are clues that help us learn.`,simple],examples:[`I can explain ${focus}.`,`I can give an example.`,`I can check and improve my work.`],practice:`Teach the key idea from ${topic} to your ocean buddy in your own words.`,answer:`If your buddy can understand the main idea and one example, you have met the goal.`},
  ]; return sections[step];
}

const LEVEL2_SCENES=["Aminath waves by the jetty.","Hassan opens his school bag.","Mariyam smiles at her friend.","Ali sees a cat on a mat.","Shifa sees a hen by a pen.","Nihan sees a pig with a big grin.","Reema sees a dog hop by a log.","Zayan has fun in the sun.","Aisha points to a word card.","Ibrahim says, “I can!”","An apple sits by an egg.","A shell is under a chair.","A capital letter starts the line.","First the crab waves. Then it sits.","A child labels a palm and sea.","A dolphin looks at a little book."];
function level2LessonDetail(topic:string,index:number,step:number){
 const words=lessonVocabulary(1,index,16),word=words[step%words.length],visual=wordVisual(word),scene=LEVEL2_SCENES[index];
 const sections=[
  {title:"Hear and say",paragraphs:[`🔊 Listen: ${words.join(", ")}.`,`Say: ${word}.`],examples:["Listen.",`Say ${word}.`,"Tap the picture."],practice:`Say ${word}.`,answer:`Great! ${word}.`},
  {title:"Look and match",paragraphs:[`Look at ${visual.icon}.`,`Tap ${word}.`],examples:[`${visual.icon} ${word}.`,`Point to ${word}.`,`Say ${word}.`],practice:`Find ${word}.`,answer:`${visual.icon} is ${word}.`},
  {title:"Read with a picture",paragraphs:[scene,`Find: ${word}.`],examples:[scene,`${visual.icon} ${word}.`,"Read slowly."],practice:`Read: ${word}.`,answer:`You read ${word}.`},
  {title:"Draw and label",paragraphs:[`Draw ${visual.icon}.`,`Label it: ${word}.`],examples:["Draw.",`Write ${word}.`,"Show your picture."],practice:`Draw and label ${word}.`,answer:`Picture + ${word}.`},
  {title:"Check and celebrate",paragraphs:[`Look. Say. Read: ${word}.`],examples:[`I can say ${word}.`,`I can find ${word}.`,`I can read ${word}.`],practice:`Show ${word} to your ocean buddy.`,answer:"Star work! ⭐"},
 ];return sections[step];
}

const LEVEL3_SCENES=["Aminath asks for a blue pencil.","Hassan opens his book, then draws a fish.","A cat in a hat naps on a mat.","A pig with a big grin sits by a bin.","A dog hops on top of a log.","A goat in a boat sees the moon.","Mariyam meets her neighbour by the harbour.","Ali eats breakfast before he walks to school.","A crab borrows a hat and walks sideways.","First the turtle wakes. Next it races. Last it naps.","We visited the beach and found a tiny shell.","One fish swims. Three fish swim.","Shifa asks, “Where is my bag?” Hassan answers, “On the chair.”","I smile because the dolphin splashes me.","Wash your hands before lunch. Read after lunch.","Nihan reads a short island story to his turtle." ];
function level3LessonDetail(topic:string,index:number,step:number){
 const words=lessonVocabulary(2,index,16),word=words[step%words.length],visual=wordVisual(word),scene=LEVEL3_SCENES[index];
 const sections=[
  {title:"Listen, read and say",paragraphs:[`Listen to: ${words.join(", ")}.`,scene],examples:[`${visual.icon} ${word}`,"Read the short line.","Say it clearly."],practice:`Read and say: ${word}.`,answer:`You said ${word}.`},
  {title:"Match word and picture",paragraphs:[`Look at ${visual.icon}.`,`${word}: ${visual.meaning}.`],examples:[`${visual.icon} ${word}.`,`Point to the matching picture.`,`Use ${word} in a short line.`],practice:`Match ${word} to ${visual.icon}.`,answer:`${visual.icon} matches ${word}.`},
  {title:"Read a short scene",paragraphs:[scene,`Find the word “${word}”.`],examples:[scene,`Circle ${word}.`,`Tell who or what the line is about.`],practice:`Read the scene, then say ${word}.`,answer:`The focus word is ${word}.`},
  {title:"Build a sentence",paragraphs:[`Use ${word} in one complete sentence.`,`Start with a capital. End with a full stop.`],examples:[scene,`I can use ${word}.`,`Check the word order.`],practice:`Write one sentence with ${word}.`,answer:`A clear answer uses ${word}, a capital and a full stop.`},
  {title:"Read, check and share",paragraphs:[scene,"Read it again. Check each word."],examples:["Read aloud.","Answer in one sentence.","Share with your ocean buddy."],practice:`Tell what you learned about ${topic.toLowerCase()}.`,answer:"Clear reading and one connected answer earn a star. ⭐"},
 ];return sections[step];
}

const LEVEL4_SCENES=["Aminath retells how a crab rode in her toy dhoni.","Hassan describes a bright reef and a sleepy green turtle.","Mariyam writes a friendly letter to her cousin on another island.","Ali writes that a gecko ate one crumb from his picnic.","Shifa’s story has a lost paddle, a helpful dolphin and a safe return.","Nihan reads facts about turtles and studies a labelled diagram.","Reema claps the rhythm while a heron honks at the rhyming word.","Zayan tells the important events in three short sentences.","Aisha finds that caring for the lagoon is the main idea.","Ibrahim walked to the harbour and watched a dhoni leave.","Aminath thinks the tiny crab is brave because it helps a turtle.","Hassan learns that sharing is the message of the coconut story.","Mariyam uses a caption and diagram to explain a palm tree.","Ali looks at the group, speaks slowly and uses a clear voice.","Shifa writes one topic sentence and two useful details.","Nihan reads, checks and shares his favourite island text." ];
function level4LessonDetail(topic:string,index:number,step:number){
 const words=lessonVocabulary(3,index,16),word=words[step%words.length],visual=wordVisual(word),scene=LEVEL4_SCENES[index];
 const sections=[
  {title:"Meet the skill",paragraphs:[scene,`Today’s focus is ${word}.`],examples:[`${visual.icon} ${word}: ${visual.meaning}.`,`Read the scene aloud.`,`Say the focus in your own words.`],practice:`Explain ${word} in one clear sentence.`,answer:`A clear answer connects ${word} to the scene.`},
  {title:"Read and notice",paragraphs:[scene,"Look for who, where, what happened and the important detail."],examples:["Who or what is this about?","Which detail helps most?",`Where does ${word} appear?`],practice:"Point to the most useful detail in the scene.",answer:"The useful detail directly supports the focus."},
  {title:"Study an example",paragraphs:[`${visual.icon} ${visual.picture}.`,scene],examples:[`Focus word: ${word}.`,`Meaning: ${visual.meaning}.`,`Example: ${scene}`],practice:`Write a new short example using ${word}.`,answer:`Use ${word} accurately in a complete sentence.`},
  {title:"Create and practise",paragraphs:[`Plan one idea about ${topic.toLowerCase()}.`,`Add one or two connected details.`],examples:["Plan the main idea.","Say the sentences aloud.","Write and check capitals and punctuation."],practice:`Create two or three connected sentences about ${topic.toLowerCase()}.`,answer:"The sentences stay on one idea and follow a clear order."},
  {title:"Read, check and reflect",paragraphs:[scene,"Check meaning, order, spelling and punctuation."],examples:["I used the focus skill.","I added a useful detail.","I checked my work."],practice:`Share your best sentence about ${topic.toLowerCase()}.`,answer:"A clear, accurate and connected response earns a star. ⭐"},
 ];return sections[step];
}

const LEVEL5_SCENES=["Aminath follows the same mischievous crab through three island stories.","Hassan notices that moonlight and quiet waves create a calm mood.","Mariyam organises reef facts under clear report headings.","Ali explains how rainwater travels from a roof into a tank.","Shifa’s character loses a paddle, tries two ideas and accepts help.","Nihan writes, “The lagoon shines like a silver mirror.”","Reema uses headings, captions and a glossary to find turtle facts.","Zayan compares a funny dhoni story with a serious rescue report.","Aisha performs a crab’s line so dramatically that the class giggles.","Ibrahim chooses friendly words for younger island readers.","Aminath reads a table showing rainfall on three islands.","Hassan explains that strong wind caused the kite to race away.","Mariyam uses a diagram and subheadings to locate coconut facts.","Ali joins two ideas with however, because and therefore.","Shifa compares a patient turtle with an impatient heron.","Nihan chooses the best strategy for each new island text." ];
function level5LessonDetail(topic:string,index:number,step:number){
 const words=lessonVocabulary(4,index,16),word=words[step%words.length],visual=wordVisual(word),scene=LEVEL5_SCENES[index];
 const sections=[
  {title:"Explore the strategy",paragraphs:[scene,`The focus strategy is ${word}: ${visual.meaning}.`],examples:[`${visual.icon} ${word}.`,`Read the scene for meaning.`,`Explain why the strategy helps.`],practice:`Explain how ${word} works in the scene.`,answer:`Connect ${word} to one accurate detail.`},
  {title:"Read and investigate",paragraphs:[scene,"Notice the writer’s purpose, organisation and useful evidence."],examples:["What is the main idea?","Which feature guides the reader?","Which detail supports your answer?"],practice:"Choose one detail and explain what it shows.",answer:"A strong answer names the detail and explains its job."},
  {title:"Compare examples",paragraphs:[`${visual.icon} ${visual.picture}.`,"Compare the clear example with a weak or unrelated one."],examples:[scene,`A clear use of ${word} supports meaning.`,`An unrelated detail does not help ${word}.`],practice:`Create a new example of ${word}.`,answer:`The new example is accurate, complete and connected.`},
  {title:"Create with the strategy",paragraphs:[`Plan a short response about ${topic.toLowerCase()}.`,`Organise the main idea and supporting details before writing.`],examples:["Plan purpose and audience.","Choose useful text features or connectives.","Write, read aloud and revise."],practice:`Write a short organised response using ${word}.`,answer:"The response has a clear purpose, logical order and useful details."},
  {title:"Evaluate and improve",paragraphs:[scene,"Check accuracy, clarity, organisation and effect on the reader."],examples:["I used the strategy accurately.","I supported my idea.","I improved one weak part."],practice:`Explain one improvement you made to your ${topic.toLowerCase()} work.`,answer:"A thoughtful improvement and a clear reason earn a star. ⭐"},
 ];return sections[step];
}

const LEVEL6_SCENES=["Aminath recalls her first dhoni trip and explains why it mattered.","Hassan argues that every beach needs a labelled recycling area.","Mariyam checks how words and pictures shape a turtle-rescue poster.","Ali writes a play where a crab demands a coconut as its theatre ticket.","Shifa describes moonlit waves as silver ribbons across the lagoon.","Nihan gathers reliable facts for a report about island fruit bats.","Reema explains how coconut husks become useful garden compost.","Zayan builds tension when his story character loses sight of the jetty.","Aisha listens to another viewpoint before answering in a reef-club discussion.","Ibrahim uses wet footprints to infer that the cheeky heron visited first.","Aminath explains why an open shell symbolises trust in her story.","Hassan links the turtle’s brave choice to its wish to protect a friend.","Mariyam supports her clean-lagoon claim with reasons and evidence.","Ali writes that the wind whispered while the palms danced.","Shifa revises a confusing paragraph and reflects on what improved.","Nihan combines Grade 5 strategies to explain a new island text." ];
function level6LessonDetail(topic:string,index:number,step:number){
 const words=lessonVocabulary(5,index,16),word=words[step%words.length],visual=wordVisual(word),scene=LEVEL6_SCENES[index];
 const sections=[
  {title:"Investigate the concept",paragraphs:[scene,`Focus: ${word} — ${visual.meaning}.`],examples:[`${visual.icon} ${word}.`,`Identify the writer’s purpose.`,`Connect the concept to a precise detail.`],practice:`Explain how ${word} works in the scene.`,answer:`Name ${word}, quote or paraphrase a detail, and explain the connection.`},
  {title:"Read critically",paragraphs:[scene,"Consider viewpoint, purpose, evidence and the effect of language choices."],examples:["What does the text state?","What can a careful reader infer?","Which detail makes that inference reasonable?"],practice:"Write one supported inference or interpretation.",answer:"A strong response combines a sensible idea with direct textual evidence."},
  {title:"Analyse examples",paragraphs:[`${visual.icon} ${visual.picture}.`,"Compare an effective example with one that lacks evidence or clear purpose."],examples:[scene,`Effective ${word} is accurate and purposeful.`,`Weak ${word} is vague, unsupported or unrelated.`],practice:`Evaluate the example of ${word} and suggest one improvement.`,answer:"Explain both the strength or weakness and the reason for your judgement."},
  {title:"Compose with purpose",paragraphs:[`Plan a focused response about ${topic.toLowerCase()}.`,`Choose structure and language for the intended reader or listener.`],examples:["State the purpose or central idea.","Develop it with organised evidence and explanation.","Revise language for clarity and effect."],practice:`Compose an organised response that demonstrates ${word}.`,answer:"The response sustains its purpose, uses relevant support and has a clear ending."},
  {title:"Evaluate and reflect",paragraphs:[scene,"Review content, organisation, language, evidence and audience impact."],examples:["I justified my interpretation.","I selected relevant evidence.","I revised a specific weakness."],practice:`Explain which revision most improved your ${topic.toLowerCase()} response and why.`,answer:"A precise reflection supported by an example earns a star. ⭐"},
 ];return sections[step];
}

const LEVEL7_SCENES=["Aminath combines a reef guide, a fisher’s interview and a map to explain lagoon care.","Hassan chooses “glided” instead of “went” to show how quietly the dhoni moved.","Mariyam uses trust, feeling and logic in a speech about protecting turtles.","Ali checks the author, date and evidence before trusting an online island article.","Shifa compares two reports and a photograph to confirm the beach-cleaning result.","Nihan debates whether the final shell is a gift or a clue because the ending is ambiguous.","Reema explains why “home” feels warm while its dictionary meaning remains a place to live.","Zayan notices the irony when the loudest crab wins a silent-reading prize.","Aisha spots dark clouds early in the story and predicts the later rainstorm.","Ibrahim compares a fisher’s, visitor’s and turtle volunteer’s perspectives on the lagoon.","Aminath links paragraphs with clear transitions and well-chosen references.","Hassan develops a thesis about why island gardens benefit the whole community.","Mariyam adds “often” to qualify a claim that would otherwise sound absolute.","Ali evaluates whether each piece of evidence is relevant, sufficient and reliable.","Shifa uses a formal register and cites the source of her reef facts.","Nihan synthesises evidence and writes an independent response to an unfamiliar island text." ];
function level7LessonDetail(topic:string,index:number,step:number){
 const words=lessonVocabulary(6,index,16),word=words[step%words.length],visual=wordVisual(word),scene=LEVEL7_SCENES[index];
 const sections=[
  {title:"Define and contextualise",paragraphs:[scene,`Extension concept: ${word} — ${visual.meaning}.`],examples:[`${visual.icon} ${word}.`,`Clarify the concept in context.`,`Distinguish it from a related concept.`],practice:`Define ${word} and connect it to the Maldivian example.`,answer:`Give an accurate definition and explain one precise connection to the scene.`},
  {title:"Analyse critically",paragraphs:[scene,"Examine purpose, perspective, assumptions, language and the quality of supporting evidence."],examples:["What is explicitly stated?","What is implied or open to interpretation?","How credible and sufficient is the support?"],practice:`Write a supported critical observation about ${word}.`,answer:"A strong observation states a judgement, cites relevant evidence and explains the reasoning."},
  {title:"Compare and evaluate",paragraphs:[`${visual.icon} ${visual.picture}.`,"Compare competing explanations or sources before deciding which is stronger."],examples:[scene,`Effective ${word} is precise and evidence-based.`,`Weak ${word} ignores context, limitations or alternative views.`],practice:`Evaluate two possible uses of ${word} and justify the stronger one.`,answer:"Apply clear criteria and acknowledge an important limitation or alternative."},
  {title:"Construct an extended response",paragraphs:[`Plan a focused argument or interpretation about ${topic.toLowerCase()}.`,`Organise claims, evidence, explanation, transitions and a reasoned conclusion.`],examples:["State a defensible central position.","Develop connected paragraphs with cited support.","Address nuance, limitations or another perspective."],practice:`Compose an extended response demonstrating ${word}.`,answer:"The response is coherent, precise, supported and appropriately qualified."},
  {title:"Review with criteria",paragraphs:[scene,"Evaluate accuracy, depth, organisation, evidence, register and source acknowledgement."],examples:["I tested the credibility of my support.","I explained rather than listed evidence.","I refined overgeneralised or vague wording."],practice:`Identify the most important revision to your ${topic.toLowerCase()} response and justify it.`,answer:"A precise, criteria-based reflection supported by an example earns a star. ⭐"},
 ];return sections[step];
}

const FIRST_LESSON_CUES=[
 ["👂","English sounds","Listen. Say."],["🔤","A B C D","A. B. C. D."],["👋","Hello","Hello! Goodbye!"],["🏷️","My name","My name."],
 ["✅","Yes and no","Yes. No."],["🪑","Sit and stand","Sit. Stand."],["📘","Book and pencil","Book. Pencil."],["🎒","School bag","Bag."],
 ["🔴","Red and blue","Red. Blue."],["1️⃣","One and two","One. Two."],["🙋","I and you","I. You."],["👀","See and hear","See. Hear."],
 ["👏","Run and clap","Run. Clap."],["😊","Happy and sad","Happy. Sad."],["💬","Tiny sentence","I am happy."],["⭐","I know English","Hello! My name."],
];

function foundationLessonDetail(index:number,step:number){
 const [icon,focus,say]=FIRST_LESSON_CUES[index];
 const steps=[
  {title:"Look and hear",paragraphs:[`${icon} Look.`,`🔊 Hear: ${say}`],examples:["Tap Hear.","Look at the picture.",`Say: ${say}`],practice:`Say: ${say}`,answer:`Great! ${say}`},
  {title:"Say it",paragraphs:[`👄 Say: ${say}`,"Say it slowly."],examples:["Tap Hear.","Listen.","Say it two times."],practice:`Say ${focus}.`,answer:`Yes! ${say}`},
  {title:"Find it",paragraphs:[`${icon} Find: ${focus}`,"Point and say."],examples:["Look.",`Point to ${icon}.`,`Say: ${say}`],practice:`Find ${focus}.`,answer:`You found it! ${icon}`},
  {title:"Try it",paragraphs:["🎯 Your turn.",`${icon} ${say}`],examples:["Look.","Hear.","Say."],practice:`Look at ${icon}. Say: ${say}`,answer:`Well done! ${say}`},
  {title:"I did it!",paragraphs:["⭐ Look. Hear. Say.",`${icon} ${say}`],examples:["I looked.","I listened.","I said it."],practice:`Say ${say} one more time.`,answer:"You did it! ⭐"},
 ];
 return steps[step];
}

type VisualCue={picture:string;label:string;note:string};
const TOPIC_VISUALS:Array<[RegExp,VisualCue[]]>=[
 [/sound|rhyme|listen|speak/i,[{picture:"👂",label:"Listen",note:"Hear the sound"},{picture:"👄",label:"Say",note:"Copy the sound"},{picture:"👏",label:"Clap",note:"Clap the beat"}]],
 [/class|school|book|pencil|bag/i,[{picture:"📘",label:"Book",note:"Look and read"},{picture:"✏️",label:"Pencil",note:"Write and draw"},{picture:"🎒",label:"Bag",note:"School things"}]],
 [/family|people|character/i,[{picture:"👨‍👩‍👧",label:"People",note:"Who is here?"},{picture:"😊",label:"Feeling",note:"How do they feel?"},{picture:"💬",label:"Words",note:"What do they say?"}]],
 [/animal|habitat|reef/i,[{picture:"🐢",label:"Animal",note:"Name it"},{picture:"🌊",label:"Home",note:"Where does it live?"},{picture:"🥬",label:"Food",note:"What does it eat?"}]],
 [/colour|shape|imagery|describe/i,[{picture:"🔴",label:"Colour",note:"What colour?"},{picture:"🔵",label:"Shape",note:"What shape?"},{picture:"✨",label:"Detail",note:"What do you notice?"}]],
 [/food|healthy/i,[{picture:"🍌",label:"Food",note:"Name the food"},{picture:"💧",label:"Drink",note:"Choose water"},{picture:"💪",label:"Healthy",note:"Helps us grow"}]],
 [/weather|mood/i,[{picture:"☀️",label:"Sunny",note:"Bright and warm"},{picture:"🌧️",label:"Rainy",note:"Clouds and rain"},{picture:"🙂",label:"Mood",note:"How does it feel?"}]],
 [/transport|journey|sequence|recount/i,[{picture:"🛶",label:"Start",note:"First"},{picture:"➡️",label:"Travel",note:"Next"},{picture:"🏝️",label:"Finish",note:"Last"}]],
 [/story|narrative|diary|memoir/i,[{picture:"👤",label:"Character",note:"Who?"},{picture:"🏝️",label:"Setting",note:"Where?"},{picture:"🎯",label:"Event",note:"What happened?"}]],
 [/report|information|fact|source|evidence/i,[{picture:"🔎",label:"Look",note:"Find a fact"},{picture:"📄",label:"Source",note:"Where is it from?"},{picture:"✅",label:"Check",note:"Is it supported?"}]],
 [/compare|contrast|perspective/i,[{picture:"🐬",label:"One",note:"Notice details"},{picture:"↔️",label:"Compare",note:"Same or different?"},{picture:"🐢",label:"Two",note:"Notice details"}]],
 [/opinion|persuad|discussion|thesis|claim/i,[{picture:"💭",label:"Idea",note:"What do you think?"},{picture:"💡",label:"Reason",note:"Why?"},{picture:"📣",label:"Share",note:"Tell your reader"}]],
];
function lessonVisuals(topic:string,stage:number,index:number,step:number):VisualCue[]{
 if(stage===0){const [picture,label,say]=FIRST_LESSON_CUES[index];return [{picture,label,note:"Look"},{picture:"🔊",label:"Hear",note:say},{picture:"👄",label:"Say",note:say},{picture:"⭐",label:"You did it",note:"Great work!"}]}
 const found=TOPIC_VISUALS.find(([test])=>test.test(topic));
 const fallback=[["👀","Look"],["🧠","Think"],["💬","Share"],["✏️","Create"]];
 const cues=found?.[1]??fallback.map(([picture,label])=>({picture,label,note:`Step ${step+1}`}));
 return stage<=2?[...cues,{picture:"✋",label:"Your turn",note:"Point, say or tap"}]:cues;
}
const PICTURE_WORDS:Array<[RegExp,string]>=[[/apple/i,"🍎"],[/ball/i,"⚽"],[/cat/i,"🐱"],[/dog/i,"🐶"],[/hello|meet/i,"👋"],[/goodbye|leave/i,"🚪"],[/yes|correct|complete/i,"✅"],[/no|wrong|cannot/i,"❌"],[/book|read/i,"📘"],[/pencil|write/i,"✏️"],[/bag/i,"🎒"],[/red/i,"🔴"],[/blue|sea/i,"🔵"],[/one|first/i,"1️⃣"],[/two|second/i,"2️⃣"],[/sit|chair/i,"🪑"],[/stand|feet/i,"🧍"],[/fish/i,"🐟"],[/turtle/i,"🐢"],[/dolphin/i,"🐬"],[/crab/i,"🦀"],[/sun/i,"☀️"],[/rain|cloud/i,"🌧️"],[/family/i,"👨‍👩‍👧"],[/happy/i,"😊"],[/sad/i,"😢"],[/home|house/i,"🏠"],[/island/i,"🏝️"],[/journey|boat/i,"🛶"],[/food|eat/i,"🍌"],[/water|drink/i,"💧"],[/listen|sound|hear/i,"👂"],[/speak|say|word/i,"💬"],[/look|observe|see/i,"👀"],[/compare|contrast/i,"↔️"],[/idea|think|infer/i,"💡"],[/evidence|fact|source/i,"🔎"],[/story|character/i,"📖"],[/order|sequence|next/i,"➡️"],[/reason|because/i,"🧠"]];
function pictureFor(text:string,stage:number,index=0){
 const letter=LETTER_PICTURES[text.trim().toUpperCase()];if(letter)return letter[0];
 const alphabetPrompt=text.match(/\b(?:letter|uppercase|lowercase)\s+([A-Z])\b/i);if(alphabetPrompt)return `🔤 ${alphabetPrompt[1].toUpperCase()}`;
 const hit=PICTURE_WORDS.find(([test])=>test.test(text));if(hit)return hit[1];
 const semantic=wordVisual(text.trim());if(!semantic.picture.startsWith("the English word"))return semantic.icon;
 return stage<=1?["🐚","⭐","🌴","🐠"][index%4]:stage<=3?["🖼️","🧩","📝","🔤"][index%4]:["🔎","🧠","📊","🗂️"][index%4];
}
function cleanOptionText(text:string){return text.replace(/^[^A-Za-z0-9“]+\s*/u,"").trim()||text}

function speak(text:string){
 if(typeof window==="undefined"||!("speechSynthesis" in window))return;
 window.speechSynthesis.cancel();const voice=new SpeechSynthesisUtterance(text.replace(/[^ -~]/g," "));voice.lang="en-US";voice.rate=.72;window.speechSynthesis.speak(voice);
}
const DICTATION_SPEECH=[{age:5,normalRate:.68,slowRate:.30,pitch:1.06},{age:6,normalRate:.73,slowRate:.34,pitch:1.05},{age:7,normalRate:.78,slowRate:.38,pitch:1.04},{age:8,normalRate:.83,slowRate:.42,pitch:1.03},{age:9,normalRate:.88,slowRate:.46,pitch:1.02},{age:10,normalRate:.93,slowRate:.50,pitch:1.01},{age:11,normalRate:.98,slowRate:.54,pitch:1}];
const FEMALE_VOICE_NAMES=/female|zira|samantha|victoria|karen|hazel|susan|fiona|moira|tessa|sonia|libby|aria|ava|emma|jenny|salli|joanna/i;
function speakDictation(text:string,stage:number,slower=false){
 if(typeof window==="undefined"||!("speechSynthesis" in window))return;
 const profile=DICTATION_SPEECH[Math.min(6,Math.max(0,stage))],voices=window.speechSynthesis.getVoices(),female=voices.find(item=>/^en-GB/i.test(item.lang)&&FEMALE_VOICE_NAMES.test(item.name))??voices.find(item=>FEMALE_VOICE_NAMES.test(item.name))??voices.find(item=>/^en-GB/i.test(item.lang));window.speechSynthesis.cancel();const voice=new SpeechSynthesisUtterance(text.trim());voice.lang="en-GB";if(female)voice.voice=female;voice.rate=slower?profile.slowRate:profile.normalRate;voice.pitch=profile.pitch;voice.volume=1;window.speechSynthesis.speak(voice);
}

function DictationControls({text,stage}:{text:string;stage:number}){return <div className="dictation-speeds" aria-label="Dictation speed"><button className="dictation-player" onClick={()=>speakDictation(text,stage,false)}>🔊 Hear</button><button className="dictation-player slower" onClick={()=>speakDictation(text,stage,true)}>🐢 Hear slower</button></div>}

function makeGameQuestion(game:number,grade:number,level:number,pos:number):Question{
  const [word,meaning,example]=QUIZ_WORDS[(game*4+level+pos+grade)%QUIZ_WORDS.length];
  const tier=level<7?"Shell":level<14?"Reef":"Ocean";
  const unique=`${GAME_META[game].name} • ${tier} level ${level+1} • challenge ${pos+1}`;
  const wrong1=QUIZ_WORDS[(level+pos+6)%20][1],wrong2=QUIZ_WORDS[(level+pos+12)%20][1];
  const variants:Question[]=[
    {prompt:`${unique}: Match “${word}” to its meaning.`,options:[meaning,wrong1,wrong2],answer:0,explanation:`“${word}” means ${meaning}.`},
    {prompt:`${unique}: Choose the correctly built word.`,options:[word,word.slice(0,-1)+"ee",word+"h"],answer:0,explanation:`The correct spelling is “${word}”.`},
    {prompt:`${unique}: Read the clue—${meaning}. Which word fits?`,options:[word,QUIZ_WORDS[(level+3)%20][0],QUIZ_WORDS[(level+9)%20][0]],answer:0,explanation:`The clue describes “${word}”.`},
    {prompt:`${unique}: Which line should come next in this learning story?`,options:[example,"The idea suddenly disappears.","No words are needed."],answer:0,explanation:"The best next line stays connected to the topic and adds meaning."},
    {prompt:`${unique}: Repair the sentence about “${word}”.`,options:[example,`${word} the quickly.`,`Because ${word} and.`],answer:0,explanation:"A complete sentence uses meaningful word order and punctuation."},
  ]; return rotateQuestion(variants[game],game*100+level*5+pos+grade);
}

export default function OceanLearnApp(){
  const [student,setStudent]=useState<Student|null>(null); const [progress,setProgress]=useState<Progress>(blankProgress); const [section,setSection]=useState<Section>("home"); const [ready,setReady]=useState(false); const [toast,setToast]=useState(""); const [resetOpen,setResetOpen]=useState(false);
  useEffect(()=>{try{const s=localStorage.getItem("oceanlearn.student.v2"),p=localStorage.getItem("oceanlearn.progress.v2");if(s)setStudent(JSON.parse(s));if(p)setProgress({...blankProgress,...JSON.parse(p)});}catch{}setReady(true);if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js").catch(()=>{});},[]);
  useEffect(()=>{if(!ready)return;if(student)localStorage.setItem("oceanlearn.student.v2",JSON.stringify(student));localStorage.setItem("oceanlearn.progress.v2",JSON.stringify(progress));},[student,progress,ready]);
  useEffect(()=>{scrollTop()},[section]);
  const award=(id:string,stars=3)=>{if(progress.completed.includes(id)){show("You already found this treasure!");return;}const count=progress.completed.length+1;const badgeIndex=Math.min(19,Math.floor((count-1)/4));setProgress(p=>({...p,completed:[...p.completed,id],stars:p.stars+stars,badges:p.badges.includes(badgeIndex)?p.badges:[...p.badges,badgeIndex]}));show(`Brilliant! +${stars} stars`)};
  const show=(text:string)=>{setToast(text);setTimeout(()=>setToast(""),2500)};
  if(!ready)return <main className="loading"><div className="bubble-loader"/><p>Swimming to OceanLearn…</p></main>;
  if(!student)return <Onboarding onStart={setStudent}/>;
  const logout=()=>{localStorage.removeItem("oceanlearn.student.v2");setStudent(null);setSection("home")};
  return <div className="app-shell">
    <header className="top-dock"><button className="brand" onClick={()=>setSection("home")} aria-label="OceanLearn home"><img src="/assets/generated/dolphin.png" alt=""/><span>Ocean<span>Learn</span></span></button><div className="top-treasures"><span>⭐ <strong>{progress.stars}</strong></span><span>🏅 <strong>{progress.badges.length}</strong></span></div><div className="student-chip"><img src={avatarPath(student.avatar)} alt="Selected student avatar"/><div><strong>Hi, {student.name}</strong><small className="student-level" style={{display:"block"}}>G{student.grade} • {student.difficulty[0].toUpperCase()+student.difficulty.slice(1)}</small></div></div><div className="top-actions"><button className="home-action" onClick={()=>setSection("home")} aria-label="Go to home"><b aria-hidden="true">🏝️</b><span>Home</span></button><button onClick={()=>setResetOpen(true)} aria-label="Reset progress"><b aria-hidden="true">🫧</b><span>Reset</span></button><button onClick={logout} aria-label="Logout"><b aria-hidden="true">🚪</b><span>Logout</span></button></div></header>
    <main className="main-content">{section==="home"&&<Dashboard student={student} progress={progress} go={setSection}/>} {section==="lessons"&&<LessonLibrary student={student} progress={progress} award={award}/>} {section==="quizzes"&&<QuizLibrary student={student} progress={progress} award={award}/>} {section==="games"&&<GameLibrary student={student} progress={progress} award={award}/>} {section==="rewards"&&<Rewards progress={progress}/>} {section==="progress"&&<ProgressView student={student} progress={progress}/>}</main>
    <nav className="bottom-dock" aria-label="Main navigation">{NAV.map(n=><button key={n.id} className={section===n.id?"active":""} onClick={()=>setSection(n.id)}><span className="nav-icon" aria-hidden="true">{n.icon}</span><span>{n.label}</span></button>)}</nav>
    {resetOpen&&<PlayfulReset onCancel={()=>setResetOpen(false)} onReset={()=>{setProgress(blankProgress);setResetOpen(false);show("Splash! Your lagoon is sparkling clean!")}}/>}{toast&&<div className="toast" role="status">⭐ {toast}</div>}
  </div>;
}

function Onboarding({onStart}:{onStart:(s:Student)=>void}){const[name,setName]=useState("");const[grade,setGrade]=useState(1);const[difficulty,setDifficulty]=useState<Difficulty>("medium");const[avatar,setAvatar]=useState(0);return <main className="onboarding"><section className="welcome-card"><img className="welcome-art" src="/assets/lagoon.jpg" alt="A calm Maldivian learning lagoon"/><div className="welcome-form"><div className="eyebrow">WELCOME, EXPLORER!</div><h1>Your English adventure starts here</h1><p>Learn with stories, games and friendly island guides.</p><label>Your name<input value={name} maxLength={18} onChange={e=>setName(e.target.value)} placeholder="Type your name"/></label><fieldset><legend>Choose your grade</legend><div className="grade-row">{[1,2,3,4,5].map(g=><button type="button" className={grade===g?"selected":""} onClick={()=>setGrade(g)} key={g}><span>Grade</span> {g}</button>)}</div></fieldset><fieldset><legend>Choose your challenge</legend><div className="difficulty-row clean">{(["easy","medium","hard"] as Difficulty[]).map(d=><button type="button" className={difficulty===d?"selected":""} onClick={()=>setDifficulty(d)} key={d}><strong>{d[0].toUpperCase()+d.slice(1)}</strong></button>)}</div></fieldset><fieldset><legend>Choose your student avatar</legend><div className="avatar-row student-avatars">{Array.from({length:18},(_,i)=><button type="button" className={avatar===i?"selected":""} onClick={()=>setAvatar(i)} key={i} aria-label={`Student avatar ${i+1}`}><img src={avatarPath(i)} alt=""/></button>)}</div></fieldset><button className="primary-button" disabled={!name.trim()} onClick={()=>onStart({name:name.trim(),grade,difficulty,avatar})}>Dive in! →</button></div></section></main>}

function Dashboard({student,progress,go}:{student:Student;progress:Progress;go:(s:Section)=>void}){const grade=effectiveGrade(student);return <><section className="hero-panel"><div><div className="eyebrow">GRADE {student.grade} • {student.difficulty.toUpperCase()} CHALLENGE</div><h1><span className="dhivehi" lang="dv" dir="rtl">މަރުހަބާ</span>, {student.name}! <span>Hello!</span></h1><p>Today’s learning is tuned to Grade {grade} skills.</p><button className="primary-button compact" onClick={()=>go("lessons")}>Continue learning →</button></div><img className="hero-mascot" src={`/assets/generated/${MASCOTS[student.avatar]}.png`} alt="Your OceanLearn buddy"/></section><section className="stats-row"><article>🔥 <div><strong>{progress.streak}</strong><small>day streak</small></div></article><article>⭐ <div><strong>{progress.stars}</strong><small>stars earned</small></div></article><article>🏅 <div><strong>{progress.badges.length}</strong><small>badges found</small></div></article></section><div className="section-heading"><div><span className="eyebrow">YOUR NEXT ADVENTURE</span><h2>{LESSONS[grade][Math.min(progress.completed.length%16,15)]}</h2></div><button className="text-button" onClick={()=>go("lessons")}>See all lessons →</button></div><section className="featured-grid"><article className="featured-card"><img src="/assets/reef.jpg" alt="A colourful Maldivian reef"/><div><span className="pill">5 PART LESSON</span><h3>Learn one step at a time</h3><p>Discover, learn, see examples, practise, then check your skill.</p><button onClick={()=>go("lessons")}>Open lessons</button></div></article><article className="mascot-note"><img src="/assets/generated/dolphin.png" alt="Dolphin guide"/><div><span className="eyebrow">DOLPHIN’S TIP</span><h3>Say it out loud!</h3><p>Reading aloud helps new words stick in your memory.</p></div></article></section></>}

function LessonLibrary({student,progress,award}:{student:Student;progress:Progress;award:(id:string,n?:number)=>void}){
 const stage=curriculumStage(student),lessons=lessonsForStage(stage);const[lesson,setLesson]=useState<number|null>(null);
 const finish=()=>{if(lesson===null)return;award(`lesson-${stage}-${lesson}`,5);setLesson(lesson<lessons.length-1?lesson+1:null)};
 return <section><PageTitle eyebrow={STAGES[stage].label.toUpperCase()} title="Learning Lagoon" text={`${lessons.length} lessons form three progressive phases in a ${VOCABULARY_TARGETS[stage]}-word mastery path. ${STAGES[stage].support}.`}/>{lesson===null?<div className="lesson-phases">{[1,2,3].map(phase=><section className={`lesson-phase phase-${phase}`} key={phase}><header><span>PHASE {phase}</span><h2>{phase===1?"Start":phase===2?"Grow":"Master"}</h2></header><div className="curriculum-grid">{lessons.map((name,i)=>({name,i})).filter(item=>lessonPhase(stage,item.i)===phase).map(({name,i})=>{const done=progress.completed.includes(`lesson-${stage}-${i}`),words=lessonVocabulary(stage,i,lessons.length);return <button className="curriculum-card" key={name} onClick={()=>setLesson(i)}><span>{done?"✓":i+1}</span><div><small>PHASE {phase} • {SKILLS[i%5]}</small><strong>{name}</strong><em>5 sub-lessons • {words.length} focus words</em></div></button>})}</div></section>)}</div>:<LessonPlayer stage={stage} index={lesson} onBack={()=>setLesson(null)} onComplete={finish}/>}</section>
}

function InlinePractice({activity,onSolved}:{activity:FoundationActivity;onSolved:()=>void}){
 const[choice,setChoice]=useState<number|null>(null);const solved=choice===activity.answer;
 const choose=(i:number)=>{setChoice(i);if(i===activity.answer)onSolved()};
 return <section className="inline-practice" aria-labelledby="practice-title"><span className="eyebrow">TRY IT NOW</span><h3 id="practice-title">{activity.prompt}</h3><div>{activity.choices.map((item,i)=><button key={`${item.label}-${i}`} className={choice===i?(i===activity.answer?"correct":"wrong"):""} disabled={solved} onClick={()=>choose(i)}><span aria-hidden="true">{item.picture}</span><strong>{item.label}</strong></button>)}</div>{choice!==null&&<p className={solved?"practice-good":"practice-again"} role="status">{solved?`⭐ ${activity.success}`:"Try again. Look closely."}</p>}</section>
}

function VocabularyDeck({stage,lesson,step,lessonCount,onWordTap}:{stage:number;lesson:number;step:number;lessonCount:number;onWordTap?:()=>void}){
 const words=lessonStepVocabulary(stage,lesson,step,lessonCount);
 const knownMeanings=new Map(STAGES.flatMap(s=>s.words).map(([word,meaning])=>[word.toLowerCase(),meaning]));
 return <section className={`word-deck word-deck-stage-${stage}`} aria-labelledby="word-deck-title"><header><span aria-hidden="true">{stage===0?"👀":"🧠"}</span><div><strong id="word-deck-title">{stage===0?"Look • Tap • Say":"Focus words"}</strong><small>{stage===0?"Tap the picture.":"Tap a picture to hear its word."}</small></div></header><div>{words.map(word=>{const visual=wordVisual(word,knownMeanings.get(word.toLowerCase()));return <button type="button" key={word} onClick={()=>{speak(word);onWordTap?.()}} aria-label={`Hear the word ${word}`}><span className="word-picture" aria-hidden="true">{visual.icon}</span><strong>{word}</strong><small>{visual.picture}</small>{stage>0&&<p><b>Meaning:</b> {visual.meaning}</p>}<em>🔊 Tap</em></button>})}</div></section>;
}

function LessonPlayer({stage,index,onBack,onComplete}:{stage:number;index:number;onBack:()=>void;onComplete:()=>void}){
  const grade=STAGES[stage].grade;const[step,setStep]=useState(0); const[answerOpen,setAnswerOpen]=useState(false);const[practiceDone,setPracticeDone]=useState(false); const topic=lessonsForStage(stage)[index];const story=maldivianLessonStory(stage,index,step,topic);const originalFoundation=stage===0?GRADE1_EASY_PATH.firstFive[index]:undefined;const foundation=originalFoundation?{...originalFoundation,story}:undefined;const beginnerWords=lessonStepVocabulary(stage,index,step,lessonsForStage(stage).length);const detail=stage===0?{title:["Look","Hear","Say","Tap","Check"][step],paragraphs:[],examples:[],practice:"",answer:""}:stage===1?level2LessonDetail(topic,index,step):stage===2?level3LessonDetail(topic,index,step):stage===3?level4LessonDetail(topic,index,step):stage===4?level5LessonDetail(topic,index,step):stage===5?level6LessonDetail(topic,index,step):level7LessonDetail(topic,index,step);detail.paragraphs=stage===0?[]:stage===1?detail.paragraphs:detail.paragraphs;
  useEffect(()=>{setStep(0);setAnswerOpen(false);setPracticeDone(false)},[index]);
  useEffect(()=>{setPracticeDone(false)},[step]);
  useEffect(()=>{scrollTop()},[index,step]);
  const move=(next:number)=>{setStep(next);setAnswerOpen(false)};
  const speech=stage===0
   ? beginnerWords.join(". ")
   : [detail.title,...beginnerWords,...detail.examples,detail.practice].filter(Boolean).join(". ");
  return <article className="lesson-player"><button className="back-button" onClick={onBack}>← All lessons</button><div className="lesson-player-head"><img src={`/assets/generated/teach-${MASCOTS[index%5]}.png`} alt="Lesson guide in a teaching pose"/><div><span className="eyebrow">LESSON {index+1} • SUB-LESSON {step+1} OF 5</span><h1>{topic}</h1><p>{foundation?`TIER ${foundation.tier} • ALPHABET FOUNDATIONS`:SKILLS[step]}</p></div></div><div className="step-dots">{SKILLS.map((s,i)=><button key={s} className={i===step?"current":i<step?"finished":""} onClick={()=>move(i)}><span>{i<step?"✓":i+1}</span><small>{s}</small></button>)}</div><div className={`lesson-explanation ${stage===0?"foundation-step":""}`}><div className={`self-guide ${stage===0?"beginner-guide":""}`} aria-label="Learning steps">{stage===0?<><span>1 👀 Look</span><span>2 👆 Tap</span><span>3 👄 Say</span></>:<><span>1 👀 Look</span><span>2 🔊 Hear</span><span>3 👄 Say</span><span>4 👆 Do</span><span>5 ⭐ Check</span></>}</div><button className="hear-button" onClick={()=>speak(speech)}>🔊 Hear this step</button><span className="pill">{SKILLS[step]}</span><h2>{detail.title}</h2><VocabularyDeck stage={stage} lesson={index} step={step} lessonCount={lessonsForStage(stage).length} onWordTap={stage===0?()=>setPracticeDone(true):undefined}/>{detail.paragraphs.map((p,i)=><p key={i}>{p}</p>)}{stage===0?(practiceDone?<p className="practice-good" role="status">⭐ Great! Say it again.</p>:<p className="beginner-ready">👆 Tap the picture.</p>):<><div className={`lesson-examples picture-examples stage-${stage}`}><strong>{stage===0?"Look and do":"Picture examples"}</strong><div>{detail.examples.map((x,i)=><article key={x}><span aria-hidden="true">{pictureFor(`${topic} ${x}`,stage,i)}</span><p>{x}</p></article>)}</div></div><div className="guided-practice"><strong>{stage===0?"Your turn":"Guided practice"}</strong><p>{detail.practice}</p><button onClick={()=>setAnswerOpen(!answerOpen)}>{answerOpen?"Hide answer":"Check my try"}</button>{answerOpen&&<p className="practice-answer">💡 {detail.answer}</p>}</div></>}</div><div className="lesson-controls"><button onClick={()=>move(Math.max(0,step-1))} disabled={step===0}>← Previous</button>{step<4?<button className="primary-button compact" disabled={stage===0&&!practiceDone} onClick={()=>move(step+1)}>{stage===0&&!practiceDone?"Solve the activity first":"Next sub-lesson →"}</button>:<button className="primary-button compact" disabled={stage===0&&!practiceDone} onClick={onComplete}>{stage===0&&!practiceDone?"Solve the activity first":"Finish & go to next lesson →"}</button>}</div></article>}

function QuizLibrary({student,progress,award}:{student:Student;progress:Progress;award:(id:string,n?:number)=>void}){
 const stage=curriculumStage(student);const[set,setSet]=useState<number|null>(null);
 return <section><PageTitle eyebrow={STAGES[stage].label.toUpperCase()} title="Quiz Cove" text="Twenty cumulative quiz levels: Phase 1, then Phases 1–2, then the complete curriculum."/>{set===null?<div className="level-grid">{Array.from({length:20},(_,i)=><button key={i} className={progress.completed.includes(`quiz-${stage}-${i}`)?"level done":"level"} onClick={()=>setSet(i)}><strong>{i+1}</strong><span>Quiz level</span><small>{assessmentPhaseLabel(i)} • {assessmentLessonCount(stage,i)} lessons</small></button>)}</div>:<QuizPlayer grade={student.grade} stage={stage} set={set} onBack={()=>setSet(null)} onComplete={()=>award(`quiz-${stage}-${set}`,8)}/>}</section>
}

function QuestionPrompt({prompt}:{prompt:string}){
 const[question,hint]=prompt.split("\n💡 Hint: ");const[open,setOpen]=useState(false);
 return <div className="question-prompt"><h2>{question}</h2>{hint&&<><button type="button" className="hint-toggle" aria-expanded={open} onClick={()=>setOpen(!open)}>💡 {open?"Hide hint":"Show hint"}</button>{open&&<p className="hint-panel" role="status">🐚 {hint}</p>}</>}</div>;
}

function QuizPlayer({grade,stage,set,onBack,onComplete}:{grade:number;stage:number;set:number;onBack:()=>void;onComplete:()=>void}){
 const[pos,setPos]=useState(0);const[choice,setChoice]=useState<number|null>(null);const[typed,setTyped]=useState("");const[checked,setChecked]=useState(false);const[correct,setCorrect]=useState(false);const[score,setScore]=useState(0);const[salt]=useState(()=>Math.floor(Math.random()*2**31));const q:QuizQuestion=generateQuizQuestion(stage,set,pos,salt,grade);
 useEffect(()=>{scrollTop()},[set,pos]);
 const hasOptions=q.options.length>0;const ready=hasOptions?choice!==null:typed.trim().length>0;
 const check=()=>{if(!ready)return;const isCorrect=hasOptions?choice===q.answer:(q.acceptedAnswers??[]).some(a=>a.toLocaleLowerCase().trim()===typed.toLocaleLowerCase().trim().replace(/[.!?]$/g,""));setCorrect(isCorrect);setChecked(true);if(isCorrect)setScore(s=>s+1)};
 const next=()=>{if(pos===4){onComplete();onBack()}else{setPos(pos+1);setChoice(null);setTyped("");setChecked(false);setCorrect(false)}};
 const label=q.type==="dictation"?"🎧 Dictation":q.type==="fill-blank"?"✏️ Fill in the blank":q.type==="reading-comprehension"?"📖 Reading comprehension":"🔘 Multiple choice";
 return <article className="quiz-player"><button className="back-button" onClick={onBack}>← Quiz sets</button><div className="quiz-status"><span>Set {set+1}</span><strong>Question {pos+1} of 5</strong><span>Score {score}</span></div><span className="question-type">{label}</span>{q.passage&&<section className="quiz-passage"><strong>Read this island story</strong><p>{q.passage}</p></section>}{q.type==="dictation"?<DictationControls text={q.audioText??""} stage={stage}/>:<div className={`question-picture stage-${stage}`}><span>{pictureFor(q.passage??q.prompt,stage,pos)}</span><small>{q.type==="reading-comprehension"?"Story picture":"Look at the picture"}</small></div>}<QuestionPrompt key={q.token} prompt={q.prompt}/>{hasOptions?<div className="options picture-options">{q.options.map((o,i)=><button key={`${q.token}-${i}`} disabled={checked} className={`${choice===i?"chosen":""} ${checked&&i===q.answer?"correct":""} ${checked&&choice===i&&i!==q.answer?"wrong":""}`} onClick={()=>setChoice(i)}><span>{String.fromCharCode(65+i)}</span><i aria-hidden="true">{pictureFor(o,stage,i)}</i><b>{cleanOptionText(o)}</b></button>)}</div>:<label className="typed-answer"><span>{q.type==="dictation"?"Type what you hear":"Complete the blank"}</span><input value={typed} disabled={checked} onChange={e=>setTyped(e.target.value)} placeholder={q.placeholder} autoCapitalize="none"/></label>}{checked&&<div className={correct?"feedback success":"feedback try"}><strong>{correct?"Fin-tastic!":"Good try!"}</strong><p>{q.explanation}</p></div>}<button className="primary-button compact" disabled={!ready} onClick={checked?next:check}>{checked?(pos===4?"Finish quiz":"Next question →"):"Check answer"}</button></article>
}

function GameLibrary({student,progress,award}:{student:Student;progress:Progress;award:(id:string,n?:number)=>void}){
  const[game,setGame]=useState<number|null>(null);const[level,setLevel]=useState<number|null>(null);const stage=curriculumStage(student);const grade=STAGES[stage].grade;const gameMeta=stage===0?FOUNDATION_GAME_META:GAME_META;
  useEffect(()=>{scrollTop()},[game,level]);
  if(game!==null&&level!==null)return <GamePlayer key={`${game}-${stage}-${level}`} game={game} level={level} stage={stage} onBack={()=>setLevel(null)} onWin={()=>award(`game-${game}-${stage}-${level}`,8)} onNext={()=>setLevel(level<19?level+1:null)}/>;
  if(game!==null)return <section><button className="back-button" onClick={()=>setGame(null)}>← All games</button><PageTitle eyebrow={`20 PLAYABLE LEVELS • ${STAGES[stage].label.toUpperCase()}`} title={gameMeta[game].name} text={`${gameMeta[game].description} Each level adds more lesson phases.`}/><div className="level-grid">{Array.from({length:20},(_,i)=><button key={i} className={progress.completed.includes(`game-${game}-${stage}-${i}`)?"level done":"level"} onClick={()=>setLevel(i)}><strong>{i+1}</strong><span>Level</span><small>{assessmentPhaseLabel(i)} • {assessmentLessonCount(stage,i)} lessons</small></button>)}</div></section>;
  return <section><PageTitle eyebrow={`GRADE ${grade} • PLAY TO LEARN`} title="Game Reef" text="Five real games, twenty levels each, and five questions per level."/><div className="game-grid">{gameMeta.map((g,i)=><button className={`game-card game-${i+1}`} key={g.name} onClick={()=>setGame(i)}><div className="game-cover" aria-hidden="true"><span>{g.art}</span><b>{g.props}</b><i>〰️</i></div><div><span className="pill">20 × 5 QUESTIONS</span><h3>{g.name}</h3><p>{g.description}</p><strong>Choose levels →</strong></div></button>)}</div></section>
}

function GamePlayer({game,level,stage,onBack,onWin,onNext}:{game:number;level:number;stage:number;onBack:()=>void;onWin:()=>void;onNext:()=>void}){
  const[pos,setPos]=useState(0);const[choice,setChoice]=useState<number|null>(null);const[checked,setChecked]=useState(false);const[score,setScore]=useState(0);const[streak,setStreak]=useState(0);const[salt]=useState(()=>Math.floor(Math.random()*2**31));const q=gameQuestion(game,stage,level,pos,salt);
  useEffect(()=>{scrollTop()},[level,pos]);
  useEffect(()=>{setChoice(null);setChecked(false)},[q.token]);
  useEffect(()=>{if(q.audioText)speakDictation(q.audioText,stage)},[q.token,q.audioText,stage]);
  useEffect(()=>{if(!checked||pos===4)return;const timer=window.setTimeout(()=>{setPos(p=>p+1);setChoice(null);setChecked(false)},1250);return()=>window.clearTimeout(timer)},[checked,pos]);
  const choose=(i:number)=>{if(checked)return;setChoice(i);setChecked(true);if(i===q.answer){setScore(s=>s+1);setStreak(s=>s+1)}else setStreak(0)};
  const retry=()=>{setPos(0);setChoice(null);setChecked(false);setScore(0);setStreak(0);scrollTop()};
  const icons=[["🐚","🫧","💎"],["🔤","🐝","✨"],["🏁","🐢","⚡"],["🧩","📖","🌟"],["🛠️","🦀","🛡️"]][game];
  return <section className={`game-stage play-mode mode-${game}`}><button className="back-button" onClick={onBack}>← Levels</button><div className="game-stage-head"><div><span className="eyebrow">{GAME_META[game].name.toUpperCase()} • {level<7?"FOUNDATION":level<14?"APPLICATION":"CHALLENGE"}</span><h1>Level {level+1}</h1><p>{STAGES[stage].label} • Mission {pos+1} of 5</p></div></div><article className="game-question"><div className="game-hud"><span>❤️❤️❤️</span><strong>🔥 Combo {streak}</strong><span>⭐ {score}</span></div><div className="level-meter"><span style={{width:`${(pos+1)*20}%`}}/></div><div className="game-scene" aria-hidden="true"><span>{icons[0]}</span><b>{pictureFor(q.prompt,stage,pos)}</b><i>{icons[2]}</i></div><QuestionPrompt key={q.token} prompt={q.prompt}/>{q.audioText&&<DictationControls text={q.audioText} stage={stage}/>}<p className="game-instruction">Tap one picture. It moves by itself!</p><div className="game-options">{q.options.map((o,i)=><button key={`${q.token}-${i}`} className={`${choice===i?"chosen":""} ${checked&&i===q.answer?"correct":""} ${checked&&choice===i&&i!==q.answer?"wrong":""}`} disabled={checked} onClick={()=>choose(i)}><span>{pictureFor(o,stage,i)}</span><b>{o}</b></button>)}</div>{checked&&<div className={choice===q.answer?"feedback success":"feedback try"}><strong>{choice===q.answer?"Yes! Great move!":"Oops! Try the next one."}</strong><p>{q.explanation}</p></div>}{pos<4&&<p className="auto-next-note" aria-live="polite">{checked?"Next puzzle…":"Tap an answer."}</p>}{pos===4&&checked&&(score>=3?<div className="game-finish"><strong>Level passed! Score {score}/5</strong><button className="primary-button compact" onClick={()=>{onWin();onNext()}}>{level<19?"Sail to next level →":"Back to levels"}</button></div>:<div className="game-finish fail"><strong>Almost! Score {score}/5</strong><p>Find 3 treasures to pass.</p><button className="primary-button compact" onClick={retry}>Try this level again ↻</button></div>)}</article></section>
}

function Rewards({progress}:{progress:Progress}){return <section><PageTitle eyebrow="20 INDIVIDUAL TREASURES" title="Badge Island" text="Every badge is a complete circular treasure made for OceanLearn."/><div className="badge-grid full">{BADGES.map((name,i)=>{const unlocked=progress.badges.includes(i);return <article className={unlocked?"unlocked":"locked"} key={name}><div className={`badge-disc badge-tone-${i%5}`}><span aria-hidden="true">{BADGE_SYMBOLS[i]}</span><small>{i+1}</small></div><h3>{name}</h3><p>{unlocked?"Unlocked—wonderful work!":`Complete ${i*4+1} activities to unlock.`}</p></article>})}</div></section>}

function ProgressView({student,progress}:{student:Student;progress:Progress}){const stage=curriculumStage(student),percent=Math.min(100,Math.round(progress.completed.length/80*100));return <section><PageTitle eyebrow={STAGES[stage].label.toUpperCase()} title={`${student.name}’s progress`} text="Seven-step English path: Grade 1 Easy, Grade 1 Medium, Grades 2-5 Medium, then Grade 5 Hard."/><div className="stage-path">{STAGES.map((s,i)=><div key={s.label} className={i<stage?"passed":i===stage?"current":""}><span>{i<stage?"✓":i+1}</span><small>{s.label}</small></div>)}</div><div className="progress-layout"><article className="big-progress"><div className="progress-circle" style={{"--value":`${percent*3.6}deg`} as React.CSSProperties}><span><strong>{percent}%</strong><small>journey</small></span></div><div><h3>You’re making waves!</h3><p>{progress.completed.length} activities completed, {progress.stars} stars and {progress.badges.length} badges.</p></div></article><article className="skills-card"><h3>English skills</h3>{["Speaking & Listening","Reading & Viewing","Writing & Representing"].map((s,i)=><div className="skill" key={s}><div><span>{s}</span><strong>{Math.min(100,percent+i*4)}%</strong></div><div><span style={{width:`${Math.min(100,percent+i*4)}%`}}/></div></div>)}</article></div></section>}

function PlayfulReset({onCancel,onReset}:{onCancel:()=>void;onReset:()=>void}){return <div className="modal-backdrop" role="presentation"><section className="reset-modal" role="dialog" aria-modal="true" aria-labelledby="reset-title"><img src="/assets/generated/crab.png" alt="Funny crab holding up its claws"/><span className="eyebrow">UH-OH, BIG SPLASH!</span><h2 id="reset-title">Wash away all your treasure?</h2><p>The cheeky crab will clear your stars, badges and completed adventures. Your name and ocean buddy can stay.</p><div><button onClick={onCancel}>No, save my treasure!</button><button className="danger-fun" onClick={onReset}>Yes, make a splash 🌊</button></div></section></div>}
function PageTitle({eyebrow,title,text}:{eyebrow:string;title:string;text:string}){return <header className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></header>}



