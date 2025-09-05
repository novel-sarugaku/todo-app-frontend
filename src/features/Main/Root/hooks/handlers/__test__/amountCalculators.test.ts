import { describe, it, expect } from 'vitest'

import {
  incomeTotal,
  expenseTotal,
  balanceTotal,
} from '@/features/Main/Root/hooks/handlers/amountCalculators'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

const mockMoneyFlowData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle1',
    amount: 550,
    occurred_date: '2025-09-01T12:00:00Z',
    kind: 'income',
  },
  {
    id: 2,
    title: 'mockTitle2',
    amount: 1000000,
    occurred_date: '2025-09-01T12:00:00Z',
    kind: 'income',
  },
  {
    id: 3,
    title: 'mockTitle3',
    amount: 1000,
    occurred_date: '2025-09-01T12:00:00Z',
    kind: 'expense',
  },
  {
    id: 4,
    title: 'mockTitle4',
    amount: 250,
    occurred_date: '2025-09-01T12:00:00Z',
    kind: 'expense',
  },
]

const mockOnlyIncomeData = mockMoneyFlowData.filter((data) => data.kind === 'income')
const mockOnlyExpenseData = mockMoneyFlowData.filter((data) => data.kind === 'expense')

describe('incomeTotal', () => {
  describe('正常系', () => {
    it('収入のみ合計できる', () => {
      expect(incomeTotal(mockMoneyFlowData)).toBe(1000550) // 550 + 1000000
    })
  })

  it('データがない(空配列)の場合、0を返す', () => {
    expect(incomeTotal([])).toBe(0)
  })
})

describe('expenseTotal', () => {
  describe('正常系', () => {
    it('支出のみ合計できる', () => {
      expect(expenseTotal(mockMoneyFlowData)).toBe(1250) // 1000 + 250
    })
  })

  it('データがない(空配列)の場合、0を返す', () => {
    expect(expenseTotal([])).toBe(0)
  })
})

describe('balanceTotal', () => {
  describe('正常系', () => {
    it('収支（収入-支出）を計算できる', () => {
      expect(balanceTotal(mockMoneyFlowData)).toBe(999300) // (550 + 1000000) - (1000 + 250)
    })
  })

  it('データがない(空配列)の場合、0を返す', () => {
    expect(balanceTotal([])).toBe(0)
  })

  it('収入だけの場合、合計を返す', () => {
    expect(balanceTotal(mockOnlyIncomeData)).toBe(1000550)
  })

  it('支出だけの場合、マイナスの合計を返す', () => {
    expect(balanceTotal(mockOnlyExpenseData)).toBe(-1250)
  })
})
