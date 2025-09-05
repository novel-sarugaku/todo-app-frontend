// 表示月の計算用

import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

// 日付をその月の最初の日(1日)に揃える関数
// date.getFullYear():dateから「年」を取り出す.date.getMonth()：dateから「月」を取り出す。最後の1：「日」を「1日」に指定
export const toMonthStart = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1)

// 月を加減算（deltaが-1で前月, +1で翌月）する関数
// base：基準となる月。delta：増減の量
export const addMonth = (base: Date, delta: number): Date =>
  new Date(base.getFullYear(), base.getMonth() + delta, 1)

// 初期表示する月（最新月）を決める関数
export const getInitialMonth = (items: moneyFlowData[]): Date => {
  if (!items.length) return toMonthStart(new Date()) // データがない場合、「今日の月の1日」を初期値にする
  const latest = items
    .map((item) => new Date(item.occurred_date)) // 文字列をDateオブジェクトに変換（例: "2025-09-04T10:00:00" → Date(2025-09-04T10:00:00)）
    .sort((dateA, dateB) => dateB.getTime() - dateA.getTime())[0] // 新しい日付が先頭に来る降順ソート。getTime()：日付を数値に変換。[0]：ソート後の配列の先頭を取る（一番新しい日付）
  return toMonthStart(latest) // 一番新しいデータの日付を見つけて、その月の1日を返す
}
