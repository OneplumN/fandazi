import {X as React} from '../../vendor/react-runtime.js';
import {heatLook,blendColor} from './bbq-visuals.js';
const h=React.createElement, ink='#3D2B23';
const outline={stroke:ink,strokeWidth:2.6,strokeLinejoin:'round',strokeLinecap:'round'};
const ids={yangroujuan:'lamb',feiniujuan:'beef',jixiongrou:'chicken',xianxia:'shrimp',qinqinchang:'sausage',youyuquan:'squid',xianggu:'mushroom',dougan:'tofu',yumi:'corn',xilanhua:'broccoli',qiezi:'eggplant',oupian:'lotus'};
export function SkewerDrawing({api,food,eaten=0,season=food.season || null,active=false,pieceOnly=false}) {
  const type=ids[food.food] || ids[food.id] || food.skewer || food.id;
  const ratio=Number.isFinite(food.doneness)?food.doneness:food.sides?food.sides[food.side || 0]/food.cook:0;
  const cooked=ratio>=.85, burned=ratio>1.3,look=heatLook(ratio),uid=React.useId().replaceAll(":", "");
  const heating=active && !food.resting;
  const path=(d,fill,props={})=>h('path',{...outline,d,fill,...props});
  const ellipse=(cx,cy,rx,ry,fill,props={})=>h('ellipse',{...outline,cx,cy,rx,ry,fill,...props});
  const body=()=>{
    switch(type){
      case 'lamb':case 'beef':case 'chicken': {
        const color=look.color(type==='chicken'?'#EBC99D':type==='beef'?'#BC7464':'#D79480','#BA8250','#714C32');
        return h('g',null,path('M-21 -13 L7 -19 L23 -7 L19 15 L-7 20 L-23 7 Z',color),
          path(type==='chicken'?'M-9 -11 L-12 9 M4 -13 L2 12':'M-19 -4 Q-5 -12 2 -1 T20 3','none',{stroke:blendColor('#F6DACA','#D2A368',look.toasted),strokeWidth:4}),
          path('M-13 4 L13 -5 M-9 12 L16 3','none',{stroke:'#87512F',strokeWidth:2,opacity:look.marks}));
      }
      case 'shrimp':return h('g',null,path('M16 -15 Q-15 -24 -23 0 Q-27 22 -2 22 L9 12 Q-10 15 -11 2 Q-12 -10 5 -6 L12 2 L23 -3 Z',look.color('#D4B9AD','#F2A36D','#94613F')),path('M-12 -10 L-6 -4 M-20 -1 L-11 2 M-17 11 L-8 9','none',{stroke:'#A56649',strokeWidth:2}));
      case 'sausage':return h('g',null,h('rect',{...outline,x:-21,y:-15,width:42,height:31,rx:15,fill:look.color('#E6AC91','#D98B62','#835133')}),path('M-10 -9 L-15 3 M2 -10 L-3 4 M14 -8 L9 5','none',{stroke:'#A25F42',strokeWidth:2}));
      case 'squid':return h('g',null,ellipse(0,0,23,20,look.color('#F0DAD0','#E9CBA8','#A97C50')),ellipse(0,0,13,11,'#F8EACF',{stroke:'#A67F71',strokeWidth:2}));
      case 'mushroom':return h('g',null,path('M-6 -2 L-8 19 Q0 25 8 19 L6 -2','#EED5AA'),path('M-25 3 Q-23 -24 0 -25 Q22 -23 26 3 Q1 16 -25 3 Z',look.color('#BD9570','#AE8051','#6C4B32')),path('M-9 -12 L9 0 M9 -12 L-8 0','none',{stroke:'#F0D3AA',strokeWidth:3}));
      case 'tofu':return h('g',null,path('M-23 -15 L16 -19 L24 -9 L21 17 L-18 20 L-24 10 Z',look.color('#F3DC9D','#DFAC54','#936137')),path('M-14 -7 L14 -9 M-14 2 L14 0 M-13 11 L13 9','none',{stroke:'#BB8B45',strokeWidth:2}));
      case 'corn':return h('g',null,path('M-20 -17 Q0 -24 20 -17 L23 14 Q0 26 -23 14 Z',look.color('#F1CD69','#E6B24F','#9F7435')),...[-13,-4,5,14].flatMap((x,col)=>[-10,0,10].map((y,row)=>h('rect',{key:`${col}-${row}`,x,y,width:7,height:8,rx:2,fill:look.color('#F8DF89','#E9B94E','#AF813D'),stroke:'#BB8E3B',strokeWidth:1}))));
      case 'broccoli':return h('g',null,path('M-5 -2 L-10 21 L8 21 L5 -3',look.color('#9DBB79','#85A869','#67743D')),...[[0,-12,15],[-16,-5,12],[15,-3,13]].map(([cx,cy,r],n)=>h('circle',{...outline,key:n,cx,cy,r,fill:look.color('#90AA63','#789352','#4E5934')})));
      case 'eggplant':return h('g',null,path('M-23 3 Q-10 -24 17 -15 L25 4 Q9 27 -15 18 Z','#846179'),path('M-18 1 Q-7 -16 13 -12 L19 3 Q7 18 -11 14 Z',look.color('#DFCD94','#CBB276','#936D42')),path('M-7 -7 L2 12 M3 -11 L12 6','none',{stroke:'#A7965D',strokeWidth:1.5}));
      case 'lotus':return h('g',null,ellipse(0,0,25,22,look.color('#EBD8B3','#DDBD84','#A37B4D')),...[[0,0],[-12,-8],[3,-11],[13,-3],[8,10],[-8,10]].map(([cx,cy],n)=>ellipse(cx,cy,n?4:3,n?5:4,'#BDA681',{key:n,strokeWidth:1.3})));
      default:return null;
    }
  };
  return h('svg',{viewBox:pieceOnly?'20 8 70 70':'0 0 110 216',className:pieceOnly?'bbq-skewer-mouthful':'bbq-skewer-drawing','data-skewer-type':type,'aria-hidden':true,'data-heat':look.heat.toFixed(3),'data-heating':heating,'data-season':season},
    !pieceOnly&&path('M55 10 L55 205','none',{stroke:'#AA8050',strokeWidth:5}),
    ...(pieceOnly?[43]:[43,91,139]).map((y,index)=>index<eaten?null:h('g',{key:index,transform:`translate(55 ${y}) rotate(${index%2?-5:5})`},
      h('defs',null,h('clipPath',{id:`${uid}-piece-${index}`},body())),
      h('g',{className:'bbq-food-piece',style:{transform:`scale(${look.shrink},${1-(1-look.shrink)*.6})`}},
        body(),
        h('g',{clipPath:`url(#${uid}-piece-${index})`},
          path('M-18 5 L16 -5 M-14 14 L19 4','none',{stroke:'#704329',strokeWidth:2.4,opacity:look.marks}),
          h('g',{className:'bbq-scorch-spots',opacity:look.scorch},...[[11,10,5],[-16,-5,4],[14,-10,3],[-4,16,3]].map(([cx,cy,r],n)=>h('ellipse',{key:n,cx,cy,rx:r,ry:r*.65,fill:'#573A29'}))),
          h('g',{className:heating?'bbq-oil-glint bbq-motion-loop':'bbq-static-gloss',style:{animationDelay:`${index*.37+(food.key||0)*.17}s`},opacity:look.shine},path('M-16 -7 Q-10 -13 -3 -10','none',{stroke:'#FFF0BC',strokeWidth:2.5})),
          heating && look.heat>.15 && h('g',{className:'bbq-oil-bubbles'},...[-10,12].map((x,n)=>h('circle',{key:n,cx:x,cy:7-n*11,r:2.5,fill:'none',stroke:'#FFE9AE',strokeWidth:1.5,className:'bbq-oil-bubble bbq-motion-loop',style:{animationDelay:`${index*.31+n*.6+(food.key||0)*.19}s`}})))),
        index===1&&api?.Face&&h(api.Face,{x:0,y:3,scale:.5,mood:0}),
        season&&(season==='蜜汁'?path('M-15 -5 Q-6 1 3 -5 T18 -3 M-11 8 Q0 14 12 6','none',{stroke:'#E7B64F',strokeWidth:3}):h('g',{fill:season==='辣椒'?'#B85F3E':'#986C35',stroke:'none'},...[[-12,-8],[10,-9],[-6,9],[16,5]].map(([cx,cy],n)=>h('ellipse',{key:n,cx,cy,rx:1.4,ry:2.1}))))))),
    heating && look.heat>.25 && path('M54 174 Q45 185 54 189 Q63 185 54 174 Z','#E2BE70',{stroke:'none',className:'bbq-juice-drop bbq-motion-loop',style:{animationDelay:`${(food.key||0)*.4}s`}}));
}
export function HeatVapour({food}) {
  const ratio=food.sides[food.side]/food.cook,burned=ratio>1.3;
  if(ratio<.15)return null;
  return h('svg',{viewBox:'0 0 110 216',className:`bbq-heat-vapour ${burned?'is-smoky':''}`,'aria-hidden':true},
    ...[0,1].map(n=>pathVapour(n)));
  function pathVapour(n){return h('path',{key:n,d:`M${34+n*38} ${42+n*64} q-12 -9 -2 -20 q10 -11 0 -21`,fill:'none',stroke:burned?'#796351':'#AC9377',strokeWidth:burned?5:3,strokeLinecap:'round',className:'bbq-vapour-path bbq-motion-loop',style:{animationDelay:`${n*.8+(food.key||0)*.29}s`}});}
}
export function SeasonShaker({kind}) {
  return h('svg',{viewBox:'0 0 100 120',className:'bbq-season-shaker','aria-hidden':true},
    h('g',{className:'bbq-shaker-sway'},h('path',{...outline,d:'M28 28 H70 L76 85 Q48 98 23 85 Z',fill:kind==='蜜汁'?'#E3B76C':'#F4E0B6'}),h('path',{...outline,d:'M28 28 L31 14 H67 L70 28 Z',fill:'#B8AA96'}),h('path',{d:'M37 20 H40 M48 20 H51 M59 20 H62',stroke:ink,strokeWidth:3,strokeLinecap:'round'}),h('path',{d:'M33 62 H65',stroke:kind==='辣椒'?'#BB6C4A':'#AE8A43',strokeWidth:14})),
    ...[0,1,2,3,4,5].map(n=>h('circle',{key:n,cx:20+n*10,cy:100+n%2*8,r:2,fill:kind==='辣椒'?'#B95543':'#BC9145',className:'bbq-shaker-grain',style:{animationDelay:`${n*.04}s`}})));
}
export function GrillDrawing({api,active=false}) {
  return h('svg',{viewBox:'0 0 600 450',className:'bbq-grill-drawing','data-fire-active':active,role:'img','aria-label':'炭火烤炉与烤网'},
    h('path',{...outline,d:'M40 200 L560 200 L542 370 Q300 404 58 370 Z',fill:'#AB9E8B'}),
    h('path',{...outline,d:'M57 53 L543 53 L566 203 L34 203 Z',fill:'#665446'}),
    ...Array.from({length:16},(_,n)=>h('g',{key:n},h('rect',{className:'bbq-coal bbq-motion-loop',style:{animationDelay:`${(n%5)*.41}s`},x:61+(n%8)*61,y:76+Math.floor(n/8)*64,width:48,height:47,rx:9,fill:n%3?'#C7814C':'#ECAD60',stroke:'#493B31',strokeWidth:6}),h('path',{d:`M${73+(n%8)*61} ${89+Math.floor(n/8)*64} l13 9 l-4 13`,stroke:'#F8CB78',strokeWidth:2,fill:'none'}))),
    ...Array.from({length:16},(_,n)=>h('path',{key:`grid${n}`,d:`M${64+n*31} 53 L${42+n*34} 203`,stroke:'#C9BDA5',strokeWidth:4})),
    ...[70,105,140,175].map(y=>h('path',{key:y,d:`M${57-(y-53)*.15} ${y} H${543+(y-53)*.15}`,stroke:'#B6A88F',strokeWidth:3})),
    h('path',{...outline,d:'M57 53 H543 L566 203 H34 Z',fill:'none',strokeWidth:5}),
    h('path',{d:'M95 384 L83 434 M505 384 L517 434',stroke:ink,strokeWidth:7,strokeLinecap:'round'}),
    h(api.Face,{x:300,y:332,scale:3,mood:0}),
    h('path',{d:'M76 338 L167 346 M433 346 L524 338',stroke:'#7F7261',strokeWidth:3,strokeLinecap:'round'}));
}
