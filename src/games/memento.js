import {X as React} from '../../vendor/react-runtime.js';
import {CupArt,BreakfastArt} from './kitchen-art.js';
import {SkewerDrawing} from './bbq-art.js';
import {ServingBowl} from './vessels.js';
import {TEAS,TOPPINGS} from './rules.js';
import {buddyById,STORE_NAMES,companionLine} from './outing-model.js';
import {rememberMeal} from './outing-store.js';
import {useWallet} from './wallet-store.js';
const h=React.createElement;
export function makeMemento({mealId,game,state,items,amount,now=Date.now()}){
 const buddy=buddyById(state.companionId),recipe={};
 for(const key of ['tea','milk','sugar','ice','size','toppings','base','egg','fillings','sauce','broth','seasonApplied'])if(state[key]!==undefined)recipe[key]=state[key];
 return {id:mealId,game,store:STORE_NAMES[game],buddyId:buddy.id,amount,at:now,recipe,items:items.map(f=>({food:f.food,name:f.name,qty:game==='bbq'||game==='tea'||game==='breakfast'?1:f.bites,doneness:f.doneness})),line:companionLine(buddy.id,{game,stage:'end',state,items})};
}
function FoodIcon({api,id}){const food=api.menu.find(f=>f.id===id);return food?h(api.Food,{...food,size:44}):null;}
function MementoArt({meal,api}){
 const state={...meal.recipe,phase:'result',sides:[6,6],side:0,companionId:meal.buddyId};
 if(meal.game==='tea')return h(CupArt,{api,state,tea:TEAS.find(t=>t.id===state.tea),toppings:(state.toppings||[]).map(id=>TOPPINGS.find(t=>t.id===id)).filter(Boolean)});
 if(meal.game==='breakfast')return h(BreakfastArt,{api,state,folded:true,bites:0});
 if(meal.game==='bbq')return h('div',{className:'memento-skewers'},...meal.items.slice(0,3).map((f,i)=>h(SkewerDrawing,{key:i,api,food:{...f,doneness:f.doneness??1}})));
 return h(ServingBowl,{api},h('div',{className:'bowl-edible-foods memento-bowl-foods'},...meal.items.slice(0,6).map((f,i)=>h('div',{key:i},h(FoodIcon,{api,id:f.food})))));
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function wrapText(ctx,text,x,y,maxWidth,lineHeight,maxLines=3){let line='',lines=0;for(const ch of String(text)){if(ctx.measureText(line+ch).width>maxWidth&&line){ctx.fillText(line,x,y);y+=lineHeight;if(++lines>=maxLines)return y;line='';}line+=ch;}if(line)ctx.fillText(line,x,y);return y+lineHeight;}
function loadImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(Error('Image unavailable'));img.src=src;});}
async function paintReceipt(meal,node){
 await document.fonts?.ready;
 const canvas=document.createElement('canvas');canvas.width=900;canvas.height=1200;const ctx=canvas.getContext('2d'),ink='#3D2B23';
 ctx.fillStyle='#FFF8F0';ctx.fillRect(0,0,900,1200);ctx.fillStyle='#3D2B2310';for(let y=18;y<1200;y+=24)for(let x=18;x<900;x+=24){ctx.beginPath();ctx.arc(x,y,1,0,Math.PI*2);ctx.fill();}
 ctx.fillStyle='#FFFDF7';ctx.strokeStyle=ink;ctx.lineWidth=3;roundRect(ctx,30,30,840,1140,30);ctx.fill();ctx.stroke();ctx.fillStyle=ink;ctx.font='700 30px -apple-system,"PingFang SC",sans-serif';ctx.fillText('搭子小馆 · 今天这一顿',65,95);ctx.font='22px -apple-system,"PingFang SC",sans-serif';ctx.fillStyle='#7A6255';ctx.fillText(new Date(meal.at).toLocaleDateString('zh-CN'),65,136);
 ctx.fillStyle=ink;ctx.font='700 45px -apple-system,"PingFang SC",sans-serif';ctx.fillText(meal.store,65,214);ctx.font='700 32px -apple-system,"PingFang SC",sans-serif';ctx.fillStyle='#B75E42';ctx.textAlign='right';ctx.fillText(`${meal.amount} 金币`,835,214);ctx.textAlign='left';
 const art=node.querySelector('.memento-art'),box=art.getBoundingClientRect(),scale=Math.min(700/box.width,380/box.height),left=(900-box.width*scale)/2,top=260+(380-box.height*scale)/2;
 for(const svg of art.querySelectorAll('svg')){if(svg.parentElement?.closest('svg'))continue;const r=svg.getBoundingClientRect();if(!r.width||!r.height)continue;const clone=svg.cloneNode(true);clone.setAttribute('xmlns','http://www.w3.org/2000/svg');clone.setAttribute('width',r.width);clone.setAttribute('height',r.height);const data='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(clone));const image=await loadImage(data);ctx.drawImage(image,left+(r.x-box.x)*scale,top+(r.y-box.y)*scale,r.width*scale,r.height*scale);}
 ctx.strokeStyle='#BDA27E';ctx.lineWidth=1;ctx.setLineDash([6,5]);ctx.beginPath();ctx.moveTo(65,670);ctx.lineTo(835,670);ctx.stroke();ctx.setLineDash([]);
 ctx.fillStyle=ink;ctx.font='23px -apple-system,"PingFang SC",sans-serif';wrapText(ctx,meal.items.map(f=>f.name+(f.qty>1?`×${f.qty}`:'')).join(' · '),65,714,770,34,2);
 const buddy=buddyById(meal.buddyId);ctx.fillStyle='#F9EACF';roundRect(ctx,65,805,770,210,20);ctx.fill();let portrait;try{portrait=await loadImage(`/art/char/${buddy.id}.webp`);}catch{}
 if(portrait){ctx.save();ctx.beginPath();ctx.arc(120,858,30,0,Math.PI*2);ctx.clip();ctx.drawImage(portrait,90,828,60,60);ctx.restore();}
 ctx.fillStyle=ink;ctx.font='700 26px -apple-system,"PingFang SC",sans-serif';ctx.fillText(`${buddy.name}陪我吃`,165,868);ctx.font='25px -apple-system,"PingFang SC",sans-serif';wrapText(ctx,meal.line,90,925,720,38,2);ctx.fillStyle='#7A6255';ctx.font='21px -apple-system,"PingFang SC",sans-serif';ctx.fillText('慢慢做，开心吃。',65,1090);ctx.textAlign='right';ctx.fillText('fandazi.oneplums.cn',835,1090);
 return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('Could not save image')),'image/png'));
}
export function MealMemento({game,mealId,state,items,api,saved}){
 const {wallet}=useWallet(),ref=React.useRef(null),busy=React.useRef(false),url=React.useRef(null),[image,setImage]=React.useState(null),[status,setStatus]=React.useState(''),[pending,setPending]=React.useState(false);
 const meal=React.useMemo(()=>saved||makeMemento({game,mealId,state,items,amount:wallet.orders[mealId]?.amount||0}),[mealId,saved]);
 React.useEffect(()=>{if(!saved)rememberMeal(meal);return()=>{if(url.current)URL.revokeObjectURL(url.current);};},[meal.id]);
 async function save(){if(busy.current)return;busy.current=true;setPending(true);setStatus('');try{if(!url.current){const blob=await paintReceipt(meal,ref.current);url.current=URL.createObjectURL(blob);setImage(url.current);}const a=document.createElement('a');a.href=url.current;a.download=`搭子小馆-${new Date(meal.at).toLocaleDateString('zh-CN').replaceAll('/','-')}.png`;a.click();setStatus('小票已生成，也可以长按下方图片保存。');}catch{setStatus('这次没能保存，重试一下，或直接截图留念。');}finally{busy.current=false;setPending(false)}}
 const buddy=buddyById(meal.buddyId);
 return h('section',{className:'meal-memento','aria-label':'今天的小票','data-receipt':JSON.stringify(meal)},h('div',{className:'memento-paper',ref},h('div',{className:'memento-heading'},h('b',null,'今天这一顿'),h('time',null,new Date(meal.at).toLocaleDateString('zh-CN'))),h('div',{className:'memento-title'},h('h3',null,meal.store),h('strong',null,`${meal.amount} 金币`)),h('div',{className:'memento-art'},h(MementoArt,{api,meal})),h('p',{className:'memento-foods'},meal.items.map(f=>f.name+(f.qty>1?`×${f.qty}`:'')).join(' · ')),h('div',{className:'memento-buddy'},h(api.Avatar,{id:buddy.id,name:buddy.name,size:40,color:buddy.color}),h('div',null,h('b',null,`${buddy.name}陪我吃`),h('p',null,meal.line))),h('small',{className:'memento-sign'},'搭子小馆 · 慢慢做，开心吃。')),h('button',{type:'button',className:'btn btn--primary',onClick:save,disabled:pending},pending?'正在画小票…':'保存小票'),h('p',{className:'memento-status',role:'status'},status),image&&h('img',{className:'memento-image',src:image,alt:'今天这一顿的可保存小票',width:900,height:1200}));
}
