import { describe, it, vi, expect, beforeEach } from 'vitest'
import { act } from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { toaster } from '@/share/lib/createToaster'

import { customRender } from '@/tests/helpers/customRender'
import { UpdateDialogCard } from '@/features/Main/Root/ui/UpdateDialogCard/UpdateDialogCard'
import { type UpdateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

// 編集内容
const mockUpdateId = 1
const mockUpdateTitle = 'お小遣い'
const mockUpdateAmount = 300
const mockUpdateOccurredDate = '2025-09-02'
const mocktargetUpdateOccurredDate = new Date(mockUpdateOccurredDate)
const mockUpdateKind = 'expense'
const mockUpdateMoneyFlowRequest: UpdateMoneyFlowRequest = {
  id: mockUpdateId,
  title: mockUpdateTitle,
  amount: mockUpdateAmount,
  occurred_date: mockUpdateOccurredDate,
  kind: mockUpdateKind,
}
const mockUpdateMoneyFlowRequestForIncome = {
  ...mockUpdateMoneyFlowRequest,
  kind: 'income',
}

// 既存の登録内容
const mockId = 1
const mockTitle = 'お米'
const mockAmount = 4200
const mockOccurredDate = '2025-09-01'
const mocktargetOccurredDate = new Date(mockOccurredDate)
const mockKind = 'expense'
const mockData: moneyFlowData = {
  id: mockId,
  title: mockTitle,
  amount: mockAmount,
  occurred_date: mocktargetOccurredDate,
  kind: mockKind,
}
const mockOnSubmitTargetDate = vi.fn()
const mockHandleUpdateMoneyFlow = vi.fn()
const mockOnCheckedChangeForUpdate = vi.fn()
const mockIsIncomeForUpdate = false
const mockIsUpdateDialogOpen = false
const mockOnUpdateDialogOpenChange = vi.fn()
const mockUpDateId: number | null = mockId
const mockOnClickUpdateDialog = vi.fn()
const mockOnCloseUpdateDialog = vi.fn()
const defaultProps = {
  item: mockData,
  onSubmitTargetDate: mockOnSubmitTargetDate,
  handleUpdateMoneyFlow: mockHandleUpdateMoneyFlow,
  onCheckedChangeForUpdate: mockOnCheckedChangeForUpdate,
  isIncomeForUpdate: mockIsIncomeForUpdate,
  isUpdateDialogOpen: mockIsUpdateDialogOpen,
  onUpdateDialogOpenChange: mockOnUpdateDialogOpenChange,
  upDateId: mockUpDateId,
  onClickUpdateDialog: mockOnClickUpdateDialog,
  onCloseUpdateDialog: mockOnCloseUpdateDialog,
}

const openDialogOpenProps = {
  ...defaultProps,
  isUpdateDialogOpen: true,
}

const openDialogIncomeProps = {
  ...defaultProps,
  isUpdateDialogOpen: true,
  isIncomeForUpdate: true,
}

const mockfailingHandleUpdateMoneyFlow = vi.fn(() => {
  throw new Error('データ編集失敗')
})
const mockfailingProps = {
  ...defaultProps,
  isUpdateDialogOpen: true,
  handleUpdateMoneyFlow: mockfailingHandleUpdateMoneyFlow,
}

// Mocking the toaster
const mockToasterCreate = toaster.create
vi.mock('@/share/lib/createToaster', () => ({
  toaster: { create: vi.fn() },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('UpdateDialogCard', () => {
  describe('正常系', () => {
    it('収支編集ダイアログ上に表示されるべきテキストが表示され、input要素にrequiredが存在する', () => {
      customRender(<UpdateDialogCard {...openDialogOpenProps} />)

      expect(screen.getByText('収支編集')).toBeInTheDocument()
      expect(screen.getByText('収支選択')).toBeInTheDocument()
      expect(screen.getByText('発生日')).toBeInTheDocument()
      expect(screen.getByText('タイトル')).toBeInTheDocument()
      expect(screen.getByText('金額')).toBeInTheDocument()
      expect(screen.getByText('編集完了')).toBeInTheDocument()
      expect(screen.getByText('戻る')).toBeInTheDocument()

      // .toBeRequired()：requiredの存在を確認
      expect(screen.getByLabelText('発生日')).toBeRequired()
      expect(screen.getByLabelText('タイトル')).toBeRequired()
      expect(screen.getByLabelText('金額')).toBeRequired()
    })

    it('編集ダイアログ上に選択したitemの登録内容(収支選択/発生日/タイトル/金額)がセットされている', () => {
      customRender(<UpdateDialogCard {...openDialogOpenProps} />)

      expect(screen.getByText('支出')).toBeInTheDocument()
      expect(screen.getByLabelText('発生日')).toHaveValue('2025-09-01')
      expect(screen.getByLabelText('タイトル')).toHaveValue('お米')
      expect(screen.getByLabelText('金額')).toHaveValue(4200)
    })

    it('編集アイコンをクリックするとonOpenChange内の関数が正しく発火する', async () => {
      customRender(<UpdateDialogCard {...defaultProps} />)

      act(() => {
        fireEvent.click(screen.getByTestId('update-dialog-trigger'))
      })

      await waitFor(() => {
        expect(mockOnUpdateDialogOpenChange).toHaveBeenCalledTimes(1)
        expect(mockOnUpdateDialogOpenChange).toHaveBeenCalledWith(true)
        expect(mockOnClickUpdateDialog).toHaveBeenCalledTimes(1)
        expect(mockOnClickUpdateDialog).toHaveBeenCalledWith(1)
        expect(mockOnCheckedChangeForUpdate).toHaveBeenCalledTimes(1)
        expect(mockOnCheckedChangeForUpdate).toHaveBeenCalledWith({ checked: false })
      })
    })

    it('収支選択/発生日/タイトル/金額を入力して送信すると、handleUpdateMoneyFlowにリクエストが渡り、onSubmitTargetDateが呼ばれる', () => {
      customRender(<UpdateDialogCard {...openDialogOpenProps} />)

      // .change()：入力操作を再現
      fireEvent.change(screen.getByLabelText('発生日'), {
        target: { value: mockUpdateOccurredDate },
      })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: mockUpdateTitle } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: mockUpdateAmount } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '編集完了' }))
      })

      expect(mockHandleUpdateMoneyFlow).toHaveBeenCalledTimes(1)
      expect(mockHandleUpdateMoneyFlow).toHaveBeenCalledWith(mockUpdateMoneyFlowRequest)
      expect(mockOnSubmitTargetDate).toHaveBeenCalledTimes(1)
      expect(mockOnSubmitTargetDate).toHaveBeenCalledWith(
        mocktargetUpdateOccurredDate.getFullYear(),
        mocktargetUpdateOccurredDate.getMonth(),
      )
    })

    it('発生日/タイトル/金額を未入力で送信すると、handleUpdateMoneyFlowは呼ばれない', () => {
      customRender(<UpdateDialogCard {...openDialogOpenProps} />)

      fireEvent.change(screen.getByLabelText('発生日'), { target: { value: null } })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: null } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: null } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '編集完了' }))
      })

      expect(mockHandleUpdateMoneyFlow).not.toHaveBeenCalled()
    })

    it('発生日/タイトル/金額を未入力で送信すると、要素が無効となる', () => {
      customRender(<UpdateDialogCard {...openDialogOpenProps} />)

      fireEvent.change(screen.getByLabelText('発生日'), { target: { value: null } })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: null } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: null } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '編集完了' }))
      })

      // .toBeInvalid()：その要素が無効かを確認
      expect(screen.getByLabelText('発生日')).toBeInvalid()
      expect(screen.getByLabelText('タイトル')).toBeInvalid()
      expect(screen.getByLabelText('金額')).toBeInvalid()
    })

    it('収支選択が未チェックの場合はexpense(支出)が選択されている', () => {
      customRender(<UpdateDialogCard {...openDialogOpenProps} />)

      expect(screen.getByRole('checkbox', { name: '収支選択' })).not.toBeChecked() // チェックボックスが未チェック(expense選択状態)であることを確認
    })

    it('収支選択がチェックされている場合はincome(収入)が選択されている', () => {
      customRender(<UpdateDialogCard {...openDialogIncomeProps} />)

      expect(screen.getByRole('checkbox', { name: '収支選択' })).toBeChecked() // チェックボックスがチェック済み(income選択状態)であることを確認
    })

    it('編集が成功した場合、トーストを表示する関数が実行される', () => {
      customRender(<UpdateDialogCard {...openDialogIncomeProps} />)

      fireEvent.change(screen.getByLabelText('発生日'), {
        target: { value: mockUpdateOccurredDate },
      })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: mockUpdateTitle } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: mockUpdateAmount } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '編集完了' }))
      })

      expect(mockHandleUpdateMoneyFlow).toHaveBeenCalledWith(mockUpdateMoneyFlowRequestForIncome)

      const updateSuccessMessage = `「【種別】収入【発生日】2025年9月2日【タイトル】${mockUpdateTitle}【金額】${mockUpdateAmount.toLocaleString('ja-JP')}円」にデータを編集しました。`
      expect(mockToasterCreate).toHaveBeenCalledWith({
        description: updateSuccessMessage,
        type: 'success',
      })
    })

    it('編集が失敗した場合、トーストを表示する関数が実行される', () => {
      customRender(<UpdateDialogCard {...mockfailingProps} />)

      fireEvent.change(screen.getByLabelText('発生日'), {
        target: { value: mockUpdateOccurredDate },
      })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: mockUpdateTitle } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: mockUpdateAmount } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '編集完了' }))
      })

      expect(mockfailingHandleUpdateMoneyFlow).toHaveBeenCalledTimes(1)

      expect(mockToasterCreate).toHaveBeenCalledWith({
        title: 'データの編集に失敗しました。',
        description: 'データ編集失敗',
        type: 'error',
      })
    })
  })
})
