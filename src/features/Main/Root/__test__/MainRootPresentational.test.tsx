import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import * as BalanceTotalCard from '@/features/Main/Root/ui/BalanceTotalCard/BalanceTotalCard'
import * as MoneyFlowDetailTableCard from '@/features/Main/Root/ui/MoneyFlowDetailTableCard/MoneyFlowDetailTableCard'
import * as MonthPickerCard from '@/features/Main/Root/ui/MonthPickerCard/MonthPickerCard'
import * as CreateDialogCard from '@/features/Main/Root/ui/CreateDialogCard/CreateDialogCard'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

const mockTargetDate = new Date('2025-09-01T12:00:00Z')
const mockData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle1',
    amount: 100,
    occurred_date: new Date('2025-09-05T12:00:00Z'),
    kind: 'income',
  },
  {
    id: 2,
    title: 'mockTitle2',
    amount: 200,
    occurred_date: new Date('2025-09-05T12:00:00Z'),
    kind: 'expense',
  },
]
const mockTargetMonthlyIncomeData = mockData
const mockTargetMonthlyIncomeTotalAmount = 4000
const mockTargetMonthlyExpenseData = mockData
const mockTargetMonthlyExpenseTotalAmount = 1500
const mockoOnSubmitTargetDate = vi.fn()
const mockViewYear = 2025
const mockOnViewPrevYear = vi.fn()
const mockOnViewNextYear = vi.fn()
const mockTargetMonthlyTotalAmount = 2500
const mockHandleCreateMoneyFlow = vi.fn()
const mockOnCheckedChange = vi.fn()
const mockIsIncome = false
const mockIsDialogOpen = true
const mockOnDialogOpenChange = vi.fn()
const mockJumpToMonthByOccurredDate = vi.fn()
const defaultProps = {
  targetDate: mockTargetDate,
  targetMonthlyIncomeData: mockTargetMonthlyIncomeData,
  targetMonthlyIncomeTotalAmount: mockTargetMonthlyIncomeTotalAmount,
  targetMonthlyExpenseData: mockTargetMonthlyExpenseData,
  targetMonthlyExpenseTotalAmount: mockTargetMonthlyExpenseTotalAmount,
  onSubmitTargetDate: mockoOnSubmitTargetDate,
  viewYear: mockViewYear,
  onViewPrevYear: mockOnViewPrevYear,
  onViewNextYear: mockOnViewNextYear,
  targetMonthlyTotalAmount: mockTargetMonthlyTotalAmount,
  handleCreateMoneyFlow: mockHandleCreateMoneyFlow,
  onCheckedChange: mockOnCheckedChange,
  isIncome: mockIsIncome,
  isDialogOpen: mockIsDialogOpen,
  onDialogOpenChange: mockOnDialogOpenChange,
  jumpToMonthByOccurredDate: mockJumpToMonthByOccurredDate,
}
const noDataInformation =
  /選択した年月は収入・支出ともに登録がありません。\s画面右上に表示されている「収支を登録する」ボタンから登録してください。\s登録後こちらに一覧が表示されます。/

// Mocking the BalanceTotalCard component
vi.spyOn(BalanceTotalCard, 'BalanceTotalCard').mockImplementation(() => {
  return <div data-testid='mock-balanceTotalCard'>Mocked BalanceTotalCard</div>
})

// Mocking the MoneyFlowDetailTableCard component
vi.spyOn(MoneyFlowDetailTableCard, 'MoneyFlowDetailTableCard').mockImplementation(() => {
  return <div data-testid='mock-moneyFlowDetailTableCard'>Mocked MoneyFlowDetailTableCard</div>
})

// Mocking the MonthPickerCard component
vi.spyOn(MonthPickerCard, 'MonthPickerCard').mockImplementation(() => {
  return <div data-testid='mock-monthPickerCard'>Mocked MonthPickerCard</div>
})

// Mocking the CreateDialogCard component
vi.spyOn(CreateDialogCard, 'CreateDialogCard').mockImplementation(() => {
  return <div data-testid='mock-createDialogCard'>Mocked CreateDialogCard</div>
})

describe('MainRootPresentational', () => {
  describe('正常系', () => {
    it('データが登録されていない月を表示した場合、データがない場合の案内が表示される', () => {
      const noDataProps = {
        ...defaultProps,
        targetMonthlyIncomeData: [],
        targetMonthlyExpenseData: [],
      }

      customRender(<MainRootPresentational {...noDataProps} />)

      expect(screen.getByText(noDataInformation)).toBeInTheDocument()
    })

    it('収支データが登録されている場合、適切なpropsでMoneyFlowDetailTableCardコンポーネントが表示される', () => {
      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getAllByTestId('mock-moneyFlowDetailTableCard')).toHaveLength(2)
    })

    it('データが登録されている場合、適切なpropsでBalanceTotalCardコンポーネントが表示される', () => {
      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByTestId('mock-balanceTotalCard')).toBeInTheDocument()
    })

    it('適切なpropsでMonthPickerCardコンポーネントが表示される', () => {
      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByTestId('mock-monthPickerCard')).toBeInTheDocument()
    })

     it('適切なpropsでCreateDialogCardコンポーネントが表示される', () => {
      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByTestId('mock-createDialogCard')).toBeInTheDocument()
    })
  })
})
