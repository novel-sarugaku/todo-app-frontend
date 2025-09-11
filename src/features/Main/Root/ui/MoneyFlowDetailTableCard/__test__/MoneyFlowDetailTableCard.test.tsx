import { describe, it, expect } from 'vitest'
import { screen, within } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { MoneyFlowDetailTableCard } from '@/features/Main/Root/ui/MoneyFlowDetailTableCard/MoneyFlowDetailTableCard'
import { type moneyFlowDateTypeData } from '@/features/Main/Root/types/moneyFlowData'
import { type Kind } from '@/models/constants/kind'

const mockTitle1 = 'mockTitle1'
const mockTitle2 = 'mockTitle2'
const mockOccurredDate1 = new Date('2025-09-02T12:00:00Z')
const mockOccurredDate2 = new Date('2025-09-05T12:00:00Z')
const mockKind = 'income'
const mockData: moneyFlowDateTypeData[] = [
  {
    id: 1,
    title: mockTitle1,
    amount: 1000000000,
    occurred_date: mockOccurredDate1,
    kind: mockKind,
  },
  {
    id: 2,
    title: mockTitle2,
    amount: 1,
    occurred_date: mockOccurredDate2,
    kind: mockKind,
  },
]
const mockTotalAmount = 50200000
const mockKindFlag = 'income' as Kind
const defaultProps = {
  items: mockData,
  totalAmount: mockTotalAmount,
  kindFlag: mockKindFlag,
}

describe('ExpensesTableCard', () => {
  describe('正常系', () => {
    it('テーブルヘッダー内容とデータが正しく表示される', () => {
      customRender(<MoneyFlowDetailTableCard {...defaultProps} />)

      expect(screen.getByText('2025年9月合計収入額')).toBeInTheDocument()
      expect(screen.getByText('50,200,000円')).toBeInTheDocument()

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
      expect(within(dataRows[0]).getByText('2025年9月2日')).toBeInTheDocument()
      expect(within(dataRows[0]).getByText(mockTitle1)).toBeInTheDocument()
      expect(within(dataRows[0]).getByText('1,000,000,000円')).toBeInTheDocument()
      // データ2行目
      expect(within(dataRows[1]).getByText('2025年9月5日')).toBeInTheDocument()
      expect(within(dataRows[1]).getByText(mockTitle2)).toBeInTheDocument()
      expect(within(dataRows[1]).getByText('1円')).toBeInTheDocument()
    })
  })
})
