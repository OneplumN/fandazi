import {cp,readFile,writeFile,readdir,mkdir,mkdtemp,rm,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {gzipSync,brotliCompressSync,constants} from 'node:zlib';
import {build} from 'vite';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),args=process.argv.slice(2);
const value=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1];};
const base=value('--base','/');if(!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base))throw new Error('Base must be / or a path such as /fandazi/');
const parent=path.resolve(value('--out-parent',path.join(root,'work')));await mkdir(parent,{recursive:true});
const stage=await mkdtemp(path.join(parent,'fandazi-build-'));
const explicit=value('--out-dir',null),out=explicit?path.resolve(explicit):await mkdtemp(path.join(parent,'fandazi-static-'));
if(out===root||out===path.parse(out).root||path.relative(root,out)==='public')throw new Error('Unsafe output directory');
if(explicit){try{if((await readdir(out)).length)throw new Error('Output directory must be empty: '+out);}catch(e){if(e.code!=='ENOENT')throw e;}await mkdir(out,{recursive:true});}
const filter=source=>!path.basename(source).startsWith('._'),assets={};
try{
 await cp(path.join(root,'public'),stage,{recursive:true,filter});
 for(const name of ['src','vendor'])await cp(path.join(root,name),path.join(stage,name),{recursive:true,filter});
 // Keep original filenames locally; content-addressed media in releases never go stale.
 const media=[];async function collect(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await collect(p);else if(!e.name.startsWith('._'))media.push(p);}}
 await collect(path.join(root,'public/art'));
 for(const p of media){const relative=path.relative(path.join(root,'public'),p).split(path.sep).join('/'),bytes=await readFile(p),hash=createHash('sha256').update(bytes).digest('hex').slice(0,12),ext=path.extname(relative),name=path.basename(relative,ext)+'-'+hash+ext;assets[relative]=base+'assets/'+name;}
 await build({root:stage,configFile:false,base,publicDir:false,logLevel:'warn',define:{__DAZI_STATIC__:'true',__DAZI_DEV_TOOLS__:String(args.includes('--test-tools')),__DAZI_BASE__:JSON.stringify(base),__DAZI_ASSETS__:JSON.stringify(assets)},build:{outDir:out,emptyOutDir:false,target:'es2020',cssCodeSplit:false,sourcemap:'hidden',minify:true,rolldownOptions:{input:{index:path.join(stage,'index.html'),ops:path.join(stage,'ops.html')},output:{codeSplitting:{groups:[{name:'react-vendor',test:/vendor\/react-runtime\.js$/}]}}}}});
 for(const p of media){const relative=path.relative(path.join(root,'public'),p).split(path.sep).join('/');await cp(p,path.join(out,assets[relative].slice(base.length)));}
 for(const name of ['robots.txt','favicon.ico','favicon.svg','share-cover-v2.png','sitemap.xml'])await cp(path.join(stage,name),path.join(out,name));
 const files=[];async function record(p,bytes){files.push({path:path.relative(out,p).split(path.sep).join('/'),bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}
 async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){if(entry.name.startsWith('._'))continue;const p=path.join(dir,entry.name);if(entry.isDirectory())await walk(p);else{
 const bytes=await readFile(p);await record(p,bytes);
 if(/\.(js|css|html|svg)$/.test(p)){for(const [suffix,compressed]of [['.gz',gzipSync(bytes,{level:9})],['.br',brotliCompressSync(bytes,{params:{[constants.BROTLI_PARAM_QUALITY]:11}})]]){await writeFile(p+suffix,compressed);await record(p+suffix,compressed);}}
 }}}
 await walk(out);await writeFile(path.join(out,'release-manifest.json'),JSON.stringify({base,testTools:args.includes('--test-tools'),generatedAt:new Date().toISOString(),files},null,2));
 console.log(JSON.stringify({directory:out,base,testTools:args.includes('--test-tools'),files:files.length,assets:files.filter(f=>f.path.startsWith('assets/')).map(f=>({path:f.path,bytes:f.bytes}))}));
}finally{await rm(stage,{recursive:true,force:true});}
