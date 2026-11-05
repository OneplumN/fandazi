import {X as React} from '../../vendor/react-runtime.js';
const h=React.createElement,ink='#3D2B23',line={stroke:ink,strokeWidth:2.5,strokeLinecap:'round',strokeLinejoin:'round'};
const path=(d,fill,props={})=>h('path',{...line,d,fill,...props});
function mix(a,b,t){const rgb=c=>[1,3,5].map(n=>parseInt(c.slice(n,n+2),16));return '#'+rgb(a).map((v,i)=>Math.round(v*(1-t)+rgb(b)[i]*t).toString(16).padStart(2,'0')).join('');}
export function IngredientArt({id,size=56}) {
 let shape;
 switch(id){
 case 'lettuce':shape=h('g',null,path('M10 44 Q2 32 15 28 Q8 12 25 17 Q31 4 39 18 Q56 9 52 29 Q66 37 50 48 L31 57 Z','#94AC69'),path('M18 27 L33 48 M42 23 L33 48','none',{stroke:'#65814C',strokeWidth:2}));break;
 case 'huotuichang':shape=h('g',null,...[0,1,2].map(n=>path(`M${13+n*12} 13 l7 -3 l8 39 l-7 3 Z`,'#D69379',{key:n})));break;
 case 'peigen':shape=h('g',null,...[0,1].map(n=>h('g',{key:n,transform:`translate(${n*20} 0)`},path('M10 12 Q20 5 22 16 L28 49 Q20 58 17 46 Z','#BE7A61'),path('M16 17 L22 46','none',{stroke:'#EDD0A7',strokeWidth:4}))));break;
 case 'huanggua':case 'xihulu':shape=h('g',null,...[0,1,2].map(n=>h('g',{key:n,transform:`translate(${n*12} ${n%2*6})`},path('M11 12 L18 10 L23 47 L16 50 Z',id==='huanggua'?'#73945F':'#9DAD76'),path('M15 16 L20 44','none',{stroke:'#DCE0AD',strokeWidth:3}))));break;
 case 'dougan':shape=h('g',null,...[0,1,2].map(n=>path(`M${10+n*14} 17 l10 -2 l3 32 l-10 2 Z`,'#D9B06D',{key:n})));break;
 case 'jixiongrou':shape=h('g',null,...[0,1,2].map(n=>h('g',{key:n,transform:`translate(${n*13} 0)`},path('M8 21 L17 11 L24 45 L15 52 Z','#E4C38F'),path('M14 22 L18 42','none',{stroke:'#A27B4F',strokeWidth:2}))));break;
 default:shape=h('g',null,...[0,1].map(n=>h('g',{key:n,transform:`translate(${n*23} 0)`},path('M8 16 Q14 4 21 14 L24 48 Q16 60 10 48 Z','#DDB567'),path('M15 17 L17 46','none',{stroke:'#A67F42',strokeWidth:2}))));
 }
 return h('svg',{width:size,height:size,viewBox:'0 0 64 64','aria-hidden':true,className:'breakfast-ingredient','data-ingredient':id},shape);
}
export function CupTopping({id,x,y,color,enter=true}) {
 let shape;
 if(id==='pearl'||id==='bean')shape=h('ellipse',{...line,cx:0,cy:0,rx:id==='bean'?4:4.5,ry:id==='bean'?6:4.5,fill:color,strokeWidth:1.2});
 else if(id==='taro')shape=path('M-7 4 Q-12 -4 -4 -5 Q-6 -10 2 -9 Q10 -9 8 -1 Q14 6 4 8 Z',color,{strokeWidth:1.2});
 else if(id==='pudding')shape=path('M-7 -7 H5 L9 7 Q0 11 -10 7 Z',color,{strokeWidth:1.2});
 else shape=h('rect',{...line,x:-5,y:-5,width:id==='coconut'?7:10,height:id==='coconut'?14:10,rx:1.5,fill:color,strokeWidth:1.2,transform:'rotate(-12)'});
 return h('g',{transform:`translate(${x} ${y})`,'data-topping':id,className:'cup-topping-position'},h('g',{className:enter?'recipe-topping':'cup-topping-shape'},shape));
}
// Only visible illustrations run their loops; timers and food rules stay in the engine.
export function useVisibleArt() {
 const ref=React.useRef(null);
 React.useEffect(()=>{
  const node=ref.current;if(!node)return;
  if(!window.IntersectionObserver){node.dataset.motionVisible='true';return;}
  const observer=new IntersectionObserver(([entry])=>{node.dataset.motionVisible=String(entry.isIntersecting);},{threshold:0});
  observer.observe(node);return()=>observer.disconnect();
 },[]);
 return ref;
}
export function CupArt({api,state,tea,toppings=[],level=1}) {
 const ref=useVisibleArt(),uid=React.useId().replaceAll(':',''),amount=Math.max(0,Math.min(1,level)),surface=62+(1-amount)*152;
 const mixing=state.phase==='mixing',done=state.phase==='result',milk=state.milk!=='无奶',foam=state.milk==='奶盖';
 const blend=Math.max(0,Math.min(1,state.mix||0));
 const color=milk&&!foam?mix(tea?.color||'#B77B54',state.milk==='燕麦奶'?'#E5D4AC':'#F4E4C6',blend*(state.milk==='燕麦奶'?.35:.5)):tea?.color||'#B77B54';
 const iceCount=state.ice==='无冰'?0:state.ice==='少冰'?2:5,kick=state.interaction?.type==='shake';
 return h('svg',{ref,viewBox:'0 0 360 260',className:'shop-art art-tea refined-cup kitchen-motion-art',role:'img','aria-label':`${state.size}毫升${state.milk}配方预览`,'data-size':state.size,'data-milk':state.milk,'data-mixing':mixing,'data-mix':blend,'data-straw-poked':state.strawPoked,'data-motion-visible':'false'},
 h('ellipse',{className:'cup-ground-shadow',cx:180,cy:229,rx:54,ry:6,fill:'#9D7957',opacity:.14}),
 h('g',{transform:state.size===700?'translate(0 0)':'translate(18 22) scale(.9)'},
 h('g',{className:mixing?'cup-rock':''},h('g',{key:kick?state.interaction.serial:0,className:kick?'cup-hand-shake':''},
 h('defs',null,h('clipPath',{id:`${uid}-cup`},h('path',{d:'M109 48 L126 214 Q180 231 234 214 L251 48 Z'})),h('clipPath',{id:`${uid}-drink`},h('path',{className:'cup-liquid-edge',d:'M94 62 Q136 56 180 62 T266 62 V235 H94 Z',style:{transform:`translateY(${surface-62}px)`}}))),
 path('M109 48 L126 214 Q180 231 234 214 L251 48 Z','#F4E8D1'),
 h('g',{clipPath:`url(#${uid}-cup)`},h('g',{clipPath:`url(#${uid}-drink)`,'data-fill-level':amount,opacity:amount?1:0},
 h('rect',{x:100,y:40,width:165,height:195,fill:color}),
 milk&&!foam&&blend<1&&h('g',{className:'cup-milk-current',opacity:1-blend},path('M96 132 Q133 103 179 134 T266 130 V240 H96 Z','#F1E0BC',{stroke:'none'}),path('M111 146 Q157 114 207 146 T260 143','none',{stroke:'#E6CDA6',strokeWidth:3,opacity:.65})),
 h('g',{className:'cup-toppings-drift'},...toppings.flatMap((item,index)=>Array.from({length:Math.ceil(4*amount)},(_,n)=>h(CupTopping,{key:`${item.id}-${n}`,id:item.id,color:item.color,x:139+n*25+Math.sin((state.shakes||0)+n)*blend*14,y:208-index*16-blend*(12+(n%2)*50)})))),
 ...Array.from({length:amount?iceCount:0},(_,n)=>h('g',{key:`ice${n}`,className:'cup-ice-drift',style:{'--lag':`${n*-140}ms`}},h('rect',{className:'cup-ice',x:126+(n%3)*31,y:surface+(foam?31:9)+Math.floor(n/3)*24,width:18,height:18,rx:4,fill:'#DCE9E2',stroke:ink,strokeWidth:1.2,transform:`rotate(${n%2?14:-10} ${135+n%3*31} ${surface+(foam?40:18)+Math.floor(n/3)*24})`}))),
 foam&&amount>0&&path(`M108 ${surface+3} Q130 ${surface-3} 151 ${surface+3} T198 ${surface+3} T252 ${surface+3} V${surface+24} Q180 ${surface+32} 108 ${surface+24} Z`,'#F7E8CD',{className:'cup-foam-drift',strokeWidth:1.5}))),
 path('M109 48 L126 214 Q180 231 234 214 L251 48','none'),h('ellipse',{...line,cx:180,cy:48,rx:71,ry:13,fill:'#EEDCB5'}),
 state.drinking&&h('g',{className:'cup-sip-beads'},...toppings.slice(0,3).map((item,n)=>h('g',{key:item.id,style:{'--sip-lag':`${n*80}ms`}},h(CupTopping,{id:item.id,x:207,y:45,color:item.color,enter:false})))),
 h('g',{className:`cup-straw-flex ${state.strawPoked?'is-poked':''}`},path('M201 44 L214 4 H225 L212 47','#CBA5AF')),h(api.Face,{x:180,y:151,scale:1.9,mood:0}),path('M125 80 L139 179','none',{stroke:'#FFF9EA',strokeWidth:6,opacity:.6})))),
 h('text',{x:180,y:252,textAnchor:'middle',fill:'#624735',fontSize:12},`${state.size}mL · ${state.ice}`));
}
export function breakfastColor(state){const heat=(state.sides?.[state.side||0]||0)/6;return mix('#EDD199',heat>1.3?'#B98A54':'#E3B76D',Math.min(1,Math.max(0,heat>1.3?(heat-1.3)*.6+.4:heat)));}
export function BreakfastArt({api,state,bites=0,folded=false,biteMarks=[]}) {
 const ref=useVisibleArt(),uid=React.useId().replaceAll(':',''),pan=state.phase==='cooking',ready=state.phase==='ready',heat=(state.sides?.[state.side || 0] || 0)/6;
 const color=breakfastColor(state);
 const flipping=pan&&state.interaction?.type==='flip';
 const sauce={'甜面酱':'#986240','辣酱':'#C9774A','番茄酱':'#C66A51'}[state.sauce] || '#986240';
 return h('svg',{ref,viewBox:'0 0 360 260',className:'shop-art art-breakfast breakfast-detail kitchen-motion-art','data-motion-visible':'false',role:'img','aria-label':`${state.base}${pan?'正在煎制':'在餐盘上'}`,'data-base':state.base,'data-spread':Boolean(state.spread),'data-on-pan':pan},
 pan?h('g',{className:'pancake-pan'},h('ellipse',{...line,cx:180,cy:139,rx:143,ry:72,fill:'#75675A'}),path('M315 142 L350 170 L341 187 L307 167','#B9A68A')):h('ellipse',{...line,cx:180,cy:153,rx:145,ry:83,fill:'#F8ECD4'}),
 state.spread&&pan&&h('path',{d:'M120 139 Q130 98 185 105 Q242 109 241 141 Q227 175 175 169 Q133 166 137 136 Q150 119 193 124',fill:'none',stroke:'#C99B59',strokeWidth:3}),
 pan&&h('g',{className:'pancake-sizzle'},...[[77,127],[103,181],[280,133],[254,181],[141,83],[224,83]].map(([cx,cy],n)=>h('circle',{key:n,cx,cy,r:2.6,fill:'#F6E5B8',stroke:'#D1AE6C',strokeWidth:1,style:{'--lag':`${n*-.23}s`}}))),
 flipping&&h('g',{key:`spatula${state.interaction.serial}`,className:'pancake-spatula','aria-hidden':true},path('M239 164 L302 193 L314 177 L249 145','#BA9972'),path('M209 143 L244 131 L266 157 L231 175 Z','#D5C4A7'),path('M223 144 L243 158 M232 140 L252 154','none',{stroke:'#8D7963',strokeWidth:2})),
 h('ellipse',{cx:180,cy:149,rx:105,ry:48,fill:'#3D2B23',opacity:pan?.12:0,className:flipping?'pancake-flight-shadow':'' ,key:flipping?`shadow${state.interaction.serial}`:'shadow'}),
 h('defs',null,h('mask',{id:`${uid}-bite`,maskUnits:'userSpaceOnUse',x:0,y:0,width:360,height:260},h('rect',{width:360,height:260,fill:bites>=4?'black':'white'}),...(biteMarks.length>=bites?biteMarks.map(m=>[m.cx,m.cy,m.r]):[[252,109,31],[218,83,34],[179,95,39]]).slice(0,bites).map(([cx,cy,r],n)=>h('g',{key:n,'data-bite-edge':cx<180?'left':'right',transform:`translate(${cx} ${cy}) scale(${r/31})`},...[[0,0,22],[-17,5,17],[17,5,17],[0,-17,17]].map(([x,y,radius],i)=>h('circle',{key:i,cx:x,cy:y,r:radius,fill:'black'})))))),
 h('g',{mask:`url(#${uid}-bite)`,key:flipping?`flip${state.interaction.serial}`:'pancake',className:flipping?'pancake-flip':folded?'served-pancake':''},
 folded?path('M77 127 Q180 39 282 127 L257 183 Q179 221 102 181 Z',color):h('ellipse',{...line,cx:180,cy:139,rx:111,ry:64,fill:ready?'#EDD9AE':color}),
 pan&&h('g',{className:'pancake-toast-marks',opacity:Math.min(.7,Math.max(0,heat*.45))},...[[132,116,8],[212,122,5],[161,170,7],[231,158,6],[105,148,4],[183,101,4]].map(([cx,cy,r],n)=>h('ellipse',{key:n,cx,cy,rx:r,ry:r*.45,fill:'#AC763E'}))),
 state.base==='手抓饼'&&h('g',{'data-flaky-layers':true},path(folded?'M112 139 Q177 94 247 140 M117 153 Q180 117 246 153 M126 170 Q180 145 235 169':'M100 139 Q127 91 196 96 Q259 103 258 143 Q243 181 176 179 Q121 178 115 142 Q128 116 178 114 Q223 113 239 139 Q220 165 173 160','none',{stroke:'#C99B59',strokeWidth:2})),
 state.egg&&!ready&&(!pan||state.side===0)&&h('g',null,path(folded?'M108 149 Q155 127 205 144 L242 158 L231 174 L116 173 Z':'M113 126 Q139 101 179 114 Q221 98 248 129 Q256 158 220 164 Q180 184 136 163 Q107 156 113 126 Z','#F2E2B7',{strokeWidth:1.5}),!folded&&h('ellipse',{cx:185,cy:139,rx:20,ry:16,fill:'#DDB357',stroke:ink,strokeWidth:1.5})),
 !ready&&!pan&&h('g',{'data-breakfast-fillings':state.fillings.join(',')},...state.fillings.map((id,n)=>h('g',{key:id,transform:`translate(${106+n*45} ${folded?130:111}) scale(.8)`},h(IngredientArt,{id,size:64}))),path(folded?'M112 160 Q145 145 173 160 T243 160':'M112 137 Q141 117 171 137 T246 137 M120 157 Q150 140 180 157 T240 157','none',{stroke:sauce,strokeWidth:5,'data-sauce':state.sauce})),
 h(api.Face,{x:179,y:folded?188:143,scale:1.15,mood:0})),
 bites>0&&h('g',{className:'breakfast-plate-crumbs',fill:'#D4B079',stroke:'#A57C52',strokeWidth:1},...Array.from({length:Math.min(bites,3)*3},(_,n)=>h('ellipse',{key:n,cx:105+(n*37)%145,cy:193+(n%3)*6,rx:2+n%2,ry:1.5,transform:`rotate(${n*23} ${105+(n*37)%145} ${193+(n%3)*6})`}))),
 null);
}
export function PotArt({api,color='#E7D3A1',state={}}) {
 const ref=useVisibleArt(),uid=React.useId().replaceAll(':',''),active=state.phase==='cooking';
 return h('svg',{ref,viewBox:'0 0 400 400',className:'shop-art refined-pot kitchen-motion-art',role:'img','aria-label':'汤面与锅身','data-boiling':active,'data-motion-visible':'false'},
 h('defs',null,h('clipPath',{id:`${uid}-broth`},h('ellipse',{cx:200,cy:139,rx:165,ry:98}))),
 path('M37 145 Q3 130 8 171 Q13 194 43 187','none'),path('M363 145 Q397 130 392 171 Q387 194 357 187','none'),
 path('M30 139 L46 325 Q200 375 354 325 L370 139 Z','#D6B795'),h('ellipse',{...line,cx:200,cy:139,rx:170,ry:103,fill:color}),
 h('g',{clipPath:`url(#${uid}-broth)`},
 ...[[95,114],[159,63],[270,83],[307,145],[220,191],[109,179],[202,112],[262,151],[151,142]].map(([cx,cy],n)=>h('g',{key:n,transform:`translate(${cx} ${cy})`},h('g',{className:'broth-bubble',style:{'--lag':`${n*-.31}s`,'--cycle':`${1.35+n%3*.21}s`}},h('ellipse',{rx:7+n%3*2,ry:4+n%3,fill:'#F6E3BA',stroke:'#AC8556',strokeWidth:1.2}),path('M-3 -1 Q0 -3 3 -1','none',{stroke:'#FFF6DC',strokeWidth:1.3})),h('ellipse',{className:'broth-ring',rx:13+n%3*3,ry:7+n%3*2,fill:'none',stroke:'#B18B5D',strokeWidth:1,style:{'--lag':`${n*-.31}s`,'--cycle':`${1.35+n%3*.21}s`}}))),
 ...[0,1,2].map(n=>path(`M${80+n*52} ${118+n*25} q48 14 99 -1`,'none',{key:n,className:'broth-current',stroke:'#F8E5BD',strokeWidth:2,opacity:.4,style:{'--lag':`${n*-.7}s`}}))),
 h('g',{className:'pot-vapour',stroke:'#A48B74',strokeWidth:2.5,fill:'none',strokeLinecap:'round'},...[125,195,267].map((x,n)=>h('path',{key:x,d:`M${x} 56 q-11 -14 0 -27 q11 -14 0 -27`,style:{'--lag':`${n*-.8}s`}}))),
 state.interaction?.type==='take'&&h('g',{key:state.interaction.serial,className:'pot-scoop-ladle'},path('M280 140 L369 50','none',{stroke:'#B28A5E',strokeWidth:9}),h('ellipse',{...line,cx:276,cy:146,rx:28,ry:15,fill:'#D3BD97'}),path('M258 145 H294 M264 151 H288','none',{stroke:'#8D7963',strokeWidth:2})),
 h(api.Face,{x:200,y:302,scale:2.1,mood:0}));
}
