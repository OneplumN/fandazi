const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
export function blendColor(a,b,t){
  const weight=clamp(t), rgb=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));
  return '#'+rgb(a).map((v,i)=>Math.round(v+(rgb(b)[i]-v)*weight).toString(16).padStart(2,'0')).join('');
}
export function heatLook(ratio=0){
  const heat=clamp(Number.isFinite(ratio)?ratio:0,0,2.5);
  const toasted=clamp((heat-.08)/1.02),scorch=clamp((heat-1.25)/.75);
  return {heat,toasted,scorch,marks:clamp((heat-.28)/.9)*.75,
    shrink:1-.065*clamp(heat/1.25),shine:clamp(1-scorch*.85)*.6,
    color:(raw,gold,burn='#745032')=>blendColor(blendColor(raw,gold,toasted),burn,scorch)};
}
