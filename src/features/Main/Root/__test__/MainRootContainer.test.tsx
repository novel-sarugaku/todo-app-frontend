import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { MainRootContainer } from '@/features/Main/Root/MainRootContainer'
import * as Presentational from '@/features/Main/Root/MainRootPresentational'
import * as moneyFlowListHandler from '@/features/Main/Root/hooks/handlers/useMoneyFlowListHandler'
import * as monthNavigationHandler from '@/features/Main/Root/hooks/handlers/useMonthNavigationHandler'
import * as filterHandlers from '@/features/Main/Root/hooks/handlers/filterHandlers'
import * as labelHandlers from '@/features/Main/Root/hooks/handlers/labelHandlers'
import * as viewYearHandler from '@/features/Main/Root/hooks/handlers/useViewYearHandler'
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
const mockCurrentMonth = new Date(2025, 8, 5)
const mockGoToMonth = vi.fn()
vi.spyOn(monthNavigationHandler, 'useMonthNavigationHandler').mockReturnValue({
  currentMonth: mockCurrentMonth,
  goToMonth: mockGoToMonth,
} as unknown as ReturnType<typeof monthNavigationHandler.useMonthNavigationHandler>)

// Mocking the filterByMonth hook
const mockMonthlyItems = mockData
vi.spyOn(filterHandlers, 'filterByMonth').mockReturnValue(mockMonthlyItems)

// Mocking the buildYearMonthLabelFromItems hook
const mockYearAndMonthLabel = '2025年9月'
vi.spyOn(labelHandlers, 'buildYearMonthLabelFromItems').mockReturnValue(mockYearAndMonthLabel)

// Mocking the useViewYearHandler hook
const mockViewYear = 2025
const mockOnViewPrevYea = vi.fn()
const mockOnViewNextYear = vi.fn()
const mockSetViewYear = vi.fn()
vi.spyOn(viewYearHandler, 'useViewYearHandler').mockReturnValue({
  viewYear: mockViewYear,
  onViewPrevYear: mockOnViewPrevYea,
  onViewNextYear: mockOnViewNextYear,
  setViewYear: mockSetViewYear,
})

describe('MainRootContainer', () => {
  describe('正常系', () => {
    it('MainRootPresentationalに正しいpropsが渡される', () => {
      customRender(<MainRootContainer />)

      expect(screen.getByTestId('mock-presentational')).toBeInTheDocument()

      expect(PresentationalSpy.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          monthlyItems: mockMonthlyItems,
          yearAndMonthLabel: mockYearAndMonthLabel,
          onChangeMonth: mockGoToMonth,
          currentYear: mockCurrentMonth.getFullYear(),
          currentMonth: mockCurrentMonth.getMonth(),
          viewYear: mockViewYear,
          onViewPrevYear: mockOnViewPrevYea,
          onViewNextYear: mockOnViewNextYear,
        }),
      )
    })
  })
})
