import type { Kind } from '@/models/constants/kind'
import { type GetMoneyFlowsResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'

export interface moneyFlowData {
  id: number
  title: string
  amount: number
  occurred_date: string
  kind: Kind
}

// 文字列の「occurred_date」をベースにして、「occurred_date」をDateに変換した型を作成
// Omit<T, K>：型TからキーKを取り除いた型を作る
// & { occurred_date: Date }：occurred_dateをDate型にしたものを追加
export type moneyFlowDateTypeData = Omit<GetMoneyFlowsResponse[number], 'occurred_date'> & {
  occurred_date: Date
}
