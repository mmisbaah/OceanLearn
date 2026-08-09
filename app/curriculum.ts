export type LearningStage={label:string;grade:number;support:string;words:Array<[string,string,string]>};
export type CurriculumQuestion={prompt:string;options:string[];answer:number;explanation:string;token?:string};

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

const FIRST_ICONS=["🍎","⚽","🐱","🐶","👋","🚪","✅","❌","🙋","👉","🏷️","📘","✏️","🎒","🔴","🔵","1️⃣","2️⃣","🪑","🧍"];
const FIRST_SAY=["A","B","C","D","hello","goodbye","yes","no","I","you","name","book","pencil","bag","red","blue","one","two","sit","stand"];

function firstChoices(set:number){
 const a=set,b=(set+7)%20,c=(set+13)%20;
 return [a,b,c];
}

function foundationQuizQuestion(set:number,pos:number,salt:number):CurriculumQuestion{
 const ids=firstChoices(set),word=FIRST_SAY[set],icon=FIRST_ICONS[set],token=`Q-0-${set}-${pos}`;
 const choices=ids.map(i=>`${FIRST_ICONS[i]} ${FIRST_SAY[i]}`);
 const variants:CurriculumQuestion[]=[
  {token,prompt:`Look. Tap ${word}.`,options:choices,answer:0,explanation:`Yes! ${icon} ${word}.`},
  {token,prompt:`Find the same: ${word}`,options:choices,answer:0,explanation:`Great! You found ${word}.`},
  {token,prompt:`${icon} is ...`,options:ids.map(i=>FIRST_SAY[i]),answer:0,explanation:`${icon} is ${word}.`},
  {token,prompt:`Hear: ${word}. Tap.`,options:choices,answer:0,explanation:`Well done! Say ${word}.`},
  {token,prompt:`One more! Find ${word}.`,options:choices,answer:0,explanation:`Star work! ${icon} ${word}.`},
 ];
 return shuffled(variants[pos],salt);
}

function foundationGameQuestion(game:number,level:number,pos:number,salt:number):CurriculumQuestion{
 const target=(level+game*4)%20,ids=[target,(target+6)%20,(target+11)%20],word=FIRST_SAY[target],icon=FIRST_ICONS[target];
 const token=`G-${game}-0-${level}-${pos}`,lead=["Match","Build","Race","Story","Fix"][game],tag=`${lead} ${level+1}`;
 const choices=ids.map(i=>`${FIRST_ICONS[i]} ${FIRST_SAY[i]}`);
 const prompts=[`${tag}: ${word}.`,`${tag}: Look ${icon}.`,`${tag}: Find ${word}.`,`${tag}: Hear ${word}.`,`${tag}: Last ${word}.`];
 return shuffled({token,prompt:prompts[pos],options:choices,answer:0,explanation:`Yes! ${icon} ${word}.`},salt);
}

export function quizQuestion(stage:number,set:number,pos:number,salt:number):CurriculumQuestion{
 if(stage===0)return foundationQuizQuestion(set,pos,salt);
 const s=STAGES[stage], [word,meaning,example]=s.words[set];
 const a=s.words[(set+7)%20],b=s.words[(set+13)%20];
 const band=set<7?"Foundation":set<14?"Application":"Challenge";
 const token=`Q-${stage}-${set}-${pos}`;
 const variants:CurriculumQuestion[]=[
  {token,prompt:`${band} ${set+1}: What does “${word}” mean?`,options:[meaning,a[1],b[1]],answer:0,explanation:`“${word}” means ${meaning}.`},
  {token,prompt:`${band} ${set+1}: Which example uses “${word}” correctly?`,options:[example,`The ${word} quickly blue.`,`Because ${word} and.`],answer:0,explanation:`“${example}” is complete and shows the meaning in context.`},
  {token,prompt:`${band} ${set+1}: Which clue best teaches “${word}”?`,options:[`${word}: ${meaning}`,`${word}: the number 900`,`${word}: no meaning at all`],answer:0,explanation:"A useful clue gives a clear, accurate meaning."},
  {token,prompt:`${band} ${set+1}: Choose the best learning sentence for “${word}”.`,options:[`I can explain and use “${word}”.`,`I skip “${word}” without reading.`,`I copy “${word}” but never check it.`],answer:0,explanation:"Explaining and using a word demonstrates understanding."},
  {token,prompt:`${band} ${set+1}: Which answer proves understanding of “${word}”?`,options:[`It means ${meaning}; for example: ${example}`,`It is always the same as “${a[0]}”.`,`It cannot be used in English.`],answer:0,explanation:"A meaning plus an accurate example is strong evidence of understanding."},
 ];
 return shuffled(variants[pos],salt);
}

export function gameQuestion(game:number,stage:number,level:number,pos:number,salt:number):CurriculumQuestion{
 if(stage===0)return foundationGameQuestion(game,level,pos,salt);
 const s=STAGES[stage], idx=level%20,[word,meaning,example]=s.words[idx];
 const x=s.words[(idx+5)%20],y=s.words[(idx+11)%20],token=`G-${game}-${stage}-${level}-${pos}`;
 const miss=word.length>2?word.slice(0,-1):word+"x",first=word[0].toUpperCase();
 const banks:CurriculumQuestion[][]=[
  [
   {token,prompt:`Meaning pearl: match “${word}”.`,options:[meaning,x[1],y[1]],answer:0,explanation:`“${word}” means ${meaning}.`},
   {token,prompt:`Example shell: find the line using “${word}” well.`,options:[example,`The ${word} quickly blue.`,`Because ${word} and.`],answer:0,explanation:"The complete example uses the word meaningfully."},
   {token,prompt:`Reverse match: which word means “${meaning}”?`,options:[word,x[0],y[0]],answer:0,explanation:`The matching word is “${word}”.`},
   {token,prompt:`Clue bubble: which clue belongs with “${word}”?`,options:[`${meaning} - ${example}`,`${x[1]} - ${x[2]}`,`${y[1]} - ${y[2]}`],answer:0,explanation:"The winning bubble gives both the right meaning and example."},
   {token,prompt:`Treasure proof: which card proves “${word}” is understood?`,options:[`I know it means ${meaning}.`,`I skip the word without reading.`,`I say every word means ${x[1]}.`],answer:0,explanation:"Explaining the accurate meaning proves understanding."},
  ],[
   {token,prompt:`Spelling beacon: build the word meaning “${meaning}”.`,options:[word,miss,word+"e"],answer:0,explanation:`The correct spelling is “${word}”.`},
   {token,prompt:`First-sound flight: which letter launches “${word}”?`,options:[first,x[0][0].toUpperCase(),y[0][0].toUpperCase()],answer:0,explanation:`“${word}” begins with ${first}.`},
   {token,prompt:`Missing-piece hive: complete “${miss}_” to make the target word.`,options:[word,miss,x[0]],answer:0,explanation:`The completed word is “${word}”.`},
   {token,prompt:`Word-shape challenge: choose the exact spelling used in this line: ${example}`,options:[word,word+word.slice(-1),miss],answer:0,explanation:`The example uses “${word}”.`},
   {token,prompt:`Bee check: which spelling matches “${meaning}”?`,options:[word,miss+"e",word+"h"],answer:0,explanation:`“${word}” carries that meaning.`},
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
 return shuffled(banks[game][pos],salt);
}
