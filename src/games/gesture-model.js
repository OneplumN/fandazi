// Pointer actions cancel when scrolling; the normal click remains the accessible fallback.
export function createHoldGesture({hold,tap,delay=430,schedule=setTimeout,cancel=clearTimeout}) {
 let gesture=null,suppress=false;
 const clear=()=>{if(gesture?.timer)cancel(gesture.timer);};
 return {
  down(e){clear();suppress=false;if(e.isPrimary===false||e.button>0)return;gesture={x:e.clientX,y:e.clientY,id:e.pointerId};gesture.timer=schedule(()=>{if(!gesture)return;suppress=true;hold();},delay);},
  move(e){if(gesture&&Math.hypot(e.clientX-gesture.x,e.clientY-gesture.y)>12){clear();gesture=null;suppress=true;}},
  cancel(){if(!gesture)return;clear();gesture=null;suppress=true;},
  up(){clear();gesture=null;},
  click(e){if(e.detail===0){tap();return;}if(!suppress)tap();suppress=false;},
  dispose(){clear();gesture=null;}
 };
}
export function dragDistance(start,event){return start?Math.hypot(event.clientX-start.x,event.clientY-start.y):0;}

