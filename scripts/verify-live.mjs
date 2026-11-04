import https from 'node:https';
import net from 'node:net';
import {brotliDecompressSync,gunzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
const origin=new URL(process.argv[2]||'https://fandazi.oneplums.cn/');
const ip=process.env.VERIFY_ORIGIN_IP;
function get(path,encoding='identity',method='GET'){
 return new Promise((resolve,reject)=>{const url=new URL(path,origin);const req=https.request(url,{method,headers:{'Accept-Encoding':encoding},...(ip?{lookup:(_host,options,cb)=>options.all?cb(null,[{address:ip,family:net.isIP(ip)}]):cb(null,ip,net.isIP(ip))}:{})},res=>{const chunks=[];res.on('data',b=>chunks.push(b));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks)}));});req.setTimeout(15000,()=>req.destroy(Error('Timeout')));req.on('error',reject);req.end();});
}
const page=await get('/');assert.equal(page.status,200);
for(const name of ['strict-transport-security','content-security-policy','x-frame-options','permissions-policy'])assert(page.headers[name],name);
const assets=[...new Set([...page.body.toString().matchAll(/(?:src|href)="([^\"]+\.(?:js|css))"/g)].map(m=>m[1]))];assert(assets.length>0);
for(const asset of assets){const raw=await get(asset),br=await get(asset,'br'),gzip=await get(asset,'gzip');assert.equal(raw.status,200);assert.equal(br.headers['content-encoding'],'br');assert.equal(gzip.headers['content-encoding'],'gzip');assert.deepEqual(brotliDecompressSync(br.body),raw.body);assert.deepEqual(gunzipSync(gzip.body),raw.body);assert.match(raw.headers['cache-control'],/immutable/);}
assert.equal((await get('/release-manifest.json')).status,404);
assert.equal((await get(assets.find(s=>s.endsWith('.js'))+'.map')).status,404);
assert.equal((await get('/src/app.js')).status,404);
assert.equal((await get('/api/street')).status,200);
assert.equal((await get('/api/ops/street','identity','PUT')).status,401);
assert.match((await get('/admin')).headers['x-robots-tag'],/noindex/);
console.log(JSON.stringify({origin:origin.origin,assets:assets.length,tls:true,compression:'br/gzip/identity byte equality',securityHeaders:true,privateArtifactsBlocked:true,streetAPI:true,adminAuthentication:true}));
