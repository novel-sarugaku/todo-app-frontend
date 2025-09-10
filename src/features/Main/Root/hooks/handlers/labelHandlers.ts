// 表示ラベル作成用

import { formatMonthly } from '@/features/Main/Root/hooks/handlers/formatters'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

// 年月ラベル（例：2025年9月）を作って返す関数
export const buildYearMonthLabelFromItems = (items: moneyFlowData[]): string => {
  if (!items.length) return '年月を選択' // データがない場合、「年月を選択」を表示
  return formatMonthly(items[0].occurred_date) // データがある場合、formatMonthly()でフォーマット整形した年月を表示
}
