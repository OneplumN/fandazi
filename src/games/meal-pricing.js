// Unpaid meals follow the latest quote; a successful payment fixes the terms
// for every later portion of the same meal, including a hotpot top-up.
export function quotedDiscount(state,liveFactor=1){
 return state.discountCaptured?state.discountFactor:liveFactor;
}
