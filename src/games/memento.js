import {companionMemory,memoryLine} from './companion-memory.js';
import {backupNative,saveNativeReceipt} from '../wechat-bridge.js';
import {X as React} from '../../vendor/react-runtime.js';
import {TEAS,TOPPINGS,FILLINGS} from './rules.js';
import {buddyById,STORE_NAMES,companionLine} from './outing-model.js';
import {rememberMeal} from './outing-store.js';
import {storeTerms} from '../content-client.js';
import {assetUrl} from '../runtime.js';
import {LeftoversArt} from './leftovers.js';
import {MealReview} from './consumer-ui.js';
import {useConsumer,readConsumer,saveMealNote,recordCompletedMeal} from './consumer-store.js';
import {useWallet} from './wallet-store.js';
const h=React.createElement;
export function makeMemento({mealId,game,state,items,amount,now=Date.now()}){
 const buddy=buddyById(state.companionId),recipe={};
 const cookingStory=game==='bbq'&&state.items?.some(f=>!f.season||f.sides?.some(t=>t/f.cook>1.3))||game==='tea'&&Number.isFinite(state.mix)&&state.mix<.6;
 const recalled=cookingStory?'':memoryLine(companionMemory(readConsumer(),buddy.id,{excludeMealId:mealId}),{game,stage:'end',state,items});
 for(const key of ['tea','milk','sugar','ice','size','toppings','base','egg','fillings','sauce','broth','seasonApplied','mix','shakes','season','heat','sides','items','served','entries','soupLevel','spice'])if(state[key]!==undefined)recipe[key]=state[key];
 return {id:mealId,game,storeId:state.storeId||game,store:storeTerms(state.storeId||game).name||STORE_NAMES[game],buddyId:buddy.id,amount,at:now,recipe,ingredientNames:game==='tea'?(state.toppings?.length?state.toppings.map(id=>TOPPINGS.find(t=>t.id===id)?.name).filter(Boolean):[TEAS.find(t=>t.id===state.tea)?.name].filter(Boolean)):game==='breakfast'?(state.fillings||[]).map(id=>FILLINGS.find(f=>f.id===id)?.name).filter(Boolean):items.map(f=>f.name),items:items.map(f=>({food:f.food,name:f.name,qty:game==='bbq'||game==='tea'||game==='breakfast'?1:f.bites,doneness:f.doneness})),line:recalled||companionLine(buddy.id,{game,stage:'end',state,items})};
}
function MementoArt({meal,api}){
 const state={...meal.recipe,phase:'result',sides:[6,6],side:0,companionId:meal.buddyId};
 return h(LeftoversArt,{game:meal.game,state,api});
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function wrapText(ctx,text,x,y,maxWidth,lineHeight,maxLines=3){let line='',lines=0;for(const ch of String(text)){if(ctx.measureText(line+ch).width>maxWidth&&line){ctx.fillText(line,x,y);y+=lineHeight;if(++lines>=maxLines)return y;line='';}line+=ch;}if(line)ctx.fillText(line,x,y);return y+lineHeight;}
function loadImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(Error('Image unavailable'));img.src=src;});}
export async function paintReceipt(meal,node,note={text:'',strokes:[]}){
 await document.fonts?.ready;
 const canvas=document.createElement('canvas');canvas.width=900;canvas.height=1570;const ctx=canvas.getContext('2d'),ink='#3D2B23';
 ctx.fillStyle='#FFF8F0';ctx.fillRect(0,0,900,1570);ctx.fillStyle='#3D2B2310';for(let y=18;y<1570;y+=24)for(let x=18;x<900;x+=24){ctx.beginPath();ctx.arc(x,y,1,0,Math.PI*2);ctx.fill();}
 ctx.fillStyle='#FFFDF7';ctx.strokeStyle=ink;ctx.lineWidth=3;roundRect(ctx,30,30,840,1510,30);ctx.fill();ctx.stroke();ctx.fillStyle=ink;ctx.font='700 30px -apple-system,"PingFang SC",sans-serif';ctx.fillText('搭子小馆 · 今天这一顿',65,95);ctx.font='22px -apple-system,"PingFang SC",sans-serif';ctx.fillStyle='#7A6255';ctx.fillText(new Date(meal.at).toLocaleDateString('zh-CN'),65,136);
 ctx.fillStyle=ink;ctx.font='700 45px -apple-system,"PingFang SC",sans-serif';ctx.fillText(meal.store,65,214);ctx.font='700 32px -apple-system,"PingFang SC",sans-serif';ctx.fillStyle='#B75E42';ctx.textAlign='right';ctx.fillText(`${meal.amount} 金币`,835,214);ctx.textAlign='left';
 const art=node.querySelector('.memento-art'),box=art.getBoundingClientRect(),scale=Math.min(700/box.width,380/box.height),left=(900-box.width*scale)/2,top=260+(380-box.height*scale)/2;
 for(const svg of art.querySelectorAll('svg')){if(svg.parentElement?.closest('svg'))continue;const r=svg.getBoundingClientRect();if(!r.width||!r.height)continue;const clone=svg.cloneNode(true);clone.setAttribute('xmlns','http://www.w3.org/2000/svg');clone.setAttribute('width',r.width);clone.setAttribute('height',r.height);const data='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(clone));const image=await loadImage(data);ctx.drawImage(image,left+(r.x-box.x)*scale,top+(r.y-box.y)*scale,r.width*scale,r.height*scale);}
 ctx.strokeStyle='#BDA27E';ctx.lineWidth=1;ctx.setLineDash([6,5]);ctx.beginPath();ctx.moveTo(65,670);ctx.lineTo(835,670);ctx.stroke();ctx.setLineDash([]);
 ctx.fillStyle=ink;ctx.font='23px -apple-system,"PingFang SC",sans-serif';wrapText(ctx,meal.items.map(f=>f.name+(f.qty>1?`×${f.qty}`:'')).join(' · '),65,714,770,34,2);
 const buddy=buddyById(meal.buddyId);ctx.fillStyle='#F9EACF';roundRect(ctx,65,805,770,210,20);ctx.fill();let portrait;try{portrait=await loadImage(assetUrl(`art/char/${buddy.id}.webp`));}catch{}
 if(portrait){ctx.save();ctx.beginPath();ctx.arc(120,858,30,0,Math.PI*2);ctx.clip();ctx.drawImage(portrait,90,828,60,60);ctx.restore();}
 ctx.fillStyle=ink;ctx.font='700 26px -apple-system,"PingFang SC",sans-serif';ctx.fillText(`${buddy.name}陪我吃`,165,868);ctx.font='25px -apple-system,"PingFang SC",sans-serif';wrapText(ctx,meal.line,90,925,720,38,2);ctx.fillStyle='#7A6255';ctx.font='21px -apple-system,"PingFang SC",sans-serif';ctx.fillText('慢慢做，开心吃。',65,1490);ctx.textAlign='right';ctx.fillText('fandazi.oneplums.cn',835,1490);
 ctx.textAlign='left';ctx.fillStyle=ink;ctx.font='23px -apple-system,"PingFang SC",sans-serif';wrapText(ctx,note.text||'今天这顿，好好记住。',65,1070,770,32,8);ctx.strokeStyle=ink;ctx.lineWidth=3;ctx.lineCap='round';for(const stroke of note.strokes||[]){ctx.beginPath();stroke.forEach(([x,y],i)=>i?ctx.lineTo(65+x*770,1340+y*100):ctx.moveTo(65+x*770,1340+y*100));ctx.stroke();}
 return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('Could not save image')),'image/png'));
}
function SignaturePad({strokes,onChange}){
 const ref=React.useRef(null),active=React.useRef(null);
 React.useEffect(()=>{const c=ref.current,ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);ctx.strokeStyle='#523d2c';ctx.lineWidth=3;ctx.lineCap='round';for(const stroke of strokes){ctx.beginPath();stroke.forEach(([x,y],i)=>i?ctx.lineTo(x*c.width,y*c.height):ctx.moveTo(x*c.width,y*c.height));ctx.stroke();}},[strokes]);
 const point=e=>{const r=ref.current.getBoundingClientRect();return [Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))];};
 const finish=()=>{if(active.current){onChange([...strokes,active.current]);active.current=null;}};
 return h('div',{className:'receipt-signature'},h('p',null,'可选：在这里用手指或鼠标签个字'),h('canvas',{ref,width:770,height:160,'aria-label':'可选手写签字画布',onPointerDown:e=>{if(e.button!==0)return;e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);active.current=[point(e)];},onPointerMove:e=>{if(!active.current)return;const p=point(e),last=active.current.at(-1);if(active.current.length>=500)return;active.current.push(p);const ctx=ref.current.getContext('2d');ctx.beginPath();ctx.moveTo(last[0]*770,last[1]*160);ctx.lineTo(p[0]*770,p[1]*160);ctx.stroke();},onPointerUp:finish,onPointerCancel:finish}),h('button',{type:'button',className:'text-button',onClick:()=>onChange([])},'清空签字'));
}
export function MealMemento({game,mealId,state,items,api,saved}){
 const {wallet}=useWallet(),{profile}=useConsumer(),ref=React.useRef(null),busy=React.useRef(false),url=React.useRef(null),[image,setImage]=React.useState(null),[status,setStatus]=React.useState(''),[pending,setPending]=React.useState(false);
 const meal=React.useMemo(()=>saved||makeMemento({game,mealId,state,items,amount:wallet.orders[mealId]?.amount||0}),[mealId,saved]);
 const [text,setText]=React.useState(()=>profile.notes[meal.id]?.text||''),[strokes,setStrokes]=React.useState(()=>profile.notes[meal.id]?.strokes||[]),[pen,setPen]=React.useState(false);
 React.useEffect(()=>{if(!saved)rememberMeal(meal);else recordCompletedMeal(meal);return()=>{if(url.current)URL.revokeObjectURL(url.current);};},[meal.id]);
 async function save(){if(busy.current)return;busy.current=true;setPending(true);setStatus('');try{await saveMealNote(meal.id,text,strokes);const blob=await paintReceipt(meal,ref.current,{text,strokes});if(url.current)URL.revokeObjectURL(url.current);url.current=URL.createObjectURL(blob);setImage(url.current);window.dispatchEvent(new Event('fandazi:save'));if(await saveNativeReceipt(blob)){setStatus('已打开相册保存，原小票仍在本页。');return;}const a=document.createElement('a');a.href=url.current;a.download=`搭子小馆-${new Date(meal.at).toLocaleDateString('zh-CN').replaceAll('/','-')}.png`;a.click();setStatus('小票已生成，也可以长按下方图片保存。');}catch{setStatus('这次没能保存，重试一下，或直接截图留念。');}finally{busy.current=false;setPending(false)}}
 const buddy=buddyById(meal.buddyId);
 return h('section',{className:'meal-memento','aria-label':'今天的小票','data-receipt':JSON.stringify(meal)},h('div',{className:'memento-paper',ref},h('div',{className:'memento-heading'},h('b',null,'今天这一顿'),h('time',null,new Date(meal.at).toLocaleDateString('zh-CN'))),h('div',{className:'memento-title'},h('h3',null,meal.store),h('strong',null,`${meal.amount} 金币`)),h('div',{className:'memento-art'},h(MementoArt,{api,meal})),h('p',{className:'memento-foods'},meal.items.map(f=>f.name+(f.qty>1?`×${f.qty}`:'')).join(' · ')),h('div',{className:'memento-buddy'},h(api.Avatar,{id:buddy.id,name:buddy.name,size:40,color:buddy.color}),h('div',null,h('b',null,`${buddy.name}陪我吃`),h('p',null,meal.line))),h('small',{className:'memento-sign'},'搭子小馆 · 慢慢做，开心吃。')),h('label',{className:'receipt-note'},'给小票留句话（可用系统手写键盘）',h('textarea',{value:text,maxLength:240,rows:3,onChange:e=>{setText(e.target.value);saveMealNote(meal.id,e.target.value,strokes);}})),h('button',{type:'button',className:'btn btn--ghost','aria-expanded':pen,onClick:()=>setPen(!pen)},pen?'收起签字画布':'想亲手签个字'),pen&&h(SignaturePad,{strokes,onChange:next=>{setStrokes(next);saveMealNote(meal.id,text,next);}}),h('button',{type:'button',className:'btn btn--primary',onClick:save,disabled:pending},pending?'正在画小票…':'保存小票'),h('p',{className:'memento-status',role:'status'},status),image&&h('img',{className:'memento-image',src:image,alt:'今天这一顿的可保存小票',width:900,height:1570}),h(MealReview,{meal}));
}
