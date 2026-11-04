import {X as React} from '../vendor/react-runtime.js';
const h=React.createElement;
export function LazyRack({category,items,label,emoji,big,defer,Food,settings,qtyOf,onAdd,size}){
 const [seen,setSeen]=React.useState(!defer),[height,setHeight]=React.useState(600),ref=React.useRef(null),body=React.useRef(null),show=seen||!defer;
 React.useEffect(()=>{
  if(!defer){setSeen(true);return;}
  if(!window.IntersectionObserver){setSeen(true);return;}
  let visible=false,disposed=false;
  const update=()=>{if(!disposed&&ref.current)setSeen(visible||ref.current.contains(document.activeElement));};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();},{rootMargin:'300px 0px'});
  const blur=()=>queueMicrotask(update);const node=ref.current;node.addEventListener('focusout',blur);observer.observe(node);
  return()=>{disposed=true;observer.disconnect();node.removeEventListener('focusout',blur);};
 },[defer]);
 React.useLayoutEffect(()=>{
  const measure=()=>{const node=body.current;if(!node)return;const style=getComputedStyle(node),columns=Math.max(1,style.gridTemplateColumns.split(' ').filter(Boolean).length),rows=Math.ceil(items.length/columns),rowHeight=parseFloat(style.gridAutoRows)||150;setHeight(show?node.getBoundingClientRect().height:rows*rowHeight);};
  measure();const observer=window.ResizeObserver?new ResizeObserver(measure):null;observer?.observe(body.current);return()=>observer?.disconnect();
 },[show,items.length]);
 return h('div',{className:`rack${big?' rack--big':''}`,ref,'data-category':category,'data-deferred':!show},
  h('div',{className:'rack-sign'},h('span',{className:'rack-emoji'},emoji),h('b',null,label),h('i',null,`${items.length} 种`)),
  h('div',{className:'rack-body',ref:body,style:show?undefined:{height},'aria-busy':!show},show?items.map(food=>h(Food,{key:food.id,ing:food,settings,qty:qtyOf(food.id),size,onAdd})):null));
}
