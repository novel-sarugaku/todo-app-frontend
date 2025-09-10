// 月、種別絞り込み用

import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

// 指定した年月のデータだけを取り出す関数
export const filterByMonth = (items: moneyFlowData[], month: Date): moneyFlowData[] => {
  // month:基準となる月
  const getYear = month.getFullYear() // getFullYear()：例:2025年9月15日→2025。基準にする年を保存
  const getMonth = month.getMonth() // getMonth()：例:2025年9月15日→8（0始まり)。基準にする月を保存
  return items.filter((item) => {
    const date = new Date(item.occurred_date) // 文字列をDateオブジェクトに変換（例: "2025-09-04T10:00:00" → Date(2025-09-04T10:00:00)）
    return date.getFullYear() === getYear && date.getMonth() === getMonth // そのデータの日付が基準の年と月に一致するかどうかを判定
  })
}

// 収入のデータだけ取り出す関数
export const filterIncome = (items: moneyFlowData[]): moneyFlowData[] =>
  items.filter((item) => item.kind === 'income')

// 支出のデータだけ取り出す関数
export const filterExpense = (items: moneyFlowData[]): moneyFlowData[] =>
  items.filter((item) => item.kind === 'expense')
