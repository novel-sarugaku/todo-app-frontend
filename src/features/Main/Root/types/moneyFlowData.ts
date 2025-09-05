import type { Kind } from '@/models/api/internal/backend/v1/response/moneyFlows'

export interface moneyFlowData {
  id: number
  title: string
  amount: number
  occurred_date: string
  kind: Kind
}
