import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act } from 'react'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useMoneyFlowsHandler } from '@/features/Main/Root/hooks/handlers/useMoneyFlowsHandler'
import * as getMoneyFlowsQuery from '@/features/Main/Root/hooks/queries/useGetMoneyFlowsQuery'
import type { UseQueryResult } from '@tanstack/react-query'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

// 時間設定
vi.useFakeTimers()
vi.setSystemTime(new Date(2023, 8, 1))

// Mocking the useGetMoneyFlowsQuer hook
const mockData: moneyFlowData[] = [
  { id: 1, title: 'Salary', amount: 5000, occurred_date: new Date('2023-09-01'), kind: 'income' }, // 月初
  {
    id: 2,
    title: 'Groceries',
    amount: 150,
    occurred_date: new Date('2023-09-05'),
    kind: 'expense',
  },
  { id: 3, title: 'Freelance', amount: 800, occurred_date: new Date('2023-09-10'), kind: 'income' },
  { id: 4, title: 'Rent', amount: 1200, occurred_date: new Date('2023-09-30'), kind: 'expense' }, // 月末
  {
    id: 5,
    title: 'Utilities',
    amount: 200,
    occurred_date: new Date('2023-08-28'),
    kind: 'expense',
  }, // 前月
  { id: 6, title: 'Bonus', amount: 1000, occurred_date: new Date('2023-10-01'), kind: 'income' }, // 翌月
  { id: 7, title: 'Gift', amount: 300, occurred_date: new Date('2022-10-15'), kind: 'income' }, // 前年
] as moneyFlowData[]

const useGetMoneyFlowsQuerySpy = vi
  .spyOn(getMoneyFlowsQuery, 'useGetMoneyFlowsQuery')
  .mockReturnValue({
    data: mockData,
  } as UseQueryResult<moneyFlowData[]>)

beforeEach(() => {
  vi.clearAllMocks()
  useGetMoneyFlowsQuerySpy.mockReturnValue({
    data: mockData,
  } as UseQueryResult<moneyFlowData[]>)
})

describe('useMoneyFlowsHandler', () => {
  describe('正常系', () => {
    it('dataがある場合、正しいデーター配列と合計を返す', () => {
      const { result } = customRenderHook(() => useMoneyFlowsHandler())

      expect(result.current.targetDate).toEqual(new Date(2023, 8, 1))
      expect(result.current.targetMonthlyTotalAmount).toBe(5000 + 800 - 150 - 1200) // 4450
      expect(result.current.targetMonthlyIncomeData.map((item) => item.id)).toEqual([3, 1])
      expect(result.current.targetMonthlyIncomeTotalAmount).toBe(5800) // 5000 + 800
      expect(result.current.targetMonthlyExpenseData.map((item) => item.id)).toEqual([4, 2])
      expect(result.current.targetMonthlyExpenseTotalAmount).toBe(1350) // 150 + 1200
    })

    it('onSubmitTargetDateで対象年月を変更する', () => {
      const { result } = customRenderHook(() => useMoneyFlowsHandler())

      // 初期値確認
      expect(result.current.targetDate).toEqual(new Date(2023, 8, 1)) // 2023年9月

      // 翌月に変更
      act(() => {
        result.current.onSubmitTargetDate(2022, 9) // 2022年10月
      })

      // 変更後の値確認
      expect(result.current.targetDate).toEqual(new Date(2022, 9, 1)) // 2022年10月
      expect(result.current.targetMonthlyTotalAmount).toBe(300)
      expect(result.current.targetMonthlyIncomeData.map((item) => item.id)).toEqual([7])
      expect(result.current.targetMonthlyIncomeTotalAmount).toBe(300)
      expect(result.current.targetMonthlyExpenseData).toEqual([])
      expect(result.current.targetMonthlyExpenseTotalAmount).toBe(0)
    })
  })

  it('dataがない場合、データー配列は[]、合計は0を返す', () => {
    useGetMoneyFlowsQuerySpy.mockReturnValue({
      data: undefined,
    } as UseQueryResult<moneyFlowData[]>)

    const { result } = customRenderHook(() => useMoneyFlowsHandler())

    expect(result.current.targetMonthlyTotalAmount).toBe(0)
    expect(result.current.targetMonthlyIncomeData).toEqual([])
    expect(result.current.targetMonthlyIncomeTotalAmount).toBe(0)
    expect(result.current.targetMonthlyExpenseData).toEqual([])
    expect(result.current.targetMonthlyExpenseTotalAmount).toBe(0)
  })
})
