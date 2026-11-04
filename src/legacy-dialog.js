import {X as React} from '../vendor/react-runtime.js';
import {isolateModal} from './modal-isolation.js';
import {lockPageScroll} from './scroll-lock.js';
const h=React.createElement;
// Preserves recovered dialog geometry while sharing accessible modal behavior.
export function LegacyDialog({children,onClick,...props}) {
 const ref=React.useRef(null),close=React.useRef(onClick);close.current=onClick;
 React.useEffect(()=>{const node=ref.current,previous=document.activeElement,scope=isolateModal(node),unlock=lockPageScroll();
 const choices=()=>[...node.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),summary,[tabindex="0"]')].filter(e=>e.getClientRects().length);
 (choices()[0]||node).focus();const key=e=>{if(!scope.isTop())return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close.current?.(e);}if(e.key==='Tab'){const list=choices(),first=list[0],last=list.at(-1);if(!first){e.preventDefault();node.focus();}else if(e.shiftKey&&(document.activeElement===first||document.activeElement===node)){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};node.addEventListener('keydown',key);
 return()=>{node.removeEventListener('keydown',key);scope.release();unlock();if(previous?.isConnected)previous.focus({preventScroll:true});};},[]);
 return h('div',{...props,onClick,ref,tabIndex:-1},children);
}
