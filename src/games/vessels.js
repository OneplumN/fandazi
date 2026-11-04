import {X as React} from '../../vendor/react-runtime.js';
const h=React.createElement;
export function ServingBowl({api,children}) {
  return h('div',{className:'serving-bowl'},h('svg',{viewBox:'0 0 360 250','aria-hidden':true},
    h('ellipse',{cx:180,cy:122,rx:148,ry:90,fill:'#E9CEA2',stroke:'#3D2B23',strokeWidth:3})),
    h('div',{className:'bowl-mouthful'},children),
    h('svg',{viewBox:'0 0 360 250',className:'bowl-front','aria-hidden':true},
      h('path',{d:'M32 122 Q39 230 180 238 Q321 230 328 122 Q180 194 32 122 Z',fill:'#F7E9CE',stroke:'#3D2B23',strokeWidth:3}),h(api.Face,{x:180,y:205,scale:1.7,mood:0})));
}
