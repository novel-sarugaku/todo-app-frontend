import { type Kind } from '@/models/constants/kind'

type MoneyFlowItem = {
  id: number
  title: string
  amount: number
  occurred_date: string
  kind: Kind
}

// GETレスポンス（全件）
export type GetMoneyFlowsResponse = MoneyFlowItem[]

// POSTレスポンス
export type CreateMoneyFlowResponse = MoneyFlowItem

// PUTレスポンス
export type UpdateMoneyFlowResponse = MoneyFlowItem
