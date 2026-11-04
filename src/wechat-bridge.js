import {assetUrl} from './runtime.js';
export const NATIVE_KEYS=['dazi.wallet.v1','dazi.outing.v1','dazi.consumer.v1','dazi.dining.v1','dazi.experience.v1','malatang.settings','malatang.budget','dazi.native-id.v1'];
let bridge,restored=false;const bootId=crypto.randomUUID();
let hadWalletAtBoot=false;try{const wallet=JSON.parse(localStorage.getItem('dazi.wallet.v1'));hadWalletAtBoot=Boolean(wallet&&Number.isFinite(wallet.balance)&&Array.isArray(wallet.owned));}catch{}
export const markNativeRestored=()=>{restored=true;};
async function native(){
 if(bridge)return bridge;
 if(!/MicroMessenger/i.test(navigator.userAgent)||!new URLSearchParams(location.search).has('mini'))return null;
 bridge=new Promise(resolve=>{let timer;const done=value=>{clearTimeout(timer);resolve(value);};
  const check=()=>{const api=window.wx?.miniProgram;if(!api?.getEnv)return done(null);try{api.getEnv(env=>done(env?.miniprogram?api:null));}catch{done(null);}};
  timer=setTimeout(()=>done(null),5000);
  if(window.wx?.miniProgram){check();return;}
  const script=document.createElement('script');script.src='https://res.wx.qq.com/open/js/jweixin-1.6.0.js';script.onload=check;script.onerror=()=>done(null);document.head.append(script);
 });return bridge;
}
export async function backupNative(){const wx=await native();if(!wx)return;const values={};let size=0;try{let syncId;try{syncId=JSON.parse(localStorage.getItem('dazi.native-id.v1'));}catch{}if(typeof syncId!=='string'){syncId=crypto.randomUUID();localStorage.setItem('dazi.native-id.v1',JSON.stringify(syncId));}for(const key of NATIVE_KEYS){const raw=localStorage.getItem(key);if(raw){if(raw.length>50000){wx.postMessage({data:{type:'fandazi:backup-too-large'}});return;}size+=raw.length;values[key]=raw;}}if(size>60000||!values['dazi.wallet.v1']){wx.postMessage({data:{type:'fandazi:backup-too-large'}});return;}wx.postMessage({data:{type:'fandazi:backup',version:1,values,syncId,bootId,freshStart:!hadWalletAtBoot,restored}});}catch{}}
export async function saveNativeReceipt(blob){const wx=await native();if(!wx)return false;const response=await fetch(assetUrl('api/native/image'),{method:'POST',headers:{'Content-Type':'image/png'},body:blob});if(!response.ok)throw Error('Native image unavailable');const {ticket}=await response.json();if(!/^[a-f0-9]{48}$/.test(ticket))throw Error('Invalid ticket');await backupNative();wx.navigateTo({url:'/shops/pages/bridge/index?action=save&ticket='+ticket});return true;}
export function connectNative(){backupNative();window.addEventListener('pagehide',backupNative);document.addEventListener('visibilitychange',()=>{if(document.hidden)backupNative();});let timer;window.addEventListener('fandazi:save',()=>{clearTimeout(timer);timer=setTimeout(backupNative,300);});}
