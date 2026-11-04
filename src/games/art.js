import {X as React} from "../../vendor/react-runtime.js";
const h=React.createElement;
const ink = "#3D2B23";
const line = {
  stroke: ink,
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
export function ShopArt({
  kind,
  api,
  teaColor = "#B77B54",
  milk = true,
  toppings = [],
  ice = "少冰",
  mixing = false,
  progress = 0,
  broth = "#E7D3A1",
  egg = false,
  folded = false,
  heat = 0,
  fillLevel = 1, bites = 0, served = false,
}) {
  const artId = React.useId().replaceAll(":", "");
  const level = Math.max(0,Math.min(1,fillLevel));
  const face = (x, y, scale = 1.5) => h(api.Face, { x, y, scale, mood: 0 });
  const path = (d, fill, props = {}) =>
    h("path", { ...line, d, fill, ...props });
  const circle = (cx, cy, r, fill, props = {}) =>
    h("circle", { ...line, cx, cy, r, fill, ...props });
  const steam = h(
    "g",
    {
      className: "kitchen-steam",
      fill: "none",
      stroke: "#A48B74",
      strokeWidth: 3,
      strokeLinecap: "round",
    },
    ...[110, 170, 230].map((x, index) =>
      h("path", {
        key: x,
        d: `M${x} 43 q-12 -12 0 -24 q12 -12 0 -24`,
        style: { animationDelay: `${index * 0.4}s` },
      }),
    ),
  );
  let drawing;
  if (kind === "malatang")
    drawing = h(
      "g",
      null,
      path("M66 122 Q180 91 294 122 L276 195 Q180 228 84 195 Z", "#F1DDC0"),
      h("ellipse", {
        ...line,
        cx: 180,
        cy: 122,
        rx: 114,
        ry: 27,
        fill: "#E3C690",
      }),
      path("M136 120 Q91 83 116 50 Q146 67 148 111 Z", "#7FA36A"),
      path("M151 116 Q137 50 166 35 Q196 65 163 118 Z", "#96B87D"),
      circle(209, 101, 25, "#D49E83"),
      circle(249, 114, 19, "#E1C994"),
      path("M92 132 Q180 157 268 132 L262 152 Q180 176 98 152 Z", "#F4E7D0"),
      face(180, 184, 1.5),
    );
  else if (kind === "bbq")
    drawing = h(
      "g",
      null,
      steam,
      path(
        "M56 106 Q58 92 75 92 H285 Q302 92 304 106 L290 188 Q180 218 70 188 Z",
        "#A99C87",
      ),
      h("ellipse", {
        ...line,
        cx: 180,
        cy: 106,
        rx: 124,
        ry: 26,
        fill: "#66584C",
      }),
      ...[86, 126, 166, 206, 246].map((x, index) =>
        h(
          "g",
          { key: x },
          path(
            `M${x} 108 l-7 28 l8 -9 l7 13 l8 -28 Z`,
            index % 2 ? "#E7AE65" : "#E28D63",
          ),
        ),
      ),
      ...[77, 110, 143, 176, 209, 242, 275].map((x) =>
        h("path", {
          key: x,
          d: `M${x} 89 L${x - 6} 126`,
          stroke: "#D7C6AB",
          strokeWidth: 4,
        }),
      ),
      face(180, 164, 1.8),
      path("M91 192 L78 218 M272 194 L284 218", "none"),
    );
  else if (kind === "tea")
    drawing = h(
      "g",
      { className: mixing ? "cup-shaking" : "" },
      h(
        "defs",
        null,
        h(
          "clipPath",
          { id: `${artId}-cup` },
          h("path", { d: "M112 54 L128 211 Q180 230 232 211 L248 54 Z" }),
        ),
      ),
      h("defs",null,h("clipPath",{id:`${artId}-liquid`},h("rect",{x:110,y:72+(1-level)*151,width:145,height:151*level,className:"tea-liquid-clip"}))),
      path("M112 54 L128 211 Q180 230 232 211 L248 54 Z", "#F4E8D1"),
      h(
        "g",
        { clipPath: `url(#${artId}-cup)` },
        h("g",{clipPath:`url(#${artId}-liquid)`,"data-fill-level":level},
        h("rect", { x: 112, y: 72, width: 140, height: 148, fill: teaColor }),
        milk &&
          h("path", {
            d: "M113 126 Q146 115 180 128 T248 127 V214 H113 Z",
            fill: "#EFDAB3",
          }),
        ...toppings.flatMap((color, index) =>
          Array.from({ length: 6 }, (_, n) =>
            h("circle", {
              key: `${index}-${n}`,
              className:"recipe-topping",
              cx: 134 + (n % 6) * 18,
              cy: 202 - index * 17,
              r: 5.5,
              fill: color,
              stroke: ink,
              strokeWidth: 1.4,
            }),
          ),
        ),
        ice !== "无冰" &&
          [0, 1, 2].map((n) =>
            h("rect", {
              key: n,
              x: 133 + n * 25,
              y: 83 + (n % 2) * 12,
              width: 17,
              height: 17,
              rx: 4,
              fill: "#DDEBE6",
              opacity: 0.85,
              stroke: ink,
              strokeWidth: 1.5,
              transform: `rotate(${n % 2 ? 15 : -10} ${140 + n * 25} 94)`,
            }),
          ),
      )),
      path("M112 54 L128 211 Q180 230 232 211 L248 54", "none"),
      h("ellipse", {
        ...line,
        cx: 180,
        cy: 54,
        rx: 68,
        ry: 13,
        fill: "#F2DDAF",
      }),
      path("M201 50 L212 9 L223 9 L211 52", "#D1AABB"),
      face(179, 149, 1.9),
      h("path", {
        d: "M130 82 L141 179",
        stroke: "#fff",
        strokeWidth: 7,
        strokeLinecap: "round",
        opacity: 0.42,
      }),
      mixing &&
        h(
          "text",
          { x: 180, y: 246, textAnchor: "middle", fontSize: 13, fill: ink },
          `摇匀中 ${Math.round(progress * 100)}%`,
        ),
    );
  else if (kind === "hotpot")
    drawing = h(
      "g",
      null,
      steam,
      path(
        "M48 106 Q46 85 62 83 H298 Q314 85 312 106 L299 191 Q180 225 61 191 Z",
        "#D6B795",
      ),
      path("M51 109 Q18 95 23 128 Q28 148 57 141", "none"),
      path("M310 109 Q342 95 337 128 Q332 148 304 141", "none"),
      h("ellipse", { ...line, cx: 180, cy: 94, rx: 126, ry: 29, fill: broth }),
      ...[95, 135, 191, 245, 275].map((x, n) =>
        circle(x, 89 + (n % 2) * 12, 5 + (n % 2) * 3, "#F6DFB1", {
          strokeWidth: 1.5,
        }),
      ),
      face(180, 171, 1.8),
      path("M113 210 Q180 231 247 210", "none", { strokeWidth: 2 }),
    );
  else
    drawing = h(
      "g",
      null,
      served ? h("ellipse",{...line,cx:180,cy:155,rx:138,ry:63,fill:"#F7E9CE"}) : h("g",null,
      path("M41 95 Q180 46 319 95 L315 191 Q180 235 45 191 Z", "#B8AAA0"),
      h("ellipse", {
        ...line,
        cx: 180,
        cy: 106,
        rx: 136,
        ry: 49,
        fill: "#75675A",
      }),
      ),
      h("defs",null,h("mask",{id:`${artId}-bite`,maskUnits:"userSpaceOnUse",x:0,y:0,width:360,height:250},
        h("rect",{width:360,height:250,fill:bites>=4?"black":"white"}),
        ...[[247,104,32],[218,83,34],[179,95,39]].slice(0,bites).map(([cx,cy,r],index)=>h("circle",{key:index,cx,cy,r,fill:"black"})))),
      h("g",{mask:`url(#${artId}-bite)`,className:served?"served-pancake":""},
      folded
        ? path(
            "M91 118 Q180 30 269 118 L241 173 Q177 199 113 170 Z",
            heat > 1.3 ? "#B4885B" : heat >= 0.85 ? "#E3B872" : "#E7C681",
          )
        : h("ellipse", {
            ...line,
            cx: 180,
            cy: 107,
            rx: 98,
            ry: 34,
            fill: heat > 1.3 ? "#B4885B" : heat >= 0.85 ? "#E3B872" : "#E7C681",
          }),
      egg &&
        !folded &&
        h(
          "g",
          null,
          path(
            "M150 91 Q166 80 186 87 Q209 83 217 105 Q210 125 188 120 Q161 128 145 111 Z",
            "#F3E5BD",
          ),
          circle(184, 103, 13, "#E0B25B"),
        ),
      face(180, folded ? 143 : 105, 1.4),
      ...[0, 1, 2, 3, 4].map((n) =>
        circle(
          115 + n * 30,
          folded ? 159 + (n % 2) * 7 : 99 + (n % 2) * 17,
          2,
          "#C29A65",
          { stroke: "none" },
        ),
      ),
      ),
    );
  return h(
    "svg",
    {
      viewBox: "0 0 360 250",
      className: `shop-art art-${kind}`,
      role: "img",
      "aria-label": {
        malatang: "卡通麻辣烫食材盆",
        bbq: "卡通炭火烤炉",
        tea: "当前奶茶配方预览",
        hotpot: "卡通火锅",
        breakfast: folded ? "折叠好的早餐饼" : "卡通早餐煎锅",
      }[kind],
    },
    drawing,
  );
}
export function ToppingArt({ item, api }) {
  const shape = {
    stroke: ink,
    strokeWidth: 2.4,
    strokeLinejoin: "round",
    strokeLinecap: "round",
  };
  const dot = (cx, cy, r) =>
    h("circle", { ...shape, cx, cy, r, fill: item.color });
  let content;
  if (item.id === "pearl")
    content = h("g", null, dot(21, 34, 9), dot(42, 34, 9), dot(31, 22, 10));
  else if (item.id === "coconut")
    content = h(
      "g",
      null,
      ...[0, 1, 2].map((n) =>
        h("rect", {
          ...shape,
          key: n,
          x: 15 + n * 11,
          y: 18 + (n % 2) * 12,
          width: 13,
          height: 17,
          rx: 3,
          fill: item.color,
          transform: `rotate(${n % 2 ? 14 : -8} ${22 + n * 11} 30)`,
        }),
      ),
    );
  else if (item.id === "bean")
    content = h(
      "g",
      null,
      ...[
        [21, 25],
        [41, 26],
        [31, 39],
      ].map(([cx, cy], index) =>
        h("ellipse", {
          ...shape,
          key: index,
          cx,
          cy,
          rx: 8,
          ry: 11,
          fill: item.color,
          transform: `rotate(${index % 2 ? 25 : -25} ${cx} ${cy})`,
        }),
      ),
    );
  else if (item.id === "grass")
    content = h(
      "g",
      null,
      ...[0, 1, 2].map((n) =>
        h("rect", {
          ...shape,
          key: n,
          x: 12 + n * 12,
          y: 18 + (n % 2) * 11,
          width: 17,
          height: 18,
          rx: 3,
          fill: item.color,
        }),
      ),
    );
  else if (item.id === "pudding")
    content = h(
      "g",
      null,
      h("path", {
        ...shape,
        d: "M20 19 Q32 14 44 19 L49 44 Q32 51 15 44 Z",
        fill: item.color,
      }),
      h("ellipse", {
        ...shape,
        cx: 32,
        cy: 19,
        rx: 12,
        ry: 5,
        fill: "#BD8D58",
      }),
    );
  else if (item.id === "taro")
    content = h("path", {
      ...shape,
      d: "M12 41 Q12 27 23 29 Q18 19 30 17 Q44 13 43 28 Q55 29 51 43 Q31 52 12 41 Z",
      fill: item.color,
    });
  else
    content = h(
      "g",
      null,
      ...[
        [18, 24],
        [29, 20],
        [42, 24],
        [23, 36],
        [35, 33],
        [45, 38],
        [32, 44],
      ].map(([cx, cy], index) =>
        h("circle", {
          ...shape,
          key: index,
          cx,
          cy,
          r: 5,
          fill: item.color,
          strokeWidth: 1.5,
        }),
      ),
    );
  return h(
    "svg",
    { width: 56, height: 56, viewBox: "0 0 64 64", "aria-hidden": true },
    content,
    h(api.Face, { x: 32, y: 32, scale: 0.55, mood: 0 }),
  );
}
