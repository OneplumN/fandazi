import {X as React} from '../../vendor/react-runtime.js';
const h=React.createElement;
export function ControlIcon({muted=false,more=false}){
 return h('svg',{viewBox:'0 0 24 24',width:22,height:22,fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true,focusable:false},
 more?[6,12,18].map(cx=>h('circle',{key:cx,cx,cy:12,r:1,fill:'currentColor',stroke:'none'})):
 [h('path',{key:'speaker',d:'M4 9h4l5-4v14l-5-4H4z'}),muted?h('path',{key:'mute',d:'m17 9 5 6m0-6-5 6'}):h('g',{key:'waves'},h('path',{d:'M17 8a6 6 0 0 1 0 8'}),h('path',{d:'M20 5a10 10 0 0 1 0 14'}))]);
}
