import {X as React} from '../../vendor/react-runtime.js';
const h=React.createElement,ink='#3D2B23';
// Shared by the table and receipt. It depicts what remains after eating, never changes the meal.
export function LeftoversArt({game,state={},api}) {
 const soup=game==='hotpot'||game==='malatang',bbq=game==='bbq',tea=game==='tea';
 const color=soup?({'麻辣红汤':'#CF7854','番茄浓汤':'#DA9874','菌菇汤':'#BEA17C'}[state.broth]||'#DFC99C'):'#F6E8CD';
 return h('svg',{viewBox:'0 0 360 170',className:'leftovers-art',role:'img','aria-label':tea?'空杯底留着几颗小料':bbq?'空盘上留着竹签和调料':soup?'碗底留着温热的汤和葱花':'盘上留着几片饼屑'},
 h('ellipse',{cx:180,cy:135,rx:129,ry:10,fill:'#AA8560',opacity:.13}),
 tea?h('g',{fill:'#F4E8D1',stroke:ink,strokeWidth:2.5},h('path',{d:'M127 17 L140 132 Q180 145 220 132 L233 17 Z'}),h('ellipse',{cx:180,cy:17,rx:53,ry:10}),h('path',{d:'M140 117 Q180 127 220 117 L220 132 Q180 145 140 132Z',fill:'#DEC7A0'}),...(state.toppings?.length?[0,1,2,3,4]:[]).map(n=>h('circle',{key:n,cx:155+n*12,cy:129-(n%2)*5,r:4,fill:'#675044',strokeWidth:1})),h('path',{d:'M195 122 L214 6',fill:'none',stroke:'#BD98A3',strokeWidth:7})):
 h('g',{stroke:ink,strokeWidth:2.5,strokeLinecap:'round',strokeLinejoin:'round'},soup?h('path',{d:'M49 77 Q65 143 180 145 Q295 143 311 77 Z',fill:'#DEC49E'}):null,h('ellipse',{cx:180,cy:77,rx:132,ry:48,fill:color,'data-soup-level':state.soupLevel||0}),h('ellipse',{cx:180,cy:77,rx:114,ry:35,fill:'none',stroke:'#B99A72',strokeWidth:1.5}),
 ...(bbq?Array.from({length:Math.min(6,state.items?.length||3)},(_,n)=>h('path',{key:n,d:`M${99+n*24} 52 l${34-n*9} 58`,stroke:'#AA8050',strokeWidth:4})):soup?[0,1,2,3,4].map(n=>h('path',{key:n,d:`M${121+n*27} ${72+n%2*14} l8 -4`,stroke:'#7D965A',strokeWidth:3})):[0,1,2,3,4,5,6].map(n=>h('path',{key:n,d:`M${105+n*23} ${65+n%3*13} l5 -2 l2 4 z`,fill:'#C99B57',strokeWidth:1}))),
 soup&&h('path',{d:'M152 36 q-6 -9 0 -18 M204 34 q-6 -9 0 -18',fill:'none',stroke:'#A48B74',strokeWidth:2})));
}
