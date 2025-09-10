import { act } from 'react'
import { describe, it, expect } from 'vitest'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useViewYearHandler } from '@/features/Main/Root/hooks/handlers/useViewYearHandler'

const mockCurrentMonth = new Date(2025, 8, 1)

describe('useViewYearHandler', () => {
  describe('正常系', () => {
    it('初期値はcurrentMonthの年になる', () => {
      const { result } = customRenderHook(() => useViewYearHandler(mockCurrentMonth))

      expect(result.current.viewYear).toBe(2025)
    })

    it('onViewPrevYearによりcurrentMonthの前年になる', () => {
      const { result } = customRenderHook(() => useViewYearHandler(mockCurrentMonth))

      act(() => {
        result.current.onViewPrevYear()
      })

      expect(result.current.viewYear).toBe(2024)
    })

    it('onViewNextYearによりcurrentMonthの翌年になる', () => {
      const { result } = customRenderHook(() => useViewYearHandler(mockCurrentMonth))

      act(() => {
        result.current.onViewNextYear()
      })

      expect(result.current.viewYear).toBe(2026)
    })
  })
})
