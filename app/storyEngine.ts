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

export function maldivianQuizPassage(stage:number,set:number,pos:number,focusWord:string,meaning="an English idea",example=""):string{
 const id=600+stage*40+set*2+(pos===3?1:0),{name,place,creature,antic}=identity(id),word=safeTopic(focusWord),grade=[1,1,2,3,4,5,5][stage]??5;
 const scenarios=[
  `${name} edits the island school newspaper beside the ${place}. A ${creature} steals the snack list, so the class writes a funny report about it. Their English focus is “${word}”, which means ${meaning}.`,
  `“Who hid my sandal?” asks ${name} at the ${place}. The clues lead to a ${creature} that ${antic}. The class solves the mini mystery while practising “${word}”: ${meaning}.`,
  `${name} interviews a dhoni captain near the ${place}. Just as the captain explains the sea, a ${creature} ${antic}. In the interview notes, “${word}” is used to mean ${meaning}.`,
  `The class makes instructions for a reef-cleaning day at the ${place}. ${name} adds a warning after a ${creature} tries to sit in the rubbish bag. The writing skill they practise is “${word}”, meaning ${meaning}.`,
  `${name}'s island journal begins with a calm morning at the ${place}. Then a ${creature} ${antic}, and the calm page becomes very silly. The journal lesson practises “${word}”: ${meaning}.`,
  `On school radio, ${name} reports live from the ${place}. A noisy ${creature} keeps interrupting with bubbles and squeaks. The broadcast teaches “${word}”, which means ${meaning}.`,
  `${name} draws a comic about a coconut race near the ${place}. In the last box, a ${creature} wins by moving the wrong way. The comic helps the class learn “${word}”: ${meaning}.`,
  `A letter arrives from a nearby island asking about the ${place}. ${name} writes back, but a ${creature} leaves a sandy footprint beside the signature. The letter activity focuses on “${word}”, meaning ${meaning}.`,
  `${name} follows a treasure map around the ${place}. The final X points to a ${creature} that ${antic}, not to gold. To explain the surprise, the class uses “${word}”: ${meaning}.`,
  `At the island library, ${name} performs a puppet play about the ${place}. The ${creature} puppet forgets its line and asks for a tuna sandwich. The play teaches “${word}”, meaning ${meaning}.`,
  `${name} records the weather near the ${place}. A ${creature} holds a leaf over its head before one drop of rain falls. The class describes the event while learning “${word}”: ${meaning}.`,
  `During a turtle-rescue poster project, ${name} works beside the ${place}. A curious ${creature} sits on the blue paint and leaves tiny prints. The poster lesson practises “${word}”, meaning ${meaning}.`,
  `${name} brings a fruit salad to a picnic at the ${place}. A ${creature} ${antic}, and everyone counts the bananas again. The picnic story is used to study “${word}”: ${meaning}.`,
  `The young reef club observes life near the ${place}. ${name} writes careful field notes while a ${creature} poses like a teacher. Their chosen English skill is “${word}”, meaning ${meaning}.`,
  `${name} rehearses a poem beside the ${place}. Each time the class reaches the last line, a ${creature} makes a funny sound. The poetry task explores “${word}”: ${meaning}.`,
  `The island council asks the class for a clear sign about the ${place}. ${name} tests the sign on a ${creature}, which walks around it twice and sits down. The sign-writing focus is “${word}”, meaning ${meaning}.`,
  `${name} retells a dhoni trip at the ${place}. The story grows wildly until the fish is as big as the school, so friends check the details. They practise “${word}”: ${meaning}.`,
  `A class debate asks how to care for the ${place}. ${name} gives a reason, while a ${creature} appears to vote by raising one fin. The debate skill is “${word}”, meaning ${meaning}.`,
  `${name} creates a picture caption after visiting the ${place}. A ${creature} photobombs every picture by ${antic}. The caption lesson uses “${word}” to mean ${meaning}.`,
  `${name} presents a tiny museum display about island life at the ${place}. The label is straight, but a ${creature} keeps turning the shell upside down. The display helps explain “${word}”: ${meaning}.`,
 ];
 let passage=scenarios[id%scenarios.length];
 if(grade>=4)passage+=` The class checks the real event against this example: ${example||`They explain ${word} clearly.`}`;
 if(grade>=5)passage+=" They support their answer with one precise detail instead of guessing.";
 return passage;
}
