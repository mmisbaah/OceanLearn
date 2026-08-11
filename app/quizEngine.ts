import {curriculumFocusEntry,foundationDictationLetter,quizQuestion as multipleChoiceQuestion,type CurriculumQuestion} from "./curriculum.ts";
import {assessmentPhaseLabel,assessmentVocabulary,assessmentWord,dictationWord} from "./vocabulary.ts";
import {maldivianQuizPassage} from "./storyEngine.ts";
import {LEVEL3_DICTATION_WORDS} from "./level3QuizBank.ts";
import {LEVEL4_DICTATION_WORDS} from "./level4QuizBank.ts";
import {LEVEL5_DICTATION_WORDS} from "./level5QuizBank.ts";
import {LEVEL6_DICTATION_WORDS} from "./level6QuizBank.ts";
import {LEVEL7_DICTATION_WORDS} from "./level7QuizBank.ts";

export type QuestionType="dictation"|"multiple-choice"|"fill-blank"|"reading-comprehension";
export type QuizQuestion=CurriculumQuestion&{type:QuestionType;audioText?:string;passage?:string;acceptedAnswers?:string[];placeholder?:string};
export type QuizSet={id:string;grade:number;stage:number;questions:QuizQuestion[]};

const PLANS:Record<number,QuestionType[]>={
 1:["dictation","multiple-choice","dictation","multiple-choice","multiple-choice"],
 2:["dictation","multiple-choice","fill-blank","dictation","fill-blank"],
 3:["reading-comprehension","dictation","fill-blank","reading-comprehension","multiple-choice"],
};
export const questionTypePlan=(grade:number)=>PLANS[Math.min(3,Math.max(1,grade))];
const hinted=(question:QuizQuestion,hint:string):QuizQuestion=>({...question,prompt:`${question.prompt}\n💡 Hint: ${hint}`});

