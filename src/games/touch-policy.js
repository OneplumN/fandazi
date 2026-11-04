// A short same-position touch burst is one gesture, including after a food slot or dialog is replaced.
// Keyboard activation and mouse clicks keep their native semantics.
export function suppressKitchenTouch({touch,moved=false,cancelled=false,changedTarget=false,previous,now,x,y}) {
  if(!touch)return false;
  if(moved||cancelled||changedTarget)return true;
  return !!previous && now-previous.at>=0 && now-previous.at<260 && Math.hypot(x-previous.x,y-previous.y)<22;
}
