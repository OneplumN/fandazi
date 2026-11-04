import {execFileSync} from 'node:child_process';
import {createServer} from 'node:http';
import {readFile,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../../',import.meta.url));
const work=path.join(root,'work','browser-tests');
// This directory belongs exclusively to this harness. Never clear arbitrary output paths.
await rm(work,{recursive:true,force:true});
for(const [name,base,flags] of [['production','/',[]],['test','/play/',['--test-tools']]]) {
 execFileSync(process.execPath,['scripts/build-static.mjs','--base',base,'--out-dir',path.join(work,name),...flags],{cwd:root,stdio:'inherit'});
}
const types={'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.json':'application/json'};
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost'),test=url.pathname.startsWith('/play/');
  let file;
  if(url.pathname==='/__test/modal-isolation.js')file=path.join(root,'src/modal-isolation.js');
  else {
   const base=path.join(work,test?'test':'production');
   const relative=decodeURIComponent(test?url.pathname.slice(6):url.pathname).replace(/^\//,'');
   file=path.resolve(base,relative||'index.html');
   if(file!==base&&!file.startsWith(base+path.sep))throw Error('outside root');
  }
  const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(4186,'127.0.0.1');
