// Inline dialogs can live inside #root: isolate siblings on each ancestor level,
// never an ancestor of the active dialog. Counts preserve nested owners and the
// original attributes even when a second sheet is mounted in another branch.
const scopes = [];
const isolated = new Map();
let observer;
function restore(element, saved) {
  if (saved.inert === null) element.removeAttribute('inert');
  else element.setAttribute('inert', saved.inert);
  if (saved.hidden === null) element.removeAttribute('aria-hidden');
  else element.setAttribute('aria-hidden', saved.hidden);
}
function reconcile() {
  const top = scopes.at(-1)?.element;
  const counts = new Map();
  for (const scope of scopes) {
    for (let branch = scope.element; branch?.parentElement; branch = branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling === branch || sibling.contains(top) || ['SCRIPT','STYLE','LINK'].includes(sibling.tagName)) continue;
        counts.set(sibling, (counts.get(sibling) || 0) + 1);
      }
      if (branch.parentElement === document.body) break;
    }
  }
  for (const [element, saved] of isolated) {
    if (!counts.has(element)) { restore(element, saved); isolated.delete(element); }
  }
  for (const [element, count] of counts) {
    if (!isolated.has(element)) isolated.set(element, {inert:element.getAttribute('inert'), hidden:element.getAttribute('aria-hidden')});
    isolated.get(element).count = count;
    element.setAttribute('inert', '');
    element.setAttribute('aria-hidden', 'true');
  }
}
export function isolateModal(element) {
  const scope = {element};
  scopes.push(scope);
  if (!observer) {
    observer = new MutationObserver(reconcile);
    observer.observe(document.body, {childList:true, subtree:true});
  }
  reconcile();
  let released = false;
  return {
    isTop: () => scopes.at(-1) === scope,
    release() {
      if (released) return;
      released = true;
      scopes.splice(scopes.indexOf(scope), 1);
      reconcile();
      if (!scopes.length) { observer?.disconnect(); observer = undefined; }
    },
  };
}
