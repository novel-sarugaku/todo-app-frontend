export type Kind = 'income' | 'expense'

// POSTリクエスト
export type CreateMoneyFlowRequest = {
  title: string
  amount: number
  occurred_date: string
  kind: Kind
}

// PUTリクエスト
export type UpdateMoneyFlowRequest = {
  id: number
  title: string
  amount: number
  occurred_date: string
  kind: Kind
}

// DELETEリクエスト
export type DeleteMoneyFlowRequest = {
  id: number
}
