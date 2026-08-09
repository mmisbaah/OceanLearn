"use client";

import { useEffect, useMemo, useState } from "react";
import { STAGES, stageIndex, quizQuestion, gameQuestion, type CurriculumQuestion as Question } from "./curriculum";

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
  1:["Getting Started with English","My Classroom","My Family","Daily Routines","Animals Around Us","Colours & Shapes","Food","My School","Weather","Clothes","Transport","Community Helpers","Healthy Habits","Animals & Sounds","My Favourite Things","Term Review"],
  2:["Classroom Language","Describing People","Stories We Love","Information Texts","Procedures","Places Around Us","Animals & Habitats","My Day","Festivals","My Favourite Place","Recounts","Story Characters","Rhyming Poems","Sequencing Events","Paragraph Builder","Term Review"],
  3:["Story Retelling","Descriptive Writing","Letters","Diary Writing","Narratives","Information Texts","Poems & Rhyme","Summaries","Main Ideas","Past Tense","Feelings & Opinions","Themes & Morals","Facts and Diagrams","Speaking Clearly","Paragraph Organisation","Term Review"],
  4:["Fiction Series","Mood & Tone","Reports","Explanations","Narrative Problems","Poetry & Imagery","Text Features","Comparing Texts","Reader’s Theatre","Audience & Language","Charts & Tables","Cause and Effect","Headings & Diagrams","Advanced Connectives","Character Comparison","Term Review"],
  5:["Memoirs","Opinion Writing","Media Texts","Plays","Poetry & Imagery","Reports","Explanations","Narrative Writing","Structured Discussions","Evidence & Inference","Symbolism","Character Motivation","Persuasive Techniques","Figurative Language","Reflective Writing","Term Review"],
};
const FIRST_ENGLISH=["Meet English Sounds","A, B, C and D","Hello and Goodbye","My Name","Yes and No","Listen: Sit and Stand","My Book and Pencil","My School Bag","Red and Blue","One and Two","I and You","See and Hear","Move: Run and Clap","Happy and Sad","First Tiny Sentences","First English Celebration"];
const ADVANCED_G5=["Synthesising Sources","Nuance and Word Choice","Rhetorical Appeals","Source Credibility","Corroborating Evidence","Ambiguity in Literature","Connotation and Denotation","Irony and Expectation","Foreshadowing","Multiple Perspectives","Cohesion Across Paragraphs","Building a Thesis","Qualifying Claims","Evaluating Evidence","Formal Register and Citations","Independent Critical Response"];
const lessonsForStage=(stage:number)=>stage===0?FIRST_ENGLISH:stage===6?ADVANCED_G5:LESSONS[STAGES[stage].grade];

const SKILLS = ["Speak & Listen","Read & View","Write & Create","Word Power","Check & Reflect"];
const GAME_META = [
  {name:"Word Match",art:"🐬",props:"🐚  A B C",description:"Match each word with its meaning."},
  {name:"Spelling Bee",art:"🐝",props:"B E E",description:"Choose the correctly spelled word."},
  {name:"Reading Race",art:"🐢",props:"📖  💨",description:"Read the clue and find the answer."},
  {name:"Story Builder",art:"⭐",props:"📚  ✨",description:"Choose what happens next in the story."},
  {name:"Grammar Hero",art:"🦀",props:"✏️  🛡️",description:"Repair sentences and save the reef."},
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

function speak(text:string){
 if(typeof window==="undefined"||!("speechSynthesis" in window))return;
 window.speechSynthesis.cancel();const voice=new SpeechSynthesisUtterance(text.replace(/[^ -~]/g," "));voice.lang="en-US";voice.rate=.72;window.speechSynthesis.speak(voice);
}

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
    <header className="top-dock"><button className="brand" onClick={()=>setSection("home")} aria-label="OceanLearn home"><img src="/assets/generated/dolphin.png" alt=""/><span>Ocean<span>Learn</span></span></button><div className="top-treasures"><span>⭐ <strong>{progress.stars}</strong></span><span>🏅 <strong>{progress.badges.length}</strong></span></div><div className="student-chip"><img src={avatarPath(student.avatar)} alt="Selected student avatar"/><strong>Hi, {student.name}</strong></div><div className="top-actions"><button onClick={()=>setResetOpen(true)} aria-label="Reset progress"><b aria-hidden="true">🫧</b><span>Reset</span></button><button onClick={logout} aria-label="Logout"><b aria-hidden="true">🚪</b><span>Logout</span></button></div></header>
    <main className="main-content">{section==="home"&&<Dashboard student={student} progress={progress} go={setSection}/>} {section==="lessons"&&<LessonLibrary student={student} progress={progress} award={award}/>} {section==="quizzes"&&<QuizLibrary student={student} progress={progress} award={award}/>} {section==="games"&&<GameLibrary student={student} progress={progress} award={award}/>} {section==="rewards"&&<Rewards progress={progress}/>} {section==="progress"&&<ProgressView student={student} progress={progress}/>}</main>
    <nav className="bottom-dock" aria-label="Main navigation">{NAV.map(n=><button key={n.id} className={section===n.id?"active":""} onClick={()=>setSection(n.id)}><span className="nav-icon" aria-hidden="true">{n.icon}</span><span>{n.label}</span></button>)}</nav>
    {resetOpen&&<PlayfulReset onCancel={()=>setResetOpen(false)} onReset={()=>{setProgress(blankProgress);setResetOpen(false);show("Splash! Your lagoon is sparkling clean!")}}/>}{toast&&<div className="toast" role="status">⭐ {toast}</div>}
  </div>;
}

