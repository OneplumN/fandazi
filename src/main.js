import {connectNative} from './wechat-bridge.js';
import {X as React,Hm} from '../vendor/react-runtime.js';
import {GameCollection} from './games/hub.js';
import {MENU,DEFAULT_SETTINGS} from './data/menu.js';
import {FoodIllustration,FoodFace} from './art/foods.js';
import {CharacterAvatar} from './art/avatar.js';
const Malatang=React.lazy(()=>import('./app.js').then(m=>({default:m.MalatangApp})));
let restoreNote='';try{restoreNote=sessionStorage.getItem('fandazi.restore-note')||'';sessionStorage.removeItem('fandazi.restore-note');}catch{}
function App(){const [message,setMessage]=React.useState(restoreNote);return React.createElement(React.Fragment,null,message&&React.createElement('aside',{className:'restore-note',role:'status'},React.createElement('p',null,message),React.createElement('button',{type:'button',onClick:()=>setMessage(''),'aria-label':'关闭存档提示'},'知道了')),React.createElement(GameCollection,{api:{Food:FoodIllustration,Avatar:CharacterAvatar,Face:FoodFace,menu:MENU,settings:DEFAULT_SETTINGS},Malatang}));}
Hm.createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode,null,React.createElement(App)));
connectNative();