function wordAt(stage:number,set:number,pos:number){return curriculumFocusEntry(stage,set,pos)}
function generateQuizQuestionBase(stage:number,set:number,pos:number,salt:number,learnerGrade:number):QuizQuestion{
 const type=questionTypePlan(learnerGrade)[pos];
 if(stage===0){
  const base=multipleChoiceQuestion(0,set,pos,salt),heard=base.audioText??base.options[base.answer];
  return {...base,type,audioText:type==="dictation"?heard:undefined};
 }
 if(stage===1){
  const base=multipleChoiceQuestion(1,set,pos,salt),correct=base.options[base.answer],heard=base.audioText??correct;
  if(type==="fill-blank")return {...base,type,options:[],acceptedAnswers:[correct],placeholder:"Type the missing word"};
  return {...base,type,audioText:type==="dictation"?heard:undefined};
 }
 if(stage===2){
  const base=multipleChoiceQuestion(2,set,pos,salt),correct=base.options[base.answer];
  if(type==="dictation"){
   const heard=LEVEL3_DICTATION_WORDS[set]?.[pos]??correct;
   return {...base,type,audioText:heard,options:[],acceptedAnswers:[heard],placeholder:"Type the word"};
  }
  if(type==="fill-blank")return {...base,type,options:[],acceptedAnswers:[correct],placeholder:"Type the missing word"};
  if(type==="reading-comprehension")return {...base,type,passage:(base as QuizQuestion).passage??maldivianQuizPassage(2,set,pos,correct,"the focus idea",base.explanation)};
  return {...base,type};
 }
 if(stage===3){
  const base=multipleChoiceQuestion(3,set,pos,salt),correct=base.options[base.answer];
  if(type==="dictation"){
   const heard=LEVEL4_DICTATION_WORDS[set]?.[pos]??correct;
   return {...base,type,audioText:heard,options:[],acceptedAnswers:[heard],placeholder:"Type the word"};
  }
  if(type==="fill-blank")return {...base,type,options:[],acceptedAnswers:[correct],placeholder:"Type the missing word"};
  if(type==="reading-comprehension"){
   const supplied=(base as QuizQuestion).passage;
   return {...base,type,passage:supplied&&supplied.length>80?supplied:maldivianQuizPassage(3,set,pos,correct,"the focus idea",base.explanation)};
  }
  return {...base,type};
 }
 if(stage===4){
  const base=multipleChoiceQuestion(4,set,pos,salt),correct=base.options[base.answer];
  if(type==="dictation"){const heard=LEVEL5_DICTATION_WORDS[set]??correct;return {...base,type,audioText:heard,options:[],acceptedAnswers:[heard],placeholder:"Type the word"};}
  if(type==="fill-blank")return {...base,type,options:[],acceptedAnswers:[correct],placeholder:"Type the missing word"};
  if(type==="reading-comprehension"){const supplied=(base as QuizQuestion).passage;return {...base,type,passage:supplied&&supplied.length>100?`${supplied} Reading focus ${pos+1}: ${base.explanation}`:maldivianQuizPassage(4,set,pos,correct,"the focus idea",base.explanation)};}
  return {...base,type};
 }
 if(stage===5){
  const base=multipleChoiceQuestion(5,set,pos,salt),correct=base.options[base.answer];
  if(type==="dictation"){const heard=LEVEL6_DICTATION_WORDS[set]??correct;return {...base,type,audioText:heard,options:[],acceptedAnswers:[heard],placeholder:"Type the word"};}
  if(type==="fill-blank")return {...base,type,options:[],acceptedAnswers:[correct],placeholder:"Type the missing word"};
  if(type==="reading-comprehension"){const supplied=(base as QuizQuestion).passage;return {...base,type,passage:supplied&&supplied.length>120?`${supplied} Reading focus ${pos+1}: ${base.explanation}`:maldivianQuizPassage(5,set,pos,correct,"the focus idea",base.explanation)};}
  return {...base,type};
 }
 if(stage===6){
  const base=multipleChoiceQuestion(6,set,pos,salt),correct=base.options[base.answer];
  if(type==="dictation"){const heard=LEVEL7_DICTATION_WORDS[set]??correct;return {...base,type,audioText:heard,options:[],acceptedAnswers:[heard],placeholder:"Type the word"};}
  if(type==="fill-blank")return {...base,type,options:[],acceptedAnswers:[correct],placeholder:"Type the missing word"};
  if(type==="reading-comprehension"){const supplied=(base as QuizQuestion).passage;return {...base,type,passage:supplied&&supplied.length>140?`${supplied} Reading focus ${pos+1}: ${base.explanation}`:maldivianQuizPassage(6,set,pos,correct,"the focus idea",base.explanation)};}
  return {...base,type};
 }
 const [word,meaning,example]=wordAt(stage,set,pos),token=`QE-${stage}-${set}-${pos}`,scope=assessmentPhaseLabel(set);
 if(type==="dictation"){
  const lettersOnly=stage===0&&set<7,level2Pool=stage===1?assessmentVocabulary(1,set).filter(item=>/^[a-z]{1,6}$/i.test(item)):[],heard=lettersOnly?foundationDictationLetter(set,pos):stage===0?assessmentWord(0,set,pos,4):stage===1?level2Pool[(set*3+pos)%level2Pool.length]:dictationWord(stage,set,pos,4);
  if(stage===0){
   const base=multipleChoiceQuestion(stage,set,pos,salt);
   const options=lettersOnly?base.options:[heard,...base.options.filter(item=>item.toLowerCase()!==heard.toLowerCase())].slice(0,3);
   const answer=options.findIndex(item=>item.toLowerCase()===heard.toLowerCase());
   return hinted({type,token,prompt:`${scope} • Level ${set+1}: Listen. Tap the ${lettersOnly?"letter":"picture word"}.`,audioText:heard,options,answer,explanation:`Yes! ${heard}.`},lettersOnly?"Hear the sound again. Look at the three letters.":"Hear the word again. Look at the three pictures.");
  }
  return hinted({type,token,prompt:`${scope} • Level ${set+1} • Question ${pos+1}: Listen and type the ${lettersOnly?"letter":"word"}.`,audioText:heard,acceptedAnswers:[heard],placeholder:`Type the ${lettersOnly?"letter":"word"}`,options:[],answer:0,explanation:`The ${lettersOnly?"letter":"word"} is “${heard}”.`},lettersOnly?"Listen again. Type the one letter you hear.":`Listen again. The word has ${heard.length} letters and begins with “${heard[0]}”.`);
 }
 if(type==="fill-blank")return hinted({type,token,prompt:`${scope} • Level ${set+1}: Complete the focus word: ${word.slice(0,-1)}_.`,acceptedAnswers:[word],placeholder:"Type the complete word",options:[],answer:0,explanation:`The completed word is “${word}”.`},`Read the letters from left to right. The word means ${meaning}.`);
 if(type==="reading-comprehension"){
  const other=assessmentWord(stage,set,pos+1,5),third=assessmentWord(stage,set,pos+2,6);
  const passage=maldivianQuizPassage(stage,set,pos,word,meaning,example);
  const base:QuizQuestion={type,token,prompt:`${scope} • Level ${set+1} • Question ${pos+1}: Which English word or skill did the children practise?`,passage,options:[word,other,third],answer:0,explanation:`The passage says the class practised “${word}”.`};
  const mixed=multipleChoiceQuestion(stage,set,4,salt);const answer=mixed.answer;
  const wrong=mixed.options.filter((_,i)=>i!==answer).map((_,i)=>[other,third][i]);
  const options=[...wrong];options.splice(answer,0,word);return hinted({...base,options,answer},"Look for the sentence that explains the class activity. It names the English focus.");
 }
 return {...multipleChoiceQuestion(stage,set,pos,salt),type:"multiple-choice"};
}

function questionHint(question:QuizQuestion,stage:number){
 if(question.type==="dictation")return "Play the word again. Say each sound slowly before you answer.";
 if(question.type==="fill-blank")return "Read the whole line. Use the letters and meaning around the blank.";
 if(question.type==="reading-comprehension")return "Look back at the passage. Find the sentence or detail that proves your choice.";
 return stage<2?"Look carefully and say every choice before you tap.":"Find the key word, then compare all three choices.";
}

export function generateQuizQuestion(stage:number,set:number,pos:number,salt:number,learnerGrade:number):QuizQuestion{
 const question=generateQuizQuestionBase(stage,set,pos,salt,learnerGrade);
 return question.prompt.includes("\n💡 Hint: ")?question:hinted(question,questionHint(question,stage));
}
export function generateQuizSet(stage:number,set:number,salt:number,learnerGrade:number):QuizSet{return {id:`quiz-${stage}-${set}`,grade:learnerGrade,stage,questions:Array.from({length:5},(_,pos)=>generateQuizQuestion(stage,set,pos,salt,learnerGrade))}}
