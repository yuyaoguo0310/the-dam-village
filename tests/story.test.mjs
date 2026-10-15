import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../app.js',import.meta.url),'utf8');const source=html.slice(html.indexOf('function storyPose('),html.indexOf('function updateFuture('));
function scene(reduced=false){const nodes=new Map();for(const id of ['map-shell','fish-performer','story-speech','story-finale']){const flags=new Set();nodes.set('#'+id,{flags,classList:{toggle(k,v){v?flags.add(k):flags.delete(k)}},attrs:{},setAttribute(k,v){this.attrs[k]=v},textContent:'',innerHTML:''})}const logic=new Function('$','matchMedia',source+';return {updateStory}')(id=>nodes.get(id),()=>({matches:reduced}));return {nodes,play:logic.updateStory}}
test('fish collision, finale, and alternate/reset states follow the shared story clock',()=>{
 const {nodes,play}=scene();const shell=nodes.get('#map-shell'),fish=nodes.get('#fish-performer'),speech=nodes.get('#story-speech'),end=nodes.get('#story-finale');
 play(4.8,true,false);assert(shell.flags.has('fish-hit'));assert(!shell.flags.has('fish-exhausted'));assert.match(speech.textContent,/WHO/);
 play(6,true,false);assert(shell.flags.has('fish-hit'));play(9.5,true,false);assert(shell.flags.has('fish-exhausted'));assert.match(fish.attrs.transform,/rotate\(-180\)/);assert.match(end.innerHTML,/got power.*got a wall/);
 const finalPose=fish.attrs.transform;play(40,true,false);assert.equal(fish.attrs.transform,finalPose);
 play(0,false,true);assert(!shell.flags.has('fish-exhausted'));assert(!shell.flags.has('fish-hit'));assert(!end.flags.has('visible'));play(2,false,true);assert(shell.flags.has('cloudy'));play(8,false,true);assert(!shell.flags.has('cloudy'));assert.equal(end.innerHTML,'');assert(!end.flags.has('visible'));
 const restoredPose=fish.attrs.transform;play(8,false,true);assert.equal(fish.attrs.transform,restoredPose);
 play(0,false,false);assert.equal(fish.attrs.transform,'translate(0 0) rotate(0)');assert.equal(speech.textContent,'');assert.equal(end.innerHTML,'');assert(!shell.flags.has('curtain-call'));
 play(0,true,false);assert(!shell.flags.has('fish-exhausted'));assert(!end.flags.has('visible'));
});
test('reduced motion presents complete comic scenes without waiting for the fish journey',()=>{const {nodes,play}=scene(true);play(0,true,false);assert(nodes.get('#map-shell').flags.has('fish-exhausted'));assert(nodes.get('#story-finale').flags.has('visible'));play(0,false,true);assert(!nodes.get('#map-shell').flags.has('fish-exhausted'));assert.equal(nodes.get('#story-finale').innerHTML,'')});
