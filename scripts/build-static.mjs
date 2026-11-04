import {cp,readFile,writeFile,readdir,mkdir,mkdtemp,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {build} from 'vite';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),args=process.argv.slice(2);
const value=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1];};
const base=value('--base','/');if(!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base))throw new Error('Base must be / or a path such as /malatang/');
const parent=path.resolve(value('--out-parent',path.join(root,'work')));await mkdir(parent,{recursive:true});
const stage=await mkdtemp(path.join(parent,'malatang-build-')),out=await mkdtemp(path.join(parent,'malatang-static-'));
const filter=source=>!path.basename(source).startsWith('._');
try{
 await cp(path.join(root,'public'),stage,{recursive:true,filter});
 for(const name of ['src','vendor'])await cp(path.join(root,name),path.join(stage,name),{recursive:true,filter});
 // Preserve the optional subpath deployment without serving editable source modules in production.
 for(const file of ['src/app.js','src/games/hub.js']){
  const p=path.join(stage,file);let s=await readFile(p,'utf8');
  s=s.replaceAll('"/api/',`"${base}api/`).replaceAll('`/api/',`\`${base}api/`).replaceAll('`/art/',`\`${base}art/`).replaceAll('startsWith("/admin")',`startsWith(${JSON.stringify(base+'admin')})`);
  s=s.replace('T === "admin" ? "/admin" : "/#malatang"',`T === "admin" ? ${JSON.stringify(base+'admin')} : ${JSON.stringify(base+'#malatang')}`);await writeFile(p,s);
 }
 await build({root:stage,configFile:false,base,publicDir:false,logLevel:'warn',define:{__DAZI_STATIC__:'true'},build:{outDir:out,emptyOutDir:true,target:'es2020',cssCodeSplit:false,minify:true,rolldownOptions:{output:{codeSplitting:{groups:[{name:'react-vendor',test:/vendor\/react-runtime\.js$/}]}}}}});
 await cp(path.join(stage,'art'),path.join(out,'art'),{recursive:true,filter});
 for(const name of ['robots.txt','favicon.ico','favicon.svg','share-cover-v1.png','share-cover-v2.png','sitemap.xml'])await cp(path.join(stage,name),path.join(out,name));
 const files=[];
 async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())await walk(p);else{
   const bytes=await readFile(p);files.push({path:path.relative(out,p),bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
   if(/\.(js|css|html|svg)$/.test(p)){const compressed=gzipSync(bytes,{level:9}),gz=p+'.gz';await writeFile(gz,compressed);files.push({path:path.relative(out,gz),bytes:compressed.length,sha256:createHash('sha256').update(compressed).digest('hex')});}
 }}}
 await walk(out);await writeFile(path.join(out,'release-manifest.json'),JSON.stringify({base,generatedAt:new Date().toISOString(),files},null,2));
 console.log(JSON.stringify({directory:out,base,files:files.length,assets:files.filter(f=>f.path.startsWith('assets/')).map(f=>({path:f.path,bytes:f.bytes}))}));
}finally{await rm(stage,{recursive:true,force:true});}
