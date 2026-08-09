import fs from "node:fs";
const app=fs.readFileSync(new URL("../app/OceanLearnApp.tsx",import.meta.url),"utf8");
const match=app.match(/const DICTATION_SPEECH=\[(.*?)\];/s);if(!match)throw new Error("Dictation speech profiles missing");
const ages=[...match[1].matchAll(/age:(\d+)/g)].map(m=>Number(m[1])),rates=[...match[1].matchAll(/rate:([.\d]+)/g)].map(m=>Number(m[1]));
if(ages.join(",")!=="5,6,7,8,9,10,11")throw new Error("Age ladder must cover ages 5-11");
if(rates.length!==7||rates.some((rate,i)=>i>0&&rate<=rates[i-1]))throw new Error("Speech rates must increase gradually");
if(rates[0]>.6||rates[6]>.95)throw new Error("Speech boundary rates are not learner appropriate");
if(!app.includes('voice.lang="en-GB"')||!app.includes("speakDictation(q.audioText??\"\",stage)"))throw new Error("Dictation player does not use staged British-English speech");
console.log(JSON.stringify({ages,rates,language:"en-GB",dictationOnly:true},null,2));
