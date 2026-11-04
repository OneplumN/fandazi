import {X as React} from '../../vendor/react-runtime.js';
import {claimDaily,walletSnapshot,importFreshWallet} from './wallet-store.js';
const h=React.createElement;
export const PRIMARY_ORIGIN='https://fandazi.oneplums.cn',LEGACY_ORIGIN='https://malatang.oneplums.cn';
const PREF_KEYS=['dazi.outing.v1','dazi.dining.v1','dazi.experience.v1','malatang.settings','malatang.budget'];
export function DomainNotice(){
 const [status,setStatus]=React.useState(''),popup=React.useRef(null),nonce=React.useRef(null);
 React.useEffect(()=>{
  const receive=async event=>{
   if(event.origin!==PRIMARY_ORIGIN||event.source!==popup.current||event.data?.nonce!==nonce.current||event.data?.type!=='fandazi:ready')return;
   await claimDaily();const prefs={};for(const key of PREF_KEYS)try{const raw=localStorage.getItem(key);if(raw&&raw.length<200000)prefs[key]=raw;}catch{}
   popup.current?.postMessage({type:'fandazi:backup',nonce:nonce.current,backup:{version:1,wallet:walletSnapshot().wallet,prefs}},PRIMARY_ORIGIN);setStatus('存档已送到新窗口，去那边继续逛吧。');
  };window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);
 },[]);
 if(location.origin!==LEGACY_ORIGIN)return null;
 return h('section',{className:'domain-notice'},h('p',null,'小馆换了新门牌，金币和装扮也能一起带走。'),h('button',{type:'button',className:'btn btn--ghost',onClick:()=>{nonce.current=crypto.randomUUID();popup.current=window.open(`${PRIMARY_ORIGIN}/#move-in?nonce=${nonce.current}`,'fandazi-move');if(!popup.current)setStatus('新窗口没有打开，请允许打开新页面后再试一次。');}},'带着存档去新站'),h('small',{role:'status'},status));
}
export function MoveIn(){
 const [message,setMessage]=React.useState('正在接回旧站存档…'),[done,setDone]=React.useState(false),running=React.useRef(false);
 React.useEffect(()=>{
  const nonce=new URLSearchParams(location.hash.split('?')[1]||'').get('nonce');if(location.origin!==PRIMARY_ORIGIN||!window.opener||!nonce){setMessage('请从旧站首页点击“带着存档去新站”。');return;}
  const receive=async event=>{
   if(running.current||event.origin!==LEGACY_ORIGIN||event.source!==window.opener||event.data?.type!=='fandazi:backup'||event.data?.nonce!==nonce)return;
   const backup=event.data.backup;if(backup?.version!==1||!backup.prefs||typeof backup.prefs!=='object'){setMessage('没有收到完整存档，旧站记录仍然保留。');return;}
   running.current=true;
   try{const result=await importFreshWallet(backup.wallet);if(result.status==='not-empty'){setMessage('新站已经有自己的用餐记录，已保留；旧站存档也还在。');setDone(true);return;}if(result.status!=='imported')throw Error('Invalid backup');
    for(const key of PREF_KEYS){const raw=backup.prefs[key];if(typeof raw!=='string'||raw.length>200000)continue;try{if(key!=='malatang.budget')JSON.parse(raw);else if(!Number.isFinite(Number(raw)))continue;localStorage.setItem(key,raw);}catch{}}
    setMessage(`接回来啦：${result.wallet.balance}金币、装扮和小票都带来了。旧站存档也会保留。`);setDone(true);
   }catch{setMessage('这次没有接成功，旧站记录仍然保留，可以重新打开再试。');running.current=false;}
  };window.addEventListener('message',receive);window.opener.postMessage({type:'fandazi:ready',nonce},LEGACY_ORIGIN);return()=>window.removeEventListener('message',receive);
 },[]);
 return h('main',{className:'game-shell move-in'},h('h1',null,'欢迎来到新街'),h('p',{role:'status'},message),done?h('a',{href:PRIMARY_ORIGIN+'/#home',className:'btn btn--primary',onClick:e=>{e.preventDefault();location.hash='home';location.reload();}},'进去逛逛'):h('a',{href:LEGACY_ORIGIN+'/#home',className:'btn btn--ghost'},'回旧站看看'));
}