function Onboarding({onStart}:{onStart:(s:Student)=>void}){const[name,setName]=useState("");const[grade,setGrade]=useState(1);const[difficulty,setDifficulty]=useState<Difficulty>("medium");const[avatar,setAvatar]=useState(0);return <main className="onboarding"><section className="welcome-card"><img className="welcome-art" src="/assets/lagoon.jpg" alt="A calm Maldivian learning lagoon"/><div className="welcome-form"><div className="eyebrow">WELCOME, EXPLORER!</div><h1>Your English adventure starts here</h1><p>Learn with stories, games and friendly island guides.</p><label>Your name<input value={name} maxLength={18} onChange={e=>setName(e.target.value)} placeholder="Type your name"/></label><fieldset><legend>Choose your grade</legend><div className="grade-row">{[1,2,3,4,5].map(g=><button type="button" className={grade===g?"selected":""} onClick={()=>setGrade(g)} key={g}><span>Grade</span> {g}</button>)}</div></fieldset><fieldset><legend>Choose your challenge</legend><div className="difficulty-row">{(["easy","medium","hard"] as Difficulty[]).map(d=><button type="button" className={difficulty===d?"selected":""} onClick={()=>setDifficulty(d)} key={d}><strong>{d[0].toUpperCase()+d.slice(1)}</strong><small>{d==="easy"?(grade===1?"Gentle AI starter":"Previous grade"):d==="medium"?"Your grade":"Next grade"}</small></button>)}</div></fieldset><fieldset><legend>Choose your student avatar</legend><div className="avatar-row student-avatars">{Array.from({length:18},(_,i)=><button type="button" className={avatar===i?"selected":""} onClick={()=>setAvatar(i)} key={i} aria-label={`Student avatar ${i+1}`}><img src={avatarPath(i)} alt=""/></button>)}</div></fieldset><button className="primary-button" disabled={!name.trim()} onClick={()=>onStart({name:name.trim(),grade,difficulty,avatar})}>Dive in! →</button></div></section></main>}

