import { describe, it, expect } from 'vitest'
import { act } from 'react'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useMonthNavigationHandler } from '@/features/Main/Root/hooks/handlers/useMonthNavigationHandler'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

const mockMoneyFlowData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle1',
    amount: 550,
    occurred_date: '2025-08-02T12:00:00Z',
    kind: 'income',
  },
]

describe('useState', () => {
  describe('正常系', () => {
    it('初期値は、occurred_dateが最新日の「その月の1日」となる', () => {
      const { result } = customRenderHook(() => useMonthNavigationHandler(mockMoneyFlowData))

      expect(result.current.currentMonth.getFullYear()).toBe(2025)
      expect(result.current.currentMonth.getMonth()).toBe(7)
      expect(result.current.currentMonth.getDate()).toBe(1)
    })
  })
})

describe('goPrevMonth', () => {
  describe('正常系', () => {
    it('goPrevMonth()が呼ばれると、基準月からその前月に更新される', () => {
      const { result } = customRenderHook(() => useMonthNavigationHandler(mockMoneyFlowData)) // 8月

      act(() => {
        result.current.goPrevMonth()
      })

      expect(result.current.currentMonth.getFullYear()).toBe(2025)
      expect(result.current.currentMonth.getMonth()).toBe(6) // 7月
      expect(result.current.currentMonth.getDate()).toBe(1)
    })
  })
})

describe('goNextMonth', () => {
  describe('正常系', () => {
    it('goNextMonth()が呼ばれると、基準月からその翌月に更新される', () => {
      const { result } = customRenderHook(() => useMonthNavigationHandler(mockMoneyFlowData)) // 8月

      act(() => {
        result.current.goNextMonth()
      })

      expect(result.current.currentMonth.getFullYear()).toBe(2025)
      expect(result.current.currentMonth.getMonth()).toBe(8) // 9月
      expect(result.current.currentMonth.getDate()).toBe(1)
    })
  })
})
