import { X as React } from "../../vendor/react-runtime.js";
import {
  initialWallet,
  validWallet,
  migrateWallet, dailyGift, payOrder, closeOrder,
  purchase,
  equip,
  localDay,
} from "./economy.js";
const KEY = "dazi.wallet.v1",
  listeners = new Set();
let memoryOnly = false,
  walletCache = initialWallet();
function load() {
  if (memoryOnly) return walletCache;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return walletCache;
    const parsed = JSON.parse(raw);
    if (!validWallet(parsed)) throw Error("Invalid wallet");
    return migrateWallet(parsed);
  } catch {
    memoryOnly = true;
    return walletCache;
  }
}
let snapshot = { wallet: load(), persistent: !memoryOnly };
walletCache = snapshot.wallet;
const notify = () => listeners.forEach((listener) => listener());
window.addEventListener("storage", (event) => {
  if ((event.key === KEY || event.key === null) && !memoryOnly) {
    if (event.newValue === null) walletCache = initialWallet();
    snapshot = { wallet: load(), persistent: !memoryOnly };
    walletCache = snapshot.wallet;
    notify();
  }
});
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export function useWallet() {
  return React.useSyncExternalStore(subscribe, () => snapshot);
}
let queue = Promise.resolve();
function transaction(operation) {
  const commit = () => {
    const current = memoryOnly ? snapshot.wallet : load(),
      result = operation(current);
    if (result.wallet !== current) {
      try {
        if (!memoryOnly)
          localStorage.setItem(KEY, JSON.stringify(result.wallet));
      } catch {
        memoryOnly = true;
      }
    }
    walletCache = result.wallet;
    snapshot = { wallet: result.wallet, persistent: !memoryOnly };
    notify();
    return { ...result, persistent: !memoryOnly };
  };
  const task = () =>
    navigator.locks?.request
      ? navigator.locks.request("dazi-wallet-write", commit)
      : commit();
  const next = queue.then(task, task);
  queue = next.catch(() => {});
  return next;
}
export const claimDaily = () => transaction(wallet => dailyGift(wallet));
export const payMeal = order => transaction(wallet => payOrder(wallet,order));
export const finishMeal = id => transaction(wallet => closeOrder(wallet,id));
export const refundMeal = id => transaction(wallet => closeOrder(wallet,id,true));
export const buyItem = (id) => transaction((wallet) => purchase(wallet, id));
export const equipItem = (id) => transaction((wallet) => equip(wallet, id));

export const walletSnapshot=()=>snapshot;
export const importFreshWallet=raw=>transaction(current=>{
  if(!validWallet(raw))return {wallet:current,status:'invalid'};
  const fresh=current.spent===0&&Object.keys(current.orders).length===0&&current.owned.every(id=>['theme-cream','sign-default','tray-plain','grill-classic'].includes(id))&&current.ledger.every(t=>t.id.startsWith('daily:'));
  if(!fresh)return {wallet:current,status:'not-empty'};
  return {wallet:migrateWallet(raw),status:'imported'};
});
