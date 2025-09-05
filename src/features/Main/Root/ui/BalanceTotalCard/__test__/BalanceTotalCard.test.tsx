import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { BalanceTotalCard } from '@/features/Main/Root/ui/BalanceTotalCard/BalanceTotalCard'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

const mockData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle1',
    amount: 20,
    occurred_date: '2025-09-01T12:00:00Z',
    kind: 'income',
  },
  {
    id: 2,
    title: 'mockTitle2',
    amount: 1,
    occurred_date: '2025-09-01T12:00:00Z',
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

describe('BalanceTotalCard', () => {
  describe('正常系', () => {
    it('年月ラベルと収支の合計を表示する（カンマ無しの小さい金額）', () => {
      customRender(<BalanceTotalCard {...defaultProps} />)

      expect(screen.getByText('2025年9月 収支合計額')).toBeInTheDocument()
      expect(screen.getByText('19円')).toBeInTheDocument() // 20 - 1
    })
  })

  it('大きい金額はカンマ区切りで表示される', () => {
    const mockBigAmountData: moneyFlowData[] = [
      {
        id: 1,
        title: 'mockTitle1',
        amount: 50000000,
        occurred_date: '2025-09-01T12:00:00Z',
        kind: 'income',
      },
      {
        id: 2,
        title: 'mockTitle2',
        amount: 200000,
        occurred_date: '2025-09-01T12:00:00Z',
        kind: 'expense',
      },
    ]
    const mockBigAmountProps = {
      ...defaultProps,
      items: mockBigAmountData,
    }

    customRender(<BalanceTotalCard {...mockBigAmountProps} />)

    expect(screen.getByText('49,800,000円')).toBeInTheDocument() // 5000000 - 200000
  })

  it('支出が収入を上回る場合がマイナス金額が表示される', () => {
    const mockNegativeAmountData: moneyFlowData[] = [
      {
        id: 1,
        title: 'mockTitle1',
        amount: 500,
        occurred_date: '2025-09-01T12:00:00Z',
        kind: 'income',
      },
      {
        id: 2,
        title: 'mockTitle2',
        amount: 30000,
        occurred_date: '2025-09-01T12:00:00Z',
        kind: 'expense',
      },
    ]
    const mockNegativeAmountProps = {
      ...defaultProps,
      items: mockNegativeAmountData,
    }

    customRender(<BalanceTotalCard {...mockNegativeAmountProps} />)

    expect(screen.getByText('-29,500円')).toBeInTheDocument() // 500 - 30000
  })
})
