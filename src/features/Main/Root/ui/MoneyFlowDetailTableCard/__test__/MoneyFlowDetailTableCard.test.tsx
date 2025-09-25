import { describe, it, expect, vi } from 'vitest'
import { screen, within } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { MoneyFlowDetailTableCard } from '@/features/Main/Root/ui/MoneyFlowDetailTableCard/MoneyFlowDetailTableCard'
import * as UpdateDialogCard from '@/features/Main/Root/ui/MoneyFlowDetailTableCard/UpdateDialogCard/UpdateDialogCard'
import * as DeleteDialogCard from '@/features/Main/Root/ui/MoneyFlowDetailTableCard/DeleteDialogCard/DeleteDialogCard'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'
import { type Kind } from '@/models/constants/kind'

const mockOnSubmitTargetDate = vi.fn()
const mockTitle1 = 'mockTitle1'
const mockTitle2 = 'mockTitle2'
const mockOccurredDate1 = new Date('2025-09-02T12:00:00Z')
const mockOccurredDate2 = new Date('2025-09-05T12:00:00Z')
const mockKind = 'income'
const mockData: moneyFlowData[] = [
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
const mockHandleUpdateMoneyFlow = vi.fn()
const mockOnCheckedChangeForUpdate = vi.fn()
const mockIsIncomeForUpdate = false
const mockIsUpdateDialogOpen = false
const mockOnUpdateDialogOpenChange = vi.fn()
const mockUpDateId = 1
const mockOnClickUpdateDialog = vi.fn()
const mockOnCloseUpdateDialog = vi.fn()
const mockHandleDeleteMoneyFlow = vi.fn()
const mockIsDeleteDialogOpen = false
const mockOnDeleteDialogOpenChange = vi.fn()
const mockDeleteId: number | null = 1
const mockOnClickDeleteDialog = vi.fn()
const mockOnCloseDeleteDialog = vi.fn()
const defaultProps = {
  onSubmitTargetDate: mockOnSubmitTargetDate,
  items: mockData,
  totalAmount: mockTotalAmount,
  kindFlag: mockKindFlag,
  handleUpdateMoneyFlow: mockHandleUpdateMoneyFlow,
  onCheckedChangeForUpdate: mockOnCheckedChangeForUpdate,
  isIncomeForUpdate: mockIsIncomeForUpdate,
  isUpdateDialogOpen: mockIsUpdateDialogOpen,
  onUpdateDialogOpenChange: mockOnUpdateDialogOpenChange,
  upDateId: mockUpDateId,
  onClickUpdateDialog: mockOnClickUpdateDialog,
  onCloseUpdateDialog: mockOnCloseUpdateDialog,
  handleDeleteMoneyFlow: mockHandleDeleteMoneyFlow,
  isDeleteDialogOpen: mockIsDeleteDialogOpen,
  onDeleteDialogOpenChange: mockOnDeleteDialogOpenChange,
  deleteId: mockDeleteId,
  onClickDeleteDialog: mockOnClickDeleteDialog,
  onCloseDeleteDialog: mockOnCloseDeleteDialog,
}

const mockOnceData: moneyFlowData[] = [
  {
    id: 1,
    title: mockTitle1,
    amount: 1000000000,
    occurred_date: mockOccurredDate1,
    kind: mockKind,
  },
]
const onceDataProps = {
  ...defaultProps,
  items: mockOnceData,
}

// Mocking the UpdateDialogCard component
vi.spyOn(UpdateDialogCard, 'UpdateDialogCard').mockImplementation(() => {
  return <div data-testid='mock-updateDialogCard'>Mocked UpdateDialogCard</div>
})

// Mocking the DeleteDialogCard component
vi.spyOn(DeleteDialogCard, 'DeleteDialogCard').mockImplementation(() => {
  return <div data-testid='mock-deleteDialogCard'>Mocked DeleteDialogCard</div>
})

describe('MoneyFlowDetailTableCard', () => {
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

    it('適切なpropsでUpdateDialogCardコンポーネントが表示される', () => {
      customRender(<MoneyFlowDetailTableCard {...onceDataProps} />)

      expect(screen.getByTestId('mock-updateDialogCard')).toBeInTheDocument()
    })

    it('適切なpropsでDeleteDialogCardコンポーネントが表示される', () => {
      customRender(<MoneyFlowDetailTableCard {...onceDataProps} />)

      expect(screen.getByTestId('mock-deleteDialogCard')).toBeInTheDocument()
    })
  })
})
