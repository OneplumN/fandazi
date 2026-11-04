// A shared lock covers nested sheets, including mobile browsers that scroll an overflow-hidden body.
let locks=0,saved;
export function lockPageScroll(){
 if(locks++===0){
  const body=document.body,html=document.documentElement;
  saved={x:window.scrollX,y:window.scrollY,body:body.style.cssText,htmlOverflow:html.style.overflow,behavior:html.style.scrollBehavior};
  body.style.position='fixed';body.style.top=`-${saved.y}px`;body.style.left=`-${saved.x}px`;body.style.width='100%';body.style.overflow='hidden';html.style.overflow='hidden';
 }
 let released=false;
 return()=>{
  if(released)return;released=true;if(--locks!==0)return;
  const html=document.documentElement,body=document.body,restore=saved;saved=null;
  body.style.cssText=restore.body;html.style.overflow=restore.htmlOverflow;html.style.scrollBehavior='auto';window.scrollTo(restore.x,restore.y);html.style.scrollBehavior=restore.behavior;
 };
}
