import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { MainRootContainer } from '@/features/Main/Root/MainRootContainer'
import * as Presentational from '@/features/Main/Root/MainRootPresentational'
import * as moneyFlowsHandler from '@/features/Main/Root/hooks/handlers/useMoneyFlowsHandler'
import * as viewYearHandler from '@/features/Main/Root/hooks/handlers/useViewYearHandler'
import { type moneyFlowDateTypeData } from '@/features/Main/Root/types/moneyFlowData'

// Mocking the ResultIdPresentational component
const PresentationalSpy = vi
  .spyOn(Presentational, 'MainRootPresentational')
  .mockImplementation(() => {
    return <div data-testid='mock-presentational'>Mocked MainRootPresentational</div>
  })

// Mocking the useMoneyFlowListHandle hook
const mockData: moneyFlowDateTypeData[] = [
  {
    id: 1,
    title: 'mockTitle',
    amount: 100,
    occurred_date: new Date('2025-09-05T12:00:00Z'),
    kind: 'income',
  },
]

// Mocking the useMoneyFlowsHandler hoostk
const mockTargetDate = new Date('2025-09-01T12:00:00Z')
const mockTargetMonthlyTotalAmount = 2500
const mockTargetMonthlyIncomeData = mockData
const mockTargetMonthlyIncomeTotalAmount = 4000
const mockTargetMonthlyExpenseData = mockData
const mockTargetMonthlyExpenseTotalAmount = 1500
const mockoOnSubmitTargetDate = vi.fn()
vi.spyOn(moneyFlowsHandler, 'useMoneyFlowsHandler').mockReturnValue({
  targetDate: mockTargetDate,
  targetMonthlyTotalAmount: mockTargetMonthlyTotalAmount,
  targetMonthlyIncomeData: mockTargetMonthlyIncomeData,
  targetMonthlyIncomeTotalAmount: mockTargetMonthlyIncomeTotalAmount,
  targetMonthlyExpenseData: mockTargetMonthlyExpenseData,
  targetMonthlyExpenseTotalAmount: mockTargetMonthlyExpenseTotalAmount,
  onSubmitTargetDate: mockoOnSubmitTargetDate,
})

// Mocking the useViewYearHandler hook
const mockViewYear = 2025
const mockOnViewPrevYea = vi.fn()
const mockOnViewNextYear = vi.fn()
vi.spyOn(viewYearHandler, 'useViewYearHandler').mockReturnValue({
  viewYear: mockViewYear,
  onViewPrevYear: mockOnViewPrevYea,
  onViewNextYear: mockOnViewNextYear,
})

describe('MainRootContainer', () => {
  describe('正常系', () => {
    it('MainRootPresentationalに正しいpropsが渡される', () => {
      customRender(<MainRootContainer />)

      expect(screen.getByTestId('mock-presentational')).toBeInTheDocument()

      expect(PresentationalSpy.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          targetDate: mockTargetDate,
          targetMonthlyIncomeData: mockTargetMonthlyIncomeData,
          targetMonthlyIncomeTotalAmount: mockTargetMonthlyIncomeTotalAmount,
          targetMonthlyExpenseData: mockTargetMonthlyExpenseData,
          targetMonthlyExpenseTotalAmount: mockTargetMonthlyExpenseTotalAmount,
          onSubmitTargetDate: mockoOnSubmitTargetDate,
          viewYear: mockViewYear,
          onViewPrevYear: mockOnViewPrevYea,
          onViewNextYear: mockOnViewNextYear,
          targetMonthlyTotalAmount: mockTargetMonthlyTotalAmount,
        }),
      )
    })
  })
})
