import {assetUrl} from './runtime.js';
import {validWallet,SHOP_ITEMS} from './games/economy.js';
import {NATIVE_KEYS,markNativeRestored} from './wechat-bridge.js';
async function start(){
 const params=new URLSearchParams(location.search),ticket=params.get('restore');
 if(ticket){
  params.delete('restore');history.replaceState(null,'',location.pathname+(params.size?'?'+params:'')+location.hash);
  try{
   if(!/^[a-f0-9]{48}$/.test(ticket))throw Error('Invalid ticket');
   const response=await fetch(assetUrl('api/native/restore/'+ticket),{cache:'no-store'});
   if(!response.ok)throw Error('Restore unavailable');
   const backup=await response.json(),current=JSON.parse(localStorage.getItem('dazi.wallet.v1')||'null'),wallet=JSON.parse(backup.values?.['dazi.wallet.v1']||'null');
   const fresh=!current||(validWallet(current)&&current.spent===0&&Object.keys(current.orders||{}).length===0&&current.owned.every(id=>SHOP_ITEMS.some(i=>i.id===id&&i.price===0))&&current.ledger.every(t=>t.id?.startsWith('daily:')));
   if(!fresh)throw Error('Existing progress protected');
   if(!validWallet(wallet))throw Error('Invalid wallet');
   const pairs=[];
   for(const key of NATIVE_KEYS){const value=backup.values[key];if(value===undefined)continue;if(typeof value!=='string'||value.length>50000)throw Error('Invalid backup');if(key!=='malatang.budget')JSON.parse(value);else if(!Number.isFinite(Number(value)))throw Error('Invalid budget');pairs.push([key,value,localStorage.getItem(key)]);}
   try{for(const [key,value]of pairs)localStorage.setItem(key,value);markNativeRestored();}catch(e){for(const [key,,previous]of pairs)try{previous===null?localStorage.removeItem(key):localStorage.setItem(key,previous);}catch{}throw e;}
  }catch{try{sessionStorage.setItem('fandazi.restore-note','存档未能接回，原记录仍然保留。');}catch{}}
 }
 await import('./main.js');
}
start().catch(()=>{const node=document.getElementById('root');if(node)node.textContent='小馆这次没有打开，刷新一下再来吧。';});
