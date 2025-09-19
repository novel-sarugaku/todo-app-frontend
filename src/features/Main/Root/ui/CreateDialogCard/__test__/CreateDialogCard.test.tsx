import { describe, it, vi, expect, beforeEach } from 'vitest'
import { act } from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { toaster } from '@/share/lib/createToaster'

import { customRender } from '@/tests/helpers/customRender'
import { CreateDialogCard } from '@/features/Main/Root/ui/CreateDialogCard/CreateDialogCard'
import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'

const mockTitle = 'お米'
const mockAmount = 4200
const mockOccurredDate = '2025-09-01'
const targetOccurredDate = new Date(mockOccurredDate)
const mockKind = 'expense'
const mockCreateMoneyFlowRequest: CreateMoneyFlowRequest = {
  title: mockTitle,
  amount: mockAmount,
  occurred_date: mockOccurredDate,
  kind: mockKind,
}

const mockHandleCreateMoneyFlow = vi.fn()
const mockOnCheckedChange = vi.fn()
const mockIsIncome = false
const mockIsDialogOpen = false
const mockOnDialogOpenChange = vi.fn()
const mockOnSubmitTargetDate = vi.fn()
const defaultProps = {
  handleCreateMoneyFlow: mockHandleCreateMoneyFlow,
  onCheckedChange: mockOnCheckedChange,
  isIncome: mockIsIncome,
  isDialogOpen: mockIsDialogOpen,
  onDialogOpenChange: mockOnDialogOpenChange,
  onSubmitTargetDate: mockOnSubmitTargetDate,
}

const openDialogOpenProps = {
  ...defaultProps,
  isDialogOpen: true,
}

const openDialogIncomeProps = {
  ...defaultProps,
  isDialogOpen: true,
  isIncome: true,
}

const mockfailingHandleCreateMoneyFlow = vi.fn(() => {
  throw new Error('データ登録失敗')
})
const mockfailingProps = {
  ...defaultProps,
  isDialogOpen: true,
  handleCreateMoneyFlow: mockfailingHandleCreateMoneyFlow,
}

// Mocking the toaster
const mockToasterCreate = toaster.create
vi.mock('@/share/lib/createToaster', () => ({
  toaster: { create: vi.fn() },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CreateDialogCard', () => {
  describe('正常系', () => {
    it('収支登録ダイアログ上に表示されるべきテキストが表示され、input要素にrequiredが存在する', () => {
      customRender(<CreateDialogCard {...openDialogOpenProps} />)

      expect(screen.getByText('収支登録')).toBeInTheDocument()
      expect(screen.getByText('収支選択')).toBeInTheDocument()
      expect(screen.getByText('支出')).toBeInTheDocument()
      expect(screen.getByText('発生日')).toBeInTheDocument()
      expect(screen.getByText('タイトル')).toBeInTheDocument()
      expect(screen.getByText('金額')).toBeInTheDocument()
      expect(screen.getByText('登録')).toBeInTheDocument()
      expect(screen.getByText('戻る')).toBeInTheDocument()

      // .toBeRequired()：requiredの存在を確認
      expect(screen.getByLabelText('発生日')).toBeRequired()
      expect(screen.getByLabelText('タイトル')).toBeRequired()
      expect(screen.getByLabelText('金額')).toBeRequired()
    })

    it('「収支を登録する」ボタンをクリックするとonDialogOpenChange(true)が呼ばれる', async () => {
      customRender(<CreateDialogCard {...defaultProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '収支を登録する' }))
      })

      await waitFor(() => {
        expect(mockOnDialogOpenChange).toHaveBeenCalledTimes(1)
        expect(mockOnDialogOpenChange).toHaveBeenCalledWith(true)
      })
    })

    it('収支選択/発生日/タイトル/金額を入力して送信すると、handleCreateMoneyFlowにリクエストが渡り、mockOnSubmitTargetDateが呼ばれる', () => {
      customRender(<CreateDialogCard {...openDialogOpenProps} />)

      // .change()：入力操作を再現
      fireEvent.change(screen.getByLabelText('発生日'), { target: { value: mockOccurredDate } })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: mockTitle } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: mockAmount } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '登録' }))
      })

      expect(mockHandleCreateMoneyFlow).toHaveBeenCalledTimes(1)
      expect(mockHandleCreateMoneyFlow).toHaveBeenCalledWith(mockCreateMoneyFlowRequest)
      expect(mockOnSubmitTargetDate).toHaveBeenCalledTimes(1)
      expect(mockOnSubmitTargetDate).toHaveBeenCalledWith(
        targetOccurredDate.getFullYear(),
        targetOccurredDate.getMonth(),
      )
    })

    it('発生日/タイトル/金額を未入力で送信すると、handleCreateMoneyFlowは呼ばれない', () => {
      customRender(<CreateDialogCard {...openDialogOpenProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '登録' }))
      })

      expect(mockHandleCreateMoneyFlow).not.toHaveBeenCalled()
    })

    it('発生日/タイトル/金額を未入力で送信すると、要素が無効となる', () => {
      customRender(<CreateDialogCard {...openDialogOpenProps} />)

      fireEvent.change(screen.getByLabelText('発生日'), { target: { value: null } })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: null } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: null } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '登録' }))
      })

      // .toBeInvalid()：その要素が無効かを確認
      expect(screen.getByLabelText('発生日')).toBeInvalid()
      expect(screen.getByLabelText('タイトル')).toBeInvalid()
      expect(screen.getByLabelText('金額')).toBeInvalid()
    })

    it('収支選択が未チェックの場合はexpense(支出)が選択されている', () => {
      customRender(<CreateDialogCard {...openDialogOpenProps} />)

      expect(screen.getByRole('checkbox', { name: '収支選択' })).not.toBeChecked() // チェックボックスが未チェック(expense選択状態)であることを確認
    })

    it('収支選択がチェックされている場合はincome(収入)が選択されている', () => {
      customRender(<CreateDialogCard {...openDialogIncomeProps} />)

      expect(screen.getByRole('checkbox', { name: '収支選択' })).toBeChecked() // チェックボックスがチェック済み(income選択状態)であることを確認
    })

    it('登録が成功した場合、トーストを表示する関数が実行される', () => {
      customRender(<CreateDialogCard {...openDialogOpenProps} />)

      fireEvent.change(screen.getByLabelText('発生日'), { target: { value: mockOccurredDate } })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: mockTitle } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: mockAmount } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '登録' }))
      })

      expect(mockHandleCreateMoneyFlow).toHaveBeenCalledWith(mockCreateMoneyFlowRequest)

      const createSuccessMessage = `「【種別】支出【発生日】2025年9月1日【タイトル】${mockTitle}【金額】${mockAmount.toLocaleString('ja-JP')}円」のデータを登録しました。`

      expect(mockToasterCreate).toHaveBeenCalledWith({
        description: createSuccessMessage,
        type: 'success',
      })
    })
    it('登録が失敗した場合、トーストを表示する関数が実行される', () => {
      customRender(<CreateDialogCard {...mockfailingProps} />)

      fireEvent.change(screen.getByLabelText('発生日'), { target: { value: mockOccurredDate } })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: mockTitle } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: mockAmount } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '登録' }))
      })

      expect(mockfailingHandleCreateMoneyFlow).toHaveBeenCalledTimes(1)

      expect(mockToasterCreate).toHaveBeenCalledWith({
        title: 'データの登録に失敗しました。',
        description: 'データ登録失敗',
        type: 'error',
      })
    })
  })
})
