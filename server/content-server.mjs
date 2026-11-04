import http from 'node:http';
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {createHash,timingSafeEqual,randomBytes} from 'node:crypto';
import path from 'node:path';
import {validWallet} from '../src/games/economy.js';
import {validateStreetContent,DEFAULT_STREET,STORE_IDS} from '../src/content-model.js';
const maxBody=64000;
export async function createContentServer({dataDir,token,allowReviews=false}) {
 await mkdir(dataDir,{recursive:true,mode:0o700});const file=path.join(dataDir,'street.json'),reviewFile=path.join(dataDir,'reviews.json');let content=DEFAULT_STREET,reviews=[];
 try{const raw=JSON.parse(await readFile(file,'utf8')),valid=validateStreetContent(raw);if(!valid)throw Error('Invalid stored content');content=valid;}catch(e){if(e.code!=='ENOENT')throw e;}
 try{reviews=JSON.parse(await readFile(reviewFile,'utf8'));if(!Array.isArray(reviews))throw Error('Invalid stored reviews');}catch(e){if(e.code!=='ENOENT')throw e;}
 let queue=Promise.resolve();const limits=new Map(),tickets=new Map();
 const nativeKeys=['dazi.wallet.v1','dazi.outing.v1','dazi.consumer.v1','dazi.dining.v1','dazi.experience.v1','malatang.settings','malatang.budget','dazi.native-id.v1'];
 const ticketFor=(type,data)=>{const now=Date.now();for(const [key,value]of tickets)if(value.until<now)tickets.delete(key);while(tickets.size>=50)tickets.delete(tickets.keys().next().value);const ticket=randomBytes(24).toString('hex');tickets.set(ticket,{type,data,until:now+300000});return ticket;};const write=async(p,data)=>{const tmp=p+'.next';await writeFile(tmp,JSON.stringify(data,null,2),{mode:0o600});await rename(tmp,p);};
 const reply=(res,status,value,headers={})=>{const body=JSON.stringify(value);res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers});res.end(body);};
 const body=async(req,limit=maxBody)=>{const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>limit)throw Error('Request too large');chunks.push(chunk);}return JSON.parse(Buffer.concat(chunks).toString('utf8'));};
 const authenticated=req=>{if(!token)return false;const given=String(req.headers.authorization||'').replace(/^Bearer /,'');const a=Buffer.from(given),b=Buffer.from(token);return a.length===b.length&&timingSafeEqual(a,b);};
 function publicContent(){const result={...content};if(allowReviews){const aggregates={};for(const id of [...new Set([...STORE_IDS,...content.stores.map(s=>s.id)])]){const latest=new Map();for(const r of reviews.filter(r=>r.storeId===id))latest.set(r.client,r);const values=[...latest.values()];if(values.length)aggregates[id]={count:values.length,rating:Math.round(values.reduce((s,r)=>s+r.rating,0)/values.length*10)/10};}result.aggregates=aggregates;}return result;}
 return http.createServer(async(req,res)=>{const url=new URL(req.url,'http://localhost');try{
 if(url.pathname.startsWith('/api/native/')){
 const origin=req.headers.origin;if(origin&&!['https://fandazi.oneplums.cn','https://malatang.oneplums.cn'].includes(origin))return reply(res,403,{error:'Origin rejected'});
 if(req.method==='POST'&&url.pathname==='/api/native/restore'){
  const raw=await body(req,256000);if(raw?.version!==1||!raw.values||typeof raw.values!=='object')return reply(res,400,{error:'Invalid backup'});const values={};let size=0;
  for(const key of nativeKeys){const value=raw.values[key];if(value===undefined)continue;if(typeof value!=='string'||value.length>50000)return reply(res,400,{error:'Invalid backup'});size+=value.length;if(key!=='malatang.budget')JSON.parse(value);else if(!Number.isFinite(Number(value)))return reply(res,400,{error:'Invalid budget'});values[key]=value;}
  if(size>60000||!validWallet(JSON.parse(values['dazi.wallet.v1']||'null')))return reply(res,400,{error:'Invalid wallet'});return reply(res,200,{ticket:ticketFor('restore',{version:1,values})});
 }
 if(req.method==='POST'&&url.pathname==='/api/native/image'){
  let chunks=[],size=0;for await(const c of req){size+=c.length;if(size>512000)return reply(res,413,{error:'Image too large'});chunks.push(c);}const bytes=Buffer.concat(chunks);if(bytes.length<24||!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||bytes.readUInt32BE(16)>2000||bytes.readUInt32BE(20)>3000)return reply(res,400,{error:'Invalid image'});return reply(res,200,{ticket:ticketFor('image',bytes)});
 }
 const match=url.pathname.match(/^\/api\/native\/(restore|image)\/([a-f0-9]{48})$/);if(req.method==='GET'&&match){const item=tickets.get(match[2]);if(!item||item.type!==match[1]||item.until<Date.now())return reply(res,404,{error:'Expired ticket'});tickets.delete(match[2]);if(item.type==='restore')return reply(res,200,item.data);res.writeHead(200,{'Content-Type':'image/png','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});return res.end(item.data);}
 return reply(res,404,{error:'Not found'});
 }
 if(req.method==='GET'&&url.pathname==='/healthz')return reply(res,200,{ok:true});
 if(req.method==='GET'&&url.pathname==='/api/street'){const result=publicContent(),etag='"'+createHash('sha256').update(JSON.stringify(result)).digest('hex').slice(0,24)+'"';if(req.headers['if-none-match']===etag){res.writeHead(304,{ETag:etag});return res.end();}return reply(res,200,result,{ETag:etag,'Cache-Control':'public, max-age=60, stale-while-revalidate=300'});}
 if(req.method==='PUT'&&url.pathname==='/api/ops/street'){
 if(!authenticated(req))return reply(res,401,{error:'Authentication required'});
 const raw=await body(req),valid=validateStreetContent(raw);if(!valid)return reply(res,400,{error:'Invalid street content'});
 // Public aggregates are derived from actual submitted reviews, never operator-provided examples.
 delete valid.aggregates;const task=queue.then(async()=>{await write(file,valid);content=valid;});queue=task.catch(()=>{});await task;return reply(res,200,{ok:true,content:publicContent()});}
 if(req.method==='POST'&&url.pathname==='/api/reviews'&&allowReviews){
 const origin=req.headers.origin;if(origin&&!['https://fandazi.oneplums.cn','https://malatang.oneplums.cn'].includes(origin))return reply(res,403,{error:'Origin rejected'});
 const ip=String(req.headers['x-real-ip']||req.socket.remoteAddress),now=Date.now(),bucket=limits.get(ip)||{since:now,count:0};if(now-bucket.since>60000){bucket.since=now;bucket.count=0;}bucket.count++;limits.set(ip,bucket);if(limits.size>10000)for(const [k,v]of limits)if(now-v.since>60000)limits.delete(k);if(bucket.count>15)return reply(res,429,{error:'Please try later'});
 const raw=await body(req);if(!raw||!content.stores.some(s=>s.id===raw.storeId)||!Number.isInteger(raw.rating)||raw.rating<1||raw.rating>5||typeof raw.text!=='string'||raw.text.length>240||typeof raw.clientId!=='string'||!/^[-a-zA-Z0-9:]{16,100}$/.test(raw.clientId)||typeof raw.mealId!=='string'||raw.mealId.length>8192)return reply(res,400,{error:'Invalid review'});
 const client=createHash('sha256').update(raw.clientId).digest('hex'),entry={client,storeId:raw.storeId,rating:raw.rating,text:raw.text,mealId:raw.mealId,at:now};const task=queue.then(async()=>{const next=reviews.filter(r=>!(r.client===client&&r.mealId===entry.mealId));next.push(entry);const bounded=next.slice(-10000);await write(reviewFile,bounded);reviews=bounded;});queue=task.catch(()=>{});await task;return reply(res,200,{ok:true});}
 return reply(res,404,{error:'Not found'});
 }catch(e){return reply(res,e.message==='Request too large'?413:e instanceof SyntaxError?400:500,{error:e instanceof SyntaxError?'Invalid JSON':'Request could not be completed'});}});
}
if(process.argv[1]&&path.resolve(process.argv[1])===new URL(import.meta.url).pathname){const token=process.env.FANDAZI_OPS_TOKEN;if(!token||token.length<32)throw Error('FANDAZI_OPS_TOKEN must contain at least32 characters');const server=await createContentServer({dataDir:process.env.FANDAZI_DATA_DIR||'./work/content-data',token,allowReviews:process.env.FANDAZI_REVIEWS==='1'});server.listen(Number(process.env.PORT||8787),'127.0.0.1',()=>console.log('饭搭子内容服务已启动，仅监听本机'));}
