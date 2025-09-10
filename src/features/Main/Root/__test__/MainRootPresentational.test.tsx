import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import * as IncomeTableCard from '@/features/Main/Root/ui/IncomeTableCard/IncomeTableCard'
import * as ExpensesTableCard from '@/features/Main/Root/ui/ExpensesTableCard/ExpensesTableCard'
import * as BalanceTotalCard from '@/features/Main/Root/ui/BalanceTotalCard/BalanceTotalCard'
import * as MonthPicker from '@/features/Main/Root/ui/MonthPickerCard/MonthPickerCard'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

const mockData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle1',
    amount: 100,
    occurred_date: '2025-09-05T12:00:00Z',
    kind: 'income',
  },
  {
    id: 2,
    title: 'mockTitle2',
    amount: 200,
    occurred_date: '2025-09-05T12:00:00Z',
    kind: 'expense',
  },
]
const mockYearAndMonthLabel = '2025年9月'
const mockGoToMonth = vi.fn()
const mockCurrentMonth = new Date(2025, 8, 5)
const mockViewYear = 2025
const mockOnViewPrevYear = vi.fn()
const mockOnViewNextYear = vi.fn()
const defaultProps = {
  monthlyItems: mockData,
  yearAndMonthLabel: mockYearAndMonthLabel,
  onChangeMonth: mockGoToMonth,
  currentYear: mockCurrentMonth.getFullYear(),
  currentMonth: mockCurrentMonth.getMonth(),
  viewYear: mockViewYear,
  onViewPrevYear: mockOnViewPrevYear,
  onViewNextYear: mockOnViewNextYear,
}
const noDataInformation =
  /選択した年月は収入・支出ともに登録がありません。\s画面右上に表示されている「収支を登録する」ボタンから登録してください。\s登録後こちらに一覧が表示されます。/

// Mocking the IncomeTableCard component
vi.spyOn(IncomeTableCard, 'IncomeTableCard').mockImplementation(() => {
  return <div data-testid='mock-incomeTableCard'>Mocked IncomeTableCard</div>
})

// Mocking the ExpensesTableCard component
vi.spyOn(ExpensesTableCard, 'ExpensesTableCard').mockImplementation(() => {
  return <div data-testid='mock-expensesTableCard'>Mocked ExpensesTableCard</div>
})

// Mocking the BalanceTotalCard component
vi.spyOn(BalanceTotalCard, 'BalanceTotalCard').mockImplementation(() => {
  return <div data-testid='mock-balanceTotalCard'>Mocked BalanceTotalCard</div>
})

// Mocking the MonthPickerCard component
vi.spyOn(MonthPicker, 'MonthPickerCard').mockImplementation(() => {
  return <div data-testid='mock-monthPickerCard'>Mocked MonthPickerCard</div>
})

describe('MainRootPresentational', () => {
  describe('正常系', () => {
    it('データが登録されていない月を表示した場合、データがない場合の案内とが表示される', () => {
      const noDataProps = {
        ...defaultProps,
        monthlyItems: [],
      }

      customRender(<MainRootPresentational {...noDataProps} />)

      expect(screen.getByText(noDataInformation)).toBeInTheDocument()
    })

    it('収入データが登録されている場合、適切なpropsでIncomeTableCardコンポーネントが表示される', () => {
      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByTestId('mock-incomeTableCard')).toBeInTheDocument()
    })

    it('支出データが登録されている場合、適切なpropsでExpensesTableCardコンポーネントが表示される', () => {
      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByTestId('mock-expensesTableCard')).toBeInTheDocument()
    })

    it('データが登録されている場合、適切なpropsでBalanceTotalCardコンポーネントが表示される', () => {
      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByTestId('mock-balanceTotalCard')).toBeInTheDocument()
    })

    it('適切なpropsでMonthPickerCardコンポーネントが表示される', () => {
      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByTestId('mock-monthPickerCard')).toBeInTheDocument()
    })
  })
})
