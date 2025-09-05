import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import * as IncomeTableCard from '@/features/Main/Root/ui/IncomeTableCard/IncomeTableCard'
import * as ExpensesTableCard from '@/features/Main/Root/ui/ExpensesTableCard/ExpensesTableCard'
import * as BalanceTotalCard from '@/features/Main/Root/ui/BalanceTotalCard/BalanceTotalCard'
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
const mockCurrentMonth = new Date(2025, 8, 1)
const mockGoPrev = vi.fn()
const mockGoNext = vi.fn()
const defaultProps = {
  items: mockData,
  currentMonth: mockCurrentMonth,
  onPrevMonth: mockGoPrev,
  onNextMonth: mockGoNext,
}
const noDataInformation =
  /選択した年月は収入・支出ともに登録がありません。\s画面右上に表示されている「収支を登録する」ボタンから登録してください。\s登録後こちらに一覧が表示されます。/

describe('MainRootPresentational', () => {
  describe('正常系', () => {
    it('データが登録されていない月を表示した場合、データがない場合の案内と「< —年—月 >」が表示される', () => {
      const noDataProps = {
        ...defaultProps,
        items: [],
      }

      customRender(<MainRootPresentational {...noDataProps} />)

      expect(screen.getByText(noDataInformation)).toBeInTheDocument()
      expect(screen.getByText('—年—月')).toBeInTheDocument()
      expect(screen.getByTestId('prev-icon')).toBeInTheDocument()
      expect(screen.getByTestId('next-icon')).toBeInTheDocument()
    })

    it('データが登録されている月を表示した場合、「< 2025年9月 >」が表示される', () => {
      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByText('2025年9月')).toBeInTheDocument()
      expect(screen.getByTestId('prev-icon')).toBeInTheDocument()
      expect(screen.getByTestId('next-icon')).toBeInTheDocument()
    })

    it('収入データが登録されている場合、適切なpropsでIncomeTableCardコンポーネントが表示される', () => {
      vi.spyOn(IncomeTableCard, 'IncomeTableCard').mockImplementation(() => {
        return <div data-testid='mock-incomeTableCard'>Mocked IncomeTableCard</div>
      })

      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByTestId('mock-incomeTableCard')).toBeInTheDocument()
    })

    it('支出データが登録されている場合、適切なpropsでExpensesTableCardコンポーネントが表示される', () => {
      vi.spyOn(ExpensesTableCard, 'ExpensesTableCard').mockImplementation(() => {
        return <div data-testid='mock-expensesTableCard'>Mocked ExpensesTableCard</div>
      })

      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByTestId('mock-expensesTableCard')).toBeInTheDocument()
    })

    it('データが登録されている場合、適切なpropsでBalanceTotalCardコンポーネントが表示される', () => {
      vi.spyOn(BalanceTotalCard, 'BalanceTotalCard').mockImplementation(() => {
        return <div data-testid='mock-balanceTotalCard'>Mocked BalanceTotalCard</div>
      })

      customRender(<MainRootPresentational {...defaultProps} />)

      expect(screen.getByTestId('mock-balanceTotalCard')).toBeInTheDocument()
    })
  })
})
