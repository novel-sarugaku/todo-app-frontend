import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { MainRootContainer } from '@/features/Main/Root/MainRootContainer'
import * as Presentational from '@/features/Main/Root/MainRootPresentational'
import * as moneyFlowListHandler from '@/features/Main/Root/hooks/handlers/useMoneyFlowListHandler'
import * as monthNavigationHandler from '@/features/Main/Root/hooks/handlers/useMonthNavigationHandler'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

// Mocking the ResultIdPresentational component
const PresentationalSpy = vi
  .spyOn(Presentational, 'MainRootPresentational')
  .mockImplementation(() => {
    return <div data-testid='mock-presentational'>Mocked MainRootPresentational</div>
  })

// Mocking the useMoneyFlowListHandle hook
const mockData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle',
    amount: 100,
    occurred_date: '2025-09-05T12:00:00Z',
    kind: 'income',
  },
]
vi.spyOn(moneyFlowListHandler, 'useMoneyFlowListHandler').mockReturnValue({
  data: mockData,
})

// Mocking the useMonthNavigationHandler hook
const mockCurrentMonth = new Date(2025, 8, 1)
const mockGoPrev = vi.fn()
const mockGoNext = vi.fn()
vi.spyOn(monthNavigationHandler, 'useMonthNavigationHandler').mockReturnValue({
  currentMonth: mockCurrentMonth,
  goPrevMonth: mockGoPrev,
  goNextMonth: mockGoNext,
})

describe('MainRootContainer', () => {
  describe('正常系', () => {
    it('MainRootPresentationalに正しいpropsが渡される', () => {
      customRender(<MainRootContainer />)

      expect(screen.getByTestId('mock-presentational')).toBeInTheDocument()

      expect(PresentationalSpy.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          items: mockData,
          currentMonth: mockCurrentMonth,
          onPrevMonth: mockGoPrev,
          onNextMonth: mockGoNext,
        }),
      )
    })
  })
})