function Dashboard({student,progress,go}:{student:Student;progress:Progress;go:(s:Section)=>void}){const grade=effectiveGrade(student);return <><section className="hero-panel"><div><div className="eyebrow">GRADE {student.grade} • {student.difficulty.toUpperCase()} CHALLENGE</div><h1><span className="dhivehi" lang="dv" dir="rtl">މަރުހަބާ</span>, {student.name}! <span>Hello!</span></h1><p>Today’s learning is tuned to Grade {grade} skills.</p><button className="primary-button compact" onClick={()=>go("lessons")}>Continue learning →</button></div><img className="hero-mascot" src={`/assets/generated/${MASCOTS[student.avatar]}.png`} alt="Your OceanLearn buddy"/></section><section className="stats-row"><article>🔥 <div><strong>{progress.streak}</strong><small>day streak</small></div></article><article>⭐ <div><strong>{progress.stars}</strong><small>stars earned</small></div></article><article>🏅 <div><strong>{progress.badges.length}</strong><small>badges found</small></div></article></section><div className="section-heading"><div><span className="eyebrow">YOUR NEXT ADVENTURE</span><h2>{LESSONS[grade][Math.min(progress.completed.length%16,15)]}</h2></div><button className="text-button" onClick={()=>go("lessons")}>See all lessons →</button></div><section className="featured-grid"><article className="featured-card"><img src="/assets/reef.jpg" alt="A colourful Maldivian reef"/><div><span className="pill">5 PART LESSON</span><h3>Learn one step at a time</h3><p>Discover, learn, see examples, practise, then check your skill.</p><button onClick={()=>go("lessons")}>Open lessons</button></div></article><article className="mascot-note"><img src="/assets/generated/dolphin.png" alt="Dolphin guide"/><div><span className="eyebrow">DOLPHIN’S TIP</span><h3>Say it out loud!</h3><p>Reading aloud helps new words stick in your memory.</p></div></article></section></>}

function LessonLibrary({student,progress,award}:{student:Student;progress:Progress;award:(id:string,n?:number)=>void}){
 const stage=curriculumStage(student),lessons=lessonsForStage(stage);const[lesson,setLesson]=useState<number|null>(null);
 const finish=()=>{if(lesson===null)return;award(`lesson-${stage}-${lesson}`,5);setLesson(lesson<lessons.length-1?lesson+1:null)};
 return <section><PageTitle eyebrow={STAGES[stage].label.toUpperCase()} title="Learning Lagoon" text={`Sixteen curriculum lessons with five guided steps. ${STAGES[stage].support}.`}/>{lesson===null?<div className="curriculum-grid">{lessons.map((name,i)=>{const done=progress.completed.includes(`lesson-${stage}-${i}`);return <button className="curriculum-card" key={name} onClick={()=>setLesson(i)}><span>{done?"✓":i+1}</span><div><small>{i<8?"TERM 1":"TERM 2"} • {SKILLS[i%5]}</small><strong>{name}</strong><em>5 sub-lessons</em></div></button>})}</div>:<LessonPlayer stage={stage} index={lesson} onBack={()=>setLesson(null)} onComplete={finish}/>}</section>
}

function LessonPlayer({stage,index,onBack,onComplete}:{stage:number;index:number;onBack:()=>void;onComplete:()=>void}){
  const grade=STAGES[stage].grade;const[step,setStep]=useState(0); const[answerOpen,setAnswerOpen]=useState(false); const topic=lessonsForStage(stage)[index]; const detail=stage===0?foundationLessonDetail(index,step):lessonDetail(topic,grade,step);
  useEffect(()=>{setStep(0);setAnswerOpen(false)},[index]);
  useEffect(()=>{scrollTop()},[index,step]);
  const move=(next:number)=>{setStep(next);setAnswerOpen(false)};
  const speech=[detail.title,...detail.paragraphs,...detail.examples,detail.practice].join(". ");const visuals=lessonVisuals(topic,stage,index,step);
  return <article className="lesson-player"><button className="back-button" onClick={onBack}>← All lessons</button><div className="lesson-player-head"><img src={`/assets/generated/teach-${MASCOTS[index%5]}.png`} alt="Lesson guide in a teaching pose"/><div><span className="eyebrow">LESSON {index+1} • SUB-LESSON {step+1} OF 5</span><h1>{topic}</h1><p>{SKILLS[step]}</p></div></div><div className="step-dots">{SKILLS.map((s,i)=><button key={s} className={i===step?"current":i<step?"finished":""} onClick={()=>move(i)}><span>{i<step?"✓":i+1}</span><small>{s}</small></button>)}</div><div className={`lesson-explanation ${stage===0?"foundation-step":""}`}><div className="self-guide" aria-label="Learning steps"><span>1 👀 Look</span><span>2 🔊 Hear</span><span>3 👄 Say</span><span>4 👆 Do</span><span>5 ⭐ Check</span></div><button className="hear-button" onClick={()=>speak(speech)}>🔊 Hear this step</button><span className="pill">{SKILLS[step]}</span><h2>{detail.title}</h2><section className={`visual-learning visual-stage-${stage}`} aria-label={`Picture guide for ${topic}`}><header><span>🖼️</span><div><strong>{stage===0?"Look at the pictures":"Visual learning map"}</strong><small>{stage<=1?"Point. Hear. Say.":stage<=3?"Use each picture to build the idea.":"Connect the visual clues to explain your thinking."}</small></div></header><div>{visuals.map((v,i)=><article key={`${v.label}-${i}`}><span className="visual-picture" aria-hidden="true">{v.picture}</span><strong>{v.label}</strong><small>{v.note}</small></article>)}</div></section>{detail.paragraphs.map((p,i)=><p key={i}>{p}</p>)}<div className="lesson-examples"><strong>{stage===0?"Do this":"Try these steps"}</strong><ol>{detail.examples.map(x=><li key={x}>{x}</li>)}</ol></div><div className="guided-practice"><strong>{stage===0?"Your turn":"Guided practice"}</strong><p>{detail.practice}</p><button onClick={()=>setAnswerOpen(!answerOpen)}>{answerOpen?"Hide answer":"Check my try"}</button>{answerOpen&&<p className="practice-answer">💡 {detail.answer}</p>}</div></div><div className="lesson-controls"><button onClick={()=>move(Math.max(0,step-1))} disabled={step===0}>← Previous</button>{step<4?<button className="primary-button compact" onClick={()=>move(step+1)}>Next sub-lesson →</button>:<button className="primary-button compact" onClick={onComplete}>Finish & go to next lesson →</button>}</div></article>}

