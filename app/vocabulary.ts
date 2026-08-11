export const VOCABULARY_TARGETS=[50,100,200,300,400,500,600] as const;

const WORD_BLOCKS=[
`a I am an and are at away big blue book boy can cat come coconut day dhoni do down eat fish for friend girl go good happy has have he hello help here home in is island it jump lagoon like little look me my name no not on one palm play read red reef run said sand school sea see she sit small sun the this to two up walk want water we what where white with yes you your bag ball bird boat crab dog family food house kind mother pencil shell stand teacher tree turtle wave`,
`after again afternoon air animal around ask baby back banana beach because bed before best black brother brown but call careful chair child circle clean close colour cook daybreak door draw drink early ear east egg eight evening eye face father five flower four from garden give green hand head hear her him his hot how inside kite know left leg light listen long make man mango many morning near new night nine nose now old open orange our out paper pink please rain right seven short sister six sleep slow song star stop table take talk ten thank their there they three today under wash watch who window woman work write yellow`,
`above across activity add address adult almost along answer any arrive art aunt autumn bad bake basket beautiful begin behind below beside better bicycle birthday body bottle box bread breakfast bring build bus busy buy calendar carry centre change chicken city class climb clock clothes cloudy cold collect correct cousin dance dark daughter December different dinner direction doctor dolphin each easy elephant end English enough every example family fishing floor follow Friday full game get glass grandmother grandfather group grow half hard healthy high holiday hospital hour idea important January July June kitchen language large last laugh learn library line lunch map March market May Monday money month more most mouse mouth move much music next November number nurse ocean October office only opposite parent park part party people picture place plant playground point police potato present pretty question quiet ready remember road room round Saturday shop show sing sky smile soft sometimes sound south spell spring story street strong Sunday swim tall thing Thursday time Tuesday turn warm week Wednesday wet winter year young`,
`action adventure agree angry appear April area August author become beginning believe between bright broken brother capital cause century certain changeable chapter character choose classroom clear climate coast compare complete computer continue coral country create culture dangerous decide describe detail diary dictionary discover distance divide during earth east effect energy enjoy environment event everyone explain famous far farmer favourite February field finally finish fire first forest form found future geography government grammar grass happen history however hundred identify imagine include information insect interesting journey kilogram kilometre king land learnable letter local machine main meaning measure message middle minute mountain museum nature neighbour north paragraph past pattern perhaps person planet poem practice prepare problem protect quickly reason recount recycle relative report river safe same science sentence September sequence several shape should simple solution something special subject summer support surface system thousand through together topic transport travel true understand unit usually village visit voice weather west whale while world writer writing`,
`ability accept achieve active actual addition adjective advantage advice afraid against alive already although amount ancient another anybody anything anywhere arrange article attention audience available avoid balance basic battery behaviour bottom branch breathe bridge carefulness category celebrate challenge chance chart choice citizen community condition connect consider contain context continent control conversation copy corner could creative daily decideable degree develop difference difficult discussion disease education electric electricity engine exercise experience experiment fact festival force free fresh friendship general gentle goal grade habitat health heart heat human hundredth increase industry islander knowledge lagoonal least length level locate material matter method modern movement natural necessary notice observe oceanic often opinion order organise original passage peaceful percent period phrase population position possible power predict pressure procedure produce product programme project purpose quickly quietness reach reader record reduce region resource result review safety scientist section select sense series share similar skill source space speech standard state station study success suggest temperature term text theme therefore title tradition understand value variety vehicle view visitor vocabulary weight whole wildlife wonder`,
`accurate analyse argument arrangeable atmosphere authorise awareness bias capacity caption career causeway central claim coherence cohesive communicate communication complex conclusion conflict consequence contrast contribute convince credible credibility critical current data debate definition demonstrate depend description design determine developable evidence evaluate exact explanation expression formal function illustrate imagery independent indicate influence infer inference interpret introduction issue judgement logical media metaphor motivation narrative nuance objective organise paragraphing paraphrase participate perspective persuade persuasive point-of-view principle process pronounce pronunciation publish purposefully quotation reasoned reference reflect reflection register reliable research revise revision rhetoric role scene setting simile solution source-specialist structure summarise summary support symbol technique technology tense thesis tone transition trustworthy viewpoint visual website whereas worthwhile written`,
];

