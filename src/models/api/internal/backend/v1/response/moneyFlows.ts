type MoneyFlowItem = {
  id: number
  title: string
  amount: number
  occurred_date: string
}

// GETレスポンス（１件）
export type GetMoneyFlowResponseItem = MoneyFlowItem

// GETレスポンス（全件）
export type GetMoneyFlowsResponse = MoneyFlowItem[]

// POSTレスポンス
export type CreateMoneyFlowResponse = MoneyFlowItem

// PUTレスポンス
export type UpdateMoneyFlowResponse = MoneyFlowItem