function QuizLibrary({student,progress,award}:{student:Student;progress:Progress;award:(id:string,n?:number)=>void}){const stage=curriculumStage(student);const[set,setSet]=useState<number|null>(null);return <section><PageTitle eyebrow={STAGES[stage].label.toUpperCase()} title="Quiz Cove" text="Twenty curriculum checks with five unique questions in every set."/>{set===null?<div className="level-grid">{Array.from({length:20},(_,i)=><button key={i} className={progress.completed.includes(`quiz-${stage}-${i}`)?"level done":"level"} onClick={()=>setSet(i)}><strong>{i+1}</strong><span>Quiz set</span><small>{i<7?"Foundation":i<14?"Application":"Challenge"} • 5 questions</small></button>)}</div>:<QuizPlayer stage={stage} set={set} onBack={()=>setSet(null)} onComplete={()=>award(`quiz-${stage}-${set}`,8)}/>}</section>}

function QuizPlayer({stage,set,onBack,onComplete}:{stage:number;set:number;onBack:()=>void;onComplete:()=>void}){
  const[pos,setPos]=useState(0);const[choice,setChoice]=useState<number|null>(null);const[checked,setChecked]=useState(false);const[score,setScore]=useState(0);const[salt]=useState(()=>Math.floor(Math.random()*2**31));const q=quizQuestion(stage,set,pos,salt);
  useEffect(()=>{scrollTop()},[set,pos]);
  const choose=()=>{if(choice===null)return;setChecked(true);if(choice===q.answer)setScore(s=>s+1)};
  const next=()=>{if(pos===4){onComplete();onBack()}else{setPos(pos+1);setChoice(null);setChecked(false)}};
  return <article className="quiz-player"><button className="back-button" onClick={onBack}>← Quiz sets</button><div className="quiz-status"><span>Set {set+1}</span><strong>Question {pos+1} of 5</strong><span>Score {score}</span></div><h2>{q.prompt}</h2><div className="options">{q.options.map((o,i)=><button key={o} disabled={checked} className={`${choice===i?"chosen":""} ${checked&&i===q.answer?"correct":""} ${checked&&choice===i&&i!==q.answer?"wrong":""}`} onClick={()=>setChoice(i)}><span>{String.fromCharCode(65+i)}</span>{o}</button>)}</div>{checked&&<div className={choice===q.answer?"feedback success":"feedback try"}><strong>{choice===q.answer?"Fin-tastic!":"Good try!"}</strong><p>{q.explanation}</p></div>}<button className="primary-button compact" disabled={choice===null} onClick={checked?next:choose}>{checked?(pos===4?"Finish quiz":"Next question →"):"Check answer"}</button></article>
}

