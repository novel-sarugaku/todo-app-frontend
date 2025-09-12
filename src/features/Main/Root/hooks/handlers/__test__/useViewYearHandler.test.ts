import { act } from 'react'
import { describe, it, expect } from 'vitest'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useViewYearHandler } from '@/features/Main/Root/hooks/handlers/useViewYearHandler'

const mockTargetMonth = new Date(2025, 8, 1)

describe('useViewYearHandler', () => {
  describe('正常系', () => {
    it('viewYearの初期値は引数:targetMonthの年になる', () => {
      const { result } = customRenderHook(() => useViewYearHandler(mockTargetMonth))

      expect(result.current.viewYear).toBe(2025)
    })

    it('onViewPrevYearの発火によりviewYearはtargetMonthの前年になる', () => {
      const { result } = customRenderHook(() => useViewYearHandler(mockTargetMonth))

      act(() => {
        result.current.onViewPrevYear()
      })

      expect(result.current.viewYear).toBe(2024)
    })

    it('onViewNextYearの発火によりviewYearはtargetMonthの翌年になる', () => {
      const { result } = customRenderHook(() => useViewYearHandler(mockTargetMonth))

      act(() => {
        result.current.onViewNextYear()
      })

      expect(result.current.viewYear).toBe(2026)
    })
  })
})
