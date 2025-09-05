import { describe, it, expect, vi } from 'vitest'
import { screen, within } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { IncomeTableCard } from '@/features/Main/Root/ui/IncomeTableCard/IncomeTableCard'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

const mockId1 = 1
const mockId2 = 2
const mockTitle1 = 'mockTitle1'
const mockTitle2 = 'mockTitle2'
const mockOccurredDate1 = '2025-09-02T12:00:00Z'
const mockOccurredDate2 = '2025-09-05T12:00:00Z'
const mockKind = 'income'
const mockData: moneyFlowData[] = [
  {
    id: mockId1,
    title: mockTitle1,
    amount: 20,
    occurred_date: mockOccurredDate1,
    kind: mockKind,
  },
  {
    id: mockId2,
    title: mockTitle2,
    amount: 1,
    occurred_date: mockOccurredDate2,
    kind: mockKind,
  },
]
const mockCurrentMonth = new Date(2025, 8, 10)
const mockGoPrev = vi.fn()
const mockGoNext = vi.fn()
const defaultProps = {
  items: mockData,
  currentMonth: mockCurrentMonth,
  onPrevMonth: mockGoPrev,
  onNextMonth: mockGoNext,
}

describe('IncomeTableCard', () => {
  describe('正常系', () => {
    it('合計ヘッダー内容と収入の合計額が正しく表示される（カンマ無しの小さい金額）', () => {
      customRender(<IncomeTableCard {...defaultProps} />)

      expect(screen.getByText('2025年9月 合計収入額')).toBeInTheDocument()
      expect(screen.getByText('21円')).toBeInTheDocument() // 20 + 1
    })
    it('大きい金額はカンマ区切りで表示される', () => {
      const mockBigAmountData: moneyFlowData[] = [
        {
          id: mockId1,
          title: mockTitle1,
          amount: 50000000,
          occurred_date: mockOccurredDate1,
          kind: mockKind,
        },
        {
          id: mockId2,
          title: mockTitle2,
          amount: 200000,
          occurred_date: mockOccurredDate2,
          kind: mockKind,
        },
      ]
      const mockBigAmountProps = {
        ...defaultProps,
        items: mockBigAmountData,
      }

      customRender(<IncomeTableCard {...mockBigAmountProps} />)

      expect(screen.getByText('50,200,000円')).toBeInTheDocument() // 5000000 + 200000
    })

    it('一覧テーブルのヘッダー内容と収入データが日付降順で正しく表示される', () => {
      customRender(<IncomeTableCard {...defaultProps} />)

      // 2つあるテーブル（合計と一覧）から「一覧テーブル」を抽出
      const tables = screen.getAllByRole('table')
      const listTable = tables[1] // 0: 合計テーブル, 1: 一覧テーブル

      // 一覧テーブル内のヘッダー行を確認
      const headerRow = within(listTable).getByRole('row', {
        // within：()の中を検索対象にする
        name: /収入日 タイトル 金額 編集 削除/,
      })
      expect(headerRow).toBeInTheDocument()

      // 一覧テーブル内のデータ行を確認
      const rowsInList = within(listTable).getAllByRole('row')
      const dataRows = rowsInList.slice(1) // ヘッダー行をスキップして残りのデータ行を抽出
      // データ1行目(最新)
      expect(within(dataRows[0]).getByText('2025年9月5日')).toBeInTheDocument()
      expect(within(dataRows[0]).getByText(mockTitle2)).toBeInTheDocument()
      expect(within(dataRows[0]).getByText('1円')).toBeInTheDocument()
      // データ2行目
      expect(within(dataRows[1]).getByText('2025年9月2日')).toBeInTheDocument()
      expect(within(dataRows[1]).getByText(mockTitle1)).toBeInTheDocument()
      expect(within(dataRows[1]).getByText('20円')).toBeInTheDocument()
    })
  })
})
