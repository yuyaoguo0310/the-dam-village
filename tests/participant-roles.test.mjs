import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {GROUPS as backendGroups} from '../engine.mjs';
const html=readFileSync(new URL('../app.js',import.meta.url),'utf8');
const declarations=html.slice(html.indexOf('const GROUPS='),html.indexOf('const PROMPTS='));
const guide=html.slice(html.indexOf('const ROLE_ARGUMENTS='),html.indexOf('function studentView(){'));
const participant=html.slice(html.indexOf('function studentView(){'),html.indexOf('function futurePanels(){'));
const render=new Function('state',declarations+guide+participant+`const PROMPTS=[];let conditionEditingKey=null;const conditionDrafts=new Map();const esc=s=>String(s).replaceAll('&','&amp;');const timer=()=>'';const footer=()=>'';const futurePanels=()=>'';return {html:studentView(),groups:GROUPS};`);
function state(kind,g){return {code:'ABC123',phase:'lobby',me:{kind,group:g,name:'Participant',id:'one',votes:[null,null]},roster:[{kind,group:g,name:'Participant',id:'one'}],recommendations:['']}}
test('screenshot roles agree across frontend and backend; students receive short cards without supplied arguments',()=>{
 const expected=['Farmers','Hydropower Company','Local Communities','Government Planners'];assert.deepEqual(backendGroups,expected);
 for(let g=0;g<4;g++){const r=render(state('student',g));assert.deepEqual(r.groups,expected);assert(r.html.includes(`Group ${g+1} · ${expected[g]}`));assert(r.html.includes('Priority:'));assert(!r.html.includes('Pros ·'));assert(!r.html.includes('Cons ·'));assert(!r.html.includes('Talking points'));assert(!r.html.includes('Conditions we could ask for'));assert(!r.html.includes('Your stakeholder identity'));}
});
test('each guide receives role-specific pros/cons without a student card or voting controls',()=>{
 for(let g=0;g<4;g++){const r=render(state('guide',g)).html;assert(r.includes(backendGroups[g]+' · Guide'));assert(r.includes('Pros · Potential benefits'));assert(r.includes('Cons · Potential costs and risks'));assert(r.includes('Questions for the other groups'));assert(!r.includes('card role-card'));assert(!r.includes('data-vote='));}
 const community=render(state('guide',2)).html;assert(community.includes('displace residents'));assert(community.includes('local people bear the costs'));
});

test('student pros and cons appear only during the first vote; guides retain arguments',()=>{for(const phase of ['first-vote','discussion','debate','final-vote']){let s=state('student',0);s.phase=phase;const rendered=render(s).html;assert.equal(rendered.includes('Possible pros'),phase==='first-vote');assert.equal(rendered.includes('Possible cons'),phase==='first-vote');s.me.kind='guide';assert(render(s).html.includes('Pros · Potential benefits'));}});
