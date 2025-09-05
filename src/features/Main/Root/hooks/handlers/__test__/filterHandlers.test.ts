import { describe, it, expect } from 'vitest'

import {
  filterByMont,
  filterIncome,
  filterExpense,
} from '@/features/Main/Root/hooks/handlers/filterHandlers'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

const mockMoneyFlowData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle1',
    amount: 550,
    occurred_date: '2025-09-10T12:00:00Z',
    kind: 'income',
  },
  {
    id: 2,
    title: 'mockTitle2',
    amount: 1000000,
    occurred_date: '2025-09-25T12:00:00Z',
    kind: 'expense',
  },
  {
    id: 3,
    title: 'mockTitle3',
    amount: 1000,
    occurred_date: '2025-10-01T12:00:00Z',
    kind: 'income',
  },
  {
    id: 4,
    title: 'mockTitle4',
    amount: 250,
    occurred_date: '2025-10-15T12:00:00Z',
    kind: 'expense',
  },
]

describe('filterByMont', () => {
  describe('正常系', () => {
    it('指定した年月（2025-09）のデータのみを返す', () => {
      const mockMonth = new Date(2025, 8, 1) // 基準となる月（9月)を用意。0始まりのため8 = 9月
      const mockResponse = filterByMont(mockMoneyFlowData, mockMonth).map((data) => data.id) // 2025年9月のデータだけ抽出し、idだけの配列に変換
      expect(mockResponse).toEqual([1, 2]) // 9月の2件（id: 1, 2）
    })

    it('該当データが無い月は空配列を返す（2025-11）', () => {
      const month = new Date(2025, 10, 1) // 0始まりのため10 = 11月
      expect(filterByMont(mockMoneyFlowData, month)).toEqual([])
    })
  })
})

describe('filterIncome', () => {
  describe('正常系', () => {
    it('incomeのみ抽出する', () => {
      const mockResponse = filterIncome(mockMoneyFlowData).map((data) => data.id)
      expect(mockResponse).toEqual([1, 3]) //（id: 1, 3）
    })

    it('データがない(空配列)の場合、空配列を返す', () => {
      expect(filterIncome([])).toEqual([])
    })
  })
})

describe('filterExpense', () => {
  describe('正常系', () => {
    it('expenseのみ抽出する', () => {
      const mockResponse = filterExpense(mockMoneyFlowData).map((data) => data.id)
      expect(mockResponse).toEqual([2, 4]) //（id: 2, 4）
    })

    it('データがない(空配列)の場合、空配列を返す', () => {
      expect(filterExpense([])).toEqual([])
    })
  })
})
