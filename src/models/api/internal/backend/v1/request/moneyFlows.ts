// POSTリクエスト
export type CreateMoneyFlowRequest = {
    title: string
    amount: number
    occurred_date: string
}

// PUTリクエスト
export type UpdateMoneyFlowRequest = {
    id: number
    title: string
    amount: number
    occurred_date: string
}

// DELETEリクエスト
export type DeleteMoneyFlowRequest = {
    id: number
}
