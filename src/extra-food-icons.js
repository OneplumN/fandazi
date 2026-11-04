import { X as React } from "../vendor/react-runtime.js";
const h = React.createElement;

// Use the original renderer's outline, face, highlight and color shading primitives.
// Coordinates share its 64×64 canvas, so all existing shelf/basket/detail sizes work.
export function createExtraFoodIcons({ Face, Shine, shade, outline, line }) {
  const ink = "#3D2B23";
  const G = (...children) => h(React.Fragment, null, ...children);
  const P = (d, fill, props = {}) =>
    h("path", { ...outline, d, fill, ...props });
  const S = (d, stroke = ink, width = 1.6, props = {}) =>
    h("path", { ...line, d, stroke, strokeWidth: width, ...props });
  const E = (cx, cy, rx, ry, fill, props = {}) =>
    h("ellipse", { ...outline, cx, cy, rx, ry, fill, ...props });
  const C = (cx, cy, r, fill, props = {}) => E(cx, cy, r, r, fill, props);
  const R = (x, y, width, height, rx, fill, props = {}) =>
    h("rect", { ...outline, x, y, width, height, rx, fill, ...props });
  const face = (m, x = 32, y = 33, scale = 0.66) =>
    h(Face, { x, y, mood: m, scale });
  const shine = (x, y, rx = 3.5, ry = 2.2) =>
    h(Shine, { cx: x, cy: y, rx, ry });
  const each = (items, draw) =>
    items.map((item, index) => h("g", { key: index }, draw(item, index)));
  const tube = (d, color, width = 6) =>
    G(S(d, ink, width + 3), S(d, color, width));
  const vein = (d) => S(d, "#E0E6BA", 1.3);
  const sprout = (x, y, color, tilt = 0) =>
    h(
      "g",
      { transform: `rotate(${tilt} ${x} ${y})` },
      tube(
        `M${x} ${y + 3} Q${x - 7} ${y + 16} ${x + 1} ${y + 28}`,
        "#F2E9D1",
        3.6,
      ),
      E(x - 2, y, 4.2, 6, color, { transform: `rotate(-25 ${x} ${y})` }),
      E(x + 3, y + 1, 3.8, 5.5, shade(color, -0.08), {
        transform: `rotate(25 ${x} ${y})`,
      }),
    );
  const mushroom = (x, y, rx, stemHeight, color, capColor = color) =>
    G(
      P(
        `M${x - 3} ${y} L${x - 4} ${y + stemHeight} Q${x} ${y + stemHeight + 4} ${x + 4} ${y + stemHeight} L${x + 3} ${y} Z`,
        color,
      ),
      P(
        `M${x - rx} ${y + 2} Q${x - rx} ${y - rx} ${x} ${y - rx} Q${x + rx} ${y - rx} ${x + rx} ${y + 2} Q${x} ${y + 6} ${x - rx} ${y + 2} Z`,
        capColor,
      ),
      S(
        `M${x - rx + 3} ${y + 2} Q${x} ${y + 5} ${x + rx - 3} ${y + 2}`,
        shade(capColor, -0.22),
        1,
      ),
    );
  const florets = (color, stem) =>
    G(
      P("M25 33 L25 51 Q32 56 39 51 L38 33 Z", stem),
      S("M32 49 L32 30 M32 40 L22 32 M32 40 L43 31", shade(stem, -0.2), 1.5),
      each(
        [
          [19, 28, 8],
          [25, 18, 9],
          [38, 18, 10],
          [46, 29, 8],
          [32, 31, 13],
        ],
        ([x, y, r]) => C(x, y, r, color),
      ),
      shine(25, 20),
      S("M17 26 q3 -3 6 0 M39 18 q3 -3 5 0", shade(color, -0.18), 1.2),
    );
  const eggHalf = (white, yolk, m, green = false) =>
    G(
      P(
        "M32 10 C43 10 50 28 49 38 C48 49 41 54 32 54 C23 54 16 49 15 38 C14 28 21 10 32 10 Z",
        white,
      ),
      E(32, 35, 12, 14, yolk),
      green && E(32, 36, 7.5, 9, "#919460", { strokeWidth: 1.5 }),
      shine(25, 24, 3, 2),
      face(m, 32, 34, 0.6),
    );
  const noodles = (paths, color, width = 4) =>
    G(each(paths, (d) => tube(d, color, width)));

  const icons = {
    shanghaiqing: (c, m) =>
      G(
        P("M24 31 Q16 40 24 51 Q32 57 40 51 Q48 40 40 31 Z", "#E0E6C1"),
        P("M25 37 C12 33 10 15 20 13 C31 13 31 29 25 37 Z", shade(c, -0.08)),
        P("M38 37 C32 27 36 11 45 14 C55 18 49 34 38 37 Z", c),
        P("M31 38 C23 24 24 9 33 9 C43 13 41 30 31 38 Z", shade(c, 0.07)),
        vein("M32 19 L32 47 M20 23 L27 44 M44 24 L37 44"),
        face(m, 32, 43, 0.58),
      ),
    xiyangcai: (c, m) =>
      G(
        S("M26 53 Q29 32 24 14 M34 53 Q38 30 45 15", shade(c, -0.2), 3),
        each(
          [
            [21, 19],
            [30, 25],
            [19, 31],
            [28, 38],
            [43, 19],
            [36, 29],
            [45, 35],
          ],
          ([x, y]) =>
            E(x, y, 6.5, 4.8, c, {
              transform: `rotate(${x < 32 ? -25 : 25} ${x} ${y})`,
            }),
        ),
        face(m, 29, 34, 0.54),
      ),
    xiancai: (c, m) =>
      G(
        S("M32 53 L32 25 M32 46 L19 31 M32 43 L45 29", "#AD6772", 2.5),
        P("M32 42 Q18 31 30 10 Q46 24 32 42 Z", c),
        P("M29 45 Q12 43 12 26 Q28 24 29 45 Z", shade(c, -0.08)),
        P("M35 45 Q52 42 51 25 Q35 26 35 45 Z", shade(c, 0.08)),
        S("M31 19 L32 40 M18 32 L27 41 M45 31 L37 41", "#A96074", 1.5),
        face(m, 32, 29, 0.62),
      ),
    hongshuye: (c, m) =>
      G(
        S("M32 54 L32 31 M32 44 L18 35 M32 45 L46 35", "#77925A", 2.6),
        P("M32 39 C8 26 23 7 32 18 C44 6 56 27 32 39 Z", c),
        P("M24 47 C5 42 11 25 21 31 C29 23 38 40 24 47 Z", shade(c, -0.1)),
        P("M42 47 C27 38 37 25 44 31 C55 26 58 42 42 47 Z", shade(c, 0.06)),
        vein("M32 23 L32 36 M17 35 L23 44 M47 35 L42 44"),
        face(m, 32, 27, 0.62),
      ),
    ziganlan: (c, m) =>
      G(
        P("M14 42 C6 23 19 12 31 14 C42 8 56 24 51 41 Q35 58 14 42 Z", c),
        P(
          "M14 32 Q19 19 30 22 Q43 17 49 32 Q42 50 25 47 Q17 44 14 32 Z",
          shade(c, 0.1),
        ),
        S(
          "M20 25 Q12 38 30 44 Q47 43 43 29 M24 25 Q38 20 39 34 Q33 44 24 35 M30 30 Q25 33 31 37",
          "#ECD9DF",
          1.8,
        ),
        shine(21, 21),
        face(m, 32, 35, 0.64),
      ),
    jielan: (c, m) =>
      G(
        tube("M23 53 L30 20", shade(c, 0.06), 5),
        tube("M35 52 L41 21", shade(c, -0.06), 4),
        P("M29 34 Q12 32 15 17 Q30 12 32 27 Z", c),
        P("M34 30 Q31 12 45 11 Q52 24 34 30 Z", shade(c, 0.08)),
        P("M39 43 Q37 27 51 30 Q56 42 39 43 Z", c),
        vein("M21 22 L28 31 M43 17 L36 26 M47 34 L41 39"),
        face(m, 29, 29, 0.58),
      ),

    baiyugu: (c, m) =>
      G(
        each(
          [
            [20, 27, 7, 22],
            [43, 25, 7, 23],
            [31, 20, 8, 30],
          ],
          ([x, y, r, l]) => mushroom(x, y, r, l, c, shade(c, 0.06)),
        ),
        shine(28, 15),
        face(m, 31, 37, 0.6),
      ),
    xieweigu: (c, m) =>
      G(
        each(
          [
            [19, 30, 8, 17],
            [44, 28, 8, 20],
            [31, 22, 10, 28],
          ],
          ([x, y, r, l]) => mushroom(x, y, r, l, "#E8D9BA", c),
        ),
        each(
          [
            [27, 16],
            [35, 18],
            [16, 26],
            [46, 24],
          ],
          ([x, y]) => C(x, y, 1.2, shade(c, -0.2), { stroke: "none" }),
        ),
        face(m, 31, 36, 0.62),
      ),
    jigu: (c, m) =>
      G(
        P("M27 34 L24 51 Q31 56 37 50 L36 31 Z", "#E2D5B8"),
        P("M30 39 Q4 39 12 27 Q20 18 31 22 Q40 10 51 20 Q59 35 30 39 Z", c),
        P("M30 40 Q13 29 17 18 Q28 8 39 17 Q43 30 30 40 Z", shade(c, 0.1)),
        S(
          "M20 22 L30 37 M27 17 L31 35 M38 20 L33 35 M47 24 L36 36",
          shade(c, -0.2),
          1.1,
        ),
        face(m, 31, 30, 0.58),
      ),
    chashugu: (c, m) =>
      G(
        each(
          [
            [19, 23, 6, 28],
            [44, 18, 6, 32],
            [31, 17, 7, 35],
          ],
          ([x, y, r, l]) => mushroom(x, y, r, l, "#C6AD82", c),
        ),
        S("M24 49 Q32 45 40 49", "#A48B64", 2),
        face(m, 31, 34, 0.58),
      ),
    zhusun: (c, m) =>
      G(
        P("M25 17 L22 50 Q32 56 43 49 L38 17 Z", c),
        P("M25 22 Q17 32 13 47 Q32 57 51 47 Q46 30 38 22 Z", shade(c, 0.08)),
        each([20, 27, 34, 41], (x) =>
          S(
            `M${x} 29 L${x + 6} 49 M${x + 5} 27 L${x - 2} 48`,
            shade(c, -0.23),
            1,
          ),
        ),
        S("M17 36 Q32 43 47 36 M15 43 Q32 51 49 43", shade(c, -0.2), 1),
        P("M24 20 Q21 9 32 8 Q43 10 40 20 Z", "#A89371"),
        face(m, 32, 22, 0.52),
      ),
    jituigu: (c, m) =>
      G(
        P("M24 28 L21 48 Q31 57 41 48 L38 27 Z", "#F1E8D2"),
        P("M20 33 Q17 9 31 8 Q46 9 44 33 Q33 42 20 33 Z", c),
        S(
          "M25 14 Q21 25 25 33 M33 12 L33 34 M40 17 L39 32",
          shade(c, -0.18),
          1.2,
        ),
        shine(26, 16),
        face(m, 32, 28, 0.65),
      ),
    haidaisi: (c, m) =>
      G(
        noodles(
          [
            "M17 15 C8 25 28 28 20 39 Q13 49 23 51",
            "M30 12 C18 22 40 29 29 39 Q22 47 33 52",
            "M43 16 C34 25 53 30 44 42 Q39 48 46 51",
          ],
          c,
          5,
        ),
        face(m, 31, 31, 0.6),
      ),

    xilanhua: (c, m) => G(florets(c, "#B3CF88"), face(m, 32, 28, 0.72)),
    huacai: (c, m) =>
      G(
        P(
          "M30 51 Q13 49 11 33 Q26 32 32 44 Q41 30 53 34 Q51 50 35 53 Z",
          "#83A66D",
        ),
        florets(c, "#D5D5A1"),
        each(
          [
            [18, 27],
            [26, 17],
            [40, 19],
            [44, 30],
          ],
          ([x, y]) => S(`M${x - 2} ${y} q2 -3 4 0`, shade(c, -0.17), 1.1),
        ),
        face(m, 32, 30, 0.68),
      ),
    helandou: (c, m) =>
      G(
        P("M12 44 Q18 14 50 14 Q52 41 17 49 Q12 50 12 44 Z", c),
        P("M17 42 Q25 20 46 20 Q43 39 17 45 Z", shade(c, 0.1), {
          strokeWidth: 1.5,
        }),
        each(
          [
            [22, 37],
            [32, 30],
            [41, 24],
          ],
          ([x, y]) => C(x, y, 5.5, shade(c, 0.2), { strokeWidth: 1.5 }),
        ),
        face(m, 31, 32, 0.5),
        S("M48 15 q4 -7 7 -3", shade(c, -0.2), 2),
      ),
    qiukui: (c, m) =>
      G(
        P("M19 45 L31 10 L43 15 L34 51 Z", c),
        S("M28 42 L36 16 M24 42 L33 17", shade(c, -0.2), 1.3),
        P(
          "M43 24 L48 30 L56 33 L51 39 L50 47 L42 45 L35 49 L32 41 L26 36 L33 30 L36 23 Z",
          shade(c, 0.13),
        ),
        P(
          "M42 29 L46 34 L50 36 L46 39 L44 44 L40 40 L35 37 L39 33 Z",
          "#F0E6C1",
          { strokeWidth: 1.3 },
        ),
        face(m, 42, 35, 0.48),
      ),
    lusun: (c, m) =>
      G(
        each(
          [
            [20, 19, -9],
            [32, 12, 0],
            [44, 20, 9],
          ],
          ([x, y, rot]) =>
            h(
              "g",
              { transform: `rotate(${rot} ${x} 44)` },
              P(
                `M${x - 3} 51 L${x - 3} ${y + 10} L${x - 5} ${y + 6} L${x} ${y} L${x + 5} ${y + 6} L${x + 3} ${y + 10} L${x + 3} 51 Z`,
                c,
              ),
              S(
                `M${x - 3} ${y + 8} l3 3 3 -3 M${x - 3} ${y + 15} l3 3 3 -3`,
                shade(c, -0.18),
                1.2,
              ),
            ),
        ),
        face(m, 32, 35, 0.57),
      ),
    qiezi: (c, m) =>
      G(
        P("M29 20 Q10 28 15 45 Q20 57 36 50 Q51 43 43 25 L38 19 Z", c),
        P(
          "M27 23 L25 15 L33 17 L38 11 L40 19 L47 22 L39 26 L33 23 Z",
          "#71915B",
        ),
        S("M37 16 Q36 10 41 8", "#71915B", 3),
        shine(23, 32, 3, 6),
        face(m, 31, 36, 0.72),
      ),
    xihulu: (c, m) =>
      G(
        E(38, 29, 12, 20, shade(c, -0.1), { transform: "rotate(-28 38 29)" }),
        E(26, 39, 17, 14, c, { transform: "rotate(-15 26 39)" }),
        E(26, 39, 12, 10, "#E7E7BB", {
          strokeWidth: 1.5,
          transform: "rotate(-15 26 39)",
        }),
        each(
          [
            [21, 34],
            [30, 33],
            [20, 43],
            [31, 42],
          ],
          ([x, y]) => E(x, y, 1.6, 2.5, "#BFC786", { stroke: "none" }),
        ),
        face(m, 26, 38, 0.55),
      ),
    huangdouya: (c, m) =>
      G(
        sprout(18, 21, c, -13),
        sprout(44, 21, c, 15),
        sprout(31, 17, c),
        face(m, 31, 30, 0.54),
      ),
    lvdouya: (c, m) =>
      G(
        sprout(18, 26, c, -22),
        sprout(45, 24, c, 23),
        sprout(31, 16, c, 5),
        P("M26 17 q5 -12 10 -4 q-2 8 -10 4", shade(c, -0.2)),
        face(m, 31, 30, 0.54),
      ),
    shanyaodou: (c, m) =>
      G(
        E(20, 39, 10, 12, shade(c, -0.07), { transform: "rotate(-20 20 39)" }),
        E(43, 38, 10, 13, shade(c, 0.06), { transform: "rotate(15 43 38)" }),
        E(31, 25, 12, 14, c),
        each(
          [
            [26, 17],
            [38, 22],
            [18, 35],
            [44, 43],
            [30, 32],
          ],
          ([x, y]) => C(x, y, 1, shade(c, -0.25), { stroke: "none" }),
        ),
        shine(27, 18, 3, 2),
        face(m, 31, 25, 0.62),
      ),

    xianglingjuan: (c, m) =>
      G(
        P(
          "M13 23 Q17 13 26 15 L47 24 Q55 30 49 39 Q45 48 36 44 L16 35 Q11 32 13 23 Z",
          c,
        ),
        each([19, 25, 31, 37], (x) =>
          S(`M${x} 20 q-5 6 -3 15`, shade(c, -0.18), 1.4),
        ),
        E(44, 34, 8, 10, shade(c, -0.08), { transform: "rotate(22 44 34)" }),
        E(44, 34, 4, 5, "#F4DEB3", {
          strokeWidth: 1.4,
          transform: "rotate(22 44 34)",
        }),
        face(m, 27, 28, 0.58),
      ),
    mianjin: (c, m) =>
      G(
        P("M14 23 L27 13 L49 23 L50 43 L36 51 L14 42 Z", c),
        P("M14 23 L36 30 L49 23 L50 43 L36 51 L14 42 Z", shade(c, 0.05)),
        each(
          [
            [23, 25, 2.5],
            [42, 33, 3],
            [24, 39, 3],
            [33, 21, 2],
          ],
          ([x, y, r]) =>
            E(x, y, r, r * 0.7, shade(c, -0.23), { strokeWidth: 1.1 }),
        ),
        face(m, 31, 34, 0.63),
      ),
    baiyedoufu: (c, m) =>
      G(
        P("M12 23 L38 15 L52 27 L27 35 Z", shade(c, 0.12)),
        P("M12 23 L27 35 L27 51 L12 39 Z", shade(c, -0.1)),
        P("M27 35 L52 27 L52 43 L27 51 Z", c),
        S("M29 40 L49 33 M29 45 L49 38", shade(c, -0.15), 1.3),
        shine(28, 24),
        face(m, 38, 38, 0.58),
      ),
    laodoufu: (c, m) =>
      G(
        P("M13 23 L39 16 L51 25 L51 44 L26 52 L13 43 Z", c),
        P("M13 23 L26 32 L51 25 L39 16 Z", shade(c, 0.07)),
        P("M13 23 L26 32 L26 52 L13 43 Z", shade(c, -0.12)),
        S("M30 34 l3 3 -2 3 M45 29 l-3 4 2 3", shade(c, -0.18), 1),
        face(m, 38, 38, 0.6),
      ),
    doufusi: (c, m) =>
      G(
        noodles(
          [
            "M19 17 Q13 27 18 36 L17 51",
            "M26 15 Q21 25 25 36 L24 52",
            "M34 13 Q29 28 33 38 L32 53",
            "M42 15 Q36 28 41 39 L40 52",
            "M48 20 Q44 28 48 40 L47 49",
          ],
          c,
          4,
        ),
        P("M13 31 Q31 37 50 31 L50 39 Q31 43 14 38 Z", shade(c, -0.16), {
          strokeWidth: 1.8,
        }),
        face(m, 32, 26, 0.58),
      ),
    sudu: (c, m) =>
      G(
        P("M16 18 Q45 9 50 33 Q55 49 29 52 Q9 52 13 31 Z", c),
        S(
          "M22 22 Q44 13 45 33 Q45 47 28 46 Q16 45 19 32 Q22 23 34 26 Q43 30 36 38 Q29 43 25 36",
          shade(c, -0.22),
          2,
        ),
        shine(21, 19),
        face(m, 31, 33, 0.6),
      ),
    sumaodu: (c, m) =>
      G(
        P("M12 44 Q14 22 32 13 Q51 20 53 43 Q36 52 12 44 Z", c),
        each([18, 24, 30, 36, 42, 48], (x, j) =>
          S(
            `M${x} 42 Q${x - 2} 29 ${29 + j} ${18 + (j % 2) * 2}`,
            shade(c, -0.21),
            1.8,
          ),
        ),
        S("M17 43 Q33 48 48 42", shade(c, 0.18), 2),
        face(m, 32, 34, 0.61),
      ),

    xianxia: (c, m) =>
      G(
        P(
          "M42 17 Q25 4 16 20 Q8 36 24 48 Q38 59 49 43 L42 36 Q35 46 26 38 Q17 30 26 24 Q33 20 38 26 Z",
          c,
        ),
        P("M42 38 L54 33 L52 42 L55 49 L45 46 Z", shade(c, -0.08)),
        S(
          "M17 21 L25 27 M13 31 L23 32 M18 41 L27 36 M28 48 L32 39 M39 48 L39 40",
          shade(c, -0.2),
          1.5,
        ),
        S("M40 18 Q49 8 55 13 M38 18 Q43 8 47 8", ink, 1.2),
        shine(22, 17),
        face(m, 25, 26, 0.53),
      ),
    youyuquan: (c, m) =>
      G(
        h(
          "g",
          { transform: "rotate(-18 25 31)" },
          E(25, 31, 14, 19, c),
          E(25, 31, 7.5, 12, "#FFF8F0", { strokeWidth: 1.8 }),
        ),
        h(
          "g",
          { transform: "rotate(20 43 39)" },
          E(43, 39, 11, 14, shade(c, 0.08)),
          E(43, 39, 5.5, 8, "#FFF8F0", { strokeWidth: 1.7 }),
        ),
        face(m, 25, 18, 0.44),
      ),
    bashayupian: (c, m) =>
      G(
        P(
          "M14 36 Q13 18 28 14 Q39 9 47 20 Q45 29 53 41 Q42 52 22 49 Q10 47 14 36 Z",
          c,
        ),
        P("M13 42 Q28 35 49 41 L53 45 Q31 57 15 49 Z", shade(c, -0.07), {
          strokeWidth: 1.7,
        }),
        S(
          "M23 18 Q23 25 31 27 M31 15 Q31 23 39 27 M39 20 Q37 26 44 31",
          shade(c, -0.2),
          1.2,
        ),
        shine(22, 25),
        face(m, 31, 35, 0.68),
      ),
    moyuwan: (c, m) =>
      G(
        C(25, 36, 16, c),
        C(44, 27, 11, shade(c, 0.1)),
        each(
          [
            [16, 30],
            [20, 44],
            [32, 26],
            [40, 20],
            [48, 31],
          ],
          ([x, y]) => C(x, y, 1.3, shade(c, -0.25), { stroke: "none" }),
        ),
        shine(19, 27),
        face(m, 25, 36, 0.66),
      ),
    gongwan: (c, m) =>
      G(
        C(19, 28, 10, shade(c, -0.1)),
        C(41, 39, 17, c),
        S("M30 29 Q36 26 40 29 M45 44 q4 -3 5 -7", shade(c, -0.22), 1.4),
        shine(35, 30, 4, 2.5),
        face(m, 41, 37, 0.66),
      ),
    qinqinchang: (c, m) =>
      G(
        each(
          [
            [22, 28, -22],
            [40, 35, 22],
          ],
          ([x, y, rot]) =>
            h(
              "g",
              { transform: `rotate(${rot} ${x} ${y})` },
              P(`M${x - 6} ${y - 14} l-2 -5 8 2 8 -2 -2 5 Z`, shade(c, -0.12)),
              R(x - 7, y - 13, 14, 29, 7, c),
              S(
                `M${x - 4} ${y - 7} q4 -3 8 0 M${x - 4} ${y + 7} q4 3 8 0`,
                shade(c, -0.18),
                1.2,
              ),
            ),
        ),
        face(m, 24, 28, 0.52),
      ),
    jirouwan: (c, m) =>
      G(
        C(21, 23, 11, shade(c, -0.05)),
        C(45, 27, 10, shade(c, 0.05)),
        C(31, 41, 15, c),
        each(
          [
            [18, 21],
            [27, 33],
            [38, 44],
            [45, 23],
          ],
          ([x, y]) => C(x, y, 1.2, "#849067", { stroke: "none" }),
        ),
        shine(25, 33),
        face(m, 31, 40, 0.65),
      ),
    zhuroupian: (c, m) =>
      G(
        P("M13 25 Q25 12 45 17 Q54 28 48 45 Q34 54 14 46 Q18 35 13 25 Z", c),
        P("M14 26 Q27 32 48 23 L49 31 Q30 39 16 34 Z", "#F1DDC9", {
          strokeWidth: 1.2,
        }),
        S("M19 42 Q30 47 43 40", "#F0D6C3", 2.5),
        shine(25, 21),
        face(m, 32, 36, 0.67),
      ),
    yangroujuan: (c, m) =>
      G(
        P("M15 24 Q19 13 30 17 L47 26 Q55 35 47 44 Q39 51 30 45 L15 37 Z", c),
        S("M20 20 Q17 30 34 38 M28 21 Q26 30 42 36", "#F2DDD0", 3.5),
        E(42, 36, 10, 12, shade(c, 0.06), { transform: "rotate(24 42 36)" }),
        S("M42 29 Q50 33 44 41 Q36 45 35 36 Q35 31 41 33", "#F3E1D3", 2.6),
        face(m, 23, 29, 0.52),
      ),
    yachang: (c, m) =>
      G(
        noodles(
          [
            "M17 17 C7 26 32 26 21 37 S15 52 27 49",
            "M31 13 C19 23 45 27 32 38 S26 54 39 49",
            "M45 18 C35 26 57 33 46 42 Q41 48 49 51",
          ],
          c,
          4,
        ),
        face(m, 32, 29, 0.56),
      ),
    jizhen: (c, m) =>
      G(
        P(
          "M12 32 C9 15 24 12 32 23 C41 10 57 22 49 38 Q40 53 26 49 Q17 45 12 32 Z",
          c,
        ),
        P("M27 25 Q20 35 29 45 Q36 48 40 39 Q39 29 32 24 Z", shade(c, -0.13), {
          strokeWidth: 1.5,
        }),
        S("M18 21 l5 6 M16 28 l6 5 M44 22 l-5 6", shade(c, 0.2), 1.8),
        shine(20, 20),
        face(m, 33, 35, 0.61),
      ),
    feichang: (c, m) =>
      G(
        tube("M17 22 C5 29 18 43 31 39 C50 34 53 49 39 51", c, 9),
        tube("M23 17 C39 7 54 21 45 32 Q38 41 28 31", shade(c, 0.06), 9),
        each(
          [
            [17, 26],
            [23, 35],
            [39, 16],
            [45, 24],
            [44, 44],
          ],
          ([x, y]) => S(`M${x - 2} ${y - 2} l4 4`, shade(c, -0.18), 1.4),
        ),
        face(m, 31, 19, 0.53),
      ),

    tudoufen: (c, m) =>
      G(
        noodles(
          [
            "M17 14 C6 28 27 34 16 48",
            "M30 12 C18 25 44 37 31 52",
            "M43 15 C33 28 55 36 46 50",
          ],
          c,
          7,
        ),
        face(m, 31, 30, 0.62),
      ),
    hongshufen: (c, m) =>
      G(
        noodles(
          [
            "M17 14 C7 24 31 30 19 42 Q12 50 23 51",
            "M28 13 C17 26 44 27 31 42 Q24 51 35 52",
            "M39 13 C29 24 53 31 43 42 Q35 50 46 51",
          ],
          c,
          3.8,
        ),
        shine(25, 22, 2, 3),
        face(m, 31, 30, 0.58),
      ),
    lamian: (c, m) =>
      G(
        P("M12 32 C11 17 29 12 44 19 C58 26 53 45 40 49 Q16 55 12 32 Z", c),
        each([0, 1, 2, 3], (j) =>
          S(
            `M${18 + j * 3} ${25 + j * 4} C${20 + j * 3} ${13 + j * 4} ${49 - j * 2} ${23 + j * 3} ${44 - j * 3} ${34 + j * 3} Q${31 - j} ${46 - j * 2} ${21 + j * 2} ${34 + j * 2}`,
            shade(c, -0.23),
            1.8,
          ),
        ),
        shine(22, 20),
        face(m, 32, 32, 0.65),
      ),
    qiaomaimian: (c, m) =>
      G(
        each([17, 23, 29, 35, 41, 47], (x, j) =>
          tube(
            `M${x} ${15 + (j % 2) * 2} Q${x - 3} 31 ${x + 1} 51`,
            j % 2 ? shade(c, 0.08) : c,
            3.4,
          ),
        ),
        P("M14 31 Q32 35 50 31 L50 39 Q32 43 14 39 Z", "#CBB998", {
          strokeWidth: 1.6,
        }),
        face(m, 32, 25, 0.61),
      ),
    yimian: (c, m) =>
      G(
        each(
          [
            [20, 29, -25],
            [38, 38, 25],
            [42, 20, 12],
          ],
          ([x, y, rot]) =>
            h(
              "g",
              { transform: `rotate(${rot} ${x} ${y})` },
              P(`M${x - 6} ${y - 12} l12 -3 0 27 -12 3 Z`, c),
              E(x, y - 12, 6, 3, shade(c, -0.2), { strokeWidth: 1.7 }),
              S(
                `M${x - 2} ${y - 6} v16 M${x + 2} ${y - 7} v16`,
                shade(c, -0.15),
                1,
              ),
            ),
        ),
        face(m, 23, 31, 0.48),
      ),
    shouganmian: (c, m) =>
      G(
        each([0, 1, 2], (j) =>
          P(
            `M${15 + j * 12} 14 Q${7 + j * 12} 27 ${19 + j * 12} 36 Q${27 + j * 10} 46 ${16 + j * 12} 52 L${25 + j * 12} 52 Q${36 + j * 10} 42 ${27 + j * 12} 32 Q${17 + j * 12} 24 ${24 + j * 12} 14 Z`,
            j % 2 ? shade(c, -0.06) : c,
          ),
        ),
        S("M23 17 Q19 26 26 31 M36 17 Q31 26 38 32", shade(c, 0.16), 1.4),
        face(m, 32, 32, 0.59),
      ),
    tangxindan: (c, m) =>
      G(eggHalf(c, "#E7A84E", m), S("M24 39 Q32 48 40 39", "#F4C977", 2)),
    songhuadan: (c, m) =>
      G(
        eggHalf("#A08354", "#718261", m, true),
        each(
          [
            [23, 23],
            [42, 28],
            [23, 43],
          ],
          ([x, y]) =>
            G(
              S(`M${x - 3} ${y} h6 M${x} ${y - 3} v6`, "#DDD7B0", 1),
              S(`M${x - 2} ${y - 2} l4 4`, "#DDD7B0", 0.8),
            ),
        ),
      ),
  };
  // Inset the widest drawings so their outlines fit the original renderer's zoom.
  for (const id of ["xihulu", "youyuquan", "gongwan", "yimian"]) {
    const draw = icons[id];
    icons[id] = (color, mood) =>
      h(
        "g",
        { transform: "translate(1.92 1.92) scale(.94)" },
        draw(color, mood),
      );
  }
  return icons;
}
