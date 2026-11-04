import {X as React} from '../../vendor/react-runtime.js';
import {dragDistance} from './gesture-model.js';
export {createHoldGesture} from './gesture-model.js';
export function useOptionalStroke(onStroke,{circle=false}={}) {
 const current=React.useRef(null),latest=React.useRef(onStroke),skip=React.useRef(false);latest.current=onStroke;
 return {onPointerDown:e=>{if(e.isPrimary===false)return;try{e.currentTarget.setPointerCapture?.(e.pointerId);}catch{}skip.current=false;current.current={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,path:0};},
 onPointerMove:e=>{const p=current.current;if(!p||p.id!==e.pointerId)return;p.path+=Math.hypot(e.clientX-p.lastX,e.clientY-p.lastY);p.lastX=e.clientX;p.lastY=e.clientY;},
 onPointerUp:e=>{const p=current.current;current.current=null;if(!p)return;const distance=dragDistance(p,e);if(circle?p.path>100&&distance<65:distance>36){skip.current=true;latest.current();}},
 onPointerCancel:()=>{current.current=null;skip.current=true;},
 onClickCapture:e=>{if(skip.current&&e.detail!==0){e.preventDefault();e.stopPropagation();skip.current=false;}}};
}
