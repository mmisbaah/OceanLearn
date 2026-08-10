import {curriculumFocusEntry,quizQuestion as multipleChoiceQuestion,type CurriculumQuestion} from "./curriculum.ts";
import {assessmentPhaseLabel,assessmentWord} from "./vocabulary.ts";
import {maldivianQuizPassage} from "./storyEngine.ts";

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
export function generateQuizQuestion(stage:number,set:number,pos:number,salt:number,learnerGrade:number):QuizQuestion{
 const type=questionTypePlan(learnerGrade)[pos],[word,meaning,example]=wordAt(stage,set,pos),token=`QE-${stage}-${set}-${pos}`,scope=assessmentPhaseLabel(set);
 if(type==="dictation"){
  const heard=assessmentWord(stage,set,pos,4);
  return hinted({type,token,prompt:`${scope} • Level ${set+1}: Listen and type the word.`,audioText:heard,acceptedAnswers:[heard],placeholder:"Type the word",options:[],answer:0,explanation:`The word is “${heard}”.`},`Listen again. The word has ${heard.length} letters and begins with “${heard[0]}”.`);
 }
 if(type==="fill-blank")return hinted({type,token,prompt:`${scope} • Level ${set+1}: Complete the focus word: ${word.slice(0,-1)}_.`,acceptedAnswers:[word],placeholder:"Type the complete word",options:[],answer:0,explanation:`The completed word is “${word}”.`},`Read the letters from left to right. The word means ${meaning}.`);
 if(type==="reading-comprehension"){
  const other=assessmentWord(stage,set,pos+1,5),third=assessmentWord(stage,set,pos+2,6);
  const passage=maldivianQuizPassage(stage,set,pos,word,meaning,example);
  const base:QuizQuestion={type,token,prompt:`${scope} • Level ${set+1}: Which English word or skill did the children practise?`,passage,options:[word,other,third],answer:0,explanation:`The passage says the class practised “${word}”.`};
  const mixed=multipleChoiceQuestion(stage,set,4,salt);const answer=mixed.answer;
  const wrong=mixed.options.filter((_,i)=>i!==answer).map((_,i)=>[other,third][i]);
  const options=[...wrong];options.splice(answer,0,word);return hinted({...base,options,answer},"Look for the sentence that explains the class activity. It names the English focus.");
 }
 return {...multipleChoiceQuestion(stage,set,pos,salt),type:"multiple-choice"};
}
export function generateQuizSet(stage:number,set:number,salt:number,learnerGrade:number):QuizSet{return {id:`quiz-${stage}-${set}`,grade:learnerGrade,stage,questions:Array.from({length:5},(_,pos)=>generateQuizQuestion(stage,set,pos,salt,learnerGrade))}}
