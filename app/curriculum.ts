export type LearningStage={label:string;grade:number;support:string;words:Array<[string,string,string]>};
export type CurriculumQuestion={prompt:string;options:string[];answer:number;explanation:string;token?:string;audioText?:string};

export const STAGES:LearningStage[]=[
 {label:"Grade 1 Easy - First English",grade:1,support:"Zero prior English: pictures, sounds, gestures and one-word choices",words:[
  ["A","the first letter; its short sound begins apple","A - apple"],["B","a letter whose sound begins ball","B - ball"],["C","a letter whose sound begins cat","C - cat"],["D","a letter whose sound begins dog","D - dog"],["hello","a word we say when we meet","Hello, teacher!"],["goodbye","a word we say when we leave","Goodbye, friends!"],["yes","a word that agrees","Yes, I can."],["no","a word that does not agree","No, thank you."],["I","the word a speaker uses for themself","I am Ali."],["you","the word for the person we speak to","You are my friend."],["name","the word people call you","My name is Laila."],["book","pages we read","Open the book."],["pencil","a tool for writing","This is my pencil."],["bag","something that carries school things","My book is in the bag."],["red","the colour of a ripe tomato","The crab is red."],["blue","the colour of a clear sea","The sea is blue."],["one","the number 1","I see one sun."],["two","the number 2","I see two fish."],["sit","move onto a chair or the floor","Please sit down."],["stand","rise onto your feet","Please stand up."]]},
 {label:"Grade 1 Medium - Supported Foundations",grade:1,support:"Simple dialogue frames, classroom instructions, phonics and drawing plus words",words:[
  ["family","people related to and caring for one another","This is my family."],["mother","a female parent","She is my mother."],["father","a male parent","He is my father."],["sister","a female sibling","Maya is my sister."],["brother","a male sibling","Amin is my brother."],["eyes","body parts used for seeing","I have two eyes."],["ears","body parts used for hearing","My ears can hear."],["run","move quickly on your feet","I can run."],["clap","bring hands together to make a sound","Clap your hands."],["happy","feeling pleased","I feel happy today."],["sad","feeling unhappy","The boy feels sad."],["big","large in size","The whale is big."],["small","little in size","The shell is small."],["circle","a round shape","Draw a circle."],["yellow","the colour of bright sunshine","The sun is yellow."],["fish","an animal that swims","A fish swims in water."],["bird","an animal with feathers","The bird can fly."],["eat","take food into your mouth","I eat a banana."],["drink","take liquid into your mouth","I drink water."],["home","the place where someone lives","I go home after school."]]},
 {label:"Grade 2 Medium - Growing Reader",grade:2,support:"Familiar conversations, two-step instructions, word families and complete sentences",words:[
  ["relative","a person in your wider family","My aunt is a relative."],["calendar","a chart of days and months","Mark the date on the calendar."],["first","number word showing position 1","Raya came first in line."],["cousin","a child of your aunt or uncle","My cousin visits us."],["neighbour","a person living near your home","Our neighbour waved hello."],["village","a small community","The village is beside the lagoon."],["kitchen","a room where food is prepared","We cook in the kitchen."],["bedroom","a room for sleeping","The bed is in the bedroom."],["careful","taking time to avoid mistakes","Be careful near the wet floor."],["quickly","at a fast speed","The gecko moved quickly."],["beginning","the first part of a text","The character is introduced at the beginning."],["middle","the central part of a text","The problem grows in the middle."],["ending","the final part of a text","The story is solved at the ending."],["recount","a text that retells a real event","Her recount tells about the picnic."],["plural","a form meaning more than one","Cats is a plural noun."],["question","words that ask for information","Who is coming? is a question."],["answer","a response to a question","I wrote a complete answer."],["because","a word that introduces a reason","I smiled because I was proud."],["before","earlier than something else","Wash your hands before lunch."],["after","later than something else","We read after break."]]},
 {label:"Grade 3 Medium - Independent Explorer",grade:3,support:"Fluent grade-level reading, coherent retelling, paragraphs and text features",words:[
  ["sequence","the order in which events happen","First, next and finally show a sequence."],["paragraph","sentences grouped around one idea","The paragraph describes the reef."],["headline","the title of a news text","The headline tells the main event."],["caption","words explaining a picture","Read the caption below the turtle photograph."],["diagram","a labelled drawing that explains","The diagram shows a plant's parts."],["summary","a short account of the key ideas","Her summary includes the beginning and ending."],["character","a person or animal in a story","The main character solves the problem."],["setting","where and when a story happens","The island is the story's setting."],["problem","a difficulty in a narrative","The lost paddle is the problem."],["solution","the way a problem is resolved","Sharing a boat becomes the solution."],["opinion","a personal belief or feeling","In my opinion, the poem is joyful."],["fact","a statement that can be checked","Maldives has many islands is a fact."],["past tense","a verb form for earlier actions","Walked is in the past tense."],["pronoun","a word used instead of a noun","She is a pronoun replacing Aisha."],["adjective","a word that describes a noun","Colourful describes the fish."],["rhyme","words ending with matching sounds","Sea and me rhyme."],["stanza","a grouped set of lines in a poem","The poem has two stanzas."],["main idea","the most important point","Protecting reefs is the main idea."],["supporting detail","information explaining the main idea","The example is a supporting detail."],["dictionary","a book or tool explaining words","Use a dictionary to check the meaning."]]},
 {label:"Grade 4 Medium - Strategic Communicator",grade:4,support:"Fluent literary and information reading, specialised visuals and organised multi-purpose writing",words:[
  ["mood","the feeling created by a text","Moonlight and silence create a calm mood."],["tone","the writer's attitude toward a subject","The friendly tone welcomes new readers."],["cause","the reason something happens","Heavy rain was the cause of the flood."],["effect","the result of an event","Closed roads were an effect of the storm."],["compare","examine how things are alike","Compare the two island maps."],["contrast","show how things are different","In contrast, the second boat is faster."],["theme","a broad message explored in a text","Friendship is a theme of the story."],["imagery","language that creates a sensory picture","Silver waves is vivid imagery."],["metaphor","a direct comparison saying one thing is another","The lagoon is a mirror is a metaphor."],["simile","a comparison using like or as","The sand is soft like flour is a simile."],["audience","the people a text is made for","The poster's audience is young swimmers."],["purpose","the reason a text was created","The leaflet's purpose is to inform."],["heading","a title naming a section","Use the heading to locate habitat facts."],["subheading","a smaller title within a section","Diet appears under a subheading."],["chart","information arranged visually","The chart compares monthly rainfall."],["source","where information comes from","The book lists its source."],["connective","a word linking ideas","However is a contrasting connective."],["explanation","a text showing how or why","The explanation shows how clouds form."],["report","an organised factual text","The report presents facts about dolphins."],["quotation","the exact words spoken or written","The article includes a scientist's quotation."]]},
 {label:"Grade 5 Medium - Critical Reader",grade:5,support:"Focused writing for audiences, inference, evidence, persuasive language and reflection",words:[
  ["evidence","details that support a claim or answer","The muddy footprints are evidence."],["infer","combine clues and knowledge to reach an idea","We infer she hurried from the unfinished meal."],["viewpoint","a position from which ideas are understood","Each narrator presents a different viewpoint."],["persuade","influence someone using reasons","The speech aims to persuade the council."],["claim","a statement a writer asks readers to accept","The writer's claim is that reefs need protection."],["reason","an explanation supporting a claim","Safety is one reason for the new rule."],["bias","an unfair preference affecting a message","The advert shows bias toward its own product."],["reliable","worthy of trust","A government report can be a reliable source."],["motivation","the reason a character chooses to act","Loyalty is the hero's motivation."],["conflict","a struggle between opposing forces","The friends' disagreement creates conflict."],["memoir","writing about the author's own memories","The memoir recalls her first sea voyage."],["reflect","think carefully about experience and learning","Writers reflect on what an event taught them."],["symbol","something representing a larger idea","The open door is a symbol of opportunity."],["alliteration","repeated initial sounds in nearby words","Wild waves is alliteration."],["personification","giving human qualities to non-human things","The wind whispered uses personification."],["counterargument","a reason opposing a claim","A fair debate addresses a counterargument."],["media","forms used to communicate widely","Video and radio are types of media."],["script","written dialogue and directions for performance","Actors rehearse from a script."],["formal","language suited to serious situations","The letter uses formal language."],["revise","improve ideas and organisation in writing","She will revise the paragraph for clarity."]]},
 {label:"Grade 5 Hard - Advanced Bridge",grade:5,support:"Extended Grade 5 analysis: nuance, synthesis, rhetoric and independent composition",words:[
  ["synthesise","combine ideas from several sources into a new understanding","The report synthesises facts from three articles."],["nuance","a small but meaningful difference","The narrator's pause adds nuance to her reply."],["rhetoric","language chosen to influence an audience","The speech uses powerful rhetoric."],["credibility","the quality of being believable and trustworthy","Qualifications add credibility to the expert."],["corroborate","confirm information using another source","The photograph helps corroborate the witness account."],["ambiguity","language with more than one possible meaning","The final line's ambiguity invites discussion."],["connotation","a feeling or idea associated with a word","Home has a warm connotation."],["denotation","the direct dictionary meaning of a word","The denotation of vessel is a large boat."],["irony","a contrast between expectation and reality","It is irony when the lifeguard forgets to swim."],["foreshadow","hint at something that will happen later","Dark clouds foreshadow the coming storm."],["perspective","a particular way of seeing an issue","The article includes a fisher's perspective."],["cohesion","the way parts of a text connect smoothly","Pronouns and connectives improve cohesion."],["thesis","the central claim of an extended argument","The opening paragraph states the thesis."],["qualifier","a word limiting how strongly a claim applies","Often is a qualifier in the sentence."],["evaluate","judge quality using evidence and criteria","Evaluate which source is most dependable."],["interpret","explain the meaning of information or art","Readers interpret the symbol differently."],["paraphrase","express an idea using different words","Paraphrase the source without changing its meaning."],["citation","a note identifying an information source","The writer adds a citation after the fact."],["register","the level and style of language for a situation","A job letter needs a formal register."],["coherence","clear logical flow across a whole text","Topic sentences strengthen coherence."]]},
];

