import fs from "node:fs";
import ts from "typescript";

const source=fs.readFileSync(new URL("../app/curriculum.ts",import.meta.url),"utf8");
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}}).outputText;
const curriculum=await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");

const quizPrompts=new Set(),gamePrompts=new Set();
const quizSlots=[],gameSlots=[];
for(let stage=0;stage<7;stage++)for(let set=0;set<20;set++)for(let pos=0;pos<5;pos++){
  const q=curriculum.quizQuestion(stage,set,pos,938475);
  if(quizPrompts.has(q.prompt))throw new Error(`Repeated quiz: ${q.prompt}`);
  quizPrompts.add(q.prompt);quizSlots.push(q.answer);
}
for(let game=0;game<5;game++)for(let stage=0;stage<7;stage++)for(let level=0;level<20;level++)for(let pos=0;pos<5;pos++){
  const q=curriculum.gameQuestion(game,stage,level,pos,472901);
  if(gamePrompts.has(q.prompt))throw new Error(`Repeated game: ${q.prompt}`);
  gamePrompts.add(q.prompt);gameSlots.push(q.answer);
}
function pattern(seq,period){return seq.every((v,i)=>i<period||v===seq[i-period])}
for(const p of [2,3,4,5,6]){
  if(pattern(quizSlots.slice(0,100),p))throw new Error(`Quiz pattern period ${p}`);
  if(pattern(gameSlots.slice(0,100),p))throw new Error(`Game pattern period ${p}`);
}
const mapped=[];for(let grade=1;grade<=5;grade++)mapped.push(curriculum.stageIndex(grade,"medium"));
if(JSON.stringify(mapped)!==JSON.stringify([1,2,3,4,5]))throw new Error("Medium progression failed");
if(curriculum.stageIndex(1,"easy")!==0||curriculum.stageIndex(5,"hard")!==6)throw new Error("Edge progression failed");
if(!app.includes("useEffect(()=>{setStep(0);setAnswerOpen(false)},[index])"))throw new Error("New lesson reset missing");
console.log(JSON.stringify({quizQuestions:quizPrompts.size,gameMissions:gamePrompts.size,quizAnswerSample:quizSlots.slice(0,20),gameAnswerSample:gameSlots.slice(0,20),progression:[0,...mapped,6],lessonReset:"sub-lesson 1"},null,2));