function GameLibrary({student,progress,award}:{student:Student;progress:Progress;award:(id:string,n?:number)=>void}){
  const[game,setGame]=useState<number|null>(null);const[level,setLevel]=useState<number|null>(null);const stage=curriculumStage(student);const grade=STAGES[stage].grade;
  useEffect(()=>{scrollTop()},[game,level]);
  if(game!==null&&level!==null)return <GamePlayer key={`${game}-${stage}-${level}`} game={game} level={level} stage={stage} onBack={()=>setLevel(null)} onWin={()=>award(`game-${game}-${stage}-${level}`,8)} onNext={()=>setLevel(level<19?level+1:null)}/>;
  if(game!==null)return <section><button className="back-button" onClick={()=>setGame(null)}>← All games</button><PageTitle eyebrow={`20 PLAYABLE LEVELS • ${STAGES[stage].label.toUpperCase()}`} title={GAME_META[game].name} text={GAME_META[game].description}/><div className="level-grid">{Array.from({length:20},(_,i)=><button key={i} className={progress.completed.includes(`game-${game}-${stage}-${i}`)?"level done":"level"} onClick={()=>setLevel(i)}><strong>{i+1}</strong><span>Level</span><small>{i<7?"Foundation":i<14?"Application":"Challenge"} • 5 missions</small></button>)}</div></section>;
  return <section><PageTitle eyebrow={`GRADE ${grade} • PLAY TO LEARN`} title="Game Reef" text="Five real games, twenty levels each, and five questions per level."/><div className="game-grid">{GAME_META.map((g,i)=><button className={`game-card game-${i+1}`} key={g.name} onClick={()=>setGame(i)}><div className="game-cover" aria-hidden="true"><span>{g.art}</span><b>{g.props}</b><i>〰️</i></div><div><span className="pill">20 × 5 QUESTIONS</span><h3>{g.name}</h3><p>{g.description}</p><strong>Choose levels →</strong></div></button>)}</div></section>
}

function GamePlayer({game,level,stage,onBack,onWin,onNext}:{game:number;level:number;stage:number;onBack:()=>void;onWin:()=>void;onNext:()=>void}){
  const[pos,setPos]=useState(0);const[choice,setChoice]=useState<number|null>(null);const[checked,setChecked]=useState(false);const[score,setScore]=useState(0);const[streak,setStreak]=useState(0);const[salt]=useState(()=>Math.floor(Math.random()*2**31));const q=gameQuestion(game,stage,level,pos,salt);
  useEffect(()=>{scrollTop()},[level,pos]);
  useEffect(()=>{if(!checked||pos===4)return;const timer=window.setTimeout(()=>{setPos(p=>p+1);setChoice(null);setChecked(false)},1250);return()=>window.clearTimeout(timer)},[checked,pos]);
  const choose=(i:number)=>{if(checked)return;setChoice(i);setChecked(true);if(i===q.answer){setScore(s=>s+1);setStreak(s=>s+1)}else setStreak(0)};
  const retry=()=>{setPos(0);setChoice(null);setChecked(false);setScore(0);setStreak(0);scrollTop()};
  const icons=[["🐚","🫧","💎"],["🔤","🐝","✨"],["🏁","🐢","⚡"],["🧩","📖","🌟"],["🛠️","🦀","🛡️"]][game];
  return <section className={`game-stage play-mode mode-${game}`}><button className="back-button" onClick={onBack}>← Levels</button><div className="game-stage-head"><div><span className="eyebrow">{GAME_META[game].name.toUpperCase()} • {level<7?"FOUNDATION":level<14?"APPLICATION":"CHALLENGE"}</span><h1>Level {level+1}</h1><p>{STAGES[stage].label} • Mission {pos+1} of 5</p></div></div><article className="game-question"><div className="game-hud"><span>❤️❤️❤️</span><strong>🔥 Combo {streak}</strong><span>⭐ {score}</span></div><div className="level-meter"><span style={{width:`${(pos+1)*20}%`}}/></div><div className="game-scene" aria-hidden="true"><span>{icons[0]}</span><b>{icons[1]}</b><i>{icons[2]}</i></div><h2>{q.prompt}</h2><p className="game-instruction">Tap one treasure. It moves by itself!</p><div className="game-options">{q.options.map((o,i)=><button key={o} className={`${choice===i?"chosen":""} ${checked&&i===q.answer?"correct":""} ${checked&&choice===i&&i!==q.answer?"wrong":""}`} disabled={checked} onClick={()=>choose(i)}><span>{["🫧","🐚","💎"][i]}</span><b>{o}</b></button>)}</div>{checked&&<div className={choice===q.answer?"feedback success":"feedback try"}><strong>{choice===q.answer?"Yes! Great move!":"Oops! Try the next one."}</strong><p>{q.explanation}</p></div>}{pos<4&&<p className="auto-next-note" aria-live="polite">{checked?"Next puzzle…":"Tap an answer."}</p>}{pos===4&&checked&&(score>=3?<div className="game-finish"><strong>Level passed! Score {score}/5</strong><button className="primary-button compact" onClick={()=>{onWin();onNext()}}>{level<19?"Sail to next level →":"Back to levels"}</button></div>:<div className="game-finish fail"><strong>Almost! Score {score}/5</strong><p>Find 3 treasures to pass.</p><button className="primary-button compact" onClick={retry}>Try this level again ↻</button></div>)}</article></section>
}