export function stageIndex(grade:number,difficulty:"easy"|"medium"|"hard"){
 const medium=Math.min(5,Math.max(1,grade));
 return difficulty==="easy"?Math.max(0,medium-1):difficulty==="hard"?Math.min(6,medium+1):medium;
}

function hash(text:string){let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function shuffled(question:CurriculumQuestion,salt:number){
 const slot=hash(`${question.token??question.prompt}|${salt}`)%3;
 const wrong=question.options.filter((_,i)=>i!==question.answer);
 const options=[...wrong];options.splice(slot,0,question.options[question.answer]);
 return {...question,options,answer:slot};
}
function hinted(question:CurriculumQuestion,hint:string):CurriculumQuestion{return {...question,prompt:`${question.prompt}\n💡 Hint: ${hint}`}}
function quizHint(stage:number){return stage===0?"Look at each picture. Say each word slowly.":stage<3?"Read every choice. Cross out the two that do not fit.":"Find the key word in the question, then compare every choice."}
function gameHint(game:number,stage:number){
 const easy=["Say the word. Tap the matching picture.","Look at every letter from left to right.","Hear the word, then find the same one.","Choose the picture that makes the story continue.","Say each choice aloud. Pick the one that sounds right."];
 const growing=["Match the word to the choice with the same meaning.","Check every letter from the beginning to the end.","Read the clue twice and hunt for its key word.","Choose the event that connects clearly to the story.","Read each sentence aloud and listen for the clear one."];
 return (stage===0?easy:growing)[game];
}

const FIRST_ICONS=["🍎","⚽","🐱","🐶","👋","🚪","✅","❌","🙋","👉","🏷️","📘","✏️","🎒","🔴","🔵","1️⃣","2️⃣","🪑","🧍"];
const FIRST_SAY=["A","B","C","D","hello","goodbye","yes","no","I","you","name","book","pencil","bag","red","blue","one","two","sit","stand"];
const FOUNDATION_LETTERS=[
 ["A","apple","🍎"],["B","ball","⚽"],["C","cat","🐱"],["D","dog","🐶"],["E","egg","🥚"],["F","fish","🐟"],["G","gift","🎁"],["H","house","🏠"],["I","island","🏝️"],["J","juice","🧃"],["K","key","🔑"],["L","lion","🦁"],["M","moon","🌙"],["N","nest","🪺"],["O","octopus","🐙"],["P","palm","🌴"],["Q","queen","👑"],["R","rabbit","🐇"],["S","sun","☀️"],["T","turtle","🐢"],["U","umbrella","☂️"],["V","van","🚐"],["W","wave","🌊"],["X","x-ray","🩻"],["Y","yo-yo","🪀"],["Z","zebra","🦓"],
] as const;
const FOUNDATION_GROUP_ENDS=[5,10,15,20,26];

function foundationLettersForLevel(level:number){const lessons=assessmentLessonCount(0,Math.min(level,6));return FOUNDATION_LETTERS.slice(0,FOUNDATION_GROUP_ENDS[Math.min(4,lessons-1)])}
export function foundationDictationLetter(level:number,position:number){
 const letters=foundationLettersForLevel(level);
 return letters[(level*5+position)%letters.length][0];
}
export function curriculumFocusEntry(stage:number,level:number,position:number,channel=0):[string,string,string]{
 const word=assessmentWord(stage,level,position,channel),known=STAGES[stage].words.find(([item])=>item.toLowerCase()===word.toLowerCase());
 if(known)return known;
 const visual=wordVisual(word);return [word,visual.meaning,`We learn and use “${word}” in ${assessmentPhaseLabel(level)}.`];
}
function curriculumDistractorEntry(stage:number,level:number,exclude:string[],offset:number):[string,string,string]{
 const pool=assessmentVocabulary(stage,level).filter(word=>!exclude.some(item=>item.toLowerCase()===word.toLowerCase())),word=pool[offset%pool.length];
 const known=STAGES[stage].words.find(([item])=>item.toLowerCase()===word.toLowerCase());
 if(known)return known;
 const visual=wordVisual(word);return [word,visual.meaning,`We learn and use “${word}” in ${assessmentPhaseLabel(level)}.`];
}

function firstChoices(set:number){
 const a=set,b=(set+7)%20,c=(set+13)%20;
 return [a,b,c];
}

function foundationQuizQuestion(set:number,pos:number,salt:number):CurriculumQuestion{
 return shuffled(level1QuizQuestion(set,pos),salt);
 /* The explicit 100-item Level 1 repository is authoritative. */
 if(set<7){
  const letters=foundationLettersForLevel(set),target=letters[(set*5+pos)%letters.length],other=letters[(set*5+pos+7)%letters.length],third=letters[(set*5+pos+13)%letters.length],token=`Q-0-${set}-${pos}`;
  const variants:CurriculumQuestion[]=[
   {token,prompt:`Level ${set+1}: Tap uppercase ${target[0]}.`,options:[target[0],other[0],third[0]],answer:0,explanation:`This is uppercase ${target[0]}.`},
   {token,prompt:`Level ${set+1}: Find the letter ${target[0]}.`,options:[target[0],other[0],third[0]],answer:0,explanation:`You found ${target[0]}.`},
   {token,prompt:`Level ${set+1}: Choose ${target[0]}.`,options:[target[0],other[0],third[0]],answer:0,explanation:`This letter is ${target[0]}.`},
   {token,prompt:`Level ${set+1}: Tap the letter ${target[0]}.`,options:[target[0],other[0],third[0]],answer:0,explanation:`Great! This is ${target[0]}.`},
   {token,prompt:`Level ${set+1}: Find uppercase ${target[0]}.`,options:[target[0],other[0],third[0]],answer:0,explanation:`Yes! Uppercase ${target[0]}.`},
  ];
  return hinted(shuffled(variants[pos],salt),`Say the letter ${target[0]} slowly.`);
 }
 const pool=assessmentVocabulary(0,set),word=assessmentWord(0,set,pos),other=pool[(pool.indexOf(word)+7)%pool.length],third=pool[(pool.indexOf(word)+13)%pool.length],visual=wordVisual(word),token=`Q-0-${set}-${pos}`;
 const choices=[word,other,third];
 const variants:CurriculumQuestion[]=[
  {token,prompt:`Level ${set+1}: Look and tap ${word}.`,options:choices,answer:0,explanation:`Yes! ${word}.`},
  {token,prompt:`Level ${set+1}: Find the same word: ${word}.`,options:choices,answer:0,explanation:`Great! You found ${word}.`},
  {token,prompt:`Level ${set+1}: Which word matches “${visual.picture}”?`,options:choices,answer:0,explanation:`The picture shows ${word}.`},
  {token,prompt:`Level ${set+1}: Hear ${word}. Tap it.`,options:choices,answer:0,explanation:`Well done! Say ${word}.`},
  {token,prompt:`Level ${set+1}: Find ${word} one more time.`,options:choices,answer:0,explanation:`Star work! ${word}.`},
 ];
 return hinted(shuffled(variants[pos],salt),quizHint(0));
}

function foundationGameQuestion(game:number,level:number,pos:number,salt:number):CurriculumQuestion{
 if(level<7){
  const letters=foundationLettersForLevel(level),target=letters[(level*5+pos+game)%letters.length],other=letters[(level*5+pos+game+7)%letters.length],third=letters[(level*5+pos+game+13)%letters.length],token=`G-${game}-0-${level}-${pos}`;
  const prompts=[`Letter pearl ${level+1}.${pos+1}: What starts with ${target[0]}?`,`Sound bee ${level+1}.${pos+1}: Find ${target[0]} for ${target[1]}.`,`Letter race ${level+1}.${pos+1}: Race to ${target[0]}!`,`Picture story ${level+1}.${pos+1}: ${target[2]} starts with ...`,`Letter hero ${level+1}.${pos+1}: Match ${target[0]} and its object.`];
  const optionModes=[[`${target[2]} ${target[1]}`,`${other[2]} ${other[1]}`,`${third[2]} ${third[1]}`],[target[0],other[0],third[0]],[`${target[0]} ${target[1]}`,`${other[0]} ${other[1]}`,`${third[0]} ${third[1]}`],[target[0],other[0],third[0]],[`${target[0]} ${target[2]}`,`${other[0]} ${other[2]}`,`${third[0]} ${third[2]}`]];
  return hinted(shuffled({token,prompt:prompts[game],options:optionModes[game],answer:0,explanation:`${target[0]} is for ${target[1]}.`},salt),`Say ${target[0]} and ${target[1]}. Listen to the first sound.`);
 }
 const isDictation=game===1&&pos===0,pool=assessmentVocabulary(0,level),word=isDictation?assessmentWord(0,level,pos,21):assessmentWord(0,level,pos,game),other=pool[(level*5+pos+7)%pool.length],third=pool[(level*5+pos+13)%pool.length],token=`G-${game}-0-${level}-${pos}`;
 return hinted(shuffled({token,prompt:isDictation?`${assessmentPhaseLabel(level)} • Level ${level+1} • Mission ${pos+1}: Hear the word. Find it.`:`${assessmentPhaseLabel(level)} • Level ${level+1} • Mission ${pos+1}: Find ${word}.`,options:[word,other,third],answer:0,explanation:`Yes! The word is ${word}.`,audioText:isDictation?word:undefined},salt),gameHint(game,0));
}

function level2QuizQuestion(set:number,pos:number,salt:number):CurriculumQuestion{
 return shuffled(level2BankQuestion(set,pos),salt);
 /* The explicit Level 2 bank replaces the former recurring generator. */
 const [word,,example]=curriculumFocusEntry(1,set,pos),x=curriculumDistractorEntry(1,set,[word],pos+5),y=curriculumDistractorEntry(1,set,[word,x[0]],pos+11),visual=wordVisual(word),token=`Q-1-${set}-${pos}`,options=[word,x[0],y[0]];
 const variants:CurriculumQuestion[]=[
  {token,prompt:`Level ${set+1}: Listen. Tap ${word}.`,options,answer:0,explanation:`Yes! ${word}.`},
  {token,prompt:`Level ${set+1}: Look at ${visual.icon}. Find the word.`,options,answer:0,explanation:`${visual.icon} is ${word}.`},
  {token,prompt:`Level ${set+1}: Say ${word}. Tap the same word.`,options,answer:0,explanation:`You found ${word}.`},
  {token,prompt:`Level ${set+1}: Which word belongs with this picture: ${visual.picture}?`,options,answer:0,explanation:`The picture shows ${word}.`},
  {token,prompt:`Level ${set+1}: Hear this short line: ${example} Tap its focus word.`,options,answer:0,explanation:`The focus word is ${word}.`},
 ];
 return hinted(shuffled(variants[pos],salt),"Look at the picture. Say each choice slowly.");
}

function level2GameQuestion(game:number,level:number,pos:number,salt:number):CurriculumQuestion{
 const [word,,example]=curriculumFocusEntry(1,level,pos,game),x=curriculumDistractorEntry(1,level,[word],pos+game+4),y=curriculumDistractorEntry(1,level,[word,x[0]],pos+game+9),visual=wordVisual(word),token=`G-${game}-1-${level}-${pos}`,options=[word,x[0],y[0]];
 const missions:CurriculumQuestion[]=[
  {token,prompt:`Picture match ${level+1}.${pos+1}: Tap ${visual.icon} ${word}.`,options,answer:0,explanation:`${visual.icon} matches ${word}.`},
  {token,prompt:`Sound splash ${level+1}.${pos+1}: Hear the word. Tap it.`,options,answer:0,audioText:word,explanation:`You heard ${word}.`},
  {token,prompt:`Word race ${level+1}.${pos+1}: Find ${word}.`,options,answer:0,explanation:`${word} wins the race!`},
  {token,prompt:`First-sound reef ${level+1}.${pos+1}: ${word} starts with ${word[0].toUpperCase()}. Tap ${word}.`,options,answer:0,explanation:`${word} begins with ${word[0].toUpperCase()}.`},
  {token,prompt:`Sentence helper ${level+1}.${pos+1}: Say “${example}” Tap ${word}.`,options,answer:0,explanation:`${word} completes the guided line.`},
 ];
 return hinted(shuffled(missions[game],salt),"Hear the word. Look at all three choices.");
}

function level3QuizQuestion(set:number,pos:number,salt:number):CurriculumQuestion{
 return shuffled(level3BankQuestion(set,pos),salt);
 const [word,meaning,example]=curriculumFocusEntry(2,set,pos),x=curriculumDistractorEntry(2,set,[word],pos+4),y=curriculumDistractorEntry(2,set,[word,x[0]],pos+9),visual=wordVisual(word),token=`Q-2-${set}-${pos}`;
 const variants:CurriculumQuestion[]=[
  {token,prompt:`Level ${set+1}: Which word matches ${visual.icon}?`,options:[word,x[0],y[0]],answer:0,explanation:`${visual.icon} matches ${word}.`},
  {token,prompt:`Level ${set+1}: Which line uses “${word}” clearly?`,options:[example,`${word} the quickly.`,`And ${word} because.`],answer:0,explanation:`“${example}” is a complete sentence.`},
  {token,prompt:`Level ${set+1}: What does “${word}” mean?`,options:[meaning,x[1],y[1]],answer:0,explanation:`“${word}” means ${meaning}.`},
  {token,prompt:`Level ${set+1}: Find the word that belongs with “${meaning}”.`,options:[word,x[0],y[0]],answer:0,explanation:`The matching word is ${word}.`},
  {token,prompt:`Level ${set+1}: Read the island line. Which word is the focus? ${example}`,options:[word,x[0],y[0]],answer:0,explanation:`The line practises ${word}.`},
 ];
 return hinted(shuffled(variants[pos],salt),"Look at the picture or key words. Read all three choices.");
}

function level3GameQuestion(game:number,level:number,pos:number,salt:number):CurriculumQuestion{
 const [word,meaning,example]=curriculumFocusEntry(2,level,pos,game),x=curriculumDistractorEntry(2,level,[word],pos+game+5),y=curriculumDistractorEntry(2,level,[word,x[0]],pos+game+10),visual=wordVisual(word),token=`G-${game}-2-${level}-${pos}`,miss=word.length>2?`${word.slice(0,-1)}_`:`${word}_`;
 const missions:CurriculumQuestion[]=[
  {token,prompt:`Picture pearl ${level+1}.${pos+1}: Match ${visual.icon} to its word.`,options:[word,x[0],y[0]],answer:0,explanation:`${visual.icon} is ${word}.`},
  {token,prompt:`Sound boat ${level+1}.${pos+1}: Listen and catch the word.`,options:[word,x[0],y[0]],answer:0,audioText:word,explanation:`You caught ${word}.`},
  {token,prompt:`Word-family race ${level+1}.${pos+1}: Complete ${miss}.`,options:[word,x[0],y[0]],answer:0,explanation:`The complete word is ${word}.`},
  {token,prompt:`Story stepping-stone ${level+1}.${pos+1}: Choose the clear next line.`,options:[example,`${word} and because.`,`Quickly blue the ${word}.`],answer:0,explanation:"The clear sentence keeps the story moving."},
  {token,prompt:`Sentence rescue ${level+1}.${pos+1}: Find the complete sentence.`,options:[example,`${word} the quickly.`,`Because and ${word}.`],answer:0,explanation:"The rescued sentence has clear word order."},
 ];
 return hinted(shuffled(missions[game],salt),"Read or listen twice. Choose the card that makes sense.");
}

function level4QuizQuestion(set:number,pos:number,salt:number):CurriculumQuestion{
 return shuffled(level4BankQuestion(set,pos),salt);
 const [word,meaning,example]=curriculumFocusEntry(3,set,pos),x=curriculumDistractorEntry(3,set,[word],pos+6),y=curriculumDistractorEntry(3,set,[word,x[0]],pos+12),token=`Q-3-${set}-${pos}`;
 const variants:CurriculumQuestion[]=[
  {token,prompt:`Level ${set+1}: What does “${word}” mean in this lesson?`,options:[meaning,x[1],y[1]],answer:0,explanation:`“${word}” means ${meaning}.`},
  {token,prompt:`Level ${set+1}: Which complete sentence uses “${word}” correctly?`,options:[example,`${word} the quickly blue.`,`Because ${word} and the.`],answer:0,explanation:`“${example}” is complete and meaningful.`},
  {token,prompt:`Level ${set+1}: Which word matches this clue: ${meaning}?`,options:[word,x[0],y[0]],answer:0,explanation:`The clue matches ${word}.`},
  {token,prompt:`Level ${set+1}: Which detail best supports the focus “${word}”?`,options:[example,x[2],y[2]],answer:0,explanation:"The correct detail directly demonstrates the focus."},
  {token,prompt:`Level ${set+1}: Read and choose the accurate word-and-example pair.`,options:[`${word} — ${example}`,`${x[0]} — ${y[2]}`,`${y[0]} — ${x[2]}`],answer:0,explanation:`${word} is accurately paired with its example.`},
 ];
 return hinted(shuffled(variants[pos],salt),"Read the key word, then find the choice that matches its meaning or use.");
}

function level4GameQuestion(game:number,level:number,pos:number,salt:number):CurriculumQuestion{
 const base=curriculumFocusEntry(3,level,pos,game),word=game===1&&pos===0?dictationWord(3,level,pos,21):base[0],known=STAGES[3].words.find(([item])=>item.toLowerCase()===word.toLowerCase()),visual=wordVisual(word),meaning=known?.[1]??visual.meaning,example=known?.[2]??`The class uses ${word} in a short island sentence.`,x=curriculumDistractorEntry(3,level,[word],pos+game+6),y=curriculumDistractorEntry(3,level,[word,x[0]],pos+game+12),token=`G-${game}-3-${level}-${pos}`,miss=word.length>2?`${word.slice(0,-1)}_`:`${word}_`;
 const missions:CurriculumQuestion[]=[
  {token,prompt:`Clue diver ${level+1}.${pos+1}: Dive for the word meaning “${meaning}”.`,options:[word,x[0],y[0]],answer:0,explanation:`The clue belongs to ${word}.`},
  {token,prompt:`Spelling sail ${level+1}.${pos+1}: Complete ${miss}.`,options:[word,word+word.slice(-1),x[0]],answer:0,explanation:`The complete spelling is ${word}.`},
  {token,prompt:`Reading relay ${level+1}.${pos+1}: Find the sentence that uses ${word} well.`,options:[example,`${word} because and.`,`Quickly the ${word} blue.`],answer:0,explanation:"The complete sentence wins the relay."},
  {token,prompt:`Story-map quest ${level+1}.${pos+1}: Choose the detail that belongs in the story map.`,options:[example,x[2],y[2]],answer:0,explanation:`The detail clearly demonstrates ${word}.`},
  {token,prompt:`Paragraph reef ${level+1}.${pos+1}: Choose the clearest supporting sentence.`,options:[example,`No detail is needed for ${word}.`,`The words are in a random order ${word}.`],answer:0,explanation:"A supporting sentence must be complete and connected."},
 ];
 if(game===1&&pos===0)missions[game].audioText=word;
 return hinted(shuffled(missions[game],salt),`Use the clue and ${visual.icon} picture idea. Check all three choices.`);
}

function level5QuizQuestion(set:number,pos:number,salt:number):CurriculumQuestion{
 return shuffled(level5BankQuestion(set,pos),salt);
 const [word,meaning,example]=curriculumFocusEntry(4,set,pos),x=curriculumDistractorEntry(4,set,[word],pos+7),y=curriculumDistractorEntry(4,set,[word,x[0]],pos+14),token=`Q-4-${set}-${pos}`;
 const variants:CurriculumQuestion[]=[
  {token,prompt:`Level ${set+1}: Which definition accurately explains “${word}”?`,options:[meaning,x[1],y[1]],answer:0,explanation:`“${word}” means ${meaning}.`},
  {token,prompt:`Level ${set+1}: Which example demonstrates “${word}”?`,options:[example,x[2],y[2]],answer:0,explanation:`“${example}” demonstrates ${word}.`},
  {token,prompt:`Level ${set+1}: Which evidence best supports the use of “${word}”?`,options:[`${meaning} — ${example}`,`${x[1]} — ${y[2]}`,`${y[1]} — ${x[2]}`],answer:0,explanation:"The accurate meaning and example provide direct support."},
  {token,prompt:`Level ${set+1}: Choose the clearest reader explanation of “${word}”.`,options:[`It means ${meaning}, as shown by: ${example}`,`It means every detail is equally important.`,`It cannot be used in an island text.`],answer:0,explanation:"The clear explanation combines meaning with relevant context."},
  {token,prompt:`Level ${set+1}: Which word belongs with this Grade 4 strategy: ${meaning}?`,options:[word,x[0],y[0]],answer:0,explanation:`The strategy word is ${word}.`},
 ];
 return hinted(shuffled(variants[pos],salt),"Identify the strategy, then test each choice against the example or evidence.");
}

function level5GameQuestion(game:number,level:number,pos:number,salt:number):CurriculumQuestion{
 const base=curriculumFocusEntry(4,level,pos,game),word=game===1&&pos===0?dictationWord(4,level,pos,21):base[0],known=STAGES[4].words.find(([item])=>item.toLowerCase()===word.toLowerCase()),visual=wordVisual(word),meaning=known?.[1]??visual.meaning,example=known?.[2]??`The island class uses ${word} in a clear text.`,x=curriculumDistractorEntry(4,level,[word],pos+game+7),y=curriculumDistractorEntry(4,level,[word,x[0]],pos+game+14),token=`G-${game}-4-${level}-${pos}`,miss=word.length>3?`${word.slice(0,-2)}__`:`${word.slice(0,-1)}_`;
 const missions:CurriculumQuestion[]=[
  {token,prompt:`Strategy sonar ${level+1}.${pos+1}: Match “${word}” to its purpose.`,options:[meaning,x[1],y[1]],answer:0,explanation:`${word} means ${meaning}.`},
  {token,prompt:`Spelling current ${level+1}.${pos+1}: Complete ${miss}.`,options:[word,word+word.slice(-1),x[0]],answer:0,explanation:`The exact spelling is ${word}.`,audioText:game===1&&pos===0?word:undefined},
  {token,prompt:`Evidence expedition ${level+1}.${pos+1}: Select the detail that demonstrates ${word}.`,options:[example,x[2],y[2]],answer:0,explanation:"The selected evidence directly fits the strategy."},
  {token,prompt:`Text-feature builder ${level+1}.${pos+1}: Choose the card that helps a reader understand ${word}.`,options:[`${word}: ${meaning}`,`${x[0]}: ${y[1]}`,`${y[0]}: ${x[1]}`],answer:0,explanation:"The correct card links the feature to its real purpose."},
  {token,prompt:`Revision rescue ${level+1}.${pos+1}: Choose the clearest improved sentence.`,options:[example,`${word} the because quickly.`,`No useful detail explains ${word}.`],answer:0,explanation:"The improved sentence is complete, accurate and purposeful."},
 ];
 return hinted(shuffled(missions[game],salt),`Use the purpose, evidence and ${visual.icon} visual clue before choosing.`);
}

function level6QuizQuestion(set:number,pos:number,salt:number):CurriculumQuestion{
 return shuffled(level6BankQuestion(set,pos),salt);
 const [word,meaning,example]=curriculumFocusEntry(5,set,pos),x=curriculumDistractorEntry(5,set,[word],pos+8),y=curriculumDistractorEntry(5,set,[word,x[0]],pos+16),token=`Q-5-${set}-${pos}`;
 const variants:CurriculumQuestion[]=[
  {token,prompt:`Level ${set+1}: Which explanation accurately defines “${word}”?`,options:[meaning,x[1],y[1]],answer:0,explanation:`“${word}” means ${meaning}.`},
  {token,prompt:`Level ${set+1}: Which example provides the clearest use of “${word}”?`,options:[example,x[2],y[2]],answer:0,explanation:`The example directly demonstrates ${word}.`},
  {token,prompt:`Level ${set+1}: Which evidence-and-explanation pair supports “${word}”?`,options:[`${example} — This shows ${meaning}.`,`${x[2]} — This shows ${y[1]}.`,`${y[2]} — This shows ${x[1]}.`],answer:0,explanation:"The correct pair connects relevant evidence to an accurate explanation."},
  {token,prompt:`Level ${set+1}: Which interpretation of “${word}” is best justified?`,options:[`It means ${meaning}, supported by: ${example}`,`It has no effect on meaning or audience.`,`It means exactly the same as every other strategy.`],answer:0,explanation:"A justified interpretation includes an accurate meaning and supporting context."},
  {token,prompt:`Level ${set+1}: Which Grade 5 concept matches this purpose: ${meaning}?`,options:[word,x[0],y[0]],answer:0,explanation:`The matching concept is ${word}.`},
 ];
 return hinted(shuffled(variants[pos],salt),"Identify the concept, locate relevant evidence, and test the explanation against the text.");
}

function level6GameQuestion(game:number,level:number,pos:number,salt:number):CurriculumQuestion{
 const base=curriculumFocusEntry(5,level,pos,game),word=game===1&&pos===0?dictationWord(5,level,pos,21):base[0],known=STAGES[5].words.find(([item])=>item.toLowerCase()===word.toLowerCase()),visual=wordVisual(word),meaning=known?.[1]??visual.meaning,example=known?.[2]??`The island class uses ${word} in a purposeful Grade 5 text.`,x=curriculumDistractorEntry(5,level,[word],pos+game+8),y=curriculumDistractorEntry(5,level,[word,x[0]],pos+game+16),token=`G-${game}-5-${level}-${pos}`,miss=word.length>4?`${word.slice(0,-3)}___`:`${word.slice(0,-1)}_`;
 const missions:CurriculumQuestion[]=[
  {token,prompt:`Concept current ${level+1}.${pos+1}: Match “${word}” to its accurate meaning.`,options:[meaning,x[1],y[1]],answer:0,explanation:`${word} means ${meaning}.`},
  {token,prompt:`Wordcraft wave ${level+1}.${pos+1}: Listen and complete ${miss}.`,options:[word,word+word.slice(-1),x[0]],answer:0,explanation:`The exact word is ${word}.`,audioText:game===1&&pos===0?word:undefined},
  {token,prompt:`Inference island ${level+1}.${pos+1}: Select the evidence that best demonstrates ${word}.`,options:[example,x[2],y[2]],answer:0,explanation:"The selected evidence directly supports the concept."},
  {token,prompt:`Viewpoint voyage ${level+1}.${pos+1}: Choose the best supported interpretation.`,options:[`${meaning}, shown by ${example}`,`${x[1]}, but no evidence is needed`,`${y[1]}, because every clue is equal`],answer:0,explanation:"The best interpretation combines accuracy with relevant evidence."},
  {token,prompt:`Revision harbour ${level+1}.${pos+1}: Choose the strongest purposeful revision.`,options:[example,`${word} because the random words quickly.`,`The writer removes every detail about ${word}.`],answer:0,explanation:"The strongest revision is coherent, purposeful and evidence-based."},
 ];
 return hinted(shuffled(missions[game],salt),`Use the ${visual.icon} concept clue, then verify the evidence and explanation.`);
}

function level7QuizQuestion(set:number,pos:number,salt:number):CurriculumQuestion{
 return shuffled(level7BankQuestion(set,pos),salt);
 const [word,meaning,example]=curriculumFocusEntry(6,set,pos),x=curriculumDistractorEntry(6,set,[word],pos+9),y=curriculumDistractorEntry(6,set,[word,x[0]],pos+18),token=`Q-6-${set}-${pos}`;
 const variants:CurriculumQuestion[]=[
  {token,prompt:`Level ${set+1}: Which precise definition explains “${word}”?`,options:[meaning,x[1],y[1]],answer:0,explanation:`“${word}” means ${meaning}.`},
  {token,prompt:`Level ${set+1}: Which example most convincingly demonstrates “${word}”?`,options:[example,x[2],y[2]],answer:0,explanation:`The example accurately demonstrates ${word}.`},
  {token,prompt:`Level ${set+1}: Which evidence-and-reasoning chain supports “${word}”?`,options:[`${example} Therefore, ${meaning}.`,`${x[2]} Therefore, ${y[1]}.`,`${y[2]} Therefore, ${x[1]}.`],answer:0,explanation:"The correct chain links relevant evidence to valid reasoning."},
  {token,prompt:`Level ${set+1}: Which critical interpretation of “${word}” is best qualified?`,options:[`It can mean ${meaning} in this context, supported by ${example}`,`It always means everything at once, without exception.`,`No context or evidence is needed to interpret it.`],answer:0,explanation:"A strong interpretation is contextual, supported and appropriately qualified."},
  {token,prompt:`Level ${set+1}: Which extension concept matches this function: ${meaning}?`,options:[word,x[0],y[0]],answer:0,explanation:`The matching extension concept is ${word}.`},
 ];
 return hinted(shuffled(variants[pos],salt),"Define the concept precisely, test the evidence, and consider context or limitations.");
}

function level7GameQuestion(game:number,level:number,pos:number,salt:number):CurriculumQuestion{
 const base=curriculumFocusEntry(6,level,pos,game),word=game===1&&pos===0?dictationWord(6,level,pos,21):base[0],known=STAGES[6].words.find(([item])=>item.toLowerCase()===word.toLowerCase()),visual=wordVisual(word),meaning=known?.[1]??visual.meaning,example=known?.[2]??`The learner applies ${word} to evidence from an island text.`,x=curriculumDistractorEntry(6,level,[word],pos+game+9),y=curriculumDistractorEntry(6,level,[word,x[0]],pos+game+18),token=`G-${game}-6-${level}-${pos}`,miss=word.length>5?`${word.slice(0,-4)}____`:`${word.slice(0,-1)}_`;
 const missions:CurriculumQuestion[]=[
  {token,prompt:`Concept compass ${level+1}.${pos+1}: Navigate to the precise meaning of “${word}”.`,options:[meaning,x[1],y[1]],answer:0,explanation:`${word} means ${meaning}.`},
  {token,prompt:`Lexicon lighthouse ${level+1}.${pos+1}: Listen and complete ${miss}.`,options:[word,word+word.slice(-1),x[0]],answer:0,explanation:`The exact word is ${word}.`,audioText:game===1&&pos===0?word:undefined},
  {token,prompt:`Source triangulation ${level+1}.${pos+1}: Choose the strongest evidence for ${word}.`,options:[example,x[2],y[2]],answer:0,explanation:"The strongest evidence is relevant and directly connected to the concept."},
  {token,prompt:`Perspective passage ${level+1}.${pos+1}: Choose the most nuanced interpretation.`,options:[`${meaning}, supported in this context by ${example}`,`${x[1]}, true in every possible context`,`${y[1]}, requiring no evidence`],answer:0,explanation:"The nuanced interpretation is contextual, supported and carefully limited."},
  {token,prompt:`Critical response reef ${level+1}.${pos+1}: Select the strongest formal revision.`,options:[example,`${word} is obvious, so evidence is unnecessary.`,`Random details prove every claim about ${word}.`],answer:0,explanation:"The strongest revision is precise, formal and evidence-based."},
 ];
 return hinted(shuffled(missions[game],salt),`Use the ${visual.icon} concept clue, evaluate support, and reject absolute or unsupported claims.`);
}

export function quizQuestion(stage:number,set:number,pos:number,salt:number):CurriculumQuestion{
 if(stage===0)return foundationQuizQuestion(set,pos,salt);
 if(stage===1)return level2QuizQuestion(set,pos,salt);
 if(stage===2)return level3QuizQuestion(set,pos,salt);
 if(stage===3)return level4QuizQuestion(set,pos,salt);
 if(stage===4)return level5QuizQuestion(set,pos,salt);
 if(stage===5)return level6QuizQuestion(set,pos,salt);
 if(stage===6)return level7QuizQuestion(set,pos,salt);
 const [word,meaning,example]=curriculumFocusEntry(stage,set,pos),a=curriculumDistractorEntry(stage,set,[word],pos+1),b=curriculumDistractorEntry(stage,set,[word,a[0]],pos+3);
 const band=`Path ${stage+1} • ${assessmentPhaseLabel(set)}`;
 const token=`Q-${stage}-${set}-${pos}`;
 const variants:CurriculumQuestion[]=[
  {token,prompt:`${band} ${set+1}: What does “${word}” mean?`,options:[meaning,a[1],b[1]],answer:0,explanation:`“${word}” means ${meaning}.`},
  {token,prompt:`${band} ${set+1}: Which example uses “${word}” correctly?`,options:[example,`The ${word} quickly blue.`,`Because ${word} and.`],answer:0,explanation:`“${example}” is complete and shows the meaning in context.`},
  {token,prompt:`${band} ${set+1}: Which clue best teaches “${word}”?`,options:[`${word}: ${meaning}`,`${word}: the number 900`,`${word}: no meaning at all`],answer:0,explanation:"A useful clue gives a clear, accurate meaning."},
  {token,prompt:`${band} ${set+1}: Choose the best learning sentence for “${word}”.`,options:[`I can explain and use “${word}”.`,`I skip “${word}” without reading.`,`I copy “${word}” but never check it.`],answer:0,explanation:"Explaining and using a word demonstrates understanding."},
  {token,prompt:`${band} ${set+1}: Which answer proves understanding of “${word}”?`,options:[`It means ${meaning}; for example: ${example}`,`It is always the same as “${a[0]}”.`,`It cannot be used in English.`],answer:0,explanation:"A meaning plus an accurate example is strong evidence of understanding."},
 ];
 return hinted(shuffled(variants[pos],salt),quizHint(stage));
}

export function gameQuestion(game:number,stage:number,level:number,pos:number,salt:number):CurriculumQuestion{
 if(stage===0)return foundationGameQuestion(game,level,pos,salt);
 if(stage===1)return level2GameQuestion(game,level,pos,salt);
 if(stage===2)return level3GameQuestion(game,level,pos,salt);
 if(stage===3)return level4GameQuestion(game,level,pos,salt);
 if(stage===4)return level5GameQuestion(game,level,pos,salt);
 if(stage===5)return level6GameQuestion(game,level,pos,salt);
 if(stage===6)return level7GameQuestion(game,level,pos,salt);
 const isDictation=game===1&&pos===0,base=curriculumFocusEntry(stage,level,pos,game),word=isDictation?dictationWord(stage,level,pos,21):base[0],known=STAGES[stage].words.find(([item])=>item.toLowerCase()===word.toLowerCase()),visual=wordVisual(word),meaning=known?.[1]??visual.meaning,example=known?.[2]??`We use “${word}” in a friendly island story.`,x=curriculumDistractorEntry(stage,level,[word],pos+game+1),y=curriculumDistractorEntry(stage,level,[word,x[0]],pos+game+3),token=`G-${game}-${stage}-${level}-${pos}`;
 const miss=word.length>2?word.slice(0,-1):word+"x",first=word[0].toUpperCase();
 const letterChoices=[first,x[0][0].toUpperCase(),y[0][0].toUpperCase(),..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].filter((letter,i,all)=>all.indexOf(letter)===i).slice(0,3);
 const banks:CurriculumQuestion[][]=[
  [
   {token,prompt:`Meaning pearl: match “${word}”.`,options:[meaning,x[1],y[1]],answer:0,explanation:`“${word}” means ${meaning}.`},
   {token,prompt:`Example shell: find the line using “${word}” well.`,options:[example,`The ${word} quickly blue.`,`Because ${word} and.`],answer:0,explanation:"The complete example uses the word meaningfully."},
   {token,prompt:`Reverse match: which word means “${meaning}”?`,options:[word,x[0],y[0]],answer:0,explanation:`The matching word is “${word}”.`},
   {token,prompt:`Clue bubble: which clue belongs with “${word}”?`,options:[`${meaning} - ${example}`,`${x[1]} - ${x[2]}`,`${y[1]} - ${y[2]}`],answer:0,explanation:"The winning bubble gives both the right meaning and example."},
   {token,prompt:`Treasure proof: which card proves “${word}” is understood?`,options:[`I know it means ${meaning}.`,`I skip the word without reading.`,`I say every word means ${x[1]}.`],answer:0,explanation:"Explaining the accurate meaning proves understanding."},
  ],[
   {token,prompt:`Spelling beacon: build the word meaning “${meaning}”.`,options:[word,miss,word+"e"],answer:0,explanation:`The correct spelling is “${word}”.`},
   {token,prompt:`First-sound flight: which letter launches “${word}”?`,options:letterChoices,answer:0,explanation:`“${word}” begins with ${first}.`},
   {token,prompt:`Missing-piece hive: complete “${miss}_” to make the target word.`,options:[word,miss,x[0]],answer:0,explanation:`The completed word is “${word}”.`},
   {token,prompt:`Word-shape challenge: choose the exact spelling used in this line: ${example}`,options:[word,word+word.slice(-1),miss],answer:0,explanation:`The example uses “${word}”.`},
   {token,prompt:`Bee check: which spelling matches “${meaning}”?`,options:[word,miss+"x",word+"h"],answer:0,explanation:`“${word}” carries that meaning.`},
  ],[
   {token,prompt:`Starting flag: race to the word meaning “${meaning}”.`,options:[word,x[0],y[0]],answer:0,explanation:`“${word}” wins the meaning race.`},
   {token,prompt:`Context bend: what word is working in “${example}”?`,options:[word,x[0],y[0]],answer:0,explanation:`The sentence demonstrates “${word}”.`},
   {token,prompt:`Definition dash: finish “${word} means ...”`,options:[meaning,x[1],y[1]],answer:0,explanation:`The finish line is “${meaning}”.`},
   {token,prompt:`Clue sprint: which pair belongs with “${word}”?`,options:[`${word} - ${meaning}`,`${word} - ${x[1]}`,`${word} - ${y[1]}`],answer:0,explanation:"The correct pair joins the word to its meaning."},
   {token,prompt:`Final lap: select the clearest use of “${word}”.`,options:[example,`${word} and because.`,`Quickly the ${word} blue.`],answer:0,explanation:"The complete sentence wins the reading race."},
  ],[
   {token,prompt:`Opening tile: choose a clear story beginning about “${word}”.`,options:[`One bright morning, we learned that ${word} means ${meaning}.`,`And then because the end.`,`Nothing happened before it began.`],answer:0,explanation:"A clear opening introduces the focus."},
   {token,prompt:`Detail tile: which line adds a meaningful detail about “${word}”?`,options:[example,`The ${word} was no word.`,`Suddenly and because.`],answer:0,explanation:"The example adds a connected detail."},
   {token,prompt:`Next-event tile: what should follow “We discovered ${word}”?`,options:[`We used it to mean ${meaning}.`,`The letters disappeared forever.`,`No idea needs a sentence.`],answer:0,explanation:"The next line remains connected and meaningful."},
   {token,prompt:`Ending tile: complete the learning story about “${word}”.`,options:[`At last, everyone could explain “${word}”.`,`At last, the story forgot every word.`,`Because and the end quickly.`],answer:0,explanation:"A strong ending resolves the learning goal."},
   {token,prompt:`Title tile: name the story built around “${word}”.`,options:[`The Adventure of ${word}`,`A Story About ${x[0]} Only`,`No Title and No Meaning`],answer:0,explanation:"The title clearly names the story's focus."},
  ],[
   {token,prompt:`Sentence repair: fix the line using “${word}”.`,options:[example,`${word} the quickly.`,`And because ${word}.`],answer:0,explanation:"The repaired line has meaningful word order."},
   {token,prompt:`Capital shield: which “${word}” sentence starts and ends correctly?`,options:[example,example.toLowerCase().replace(/[.!?]$/,""),example.toUpperCase()],answer:0,explanation:"The correct line uses normal capitals and end punctuation."},
   {token,prompt:`Word-order rescue: choose the clear “${word}” sentence.`,options:[example,example.split(" ").reverse().join(" "),`${word} because and the.`],answer:0,explanation:"Clear English follows meaningful word order."},
   {token,prompt:`Meaning armour: which sentence protects the meaning of “${word}”?`,options:[example,`The word means ${x[1]}.`,`The word means ${y[1]}.`],answer:0,explanation:"The accurate example protects the meaning."},
   {token,prompt:`Final reef repair: complete “I can use ${word} ...”`,options:[`to communicate ${meaning}.`,`without knowing any meaning.`,`by placing words in random order.`],answer:0,explanation:"Grammar and meaning work together to communicate."},
  ]
 ];
 const selected=banks[game][pos];
 if(isDictation)selected.audioText=word;
 return hinted(shuffled({...selected,prompt:`Path ${stage+1} • Level ${level+1} • Mission ${pos+1}: ${selected.prompt}`},salt),gameHint(game,stage));
}
import {assessmentLessonCount,assessmentPhaseLabel,assessmentVocabulary,assessmentWord,dictationWord} from "./vocabulary.ts";
import {wordVisual} from "./wordVisuals.ts";
import {level1QuizQuestion} from "./level1QuizBank.ts";
import {level2QuizQuestion as level2BankQuestion} from "./level2QuizBank.ts";
import {level3QuizQuestion as level3BankQuestion} from "./level3QuizBank.ts";
import {level4QuizQuestion as level4BankQuestion} from "./level4QuizBank.ts";
import {level5QuizQuestion as level5BankQuestion} from "./level5QuizBank.ts";
import {level6QuizQuestion as level6BankQuestion} from "./level6QuizBank.ts";
import {level7QuizQuestion as level7BankQuestion} from "./level7QuizBank.ts";
