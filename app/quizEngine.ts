import {STAGES,quizQuestion as multipleChoiceQuestion,type CurriculumQuestion} from "./curriculum";
import {quizVocabulary} from "./vocabulary";
import {maldivianQuizPassage} from "./storyEngine";

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

function wordAt(stage:number,set:number){return STAGES[stage].words[set%20]}
export function generateQuizQuestion(stage:number,set:number,pos:number,salt:number,learnerGrade:number):QuizQuestion{
 const type=questionTypePlan(learnerGrade)[pos],[word,meaning,example]=wordAt(stage,set),token=`QE-${stage}-${set}-${pos}`;
 if(type==="dictation"){
  const heard=quizVocabulary(stage,set,pos);
  return hinted({type,token,prompt:`Set ${set+1}: Listen and type the word.`,audioText:heard,acceptedAnswers:[heard],placeholder:"Type the word",options:[],answer:0,explanation:`The word is “${heard}”.`},`Listen again. The word has ${heard.length} letters and begins with “${heard[0]}”.`);
 }
 if(type==="fill-blank")return hinted({type,token,prompt:`Set ${set+1}: Aminath sees a ___ near the island.`,acceptedAnswers:[word],placeholder:"Type the missing word",options:[],answer:0,explanation:`The missing word is “${word}”.`},"Read the whole sentence aloud. Use the island clue and choose the word that makes sense.");
 if(type==="reading-comprehension"){
  const other=STAGES[stage].words[(set+7)%20][0],third=STAGES[stage].words[(set+13)%20][0];
  const passage=maldivianQuizPassage(stage,set,pos,word);
  const base:QuizQuestion={type,token,prompt:`Set ${set+1}: What did the children notice?`,passage,options:[word,other,third],answer:0,explanation:`The passage says they noticed “${word}”.`};
  const mixed=multipleChoiceQuestion(stage,set,4,salt);const answer=mixed.answer;
  const wrong=mixed.options.filter((_,i)=>i!==answer).map((_,i)=>[other,third][i]);
  const options=[...wrong];options.splice(answer,0,word);return hinted({...base,options,answer},"Look back at the last sentence of the island story. It names the special word.");
 }
 return {...multipleChoiceQuestion(stage,set,pos,salt),type:"multiple-choice"};
}
export function generateQuizSet(stage:number,set:number,salt:number,learnerGrade:number):QuizSet{return {id:`quiz-${stage}-${set}`,grade:learnerGrade,stage,questions:Array.from({length:5},(_,pos)=>generateQuizQuestion(stage,set,pos,salt,learnerGrade))}}
