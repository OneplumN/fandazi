import {i} from '../../vendor/react-runtime.js';
import {createExtraFoodIcons} from '../extra-food-icons.js';

const ot = "#3D2B23";
function H(s, f) {
  const d = parseInt(s.slice(1), 16),
    r = Math.max(0, Math.min(255, ((d >> 16) & 255) + Math.round(255 * f))),
    S = Math.max(0, Math.min(255, ((d >> 8) & 255) + Math.round(255 * f))),
    g = Math.max(0, Math.min(255, (d & 255) + Math.round(255 * f)));
  return `#${((r << 16) | (S << 8) | g).toString(16).padStart(6, "0")}`;
}
const z = {
    stroke: ot,
    strokeWidth: 2.4,
    strokeLinejoin: "round",
    strokeLinecap: "round",
  },
  B = {
    stroke: ot,
    strokeWidth: 1.6,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    fill: "none",
  };
function FoodShine({ cx: s, cy: f, rx: d = 4, ry: r = 2.6 }) {
  return i.jsx("ellipse", {
    cx: s,
    cy: f,
    rx: d,
    ry: r,
    fill: "#fff",
    opacity: "0.42",
  });
}
function FoodFace({ x: s = 32, y: f = 36, mood: d = 0, scale: r = 1, eye: S = 2.4 }) {
  const g = 6.2 * r,
    O = s - g,
    D = s + g;
  return d === 2
    ? i.jsxs("g", {
        transform: `translate(${s} ${f}) scale(${r}) translate(${-s} ${-f})`,
        children: [
          i.jsx("path", {
            d: `M${O - 2} ${f} q2 -3 4 0`,
            ...B,
            strokeWidth: 1.9,
          }),
          i.jsx("path", {
            d: `M${D - 2} ${f} q2 -3 4 0`,
            ...B,
            strokeWidth: 1.9,
          }),
          i.jsx("path", {
            d: `M${s - 1.6} ${f + 5} q1.6 2 3.2 0`,
            ...B,
            strokeWidth: 1.5,
          }),
        ],
      })
    : i.jsxs("g", {
        transform: `translate(${s} ${f}) scale(${r}) translate(${-s} ${-f})`,
        children: [
          i.jsx("ellipse", { cx: O, cy: f, rx: S, ry: S * 1.32, fill: ot }),
          i.jsx("ellipse", { cx: D, cy: f, rx: S, ry: S * 1.32, fill: ot }),
          i.jsx("circle", { cx: O + 0.9, cy: f - 1.2, r: 0.9, fill: "#fff" }),
          i.jsx("circle", { cx: D + 0.9, cy: f - 1.2, r: 0.9, fill: "#fff" }),
          d === 0
            ? i.jsx("path", {
                d: `M${s - 3} ${f + 5.4} q3 2.8 6 0`,
                ...B,
                strokeWidth: 1.5,
              })
            : i.jsx("path", {
                d: `M${s - 3} ${f + 6} q1.5 -2 3 0 q1.5 2 3 0`,
                ...B,
                strokeWidth: 1.4,
              }),
        ],
      });
}
const $m = {
    anchundan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 10 C41 10 46 24 46 34 C46 44 40 51 32 51 C24 51 18 44 18 34 C18 24 23 10 32 10 Z",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            fill: H(s, -0.24),
            opacity: "0.7",
            children: [
              i.jsx("ellipse", { cx: "26", cy: "26", rx: "2", ry: "1.4" }),
              i.jsx("ellipse", { cx: "38", cy: "32", rx: "1.8", ry: "1.3" }),
              i.jsx("ellipse", { cx: "30", cy: "42", rx: "1.6", ry: "1.2" }),
              i.jsx("ellipse", { cx: "39", cy: "20", rx: "1.4", ry: "1" }),
            ],
          }),
          i.jsx(FoodShine, { cx: 26, cy: 20, rx: 3.4, ry: 2.4 }),
          i.jsx(FoodFace, { x: 32, y: 32, mood: f, scale: 0.66 }),
        ],
      }),
    jidan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 8 C43 8 49 24 49 35 C49 46 42 54 32 54 C22 54 15 46 15 35 C15 24 21 8 32 8 Z",
            fill: s,
            ...z,
          }),
          i.jsx(FoodShine, { cx: 25, cy: 22, rx: 4.6, ry: 3.2 }),
          i.jsx("path", {
            d: "M20 36 Q24 44 30 47",
            ...B,
            strokeWidth: 1.6,
            stroke: "#fff",
            opacity: "0.5",
          }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.72 }),
        ],
      }),
    zhishiniangao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "13",
            y: "16",
            width: "38",
            height: "34",
            rx: "9",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M20 22 Q32 18 44 22",
            ...B,
            strokeWidth: 1.4,
            stroke: "#fff",
            opacity: "0.5",
          }),
          i.jsx("path", {
            d: "M24 30 Q32 24 40 30 Q40 40 32 44 Q24 40 24 30 Z",
            fill: "#F6C453",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M28 33 Q32 30 36 33",
            ...B,
            strokeWidth: 1.2,
            stroke: "#fff",
            opacity: "0.7",
          }),
          i.jsx(FoodFace, { x: 32, y: 30, mood: f, scale: 0.55, eye: 2 }),
        ],
      }),
    xiaomahua: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M18 46 C26 40 24 30 32 26 C40 22 38 14 46 12",
            fill: "none",
            stroke: s,
            strokeWidth: "11",
            strokeLinecap: "round",
          }),
          i.jsx("path", {
            d: "M18 46 C26 40 24 30 32 26 C40 22 38 14 46 12",
            fill: "none",
            stroke: ot,
            strokeWidth: "2.2",
            strokeLinecap: "round",
          }),
          i.jsxs("g", {
            stroke: H(s, -0.22),
            strokeWidth: "1.5",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M22 42 L26 38" }),
              i.jsx("path", { d: "M27 34 L31 30" }),
              i.jsx("path", { d: "M34 24 L38 20" }),
            ],
          }),
          i.jsx(FoodFace, { x: 32, y: 32, mood: f, scale: 0.54, eye: 2 }),
        ],
      }),
  },
  Im = {
    spinach: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", { d: "M32 53 L32 44", ...B, strokeWidth: 2.6 }),
          i.jsx("path", {
            d: "M32 44 C22 37 20 22 28 13 C36 22 38 37 32 44 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M32 44 C24 41 16 33 16 24 C26 25 31 34 32 44 Z",
            fill: H(s, -0.12),
            ...z,
          }),
          i.jsx("path", {
            d: "M32 44 C40 41 48 33 48 24 C38 25 33 34 32 44 Z",
            fill: H(s, -0.12),
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "52",
            rx: "3.4",
            ry: "4.2",
            fill: "#C4574C",
            ...z,
          }),
          i.jsx(FoodFace, { x: 32, y: 29, mood: f, scale: 0.85 }),
        ],
      }),
    lettuce: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsxs("g", {
            fill: s,
            ...z,
            children: [
              i.jsx("circle", { cx: "32", cy: "33", r: "14" }),
              i.jsx("circle", { cx: "20", cy: "26", r: "7" }),
              i.jsx("circle", { cx: "44", cy: "26", r: "7" }),
              i.jsx("circle", { cx: "21", cy: "42", r: "7.5" }),
              i.jsx("circle", { cx: "43", cy: "42", r: "7.5" }),
              i.jsx("circle", { cx: "32", cy: "17", r: "7" }),
            ],
          }),
          i.jsx(FoodShine, { cx: 24, cy: 27, rx: 4.4, ry: 2.8 }),
          i.jsx(FoodFace, { x: 32, y: 35, mood: f, scale: 0.9 }),
        ],
      }),
    youmaicai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [
            { x: 22, r: -10 },
            { x: 32, r: 0 },
            { x: 42, r: 10 },
          ].map(({ x: d, r }) =>
            i.jsx(
              "path",
              {
                d: `M${d} 52 C${d - 4} 42 ${d - 4} 22 ${d} 13 C${d + 4} 22 ${d + 4} 42 ${d} 52 Z`,
                fill: d === 32 ? s : H(s, -0.1),
                ...z,
                transform: `rotate(${r} ${d} 52)`,
              },
              d,
            ),
          ),
          i.jsx(FoodFace, { x: 32, y: 37, mood: f, scale: 0.8 }),
        ],
      }),
    tonghao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", { d: "M32 55 L32 15", ...B, strokeWidth: 2.4 }),
          [45, 38, 22, 15].map((d) =>
            i.jsxs(
              "g",
              {
                children: [
                  i.jsx("ellipse", {
                    cx: "23",
                    cy: d,
                    rx: "6.2",
                    ry: "2.8",
                    fill: s,
                    ...z,
                    transform: `rotate(-22 23 ${d})`,
                  }),
                  i.jsx("ellipse", {
                    cx: "41",
                    cy: d,
                    rx: "6.2",
                    ry: "2.8",
                    fill: s,
                    ...z,
                    transform: `rotate(22 41 ${d})`,
                  }),
                ],
              },
              d,
            ),
          ),
          i.jsx("ellipse", {
            cx: "32",
            cy: "12",
            rx: "3.6",
            ry: "4.4",
            fill: s,
            ...z,
          }),
          i.jsx(FoodFace, { x: 32, y: 31, mood: f, scale: 0.75 }),
        ],
      }),
    xiaobaicai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M25 50 Q32 44 39 50 L37 58 L27 58 Z",
            fill: "#F3EFDC",
            ...z,
          }),
          i.jsx("path", {
            d: "M32 46 C20 42 16 28 22 17 C31 21 34 34 32 46 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M32 46 C44 42 48 28 42 17 C33 21 30 34 32 46 Z",
            fill: H(s, -0.1),
            ...z,
          }),
          i.jsx("path", { d: "M32 46 L32 24", ...B, strokeWidth: 1.4 }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.8 }),
        ],
      }),
    wawacai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 56 C20 52 15 34 19 16 C26 11 38 11 45 16 C49 34 44 52 32 56 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M32 54 C26 48 24 32 26 18 C30 16 34 16 38 18 C40 32 38 48 32 54 Z",
            fill: "#FBF4E0",
            ...z,
            strokeWidth: 1.6,
          }),
          i.jsx("path", { d: "M22 26 L22 40", ...B, strokeWidth: 1.2 }),
          i.jsx("path", { d: "M42 26 L42 40", ...B, strokeWidth: 1.2 }),
          i.jsx(FoodFace, { x: 32, y: 33, mood: f, scale: 0.78 }),
        ],
      }),
    kongxincai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M30 58 C29 44 29 30 31 14",
            ...B,
            strokeWidth: 2.6,
          }),
          i.jsx("ellipse", {
            cx: "30",
            cy: "58",
            rx: "4.4",
            ry: "3",
            fill: "#F3EFDC",
            ...z,
          }),
          i.jsx("path", {
            d: "M31 14 C40 18 45 26 43 34 C35 32 31 24 31 14 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M31 22 C24 26 20 33 22 40 C29 37 31 30 31 22 Z",
            fill: H(s, -0.1),
            ...z,
          }),
          i.jsx("path", { d: "M31 30 L31 44", ...B, strokeWidth: 1.2 }),
          i.jsx(FoodFace, { x: 31, y: 46, mood: f, scale: 0.72 }),
        ],
      }),
    wandouxian: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 58 C32 48 32 40 33 32",
            ...B,
            strokeWidth: 2.4,
          }),
          i.jsx("path", {
            d: "M33 32 C40 28 44 20 40 14 C34 18 32 25 33 32 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M32 36 C25 33 20 25 23 18 C29 22 32 29 32 36 Z",
            fill: H(s, -0.1),
            ...z,
          }),
          i.jsx("path", {
            d: "M33 32 C37 22 44 17 50 18 C47 24 41 29 33 32",
            ...B,
            strokeWidth: 1.8,
          }),
          i.jsx(FoodFace, { x: 32, y: 48, mood: f, scale: 0.7 }),
        ],
      }),
    xiangcai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 58 C31 46 31 34 32 24",
            ...B,
            strokeWidth: 2,
          }),
          [
            { x: 32, y: 16, r: 0 },
            { x: 21, y: 24, r: -40 },
            { x: 43, y: 24, r: 40 },
            { x: 25, y: 34, r: -70 },
            { x: 39, y: 34, r: 70 },
          ].map(({ x: d, y: r, r: S }) =>
            i.jsx(
              "g",
              {
                transform: `rotate(${S} ${d} ${r})`,
                children: i.jsx("ellipse", {
                  cx: d,
                  cy: r,
                  rx: "4.6",
                  ry: "7",
                  fill: s,
                  ...z,
                  strokeWidth: 2,
                }),
              },
              `${d}-${r}`,
            ),
          ),
          i.jsx(FoodFace, { x: 32, y: 47, mood: f, scale: 0.7 }),
        ],
      }),
    jiucai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [-12, -4, 4, 12].map((d, r) =>
            i.jsx(
              "path",
              {
                d: `M${32 + d} 56 L${32 + d} 20 L${32 + d + 2.6} 13 L${32 + d + 2.6} 56 Z`,
                fill: r % 2 ? H(s, 0.34) : H(s, 0.12),
                ...z,
                strokeWidth: 2,
              },
              d,
            ),
          ),
          i.jsx("path", { d: "M18 53 L46 53", ...B, strokeWidth: 2.8 }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.66 }),
        ],
      }),
    muercai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", { d: "M32 56 L32 44", ...B, strokeWidth: 2.6 }),
          i.jsx("path", {
            d: "M32 44 C18 40 12 26 20 15 C29 11 40 16 44 26 C47 36 40 43 32 44 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M32 44 L30 20", ...B, strokeWidth: 1.3 }),
          i.jsx("path", { d: "M31 34 L21 28", ...B, strokeWidth: 1.2 }),
          i.jsx("path", { d: "M31 30 L41 23", ...B, strokeWidth: 1.2 }),
          i.jsx(FoodShine, { cx: 24, cy: 24, rx: 3.6, ry: 2.4 }),
          i.jsx(FoodFace, { x: 33, y: 35, mood: f, scale: 0.78 }),
        ],
      }),
    kuju: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", { d: "M32 56 L32 46", ...B, strokeWidth: 2.6 }),
          i.jsx("path", {
            d: "M32 46 L20 40 L24 35 L14 30 L22 25 L16 19 L26 18 L26 10 L32 14 L38 10 L38 18 L48 19 L42 25 L50 30 L40 35 L44 40 Z",
            fill: s,
            ...z,
          }),
          i.jsx(FoodFace, { x: 32, y: 28, mood: f, scale: 0.78 }),
        ],
      }),
  },
  Pm = {
    niurouwan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "34", r: "18", fill: s, ...z }),
          i.jsxs("g", {
            stroke: H(s, -0.26),
            strokeWidth: "1.7",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M20 26 Q24 34 20 42" }),
              i.jsx("path", { d: "M32 18 Q36 26 32 34" }),
              i.jsx("path", { d: "M44 26 Q40 34 44 42" }),
            ],
          }),
          i.jsx(FoodShine, { cx: 24, cy: 25, rx: 4, ry: 2.6 }),
          i.jsx(FoodFace, { x: 32, y: 35, mood: f, scale: 0.7 }),
        ],
      }),
    yuwan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "31", cy: "34", r: "17", fill: s, ...z }),
          i.jsx("path", {
            d: "M46 34 L55 26 L52 34 L55 42 Z",
            fill: H(s, -0.12),
            ...z,
            strokeWidth: 2,
          }),
          i.jsx(FoodShine, { cx: 24, cy: 26, rx: 4.4, ry: 2.8 }),
          i.jsx(FoodFace, { x: 31, y: 35, mood: f, scale: 0.72 }),
        ],
      }),
    xiawan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "34", r: "18", fill: s, ...z }),
          i.jsx("path", {
            d: "M32 20 C40 22 44 30 40 38 C36 45 26 45 22 38",
            fill: "none",
            stroke: H(s, -0.2),
            strokeWidth: "2",
            strokeLinecap: "round",
          }),
          i.jsx(FoodShine, { cx: 24, cy: 26, rx: 4, ry: 2.6 }),
          i.jsx(FoodFace, { x: 32, y: 35, mood: f, scale: 0.7 }),
        ],
      }),
    niaoniaoniurou: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "35", r: "18", fill: s, ...z }),
          i.jsx("path", {
            d: "M26 19 Q32 12 38 19 Q34 22 30 21 Z",
            fill: "#F2A65A",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M32 12 L32 7",
            ...B,
            strokeWidth: 2,
            stroke: "#F2A65A",
          }),
          i.jsxs("g", {
            stroke: H(s, -0.24),
            strokeWidth: "1.6",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M21 30 Q26 36 22 44" }),
              i.jsx("path", { d: "M43 30 Q38 36 42 44" }),
            ],
          }),
          i.jsx(FoodFace, { x: 32, y: 38, mood: f, scale: 0.66 }),
        ],
      }),
    wucanrou: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 24 L38 18 L50 26 L26 32 Z",
            fill: H(s, 0.12),
            ...z,
          }),
          i.jsx("path", {
            d: "M14 24 L26 32 L26 46 L14 38 Z",
            fill: H(s, -0.12),
            ...z,
          }),
          i.jsx("path", { d: "M26 32 L50 26 L50 40 L26 46 Z", fill: s, ...z }),
          i.jsxs("g", {
            fill: H(s, -0.28),
            opacity: "0.6",
            children: [
              i.jsx("circle", { cx: "33", cy: "36", r: "1.4" }),
              i.jsx("circle", { cx: "41", cy: "33", r: "1.2" }),
              i.jsx("circle", { cx: "38", cy: "42", r: "1.3" }),
            ],
          }),
          i.jsx(FoodFace, { x: 37, y: 38, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    huotuichang: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M20 16 Q32 10 44 16 L44 50 Q32 56 20 50 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M20 22 Q32 28 44 22",
            ...B,
            strokeWidth: 1.4,
            opacity: "0.5",
          }),
          i.jsx("path", { d: "M25 12 L27 18", ...B, strokeWidth: 2 }),
          i.jsx("path", { d: "M39 12 L37 18", ...B, strokeWidth: 2 }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "50",
            rx: "12",
            ry: "4",
            fill: H(s, -0.16),
            ...z,
            strokeWidth: 2,
          }),
          i.jsx(FoodShine, { cx: 26, cy: 28, rx: 3.4, ry: 5 }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.66 }),
        ],
      }),
    peigen: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M10 36 Q18 24 26 34 Q34 44 42 32 Q48 24 54 30 L54 40 Q46 46 40 40 Q32 30 24 40 Q16 48 10 44 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M12 38 Q20 30 26 38",
            ...B,
            strokeWidth: 1.4,
            stroke: "#F2E3D8",
          }),
          i.jsx("path", {
            d: "M32 38 Q38 30 44 36",
            ...B,
            strokeWidth: 1.4,
            stroke: "#F2E3D8",
          }),
          i.jsx(FoodFace, { x: 32, y: 37, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    jixiongrou: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M16 24 Q28 14 44 20 Q54 28 48 40 Q38 52 24 46 Q14 40 16 24 Z",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            stroke: H(s, -0.14),
            strokeWidth: "1.4",
            strokeLinecap: "round",
            opacity: "0.8",
            children: [
              i.jsx("path", { d: "M22 30 Q30 26 36 30" }),
              i.jsx("path", { d: "M22 38 Q32 34 40 39" }),
            ],
          }),
          i.jsx(FoodShine, { cx: 26, cy: 24, rx: 3.6, ry: 2.2 }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.68 }),
        ],
      }),
    feiniujuan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M18 40 C12 32 18 20 30 18 C42 16 52 24 50 34 C48 44 36 48 28 44",
            fill: "none",
            stroke: s,
            strokeWidth: "11",
            strokeLinecap: "round",
          }),
          i.jsx("path", {
            d: "M18 40 C12 32 18 20 30 18 C42 16 52 24 50 34 C48 44 36 48 28 44",
            fill: "none",
            stroke: ot,
            strokeWidth: "2.2",
            strokeLinecap: "round",
          }),
          i.jsx("path", {
            d: "M22 28 Q30 24 38 28",
            ...B,
            strokeWidth: 1.6,
            stroke: "#F5E1DA",
          }),
          i.jsx(FoodFace, { x: 32, y: 33, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    yaxue: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 22 L32 14 L50 22 L50 42 L32 50 L14 42 Z",
            fill: H(s, -0.14),
            ...z,
          }),
          i.jsx("path", {
            d: "M14 22 L32 30 L32 50 L14 42 Z",
            fill: H(s, -0.24),
            ...z,
          }),
          i.jsx("path", { d: "M32 30 L50 22 L50 42 L32 50 Z", fill: s, ...z }),
          i.jsx("path", {
            d: "M20 26 L26 30",
            ...B,
            strokeWidth: 1.4,
            stroke: "#fff",
            opacity: "0.5",
          }),
          i.jsx(FoodFace, { x: 40, y: 36, mood: f, scale: 0.52, eye: 2 }),
        ],
      }),
    maodu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M12 30 L18 24 L24 30 L30 23 L36 30 L42 24 L48 30 L52 26 L52 42 L46 46 L40 40 L34 46 L28 40 L22 46 L16 42 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M18 36 L46 36",
            ...B,
            strokeWidth: 1.2,
            opacity: "0.5",
          }),
          i.jsx(FoodFace, { x: 32, y: 36, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    xiahua: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M12 42 Q12 34 20 34 L46 34 Q52 34 52 42 Q52 48 44 48 L20 48 Q12 48 12 42 Z",
            fill: "#D9D2C4",
            ...z,
          }),
          i.jsx("path", {
            d: "M20 34 Q22 18 32 16 Q42 18 44 34 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M24 28 Q32 22 40 28",
            ...B,
            strokeWidth: 1.3,
            opacity: "0.6",
          }),
          i.jsx(FoodShine, { cx: 27, cy: 24, rx: 3.4, ry: 2.2 }),
          i.jsx(FoodFace, { x: 32, y: 30, mood: f, scale: 0.62 }),
        ],
      }),
    xiaosurou: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M16 30 Q14 20 24 17 Q32 12 40 18 Q50 20 49 30 Q53 40 43 44 Q34 50 26 45 Q15 43 16 30 Z",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            fill: H(s, 0.14),
            opacity: "0.8",
            children: [
              i.jsx("circle", { cx: "25", cy: "24", r: "2" }),
              i.jsx("circle", { cx: "37", cy: "22", r: "1.7" }),
              i.jsx("circle", { cx: "42", cy: "34", r: "2" }),
              i.jsx("circle", { cx: "28", cy: "40", r: "1.8" }),
            ],
          }),
          i.jsx(FoodFace, { x: 32, y: 32, mood: f, scale: 0.66 }),
        ],
      }),
    yudoufu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "13",
            y: "20",
            width: "38",
            height: "30",
            rx: "8",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M13 28 Q32 34 51 28",
            ...B,
            strokeWidth: 1.4,
            stroke: H(s, -0.28),
            opacity: "0.7",
          }),
          i.jsx("path", {
            d: "M17 20 Q32 13 47 20",
            fill: H(s, 0.16),
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx(FoodShine, { cx: 22, cy: 26, rx: 3.4, ry: 2.2 }),
          i.jsx(FoodFace, { x: 32, y: 36, mood: f, scale: 0.66 }),
        ],
      }),
    xieban: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "16",
            y: "18",
            width: "32",
            height: "32",
            rx: "6",
            fill: "#F7E9DE",
            ...z,
            transform: "rotate(-12 32 34)",
          }),
          i.jsxs("g", {
            stroke: "#E8796A",
            strokeWidth: "7",
            strokeLinecap: "butt",
            opacity: "0.95",
            children: [
              i.jsx("path", { d: "M18 24 L30 24" }),
              i.jsx("path", { d: "M26 36 L38 36" }),
              i.jsx("path", { d: "M34 48 L46 48" }),
            ],
          }),
          i.jsx("rect", {
            x: "16",
            y: "18",
            width: "32",
            height: "32",
            rx: "6",
            fill: "none",
            ...z,
            transform: "rotate(-12 32 34)",
          }),
          i.jsx(FoodFace, { x: 32, y: 33, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
  },
  l3 = {
    jinzhengu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [20, 26, 32, 38, 44].map((d, r) =>
            i.jsxs(
              "g",
              {
                children: [
                  i.jsx("rect", {
                    x: d - 2.8,
                    y: "22",
                    width: "5.6",
                    height: "34",
                    rx: "2.8",
                    fill: "#F8F0D8",
                    ...z,
                    strokeWidth: 2,
                  }),
                  i.jsx("ellipse", {
                    cx: d,
                    cy: r === 2 ? 17 : 20,
                    rx: "5",
                    ry: "3.4",
                    fill: s,
                    ...z,
                    strokeWidth: 2.2,
                  }),
                ],
              },
              d,
            ),
          ),
          i.jsx(FoodFace, { x: 32, y: 42, mood: f, scale: 0.72 }),
        ],
      }),
    xianggu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M26 30 L26 50 Q32 54 38 50 L38 30",
            fill: "#EBD9B4",
            ...z,
          }),
          i.jsx("path", {
            d: "M9 32 Q10 11 32 11 Q54 11 55 32 Q44 25 32 25 Q20 25 9 32 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M22 19 L27 24", ...B, strokeWidth: 1.5 }),
          i.jsx("path", { d: "M42 19 L37 24", ...B, strokeWidth: 1.5 }),
          i.jsx("path", { d: "M32 15 L32 21", ...B, strokeWidth: 1.5 }),
          i.jsx(FoodShine, { cx: 21, cy: 20, rx: 3.4, ry: 2.2 }),
          i.jsx(FoodFace, { x: 32, y: 37, mood: f, scale: 0.75 }),
        ],
      }),
    pinggu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M28 40 L28 52 Q32 55 36 52 L36 40",
            fill: "#E9DCC0",
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx("path", {
            d: "M11 38 Q13 14 32 14 Q51 14 53 38 Q43 31 32 31 Q21 31 11 38 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M20 33 Q24 22 30 17", ...B, strokeWidth: 1.4 }),
          i.jsx("path", { d: "M32 31 Q32 22 32 15", ...B, strokeWidth: 1.4 }),
          i.jsx("path", { d: "M44 33 Q40 22 34 17", ...B, strokeWidth: 1.4 }),
          i.jsx(FoodFace, { x: 32, y: 42, mood: f, scale: 0.7 }),
        ],
      }),
    xingbaogu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "23",
            y: "24",
            width: "18",
            height: "30",
            rx: "8",
            fill: "#EFE2C6",
            ...z,
          }),
          i.jsx("path", {
            d: "M14 26 Q16 14 32 14 Q48 14 50 26 Q41 22 32 22 Q23 22 14 26 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M28 34 L28 48", ...B, strokeWidth: 1.3 }),
          i.jsx("path", { d: "M36 34 L36 48", ...B, strokeWidth: 1.3 }),
          i.jsx(FoodFace, { x: 32, y: 38, mood: f, scale: 0.72 }),
        ],
      }),
    haixiangu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [24, 32, 40].map((d, r) =>
            i.jsxs(
              "g",
              {
                children: [
                  i.jsx("rect", {
                    x: d - 3.2,
                    y: "18",
                    width: "6.4",
                    height: "38",
                    rx: "3.2",
                    fill: "#FBF6E6",
                    ...z,
                    strokeWidth: 2,
                  }),
                  i.jsx("ellipse", {
                    cx: d,
                    cy: r === 1 ? 14 : 17,
                    rx: "6",
                    ry: "4",
                    fill: s,
                    ...z,
                    strokeWidth: 2.2,
                  }),
                ],
              },
              d,
            ),
          ),
          i.jsx(FoodFace, { x: 32, y: 42, mood: f, scale: 0.7 }),
        ],
      }),
    muer: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M15 45 C9 34 14 18 26 13 C37 8 49 15 51 27 C53 39 43 50 31 50 C25 50 19 48 15 45 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M22 40 C18 32 22 22 31 19 C40 16 45 22 45 30",
            fill: "none",
            stroke: H(s, 0.22),
            strokeWidth: "2.4",
            strokeLinecap: "round",
          }),
          i.jsx("path", {
            d: "M26 44 C24 36 27 28 34 26",
            fill: "none",
            stroke: H(s, 0.22),
            strokeWidth: "1.8",
            strokeLinecap: "round",
          }),
          i.jsx(FoodShine, { cx: 24, cy: 22, rx: 4, ry: 2.4 }),
          i.jsx(FoodFace, { x: 32, y: 33, mood: f, scale: 0.72 }),
        ],
      }),
    haidaijie: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: `M20 18 C30 12 44 16 47 26 C50 36 42 44 32 44 C22 44 14 36 17 26 C18 22 19 20 20 18 Z
           M32 26 C28 26 25 29 25 33 C25 37 28 40 32 40 C36 40 39 37 39 33 C39 29 36 26 32 26 Z`,
            fill: s,
            ...z,
            fillRule: "evenodd",
          }),
          i.jsx("path", {
            d: "M20 20 C26 26 30 30 32 36",
            ...B,
            strokeWidth: 1.5,
            stroke: H(s, 0.2),
          }),
          i.jsx("path", {
            d: "M44 20 C38 26 34 30 32 36",
            ...B,
            strokeWidth: 1.5,
            stroke: H(s, 0.2),
          }),
          i.jsx(FoodFace, { x: 32, y: 33, mood: f, scale: 0.62 }),
        ],
      }),
    qundaicai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M22 56 C14 47 24 37 18 27 C14 19 20 12 28 10 C36 8 44 13 43 21 C42 29 34 33 37 41 C40 49 32 54 27 56 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M26 14 C24 24 30 32 26 46",
            ...B,
            strokeWidth: 1.4,
            stroke: H(s, 0.2),
          }),
          i.jsx("path", {
            d: "M36 15 C34 25 39 33 35 47",
            ...B,
            strokeWidth: 1.4,
            stroke: H(s, 0.2),
          }),
          i.jsx(FoodShine, { cx: 26, cy: 22, rx: 3.2, ry: 2 }),
          i.jsx(FoodFace, { x: 31, y: 33, mood: f, scale: 0.66 }),
        ],
      }),
    yiner: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsxs("g", {
            fill: s,
            ...z,
            strokeWidth: 2.2,
            children: [
              i.jsx("ellipse", { cx: "32", cy: "20", rx: "9", ry: "7" }),
              i.jsx("ellipse", {
                cx: "19",
                cy: "30",
                rx: "8.5",
                ry: "6.5",
                transform: "rotate(-25 19 30)",
              }),
              i.jsx("ellipse", {
                cx: "45",
                cy: "30",
                rx: "8.5",
                ry: "6.5",
                transform: "rotate(25 45 30)",
              }),
              i.jsx("ellipse", {
                cx: "24",
                cy: "43",
                rx: "8",
                ry: "6",
                transform: "rotate(15 24 43)",
              }),
              i.jsx("ellipse", {
                cx: "40",
                cy: "43",
                rx: "8",
                ry: "6",
                transform: "rotate(-15 40 43)",
              }),
            ],
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "32",
            rx: "7",
            ry: "6",
            fill: H(s, 0.06),
            ...z,
            strokeWidth: 2,
          }),
          i.jsx(FoodFace, { x: 32, y: 32, mood: f, scale: 0.6 }),
        ],
      }),
  },
  t3 = {
    tudoupian: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("ellipse", {
            cx: "32",
            cy: "34",
            rx: "21",
            ry: "15",
            fill: s,
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "34",
            rx: "21",
            ry: "15",
            fill: "none",
            stroke: H(s, -0.22),
            strokeWidth: "4",
            opacity: "0.55",
          }),
          i.jsxs("g", {
            fill: H(s, -0.3),
            opacity: "0.55",
            children: [
              i.jsx("circle", { cx: "22", cy: "27", r: "1.4" }),
              i.jsx("circle", { cx: "41", cy: "31", r: "1.3" }),
              i.jsx("circle", { cx: "30", cy: "42", r: "1.2" }),
            ],
          }),
          i.jsx(FoodShine, { cx: 24, cy: 27, rx: 4.4, ry: 2.4 }),
          i.jsx(FoodFace, { x: 33, y: 34, mood: f, scale: 0.72 }),
        ],
      }),
    oupian: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "33", r: "20", fill: s, ...z }),
          i.jsx("circle", {
            cx: "32",
            cy: "33",
            r: "20",
            fill: "none",
            stroke: H(s, -0.16),
            strokeWidth: "3.4",
            opacity: "0.6",
          }),
          i.jsxs("g", {
            fill: H(s, -0.34),
            stroke: ot,
            strokeWidth: "1.4",
            children: [
              i.jsx("ellipse", { cx: "32", cy: "25", rx: "3.2", ry: "3.8" }),
              i.jsx("ellipse", { cx: "25", cy: "29", rx: "2.6", ry: "3" }),
              i.jsx("ellipse", { cx: "39", cy: "29", rx: "2.6", ry: "3" }),
              i.jsx("ellipse", { cx: "24", cy: "37", rx: "2.4", ry: "2.8" }),
              i.jsx("ellipse", { cx: "40", cy: "37", rx: "2.4", ry: "2.8" }),
              i.jsx("ellipse", { cx: "32", cy: "40", rx: "2.6", ry: "2.8" }),
            ],
          }),
          i.jsx(FoodFace, { x: 32, y: 33, mood: f, scale: 0.52, eye: 2 }),
        ],
      }),
    shanyao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "18",
            y: "14",
            width: "28",
            height: "38",
            rx: "14",
            fill: s,
            ...z,
            transform: "rotate(-8 32 33)",
          }),
          i.jsxs("g", {
            stroke: H(s, -0.2),
            strokeWidth: "1.4",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M24 22 L22 30" }),
              i.jsx("path", { d: "M32 18 L30 26" }),
              i.jsx("path", { d: "M40 22 L38 30" }),
              i.jsx("path", { d: "M26 44 L24 50" }),
              i.jsx("path", { d: "M38 44 L40 50" }),
            ],
          }),
          i.jsx(FoodShine, { cx: 25, cy: 24, rx: 3.6, ry: 2.2 }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.74 }),
        ],
      }),
    donggua: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M12 44 Q12 16 32 16 Q52 16 52 44 Q32 52 12 44 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M12 44 Q32 52 52 44 L52 38 Q32 46 12 38 Z",
            fill: "#4E7A45",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M20 24 Q26 30 24 42",
            ...B,
            strokeWidth: 1.3,
            stroke: "#fff",
          }),
          i.jsx(FoodShine, { cx: 24, cy: 26, rx: 3.4, ry: 2.2 }),
          i.jsx(FoodFace, { x: 32, y: 33, mood: f, scale: 0.72 }),
        ],
      }),
    nangua: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 42 Q14 18 32 18 Q50 18 50 42 Q32 50 14 42 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M24 20 Q22 32 24 46",
            ...B,
            strokeWidth: 1.4,
            stroke: H(s, -0.28),
          }),
          i.jsx("path", {
            d: "M40 20 Q42 32 40 46",
            ...B,
            strokeWidth: 1.4,
            stroke: H(s, -0.28),
          }),
          i.jsx("path", {
            d: "M32 18 L32 46",
            ...B,
            strokeWidth: 1.2,
            stroke: H(s, -0.2),
          }),
          i.jsx("path", {
            d: "M32 18 Q35 12 40 13",
            ...B,
            strokeWidth: 2.2,
            stroke: "#5C8A4A",
          }),
          i.jsx(FoodFace, { x: 32, y: 32, mood: f, scale: 0.7 }),
        ],
      }),
    bailuobo: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M24 12 Q32 8 40 12 L42 30 Q40 48 32 54 Q24 48 22 30 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M30 50 Q26 52 26 56", ...B, strokeWidth: 1.6 }),
          i.jsx("path", { d: "M34 50 Q38 52 38 56", ...B, strokeWidth: 1.6 }),
          i.jsx("path", {
            d: "M32 14 L32 20",
            ...B,
            strokeWidth: 1.6,
            stroke: "#6B9E58",
          }),
          i.jsx("path", {
            d: "M32 14 Q27 10 24 11",
            ...B,
            strokeWidth: 1.6,
            stroke: "#6B9E58",
          }),
          i.jsx("path", {
            d: "M32 14 Q37 10 40 11",
            ...B,
            strokeWidth: 1.6,
            stroke: "#6B9E58",
          }),
          i.jsx(FoodShine, { cx: 27, cy: 24, rx: 3.2, ry: 4 }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.7 }),
        ],
      }),
    huluobo: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 56 Q22 40 24 18 Q32 14 40 18 Q42 40 32 56 Z",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            stroke: H(s, -0.26),
            strokeWidth: "1.5",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M26 26 L33 24" }),
              i.jsx("path", { d: "M26 34 L34 32" }),
              i.jsx("path", { d: "M27 42 L33 41" }),
            ],
          }),
          i.jsx("path", {
            d: "M32 16 C28 10 24 8 21 9 C25 13 28 15 32 16 Z",
            fill: "#5C8A4A",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M32 16 C36 10 40 8 43 9 C39 13 36 15 32 16 Z",
            fill: "#5C8A4A",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx(FoodFace, { x: 32, y: 32, mood: f, scale: 0.68 }),
        ],
      }),
    wosun: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "20",
            y: "10",
            width: "24",
            height: "44",
            rx: "11",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            stroke: H(s, -0.2),
            strokeWidth: "1.4",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M26 18 L26 46" }),
              i.jsx("path", { d: "M32 16 L32 48" }),
              i.jsx("path", { d: "M38 18 L38 46" }),
            ],
          }),
          i.jsx("path", {
            d: "M20 20 Q14 16 13 10",
            ...B,
            strokeWidth: 2,
            stroke: "#5C8A4A",
          }),
          i.jsx("path", {
            d: "M44 20 Q50 16 51 10",
            ...B,
            strokeWidth: 2,
            stroke: "#5C8A4A",
          }),
          i.jsx(FoodFace, { x: 32, y: 33, mood: f, scale: 0.7 }),
        ],
      }),
    huanggua: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "16",
            y: "14",
            width: "32",
            height: "40",
            rx: "16",
            fill: s,
            ...z,
            transform: "rotate(-12 32 34)",
          }),
          i.jsxs("g", {
            fill: H(s, -0.3),
            opacity: "0.7",
            children: [
              i.jsx("circle", { cx: "25", cy: "24", r: "1.3" }),
              i.jsx("circle", { cx: "33", cy: "30", r: "1.3" }),
              i.jsx("circle", { cx: "27", cy: "38", r: "1.2" }),
              i.jsx("circle", { cx: "39", cy: "42", r: "1.2" }),
              i.jsx("circle", { cx: "22", cy: "32", r: "1.1" }),
            ],
          }),
          i.jsx(FoodShine, { cx: 25, cy: 23, rx: 3.4, ry: 2.2 }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.7 }),
        ],
      }),
    fanqie: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "35", r: "19", fill: s, ...z }),
          i.jsx("path", {
            d: "M32 17 L24 12 L27 19 L20 19 L27 23 Z",
            fill: "#5C8A4A",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M32 17 L40 12 L37 19 L44 19 L37 23 Z",
            fill: "#5C8A4A",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M32 17 L32 25",
            ...B,
            strokeWidth: 2.4,
            stroke: "#5C8A4A",
          }),
          i.jsx(FoodShine, { cx: 24, cy: 28, rx: 4.6, ry: 3 }),
          i.jsx(FoodFace, { x: 32, y: 36, mood: f, scale: 0.78 }),
        ],
      }),
    yumi: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "18",
            y: "14",
            width: "28",
            height: "40",
            rx: "13",
            fill: s,
            ...z,
          }),
          i.jsx("g", {
            fill: H(s, 0.16),
            opacity: "0.9",
            children: [24, 33, 42].flatMap((d) =>
              [24, 32, 40].map((r) =>
                i.jsx("circle", { cx: r, cy: d, r: "2.6" }, `${r}-${d}`),
              ),
            ),
          }),
          i.jsx("path", {
            d: "M18 18 Q10 16 10 26 Q10 34 18 32",
            fill: "#6B9E58",
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx("path", {
            d: "M46 18 Q54 16 54 26 Q54 34 46 32",
            fill: "#6B9E58",
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx(FoodFace, { x: 32, y: 32, mood: f, scale: 0.66 }),
        ],
      }),
  },
  e3 = {
    kuanfen: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M12 40 C12 24 20 16 32 16 C44 16 52 24 52 40 C52 48 44 52 32 52 C20 52 12 48 12 40 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M20 26 Q32 20 44 26",
            ...B,
            strokeWidth: 1.4,
            stroke: "#fff",
            opacity: "0.55",
          }),
          i.jsx("path", {
            d: "M18 34 Q32 28 46 34",
            ...B,
            strokeWidth: 1.2,
            stroke: H(s, -0.14),
            opacity: "0.6",
          }),
          i.jsx(FoodFace, { x: 32, y: 38, mood: f, scale: 0.66 }),
        ],
      }),
    xifen: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [18, 23, 28, 33, 38, 43, 48].map((d, r) =>
            i.jsx(
              "path",
              {
                d: `M${d} 54 C${d - 4} 42 ${d + 4} 30 ${d} 18`,
                fill: "none",
                stroke: r % 2 ? H(s, -0.1) : s,
                strokeWidth: "4.6",
                strokeLinecap: "round",
              },
              d,
            ),
          ),
          i.jsxs("g", {
            fill: "none",
            stroke: ot,
            strokeWidth: "1.6",
            strokeLinecap: "round",
            opacity: "0.75",
            children: [
              i.jsx("path", { d: "M18 50 C15 38 20 28 18 20" }),
              i.jsx("path", { d: "M48 50 C45 38 51 28 48 20" }),
            ],
          }),
          i.jsx(FoodFace, { x: 32, y: 38, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    fangbianmian: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", {
            cx: "32",
            cy: "34",
            r: "19",
            fill: H(s, 0.1),
            ...z,
          }),
          i.jsx("path", {
            d: "M17 30 Q24 20 32 30 Q40 40 47 30",
            fill: "none",
            stroke: H(s, -0.2),
            strokeWidth: "3",
            strokeLinecap: "round",
          }),
          i.jsx("path", {
            d: "M16 38 Q24 28 32 38 Q40 48 48 38",
            fill: "none",
            stroke: H(s, -0.2),
            strokeWidth: "3",
            strokeLinecap: "round",
          }),
          i.jsx(FoodShine, { cx: 24, cy: 24, rx: 4, ry: 2.6 }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    wudongmian: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [20, 32, 44].map((d, r) =>
            i.jsx(
              "path",
              {
                d: `M${d} 54 C${d - 8} 42 ${d + 8} 30 ${d} 18`,
                fill: "none",
                stroke: r === 1 ? s : H(s, -0.06),
                strokeWidth: "9.5",
                strokeLinecap: "round",
              },
              d,
            ),
          ),
          i.jsxs("g", {
            fill: "none",
            stroke: ot,
            strokeWidth: "2",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M20 52 C13 41 26 31 20 19" }),
              i.jsx("path", { d: "M44 52 C51 41 38 31 44 19" }),
            ],
          }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.58, eye: 2 }),
        ],
      }),
    niangao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("ellipse", {
            cx: "32",
            cy: "40",
            rx: "19",
            ry: "10",
            fill: H(s, -0.14),
            ...z,
          }),
          i.jsx("rect", {
            x: "13",
            y: "22",
            width: "38",
            height: "18",
            fill: s,
            ...z,
            strokeWidth: 2.4,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "22",
            rx: "19",
            ry: "10",
            fill: H(s, 0.1),
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "22",
            rx: "11",
            ry: "5.5",
            fill: "#fff",
            opacity: "0.35",
          }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    fensi: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 22 Q32 14 50 22",
            ...B,
            strokeWidth: 2,
            stroke: H(s, -0.3),
          }),
          [20, 25, 30, 35, 40, 45].map((d, r) =>
            i.jsx(
              "path",
              {
                d: `M${d} 22 L${d - 2} 52`,
                fill: "none",
                stroke: r % 2 ? H(s, -0.05) : s,
                strokeWidth: "2.4",
                strokeLinecap: "round",
                opacity: "0.9",
              },
              d,
            ),
          ),
          i.jsx(FoodFace, { x: 32, y: 38, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    moyusi: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [-10, 0, 10].map((d, r) =>
            i.jsx(
              "rect",
              {
                x: 31 + d - 4,
                y: "16",
                width: "9",
                height: "38",
                rx: "4",
                fill: r === 1 ? s : H(s, -0.08),
                opacity: "0.92",
                ...z,
                strokeWidth: 2,
                transform: `rotate(${d / 4} ${31 + d} 34)`,
              },
              d,
            ),
          ),
          i.jsx("path", {
            d: "M22 26 L42 26",
            ...B,
            strokeWidth: 1.2,
            stroke: "#fff",
            opacity: "0.6",
          }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    mifen: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M20 18 Q32 24 44 18",
            ...B,
            strokeWidth: 2.2,
            stroke: H(s, -0.24),
          }),
          [-12, -6, 0, 6, 12].map((d, r) =>
            i.jsx(
              "path",
              {
                d: `M${32 + d / 4} 20 Q${32 + d} 36 ${32 + d * 1.2} 52`,
                fill: "none",
                stroke: r % 2 ? H(s, -0.06) : s,
                strokeWidth: "3.2",
                strokeLinecap: "round",
              },
              d,
            ),
          ),
          i.jsx(FoodFace, { x: 32, y: 36, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    youtiao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 40 Q14 20 26 20 Q38 20 38 40 Z",
            fill: s,
            ...z,
            transform: "rotate(-8 26 30)",
          }),
          i.jsx("path", {
            d: "M28 44 Q28 24 40 24 Q52 24 52 44 Z",
            fill: H(s, -0.1),
            ...z,
            transform: "rotate(6 40 34)",
          }),
          i.jsxs("g", {
            fill: H(s, 0.18),
            opacity: "0.75",
            children: [
              i.jsx("circle", { cx: "22", cy: "28", r: "1.6" }),
              i.jsx("circle", { cx: "30", cy: "34", r: "1.5" }),
              i.jsx("circle", { cx: "40", cy: "32", r: "1.6" }),
              i.jsx("circle", { cx: "46", cy: "38", r: "1.4" }),
            ],
          }),
          i.jsx(FoodFace, { x: 31, y: 34, mood: f, scale: 0.5, eye: 2 }),
        ],
      }),
  },
  a3 = {
    doupi: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 22 Q32 14 50 22 L50 44 Q32 52 14 44 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M14 22 Q20 30 18 44", ...B, strokeWidth: 1.4 }),
          i.jsx("path", {
            d: "M24 20 Q28 28 26 46",
            ...B,
            strokeWidth: 1.2,
            opacity: "0.6",
          }),
          i.jsx("path", {
            d: "M50 22 Q44 28 46 42 Q48 46 50 44",
            fill: H(s, -0.12),
            ...z,
            strokeWidth: 2,
          }),
          i.jsx(FoodFace, { x: 33, y: 33, mood: f, scale: 0.7 }),
        ],
      }),
    fuzhu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M18 50 L18 22 Q18 12 28 12 L36 12 Q46 12 46 22 L46 50",
            fill: s,
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "16",
            rx: "10",
            ry: "5",
            fill: H(s, -0.18),
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "16",
            rx: "4.6",
            ry: "2.2",
            fill: "#F7EEDB",
            ...z,
            strokeWidth: 1.4,
          }),
          i.jsx("path", {
            d: "M24 24 L24 46",
            ...B,
            strokeWidth: 1.2,
            stroke: H(s, -0.16),
          }),
          i.jsx(FoodFace, { x: 32, y: 36, mood: f, scale: 0.66 }),
        ],
      }),
    youdoufu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "13",
            y: "18",
            width: "38",
            height: "32",
            rx: "9",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M22 18 Q32 11 42 18",
            fill: H(s, 0.12),
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "33",
            rx: "7",
            ry: "8",
            fill: H(s, -0.16),
            opacity: "0.5",
          }),
          i.jsx(FoodShine, { cx: 21, cy: 26, rx: 3.6, ry: 2.2 }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.68 }),
        ],
      }),
    dongdoufu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "13",
            y: "18",
            width: "38",
            height: "32",
            rx: "7",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            fill: H(s, -0.16),
            stroke: ot,
            strokeWidth: "1.1",
            opacity: "0.75",
            children: [
              i.jsx("circle", { cx: "22", cy: "26", r: "2.6" }),
              i.jsx("circle", { cx: "31", cy: "24", r: "3" }),
              i.jsx("circle", { cx: "41", cy: "27", r: "2.4" }),
              i.jsx("circle", { cx: "25", cy: "36", r: "2.2" }),
              i.jsx("circle", { cx: "36", cy: "34", r: "2.6" }),
              i.jsx("circle", { cx: "44", cy: "38", r: "2" }),
            ],
          }),
          i.jsx(FoodFace, { x: 31, y: 43, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    doupao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "34", r: "19", fill: s, ...z }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "27",
            rx: "9",
            ry: "6",
            fill: H(s, -0.2),
            opacity: "0.55",
            ...z,
            strokeWidth: 1.6,
          }),
          i.jsx("path", { d: "M26 24 Q32 30 38 24", ...B, strokeWidth: 1.2 }),
          i.jsx(FoodShine, { cx: 22, cy: 30, rx: 3.4, ry: 2.2 }),
          i.jsx(FoodFace, { x: 32, y: 38, mood: f, scale: 0.68 }),
        ],
      }),
    qianzhang: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M12 40 L32 30 L52 40 L32 50 Z",
            fill: H(s, -0.1),
            ...z,
          }),
          i.jsx("path", { d: "M12 32 L32 22 L52 32 L32 42 Z", fill: s, ...z }),
          i.jsx("path", {
            d: "M12 24 L32 14 L52 24 L32 34 Z",
            fill: H(s, 0.1),
            ...z,
          }),
          i.jsx("path", {
            d: "M20 22 Q26 26 24 30",
            ...B,
            strokeWidth: 1.1,
            opacity: "0.5",
          }),
          i.jsx(FoodFace, { x: 32, y: 24, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    dougan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "14",
            y: "20",
            width: "36",
            height: "30",
            rx: "6",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M18 26 L46 26",
            ...B,
            strokeWidth: 1.3,
            stroke: H(s, -0.2),
          }),
          i.jsx("path", {
            d: "M18 33 L46 33",
            ...B,
            strokeWidth: 1.3,
            stroke: H(s, -0.2),
          }),
          i.jsx("path", {
            d: "M18 40 L46 40",
            ...B,
            strokeWidth: 1.3,
            stroke: H(s, -0.2),
          }),
          i.jsx(FoodShine, { cx: 22, cy: 24, rx: 3.2, ry: 2 }),
          i.jsx(FoodFace, { x: 32, y: 34, mood: f, scale: 0.66 }),
        ],
      }),
    suji: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("ellipse", {
            cx: "32",
            cy: "44",
            rx: "17",
            ry: "8",
            fill: H(s, -0.16),
            ...z,
          }),
          i.jsx("rect", {
            x: "15",
            y: "20",
            width: "34",
            height: "24",
            fill: s,
            ...z,
            strokeWidth: 2.4,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "20",
            rx: "17",
            ry: "8",
            fill: H(s, 0.1),
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "20",
            rx: "9",
            ry: "4",
            fill: H(s, -0.14),
            opacity: "0.6",
          }),
          i.jsx(FoodFace, { x: 32, y: 32, mood: f, scale: 0.62, eye: 2 }),
        ],
      }),
    doufu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "14",
            y: "19",
            width: "36",
            height: "31",
            rx: "7",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M14 26 Q32 32 50 26",
            ...B,
            strokeWidth: 1.2,
            stroke: "#fff",
            opacity: "0.7",
          }),
          i.jsx("path", {
            d: "M50 30 Q46 36 49 42",
            ...B,
            strokeWidth: 1.6,
            stroke: "#fff",
            opacity: "0.6",
          }),
          i.jsx(FoodShine, { cx: 22, cy: 25, rx: 4, ry: 2.4 }),
          i.jsx(FoodFace, { x: 32, y: 35, mood: f, scale: 0.68 }),
        ],
      }),
    doujie: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M20 24 C14 30 16 42 24 46 C30 49 38 47 42 42 C46 36 44 28 38 25 C32 22 26 22 20 24 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M24 26 L32 34 L40 26",
            ...B,
            strokeWidth: 1.6,
            opacity: "0.6",
          }),
          i.jsx("path", {
            d: "M20 22 Q14 16 18 12 Q24 12 26 18",
            fill: H(s, -0.1),
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx("path", {
            d: "M44 22 Q50 16 46 12 Q40 12 38 18",
            fill: H(s, -0.1),
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx(FoodFace, { x: 32, y: 36, mood: f, scale: 0.62 }),
        ],
      }),
  },
  N2 = {
    ball: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "34", r: "17.5", fill: s, ...z }),
          i.jsx(FoodShine, { cx: 25, cy: 26, rx: 5, ry: 3 }),
          i.jsx(FoodFace, { x: 32, y: 35, mood: f, scale: 0.72 }),
        ],
      }),
    disc: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("ellipse", {
            cx: "32",
            cy: "35",
            rx: "19.5",
            ry: "13.5",
            fill: s,
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "35",
            rx: "13",
            ry: "8",
            fill: "#fff",
            opacity: "0.24",
          }),
          i.jsxs("g", {
            fill: H(s, -0.24),
            stroke: ot,
            strokeWidth: "1.1",
            children: [
              i.jsx("circle", { cx: "25", cy: "31", r: "1.9" }),
              i.jsx("circle", { cx: "35", cy: "31", r: "1.9" }),
              i.jsx("circle", { cx: "30", cy: "38", r: "1.9" }),
            ],
          }),
          i.jsx(FoodFace, { x: 32, y: 35, mood: f, scale: 0.62, eye: 2 }),
        ],
      }),
    cube: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "13",
            y: "18",
            width: "38",
            height: "31",
            rx: "8",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M22 18 Q32 12 42 18",
            fill: s,
            stroke: ot,
            strokeWidth: "2.2",
          }),
          i.jsx(FoodShine, { cx: 22, cy: 26, rx: 3.4, ry: 2.2 }),
          i.jsx(FoodFace, { x: 32, y: 35, mood: f, scale: 0.68 }),
        ],
      }),
    cap: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M11 33 Q11 11 32 11 Q53 11 53 33 Q41 28 32 28 Q23 28 11 33 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M24 31 L24 47 Q32 51 40 47 L40 31",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            fill: "#fff",
            opacity: "0.4",
            children: [
              i.jsx("circle", { cx: "24", cy: "23", r: "2.6" }),
              i.jsx("circle", { cx: "36", cy: "20", r: "2" }),
            ],
          }),
          i.jsx(FoodFace, { x: 32, y: 38, mood: f, scale: 0.62, eye: 2 }),
        ],
      }),
    leaf: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 47 L32 55",
            stroke: ot,
            strokeWidth: "2.6",
            strokeLinecap: "round",
          }),
          [-52, 0, 52].map((d, r) =>
            i.jsx(
              "g",
              {
                transform: `rotate(${d} 32 47)`,
                children: i.jsx("ellipse", {
                  cx: "32",
                  cy: "31",
                  rx: "8.4",
                  ry: "13.6",
                  fill: r === 0 ? H(s, -0.1) : s,
                  stroke: ot,
                  strokeWidth: "2.3",
                }),
              },
              d,
            ),
          ),
          i.jsx(FoodFace, { x: 32, y: 32, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    strip: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M15 26 Q25 14 33 25 Q41 36 49 24 L49 36 Q41 48 33 37 Q25 26 15 38 Z",
            fill: s,
            ...z,
          }),
          i.jsx(FoodShine, { cx: 24, cy: 24, rx: 4, ry: 2.4 }),
          i.jsx(FoodFace, { x: 32, y: 30, mood: f, scale: 0.55, eye: 2 }),
        ],
      }),
    egg: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 11 C42 11 48 26 48 36 C48 46 41 53 32 53 C23 53 16 46 16 36 C16 26 22 11 32 11 Z",
            fill: s,
            ...z,
          }),
          i.jsx(FoodShine, { cx: 25, cy: 24, rx: 4, ry: 2.6 }),
          i.jsx(FoodFace, { x: 32, y: 35, mood: f, scale: 0.7 }),
        ],
      }),
    knot: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "33", r: "18", fill: s, ...z }),
          i.jsx("circle", {
            cx: "32",
            cy: "33",
            r: "7",
            fill: "#FFF8F0",
            stroke: ot,
            strokeWidth: "2.2",
          }),
          i.jsx(FoodFace, { x: 32, y: 33, mood: f, scale: 0.55, eye: 2 }),
        ],
      }),
  },
  A2 = { ...Im, ...l3, ...t3, ...a3, ...Pm, ...e3, ...$m,
    ...createExtraFoodIcons({Face: FoodFace, Shine: FoodShine, shade: H, outline: z, line: B}) };
function n3(s) {
  let f = 0;
  for (let d = 0; d < s.length; d += 1) f = (f * 31 + s.charCodeAt(d)) >>> 0;
  return f % 3;
}
Object.keys(A2).length;
function FoodIllustration({ id: s, shape: f, color: d, size: r = 56, seed: S }) {
  const O = n3(S ?? s ?? f),
    D = (s ? A2[s] : void 0) ?? N2[f] ?? N2.ball;
  return i.jsx("svg", {
    width: r,
    height: r,
    viewBox: "0 0 64 64",
    role: "img",
    "aria-hidden": "true",
    children: i.jsx("g", {
      transform: "translate(-5.5 -5.5) scale(1.22)",
      children: D(d, O),
    }),
  });
}

export {FoodIllustration, FoodFace, FoodShine};
