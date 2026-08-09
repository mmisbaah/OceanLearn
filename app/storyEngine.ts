const NAMES=["Aminath","Hassan","Mariyam","Ali","Shifa","Nihan","Reema","Zayan","Aisha","Ibrahim"];
const PLACES=["lagoon","reef","island beach","school jetty","coconut grove","dhoni harbour","palm garden","atoll library","fish market","coral shore"];
const CREATURES=["crab","turtle","gecko","heron","dolphin","fruit bat","octopus","tiny reef fish"];
const ANTICS=["wears a leaf like a hat","taps a shell as if it is a drum","tries to carry a pencil sideways","peeks into a lunch box","sneezes when a feather tickles its nose","chases a rolling coconut","waves at its own reflection","hides behind a very small shell","dances when the dhoni bell rings","guards a banana as if it is treasure"];
const ACTIONS=["looks carefully","listens twice","says the new words","matches each clue","draws what happened","reads the sign","asks a clear question","shares one good detail"];

const safeTopic=(topic:string)=>topic.replace(/[.?!]+$/g,"").trim();
function identity(index:number){return {name:NAMES[index%NAMES.length],place:PLACES[Math.floor(index/NAMES.length)%PLACES.length],creature:CREATURES[Math.floor(index/(NAMES.length*PLACES.length))%CREATURES.length],antic:ANTICS[(index*7+3)%ANTICS.length],action:ACTIONS[(index*5+1)%ACTIONS.length]}}

export function maldivianLessonStory(stage:number,lesson:number,step:number,topic:string):string[]{
 const id=stage*100+lesson*5+step,{name,place,creature,antic,action}=identity(id),focus=safeTopic(topic);
 const lines=[`${name} learns about ${focus} beside the ${place}.`,`A ${creature} ${antic}, and ${name} laughs.`,`${name} ${action} and shows the ${creature} the right answer.`];
 if(stage>=3)lines.push(`Back at the island school, the class uses a detail from the adventure to explain ${focus}.`);
 if(stage>=5)lines.push("Everyone agrees that even a silly moment can become useful evidence when it is described clearly.");
 return lines;
}

export function maldivianLessonParagraphs(stage:number,lesson:number,step:number,topic:string):string[]{
 const id=stage*100+lesson*5+step,{name,place,creature,action}=identity(id),focus=safeTopic(topic);
 if(stage===0)return [`Look at the island picture. Hear the words for ${focus}.`,`${name} will ${action} by the ${place}. You can copy ${name}.`];
 if(stage<=2)return [`Today ${name} practises ${focus} near the ${place}. Read one short part at a time.`,`Look for the ${creature}, say the key words, and then try the small challenge.`];
 if(stage<=4)return [`In this Maldivian island lesson, ${name} uses ${focus} while visiting the ${place}.`,`Read the funny event, identify its important detail, and use that detail in your own clear sentence.`];
 return [`This island adventure helps ${name} study ${focus} in the familiar setting of the ${place}.`,`Read for meaning, notice how the ${creature} changes the event, and support your response with precise evidence from the passage.`];
}

export function maldivianQuizPassage(stage:number,set:number,pos:number,focusWord:string):string{
 const id=600+stage*40+set*2+(pos===3?1:0),{name,place,creature,antic}=identity(id),word=safeTopic(focusWord),grade=[1,1,2,3,4,5,5][stage]??5;
 const lines=[`${name} travels to the ${place} and notices the word “${word}” on an island learning card.`,`A ${creature} ${antic}, so ${name} giggles but keeps the card safe.`,`At school, ${name} tells the class that the special word was “${word}”.`];
 if(grade>=4)lines.push("The class checks the details and explains how the funny event helped everyone remember the word.");
 if(grade>=5)lines.push("Their teacher asks for evidence, and the children point to the card and the creature's surprising action.");
 return lines.join(" ");
}
