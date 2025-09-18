import { describe, it, vi, expect, beforeEach } from 'vitest'
import { act } from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { toaster } from '@/components/ui/toaster'

import { customRender } from '@/tests/helpers/customRender'
import { CreateDialogCard } from '@/features/Main/Root/ui/CreateDialogCard/CreateDialogCard'
import { kindToJa } from '@/share/utils/format/labelFormatters'
import { formatDateJa } from '@/share/utils/format/dateFormatters'
import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'

const mockTitle = 'お米'
const mockAmount = 4200
const mockOccurredDate = '2025-09-01'
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
const mockJumpToMonthByOccurredDate = vi.fn()
const defaultProps = {
  handleCreateMoneyFlow: mockHandleCreateMoneyFlow,
  onCheckedChange: mockOnCheckedChange,
  isIncome: mockIsIncome,
  isDialogOpen: mockIsDialogOpen,
  onDialogOpenChange: mockOnDialogOpenChange,
  jumpToMonthByOccurredDate: mockJumpToMonthByOccurredDate,
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
  throw new Error('登録失敗')
})
const mockfailingProps = {
  ...defaultProps,
  isDialogOpen: true,
  handleCreateMoneyFlow: mockfailingHandleCreateMoneyFlow,
}

// Mocking the toaster
const mockToasterCreate = toaster.create
vi.mock('@/components/ui/toaster', () => ({
  toaster: { create: vi.fn() },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CreateDialogCard', () => {
  describe('正常系', () => {
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

    it('収支選択/発生日/タイトル/金額を入力して送信すると、handleCreateMoneyFlowにリクエストが渡り、jumpToMonthByOccurredDateが呼ばれる', () => {
      customRender(<CreateDialogCard {...openDialogOpenProps} />)

      // .change()：入力操作を再現
      fireEvent.change(screen.getByLabelText('発生日'), { target: { value: mockOccurredDate } })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: mockTitle } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: mockAmount } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '登録する' }))
      })

      expect(mockHandleCreateMoneyFlow).toHaveBeenCalledTimes(1)
      expect(mockHandleCreateMoneyFlow).toHaveBeenCalledWith(mockCreateMoneyFlowRequest)
      expect(mockJumpToMonthByOccurredDate).toHaveBeenCalledTimes(1)
      expect(mockJumpToMonthByOccurredDate).toHaveBeenCalledWith(mockOccurredDate)
    })

    it('発生日/タイトル/金額を未入力で送信すると、handleCreateMoneyFlowは呼ばれない', () => {
      customRender(<CreateDialogCard {...openDialogOpenProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '登録する' }))
      })

      expect(mockHandleCreateMoneyFlow).not.toHaveBeenCalled()
    })

    it('収支選択が未チェックの場合はexpense(支出)が選択されている', () => {
      customRender(<CreateDialogCard {...openDialogOpenProps} />)

      expect(screen.getByRole('checkbox', { name: '収支選択' })).not.toBeChecked() // チェックボックスが未チェック(expense選択状態)であることを確認
    })

    it('収支選択がチェックされている場合はincome(収入)が選択されている', () => {
      customRender(<CreateDialogCard {...openDialogIncomeProps} />)

      expect(screen.getByRole('checkbox', { name: '収支選択' })).toBeChecked() // チェックボックスがチェック済み(income選択状態)であることを確認
    })

    it('登録が成功した場合は、登録が成功した旨トーストが表示される', () => {
      customRender(<CreateDialogCard {...openDialogOpenProps} />)

      fireEvent.change(screen.getByLabelText('発生日'), { target: { value: mockOccurredDate } })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: mockTitle } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: mockAmount } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '登録する' }))
      })

      expect(mockHandleCreateMoneyFlow).toHaveBeenCalledWith(mockCreateMoneyFlowRequest)

      const expected = `「【種別】${kindToJa(mockKind)}【発生日】${formatDateJa(
        mockOccurredDate,
      )}【タイトル】${mockTitle}【金額】${mockAmount.toLocaleString('ja-JP')}円」のデータを登録しました。`

      expect(mockToasterCreate).toHaveBeenCalledWith({
        description: expected,
        type: 'success',
      })
    })
    it('登録が失敗した場合は、失敗が成功した旨トーストが表示される', () => {
      customRender(<CreateDialogCard {...mockfailingProps} />)

      fireEvent.change(screen.getByLabelText('発生日'), { target: { value: mockOccurredDate } })
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: mockTitle } })
      fireEvent.change(screen.getByLabelText('金額'), { target: { value: mockAmount } })

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: '登録する' }))
      })

      expect(mockfailingHandleCreateMoneyFlow).toHaveBeenCalledTimes(1)

      expect(mockToasterCreate).toHaveBeenCalledWith({
        description: 'データの登録に失敗しました。',
        type: 'error',
      })
    })
  })
})