export const MASTER_VOCABULARY=[...new Map(WORD_BLOCKS.flatMap(block=>block.split(/\s+/)).filter(Boolean).map(word=>[word.toLowerCase(),word])).values()];
export function stageVocabulary(stage:number){
 const current=stage===0?GRADE1_EASY_PHONICS_SCHEMA.targetWords:TOPIC_LESSON_WORDS[stage].flat();
 const earlier=stage<=1?FOUNDATION_LESSON_WORDS.flat():[...FOUNDATION_LESSON_WORDS.flat(),...TOPIC_LESSON_WORDS.slice(1,stage).flat(2)];
 const ordered=stage===0?current:[...current,...earlier,...CURRICULUM_VOCABULARY];
 return [...new Map(ordered.map(word=>[word.toLowerCase(),word])).values()].slice(0,VOCABULARY_TARGETS[stage]);
}

const FOUNDATION_LESSON_WORDS=[
 ["apple","ball","cat","dog","egg"],["fish","gift","house","island","juice"],["key","lion","moon","nest","octopus"],["palm","queen","rabbit","sun","turtle"],["umbrella","van","wave","xray","yoyo","zebra"],
 ["hello","goodbye"],["yes","no"],["I","you","name"],["please","thank","help"],["happy","sad"],
 ["sit","stand"],["clap","jump"],["book","pencil"],["bag","home"],["water"],["family"],["mum","dad"],["hello","please"],["happy","sad"],["sit","clap"],
] as const;

