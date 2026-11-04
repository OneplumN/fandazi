import {X,i} from '../../vendor/react-runtime.js';
import {assetUrl} from '../runtime.js';
export function CharacterAvatar({ id: s, name: f, size: d = 72, color: r = "#FF6B6B" }) {
  const [S, g] = X.useState(!1),
    O = { width: d, height: d, background: `${r}22` };
  return S
    ? i.jsx("div", {
        className: "avatar avatar--fallback",
        style: O,
        children: f.slice(0, 1),
      })
    : i.jsx("div", {
        className: "avatar",
        style: O,
        children: i.jsx("img", {
          src: assetUrl(`art/char/${s}.webp`),
          alt: f,
          width: d,
          height: d,
          loading: "lazy",
          onError: () => g(!0),
        }),
      });
}