function Rewards({progress}:{progress:Progress}){return <section><PageTitle eyebrow="20 INDIVIDUAL TREASURES" title="Badge Island" text="Every badge is a complete circular treasure made for OceanLearn."/><div className="badge-grid full">{BADGES.map((name,i)=>{const unlocked=progress.badges.includes(i);return <article className={unlocked?"unlocked":"locked"} key={name}><div className={`badge-disc badge-tone-${i%5}`}><span aria-hidden="true">{BADGE_SYMBOLS[i]}</span><small>{i+1}</small></div><h3>{name}</h3><p>{unlocked?"Unlocked—wonderful work!":`Complete ${i*4+1} activities to unlock.`}</p></article>})}</div></section>}

function ProgressView({student,progress}:{student:Student;progress:Progress}){const stage=curriculumStage(student),percent=Math.min(100,Math.round(progress.completed.length/80*100));return <section><PageTitle eyebrow={STAGES[stage].label.toUpperCase()} title={`${student.name}’s progress`} text="Seven-step English path: Grade 1 Easy, Grade 1 Medium, Grades 2-5 Medium, then Grade 5 Hard."/><div className="stage-path">{STAGES.map((s,i)=><div key={s.label} className={i<stage?"passed":i===stage?"current":""}><span>{i<stage?"✓":i+1}</span><small>{s.label}</small></div>)}</div><div className="progress-layout"><article className="big-progress"><div className="progress-circle" style={{"--value":`${percent*3.6}deg`} as React.CSSProperties}><span><strong>{percent}%</strong><small>journey</small></span></div><div><h3>You’re making waves!</h3><p>{progress.completed.length} activities completed, {progress.stars} stars and {progress.badges.length} badges.</p></div></article><article className="skills-card"><h3>English skills</h3>{["Speaking & Listening","Reading & Viewing","Writing & Representing"].map((s,i)=><div className="skill" key={s}><div><span>{s}</span><strong>{Math.min(100,percent+i*4)}%</strong></div><div><span style={{width:`${Math.min(100,percent+i*4)}%`}}/></div></div>)}</article></div></section>}

function PlayfulReset({onCancel,onReset}:{onCancel:()=>void;onReset:()=>void}){return <div className="modal-backdrop" role="presentation"><section className="reset-modal" role="dialog" aria-modal="true" aria-labelledby="reset-title"><img src="/assets/generated/crab.png" alt="Funny crab holding up its claws"/><span className="eyebrow">UH-OH, BIG SPLASH!</span><h2 id="reset-title">Wash away all your treasure?</h2><p>The cheeky crab will clear your stars, badges and completed adventures. Your name and ocean buddy can stay.</p><div><button onClick={onCancel}>No, save my treasure!</button><button className="danger-fun" onClick={onReset}>Yes, make a splash 🌊</button></div></section></div>}
function PageTitle({eyebrow,title,text}:{eyebrow:string;title:string;text:string}){return <header className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></header>}



