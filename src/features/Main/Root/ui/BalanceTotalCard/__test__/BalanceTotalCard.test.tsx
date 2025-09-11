import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { BalanceTotalCard } from '@/features/Main/Root/ui/BalanceTotalCard/BalanceTotalCard'

const mockTargetDate = new Date('2025-09-01T12:00:00Z')
const mockTargetMonthlyTotalAmount = 20
const defaultProps = {
  targetDate: mockTargetDate,
  targetMonthlyTotalAmount: mockTargetMonthlyTotalAmount,
}

describe('BalanceTotalCard', () => {
  describe('正常系', () => {
    it('年月ラベルと収支の合計を表示する（カンマ無しの小さい金額）', () => {
      customRender(<BalanceTotalCard {...defaultProps} />)

      expect(screen.getByText('2025年9月 収支合計額')).toBeInTheDocument()
      expect(screen.getByText('20円')).toBeInTheDocument()
    })
  })

  it('大きい金額はカンマ区切りで表示される', () => {
    const mockTargetMonthlyTotalAmount = 4000
    const mockBigAmountProps = {
      ...defaultProps,
      targetMonthlyTotalAmount: mockTargetMonthlyTotalAmount,
    }

    customRender(<BalanceTotalCard {...mockBigAmountProps} />)

    expect(screen.getByText('4,000円')).toBeInTheDocument() // 5000000 - 200000
  })

  it('支出が収入を上回る場合がマイナス金額が表示される', () => {
    const mockTargetMonthlyTotalAmount = -20
    const mockNegativeAmountProps = {
      ...defaultProps,
      targetMonthlyTotalAmount: mockTargetMonthlyTotalAmount,
    }

    customRender(<BalanceTotalCard {...mockNegativeAmountProps} />)

    expect(screen.getByText('-20円')).toBeInTheDocument()
  })
})
