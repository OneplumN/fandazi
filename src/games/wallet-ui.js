import { X as React } from "../../vendor/react-runtime.js";
import { SHOP_ITEMS, MEMBERS, membership, localDay } from "./economy.js";
import { useWallet, claimDaily, payMeal, finishMeal, refundMeal, buyItem, equipItem } from "./wallet-store.js";
const h = React.createElement;
export { useWallet };
export function Coin({ size = 24 }) {
  return h(
    "svg",
    { width: size, height: size, viewBox: "0 0 48 48", "aria-hidden": true },
    h("circle", {
      cx: 24,
      cy: 25,
      r: 20,
      fill: "#E4AC45",
      stroke: "#3D2B23",
      strokeWidth: 2.5,
    }),
    h("circle", {
      cx: 24,
      cy: 22,
      r: 18,
      fill: "#FFCF69",
      stroke: "#3D2B23",
      strokeWidth: 2.5,
    }),
    h("path", {
      d: "M24 11 L27 19 L35 22 L27 25 L24 33 L21 25 L13 22 L21 19 Z",
      fill: "#E4AC45",
      stroke: "#3D2B23",
      strokeWidth: 1.5,
    }),
  );
}
export function WalletBadge({ onClick } = {}) {
  const { wallet } = useWallet();
  return h(
    "a",
    {
      href: "#shop",
      onClick,
      className: "wallet-badge",
      "aria-label": `打开金币与装扮，余额${wallet.balance}`,
    },
    h(Coin, {}),
    h("span", null, wallet.balance),
    h("small", null, membership(wallet.spent).name),
  );
}
export function WalletSkin() {
  const { wallet } = useWallet();
  const [recoverable] = React.useState(()=>Object.entries(wallet.orders).filter(([,o])=>o.status === "pending").map(([id])=>id));
  React.useEffect(() => {
    for (const type of ["theme", "sign", "tray", "grill"])
      document.body.dataset["dazi" + type[0].toUpperCase() + type.slice(1)] =
        wallet.equipped[type];
    document.body.dataset.daziMember = membership(wallet.spent).name;
  }, [wallet.equipped, wallet.spent]);
  React.useEffect(() => {
    claimDaily();
    const check = () => { if (!document.hidden) claimDaily(); };
    const timer = setInterval(check, 30000);
    document.addEventListener("visibilitychange",check);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange",check); };
  }, []);
  const pending = Object.entries(wallet.orders).filter(([id,o])=>recoverable.includes(id) && o.status === "pending");
  return pending.length
    ? h("aside",{className:"pending-meals"},"上次有未吃完的订单，可取消退款",...pending.map(([id,o])=>h("button",{key:id,onClick:()=>refundMeal(id)},`取消${o.label} · 退回${o.amount}金币`))) : null;
}
export function MemberCard() {
  const {wallet}=useWallet(), member=membership(wallet.spent);
  return h("section",{className:"member-card"},
    h("b",null,`${member.name} · 累计消费 ${wallet.spent} 金币`),
    h("p",null,member.next?`再消费 ${member.next.min-wallet.spent} 金币成为${member.next.name}`:"小馆的黑金老朋友，欢迎常来坐坐。"),
    member.next && h("progress",{max:member.next.min,value:wallet.spent,"aria-label":"会员成长进度"}),
    h("small",null,`每日首次到店送100金币 · ${wallet.gifts[localDay()]?"今日已到账":"正在领取"} · 余额可累积`),
    h("p",null,"会员专属称号随消费升级，所有菜品均可自由选择。"),
    h("details",null,h("summary",null,"查看会员等级"),h("p",null,MEMBERS.map(m=>`${m.name} ${m.min}金币`).join(" · ")),h("small",null,"升级可获得专属称号与会员卡配色；每日礼金始终为100金币。")));
}
export function MealReceipt({runId}) {
  const {wallet}=useWallet(), order=wallet.orders[runId];
  return h("section",{className:"coin-receipt","aria-live":"polite"},
    h("b",null,order?`本餐消费 ${order.amount} 金币 · ${order.status === "refunded"?"已退款":"已记入会员成长"}`:"随心做，慢慢吃"),
    h("p",null,`余额 ${wallet.balance} 金币 · ${membership(wallet.spent).name}`));
}
export function MealCheckout({id,amount}) {
  const {wallet}=useWallet(),[busy,setBusy]=React.useState(false),[message,setMessage]=React.useState("");
  const order=wallet.orders[id],paid=order?.status === "completed";
  return h("section",{className:"coin-receipt"},
    h("b",null,paid?`这一盆已下单 · ${order.amount} 金币`:`这一盆 ${amount} 金币 · 余额 ${wallet.balance}`),
    h("p",null,paid?"下单已扣币，点碗里的食材慢慢吃；同一盆不会重复扣币。":"称重和点评免费查看；整盆金币价按模拟金额向上取整，确认开吃后扣币并累计会员成长。"),
    !paid && h("button",{className:"btn btn--primary",disabled:busy || wallet.balance<amount,onClick:async()=>{
      setBusy(true); try { const r=await payMeal({id,amount,label:"麻辣烫用餐"});
      if(r.status === "paid") {await finishMeal(id);setMessage("开吃啦！消费已记入会员成长。");}
      else setMessage("余额不足，请调整食材或明天再来领100金币。");
      } catch {setMessage("本次操作未完成，请重试。");} finally {setBusy(false);}
    }},wallet.balance<amount?"金币不足，减少食材再试试":`确认开吃 · ${amount} 金币`),
    h("p",{role:"status"},message));
}
function ItemArt({ item, api }) {
  const outline = {
      stroke: "#3D2B23",
      strokeWidth: 2.5,
      strokeLinejoin: "round",
      strokeLinecap: "round",
    },
    fill =
      item.art === "mint"
        ? "#D5E3C0"
        : item.art === "peach"
          ? "#F3CDB7"
          : "#F4E4C6";
  let art;
  if (["cream", "mint", "peach"].includes(item.art))
    art = h(
      "g",
      null,
      h("path", { ...outline, d: "M12 16 H84 V67 Q48 79 12 67 Z", fill }),
      h("path", {
        ...outline,
        d: "M12 16 L24 8 H72 L84 16 Z",
        fill: "#FFF9EB",
      }),
      h("path", { ...outline, d: "M23 70 V84 M72 70 V84", fill: "none" }),
      h(api.Face, { x: 48, y: 45, scale: 1.5, mood: 0 }),
    );
  else if (item.art === "sign")
    art = h(
      "g",
      null,
      h("path", { ...outline, d: "M20 22 L31 8 H65 L77 22", fill: "none" }),
      h("rect", {
        ...outline,
        x: 10,
        y: 22,
        width: 76,
        height: 54,
        rx: 8,
        fill: item.value === "night" ? "#F3BD76" : "#F5E8CD",
      }),
      h(
        "text",
        {
          x: 48,
          y: 45,
          textAnchor: "middle",
          fontSize: 13,
          fontWeight: 800,
          fill: "#3D2B23",
        },
        item.value === "night" ? "夜市食神" : "慢慢吃",
      ),
      h("path", { d: "M27 57 H69", stroke: "#A47145", strokeWidth: 2 }),
      h(api.Face, { x: 48, y: 65, scale: 0.75, mood: 0 }),
    );
  else if (item.art === "tray")
    art = h(
      "g",
      null,
      h("ellipse", {
        ...outline,
        cx: 48,
        cy: 48,
        rx: 39,
        ry: 28,
        fill: "#FFF8EC",
      }),
      h("ellipse", {
        cx: 48,
        cy: 48,
        rx: 31,
        ry: 21,
        fill: "none",
        stroke: item.value === "gold" ? "#D6AA50" : "#C9B89B",
        strokeWidth: 4,
      }),
      h(api.Face, { x: 48, y: 49, scale: 1.2, mood: 0 }),
    );
  else
    art = h(
      "g",
      null,
      h("path", {
        ...outline,
        d: "M12 32 H84 L78 68 Q48 82 18 68 Z",
        fill: item.value === "copper" ? "#C49B77" : "#AA9D88",
      }),
      h("ellipse", {
        ...outline,
        cx: 48,
        cy: 32,
        rx: 36,
        ry: 11,
        fill: "#6D5B4B",
      }),
      ...[25, 40, 55, 70].map((x) =>
        h("path", {
          key: x,
          d: `M${x} 24 L${x - 4} 40`,
          stroke: "#D7C6A9",
          strokeWidth: 3,
        }),
      ),
      h("path", { ...outline, d: "M25 72 L19 86 M72 72 L78 86", fill: "none" }),
      h(api.Face, { x: 48, y: 59, scale: 1.2, mood: 0 }),
    );
  return h(
    "svg",
    { viewBox: "0 0 96 96", className: "shop-item-art", "aria-hidden": true },
    art,
  );
}
export function ShopPage({ api }) {
  const { wallet, persistent } = useWallet(),
    [pending, setPending] = React.useState(null),
    [message, setMessage] = React.useState(""),
    [category, setCategory] = React.useState("all");
  React.useEffect(() => {
    window.render_game_to_text = () =>
      JSON.stringify({
        game: "shop",
        balance: wallet.balance,
        owned: wallet.owned,
        equipped: wallet.equipped,
        persistent,
      });
  }, [wallet, persistent]);
  const use = (item) => {
    if (pending) return;
    setPending(item.id);
    const owned = wallet.owned.includes(item.id);
    (owned ? equipItem(item.id) : buyItem(item.id))
      .then((result) =>
        setMessage(
          result.status === "insufficient"
            ? "金币还不够，明天到店再领100金币。"
            : `${item.name}已换上${result.status === "purchased" ? `，花费 ${item.price} 金币` : ""}。`,
        ),
      )
      .catch(() => setMessage("这次没有完成操作，请稍后再试。"))
      .finally(() => setPending(null));
  };
  return h(
    "main",
    { className: "game-shell game-shop" },
    h(
      "header",
      { className: "game-topbar" },
      h("a", { href: "#home", className: "game-back" }, "← 小馆首页"),
      h(WalletBadge, {}),
    ),
    h(
      "div",
      { className: "game-title" },
      h(
        "div",
        null,
        h("p", null, "搭子小馆 · MAKE IT YOURS"),
        h("h1", null, "小馆装扮铺"),
        h("span", null, "每天一份小馆礼金，慢慢吃成老朋友。"),
      ),
    ),
    h(
      "section",
      { className: "wallet-summary" },
      h(Coin, { size: 62 }),
      h(
        "div",
        null,
        h("small", null, "我的金币"),
        h("strong", null, wallet.balance),
        h("p", null, "每天送100金币，吃饭和装扮都能累计会员成长。"),
      ),
    ),
    h(
      "p",
      { className: "shop-rules" },
      "无需闯关。每日首次打开自动送100金币，余额可累积，漏领不补发。实际消费1金币增加1点会员成长；取消未完成用餐会退币并撤回对应成长。已购装扮可免费切换。",
    ),
    h(MemberCard, {}),
    h("div", { className: "shop-message", role: "status" }, message),
    h(
      "nav",
      { className: "shop-category choice-buttons", "aria-label": "装扮分类" },
      [
        ["all", "全部"],
        ["theme", "主题"],
        ["sign", "招牌"],
        ["tray", "餐盘"],
        ["grill", "烤炉"],
      ].map(([id, label]) =>
        h(
          "button",
          {
            type: "button",
            key: id,
            "aria-pressed": category === id,
            onClick: () => setCategory(id),
          },
          label,
        ),
      ),
    ),
    h(
      "section",
      { className: "cosmetic-grid" },
      SHOP_ITEMS.filter(
        (item) => category === "all" || item.type === category,
      ).map((item) => {
        const owned = wallet.owned.includes(item.id),
          active = wallet.equipped[item.type] === item.value,
          missing = item.price - wallet.balance;
        return h(
          "article",
          {
            key: item.id,
            className: `cosmetic-card ${active ? "is-equipped" : ""}`,
          },
          h(ItemArt, { item, api }),
          h(
            "div",
            null,
            h(
              "small",
              null,
              {
                theme: "小馆主题",
                sign: "门口招牌",
                tray: "出炉餐盘",
                grill: "烤炉外衣",
              }[item.type],
            ),
            h("h2", null, item.name),
            h("p", null, item.description),
            h(
              "strong",
              { className: "shop-item-price" },
              item.price
                ? `${item.price} 金币${owned ? " · 已拥有" : ""}`
                : "初始拥有",
            ),
          ),
          h(
            "button",
            {
              type: "button",
              className: `btn ${active ? "btn--ghost" : "btn--primary"}`,
              disabled: !!pending || active || (!owned && missing > 0),
              onClick: () => use(item),
              "aria-label": `${owned ? "使用" : "购买"}${item.name}`,
            },
            pending === item.id
              ? "正在换装…"
              : active
                ? "使用中"
                : owned
                  ? "换上它"
                  : missing > 0
                    ? `还差 ${missing} 枚`
                    : `${item.price} 金币 · 换上`,
          ),
        );
      }),
    ),
    h("aside",{className:"shop-wallet-dock","aria-label":"装扮铺金币余额"},h(Coin,{}),h("b",null,wallet.balance),h("span",null,"金币"),h("a",{href:"#home"},"去小店吃点 →")),
    h(
      "section",
      { className: "wallet-ledger" },
      h("h2", null, "小馆账本"),
      h(
        "p",
        { className: "wallet-note" },
        persistent
          ? "金币和装扮保存在当前浏览器，不支持跨设备同步；清除网站数据会清空账本。"
          : "浏览器存储暂不可用，当前金币和装扮仅保留在本次页面会话中。",
      ),
      h(
        "ul",
        null,
        wallet.ledger
          .slice(0, 10)
          .map((tx) =>
            h(
              "li",
              { key: tx.id },
              h(
                "span",
                null,
                tx.label,
                h(
                  "small",
                  null,
                  new Date(tx.at).toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                ),
              ),
              h(
                "strong",
                {
                  className: tx.amount > 0 ? "ledger-income" : "ledger-expense",
                },
                `${tx.amount > 0 ? "+" : ""}${tx.amount}`,
              ),
            ),
          ),
      ),
    ),
  );
}