export const GRADE1_EASY_PHONICS_SCHEMA={
 phase1:{name:"Alphabet Foundations",letters:"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),words:FOUNDATION_LESSON_WORDS.slice(0,5).flat()},
 phase2:{name:"Oral Language & Social Words",groups:{greetings:["hello","goodbye"],responses:["yes","no"],self:["I","you","name"],polite:["please","thank","help"],feelings:["happy","sad"]}},
 phase3:{name:"Listen, Look & Move",words:["sit","stand","clap","jump","book","pencil","bag","home","water","family","mum","dad"]},
 get targetWords(){return [...this.phase1.words,...Object.values(this.phase2.groups).flat(),...this.phase3.words]},
} as const;

const TOPIC_LESSON_WORDS:string[][][]=[
 [],
 [
  ["hello","name","I","am","friend"],["book","pencil","bag","chair","teacher"],["happy","sad","good","fine","tired"],["cat","bat","mat","cap","map"],
  ["hen","pen","bed","red","ten"],["pig","fin","sit","pin","lip"],["dog","log","pot","top","hop"],["sun","bus","cup","run","fun"],
  ["a","the","is","in","on"],["I","you","my","we","can"],["apple","egg","island","octopus","umbrella"],["in","on","under","box","chair"],
  ["capital","full-stop","sentence","start","end"],["first","then","picture","story","retell"],["draw","label","island","palm","sea"],["read","say","listen","look","check"],
 ],
 [
  ["listen","please","thank","question","answer"],["open","draw","colour","close","show"],["cat","hat","mat","fan","map"],["pig","fin","sit","lip","pin"],
  ["dog","log","hop","top","pot"],["boat","goat","rain","seed","moon"],["family","friend","teacher","neighbour","fisher"],["morning","breakfast","school","lunch","evening"],
  ["story","picture","crab","hat","laugh"],["beginning","middle","ending","first","last"],["yesterday","visited","played","saw","returned"],["one","many","fish","shells","boats"],
  ["who","what","where","when","because"],["because","smile","help","kind","happy"],["before","after","first","next","last"],["read","write","speak","check","share"],
 ],
 [
  ["retell","character","setting","problem","ending"],["adjective","colour","shape","size","texture"],["address","greeting","message","closing","signature"],["date","diary","event","feeling","reflection"],
  ["setting","character","problem","events","solution"],["fact","topic","heading","diagram","caption"],["verse","rhyme","rhythm","image","sound"],["summary","main","important","short","order"],
  ["topic","main-idea","detail","clue","message"],["past","walked","played","visited","saw"],["happy","worried","excited","opinion","because"],["theme","moral","lesson","choice","kindness"],
  ["fact","label","diagram","caption","information"],["voice","volume","pace","pronounce","audience"],["topic-sentence","detail","connective","order","closing"],["retell","describe","letter","diary","paragraph"],
 ],
 [
  ["series","episode","character","setting","continuity"],["mood","tone","feeling","word-choice","atmosphere"],["report","topic","fact","heading","conclusion"],["explain","process","cause","effect","sequence"],
  ["conflict","character","attempt","solution","ending"],["imagery","simile","metaphor","rhythm","verse"],["title","heading","caption","diagram","glossary"],["compare","contrast","similar","different","evidence"],
  ["script","dialogue","stage","expression","audience"],["formal","informal","purpose","audience","language"],["chart","table","data","label","interpret"],["cause","effect","because","therefore","result"],
  ["heading","subheading","diagram","caption","label"],["although","however","therefore","because","meanwhile"],["trait","action","motive","similarity","difference"],["report","explanation","poetry","compare","connective"],
 ],
 [
  ["memoir","memory","event","reflection","chronology"],["opinion","claim","reason","evidence","conclusion"],["media","headline","image","message","audience"],["script","scene","dialogue","direction","performance"],
  ["imagery","metaphor","simile","personification","mood"],["report","research","fact","section","source"],["explanation","process","cause","effect","technical"],["narrative","setting","conflict","climax","resolution"],
  ["discussion","viewpoint","reason","respond","respect"],["evidence","clue","infer","conclusion","justify"],["symbol","object","idea","meaning","theme"],["motivation","goal","choice","action","consequence"],
  ["persuade","claim","reason","evidence","appeal"],["simile","metaphor","idiom","imagery","personification"],["reflect","strength","challenge","improve","goal"],["memoir","opinion","media","inference","reflection"],
 ],
 [
  ["synthesise","source","combine","compare","conclusion"],["nuance","precise","connotation","tone","choice"],["ethos","pathos","logos","audience","persuade"],["credible","author","evidence","date","reliable"],
  ["corroborate","source","agree","conflict","verify"],["ambiguity","uncertain","interpretation","clue","meaning"],["connotation","denotation","association","literal","tone"],["irony","expectation","contrast","outcome","effect"],
  ["foreshadow","hint","future","suspense","prediction"],["perspective","viewpoint","narrator","bias","contrast"],["cohesion","paragraph","transition","reference","flow"],["thesis","claim","scope","argument","position"],
  ["qualify","claim","limit","exception","precision"],["evaluate","evidence","relevance","sufficiency","credibility"],["register","citation","formal","source","reference"],["critical","analyse","evaluate","synthesise","response"],
 ],
];

const CURRICULUM_VOCABULARY=[...new Map([
 ...FOUNDATION_LESSON_WORDS.flat(),
 ...TOPIC_LESSON_WORDS.flat(2),
 ...MASTER_VOCABULARY,
].map(word=>[word.toLowerCase(),word])).values()];

export function lessonVocabulary(stage:number,lesson:number,lessonCount=20){
 const topical=stage===0?FOUNDATION_LESSON_WORDS[lesson]:TOPIC_LESSON_WORDS[stage]?.[lesson];
 if(topical)return [...topical];
 const words=stageVocabulary(stage),start=Math.floor(lesson*words.length/lessonCount),end=Math.floor((lesson+1)*words.length/lessonCount);return words.slice(start,end)
}
export function lessonStepVocabulary(stage:number,lesson:number,step:number,lessonCount=20){const words=lessonVocabulary(stage,lesson,lessonCount);if(words.length<=5)return words.length?[words[step%words.length]]:[];const start=Math.floor(step*words.length/5),end=Math.floor((step+1)*words.length/5);return words.slice(start,end)}
export function quizVocabulary(stage:number,set:number,position:number){const words=stageVocabulary(stage),slot=set*5+position;return words[Math.floor(slot*words.length/100)%words.length]}

export function assessmentPhase(level:number){return level<7?1:level<14?2:3}
export function assessmentPhaseLabel(level:number){return level<7?"Phase 1":level<14?"Phases 1 + 2":"All 3 phases"}
export function lessonPhase(stage:number,lesson:number){const phase1=stage===0?5:6,phase2=stage===0?12:11;return lesson<phase1?1:lesson<phase2?2:3}
export function assessmentLessonCount(stage:number,level:number){
 const total=stage===0?20:16,phase1=stage===0?5:6,phase2=stage===0?12:11;
 if(level<7)return Math.max(1,Math.ceil((level+1)*phase1/7));
 if(level<14)return phase1+Math.ceil((level-6)*(phase2-phase1)/7);
 return phase2+Math.ceil((level-13)*(total-phase2)/6);
}
export function assessmentVocabulary(stage:number,level:number){
 const total=stage===0?20:16,count=assessmentLessonCount(stage,level);
 return [...new Map(Array.from({length:count},(_,lesson)=>lessonVocabulary(stage,lesson,total)).flat().map(word=>[word.toLowerCase(),word])).values()];
}
export function assessmentWord(stage:number,level:number,position:number,channel=0){
 const words=assessmentVocabulary(stage,level);
 return words[(level*11+position*7+channel*13)%words.length];
}

const G1_EASY_DICTATION=[
 "am","an","at","big","boy","bus","can","cat","cup","day","dog","ear","eat","egg",
 "book","ball","bird","boat","blue","clap","crab","door","fish","gift","good","home",
 "fin","go","hat","hen","hot","leg","log","jump","kind","look","moon","name","palm"
];
const ISLAND_FRIENDLY=["sea","sun","reef","sand","fish","palm","crab","boat","dhoni","island","lagoon","shell","wave","rain","beach","mango","coconut","dolphin","turtle","starfish","harbour","fisher","sailing","islander","sandbank"];
const FRIENDLY_SOURCE=[...ISLAND_FRIENDLY,...WORD_BLOCKS.slice(0,3).flatMap(block=>block.split(/\s+/))];
const usedDictation=new Set(G1_EASY_DICTATION.map(word=>word.toLowerCase()));
function takeDictationWords(count:number,maxLength:number){
 const words=[] as string[];
 for(const word of FRIENDLY_SOURCE){
  const key=word.toLowerCase();
  if(!/^[a-z]+$/i.test(word)||word.length>maxLength||usedDictation.has(key))continue;
  usedDictation.add(key);words.push(word);
  if(words.length===count)return words;
 }
 throw new Error(`Not enough unique child-friendly dictation words up to ${maxLength} letters`);
}
const DICTATION_STAGE_POOLS=[G1_EASY_DICTATION,takeDictationWords(60,6),takeDictationWords(60,6),takeDictationWords(60,8),takeDictationWords(60,8),takeDictationWords(60,99),takeDictationWords(60,99)];

export function dictationWord(stage:number,level:number,position:number,channel=0){
 const game=channel===21;
 const slot=stage===0?(game?26+(level-7):level<14?(level-7)*2+(position===0?0:1):14+(level-14)*2+(position===0?0:1)):stage>=1?(game?40+level:level*2+(position===0?0:1)):0;
 return DICTATION_STAGE_POOLS[stage][slot];
}
