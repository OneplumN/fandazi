import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.json':'application/json'};
http.createServer(async(req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname.startsWith('/api/')){res.writeHead(503,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'本地逆向副本未恢复原站后端，玩家使用内置数据'}));return;}
 const relative=pathname.startsWith('/src/')||pathname.startsWith('/vendor/')?pathname.slice(1):'public/'+(pathname==='/'||pathname==='/admin'?'index.html':pathname.slice(1));
 const file=path.resolve(root,relative);
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 try {const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}
}).listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log(`麻辣搭子本地版：http://127.0.0.1:${process.env.PORT||4173}`));
