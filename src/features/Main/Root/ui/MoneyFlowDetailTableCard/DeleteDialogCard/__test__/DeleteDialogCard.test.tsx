import { describe, it, vi, expect, beforeEach } from 'vitest'
import { act } from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { toaster } from '@/share/lib/createToaster'

import { customRender } from '@/tests/helpers/customRender'
import { DeleteDialogCard } from '@/features/Main/Root/ui/MoneyFlowDetailTableCard/DeleteDialogCard/DeleteDialogCard'
import { type DeleteMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

const mockId = 1
const mockTitle = 'お米'
const mockAmount = 4200
const mocktargetOccurredDate = new Date('2025-09-01')
const mockKind = 'expense'
const mockData: moneyFlowData = {
  id: mockId,
  title: mockTitle,
  amount: mockAmount,
  occurred_date: mocktargetOccurredDate,
  kind: mockKind,
}
const mockHandleDeleteMoneyFlow = vi.fn()
const mockIsDeleteDialogOpen = false
const mockOnDeleteDialogOpenChange = vi.fn()
const mockDeleteId: number | null = mockId
const mockOnClickDeleteDialog = vi.fn()
const mockOnCloseDeleteDialog = vi.fn()
const defaultProps = {
  item: mockData,
  handleDeleteMoneyFlow: mockHandleDeleteMoneyFlow,
  isDeleteDialogOpen: mockIsDeleteDialogOpen,
  onDeleteDialogOpenChange: mockOnDeleteDialogOpenChange,
  deleteId: mockDeleteId,
  onClickDeleteDialog: mockOnClickDeleteDialog,
  onCloseDeleteDialog: mockOnCloseDeleteDialog,
}

const mockDeleteMoneyFlowRequest: DeleteMoneyFlowRequest = {
  id: mockId,
}

const openDialogProps = {
  ...defaultProps,
  isDeleteDialogOpen: true,
}

const mockFailingHandleDeleteMoneyFlow = vi.fn(() => {
  throw new Error('データ削除失敗')
})
const mockFailingProps = {
  ...defaultProps,
  isDeleteDialogOpen: true,
  handleDeleteMoneyFlow: mockFailingHandleDeleteMoneyFlow,
}

// Mocking the toaster
const mockToasterCreate = toaster.create
vi.mock('@/share/lib/createToaster', () => ({
  toaster: { create: vi.fn() },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('DeleteDialogCard', () => {
  describe('正常系', () => {
    it('収支削除ダイアログ上に表示されるべきテキストが表示される', () => {
      customRender(<DeleteDialogCard {...openDialogProps} />)

      expect(screen.getByText('以下の登録を削除しますか？')).toBeInTheDocument()
      expect(screen.getByText('収支種別')).toBeInTheDocument()
      expect(screen.getByText('発生日')).toBeInTheDocument()
      expect(screen.getByText('タイトル')).toBeInTheDocument()
      expect(screen.getByText('金額')).toBeInTheDocument()
      expect(screen.getByText('削除')).toBeInTheDocument()
      expect(screen.getByText('戻る')).toBeInTheDocument()
    })

    it('収支削除ダイアログ上に選択したitemの登録内容(収支種別/発生日/タイトル/金額)がセットされている', () => {
      customRender(<DeleteDialogCard {...openDialogProps} />)

      expect(screen.getByText('支出')).toBeInTheDocument()
      expect(screen.getByText('2025年9月1日')).toBeInTheDocument()
      expect(screen.getByText('お米')).toBeInTheDocument()
      expect(screen.getByText('4,200円')).toBeInTheDocument()
    })

    it('削除アイコンをクリックするとonDeleteDialogOpenChange内の関数が正しく発火する', async () => {
      customRender(<DeleteDialogCard {...defaultProps} />)

      act(() => {
        fireEvent.click(screen.getByTestId('delete-dialog-trigger'))
      })

      await waitFor(() => {
        expect(mockOnDeleteDialogOpenChange).toHaveBeenCalledTimes(1)
        expect(mockOnDeleteDialogOpenChange).toHaveBeenCalledWith(true)
        expect(mockOnClickDeleteDialog).toHaveBeenCalledTimes(1)
        expect(mockOnClickDeleteDialog).toHaveBeenCalledWith(1)
      })
    })

    it('削除ボタンをクリックすると、handleDeleteMoneyFlowに正しくリクエストが渡る', () => {
      customRender(<DeleteDialogCard {...openDialogProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '削除' }))
      })

      expect(mockHandleDeleteMoneyFlow).toHaveBeenCalledTimes(1)
      expect(mockHandleDeleteMoneyFlow).toHaveBeenCalledWith(mockDeleteMoneyFlowRequest)
    })

    it('削除が成功した場合、トーストを表示する関数が実行される', () => {
      customRender(<DeleteDialogCard {...openDialogProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '削除' }))
      })

      expect(mockHandleDeleteMoneyFlow).toHaveBeenCalledWith(mockDeleteMoneyFlowRequest)

      const updateSuccessMessage = `「【種別】支出【発生日】2025年9月1日【タイトル】${mockTitle}【金額】${mockAmount.toLocaleString('ja-JP')}円」を削除しました。`
      expect(mockToasterCreate).toHaveBeenCalledWith({
        description: updateSuccessMessage,
        type: 'success',
      })
    })

    it('削除が失敗した場合、トーストを表示する関数が実行される', () => {
      customRender(<DeleteDialogCard {...mockFailingProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '削除' }))
      })

      expect(mockFailingHandleDeleteMoneyFlow).toHaveBeenCalledTimes(1)

      expect(mockToasterCreate).toHaveBeenCalledWith({
        title: 'データの削除に失敗しました。',
        description: 'データ削除失敗',
        type: 'error',
      })
    })
  })
})
