// 金額計算用

import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

// 収入の合計金額を計算する関数
export const incomeTotal = (items: moneyFlowData[]): number => {
  return items
    .filter((item) => item.kind === 'income') // 収入のみ抽出
    .reduce((total, item) => total + item.amount, 0) // 金額を合計。reduce：配列をひとつの値にまとめる。// 初期値0
}

// 支出の合計金額を計算する関数
export const expenseTotal = (items: moneyFlowData[]): number => {
  return items
    .filter((item) => item.kind === 'expense') // 支出のみ抽出
    .reduce((total, item) => total + item.amount, 0) // 金額を合計。reduce：配列をひとつの値にまとめる。// 初期値0
}

// 収支（収入 - 支出）の合計金額を計算する関数
export const balanceTotal = (items: moneyFlowData[]): number => {
  return items.reduce((total, item) => {
    if (item.kind === 'income') {
      //収入ならプラス、支出ならマイナスに処理を分ける
      return total + item.amount // 収入なら合計に足す
    } else {
      return total - item.amount // 支出なら合計から引く
    }
  }, 0) // 初期値0
}
