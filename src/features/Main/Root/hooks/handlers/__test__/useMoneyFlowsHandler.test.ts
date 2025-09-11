import { describe, it, expect, vi } from 'vitest'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useMoneyFlowsHandler } from '@/features/Main/Root/hooks/handlers/useMoneyFlowsHandler'
import * as getMoneyFlowsQuery from '@/features/Main/Root/hooks/queries/useGetMoneyFlowsQuery'
import type { UseQueryResult } from '@tanstack/react-query'
import type { moneyFlowDateTypeData } from '@/features/Main/Root/types/moneyFlowData'

// Mocking the useGetMoneyFlowsQuer hook
const useGetMoneyFlowsQuerySpy = vi.spyOn(getMoneyFlowsQuery, 'useGetMoneyFlowsQuery')

describe('useMoneyFlowsHandler', () => {
  describe('正常系', () => {
    it('dataがない場合、データー配列は[]、合計は0を返す', () => {
      useGetMoneyFlowsQuerySpy.mockReturnValue({
        data: undefined,
      } as UseQueryResult<moneyFlowDateTypeData[]>)

      const { result } = customRenderHook(() => useMoneyFlowsHandler())

      expect(result.current.targetMonthlyIncomeData).toEqual([])
      expect(result.current.targetMonthlyExpenseData).toEqual([])
      expect(result.current.targetMonthlyIncomeTotalAmount).toBe(0)
      expect(result.current.targetMonthlyExpenseTotalAmount).toBe(0)
      expect(result.current.targetMonthlyTotalAmount).toBe(0)
    })

    it('初期値は現在の月になる', () => {
      // 現在時刻を固定する
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2025, 8, 1))

      useGetMoneyFlowsQuerySpy.mockReturnValue({
        data: undefined,
      } as UseQueryResult<moneyFlowDateTypeData[]>)

      const { result } = customRenderHook(() => useMoneyFlowsHandler())

      expect(result.current.targetDate.getFullYear()).toBe(2025)
      expect(result.current.targetDate.getMonth()).toBe(8) // 9月
    })

    it('同月のデータのみが集計され、収支合計が正しく計算される', () => {})

    it('onSubmitTargetDateで月を変更すると、その月のデータで集計される', () => {})
  })
})
