import type { Kind } from '@/models/constants/kind'

export type moneyFlowData = {
  id: number
  title: string
  amount: number
  occurred_date: Date
  kind: Kind
}
