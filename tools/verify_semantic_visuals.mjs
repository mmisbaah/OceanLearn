import assert from "node:assert/strict";
import {wordVisual} from "../app/wordVisuals.ts";

const foundationWords=["apple","ball","cat","dog","egg","fish","gift","house","island","juice","key","lion","moon","nest","octopus","palm","queen","rabbit","sun","turtle","umbrella","van","wave","x-ray","yo-yo","zebra"];
for(const word of foundationWords){
 const visual=wordVisual(word);
 assert.notEqual(visual.icon,"💡",`${word} uses an unrelated bulb picture`);
 assert.match(visual.picture,new RegExp(word.replace("x-ray","x-ray").replace("yo-yo","yo-yo"),"i"),`${word} picture description is not semantic`);
}
assert.equal(wordVisual("ball").icon,"⚽","ball must show a ball");
assert.equal(wordVisual("apple").icon,"🍎","apple must show an apple");
console.log(JSON.stringify({checked:foundationWords.length,ball:wordVisual("ball"),fallback:wordVisual("unmapped-learning-word")},null,2));
