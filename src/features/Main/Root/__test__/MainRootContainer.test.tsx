import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { MainRootContainer } from '@/features/Main/Root/MainRootContainer'
import * as Presentational from '@/features/Main/Root/MainRootPresentational'
import * as moneyFlowsHandler from '@/features/Main/Root/hooks/handlers/useMoneyFlowsHandler'
import * as viewYearHandler from '@/features/Main/Root/hooks/handlers/useViewYearHandler'
import * as CreateMoneyFlowDialogHandler from '@/features/Main/Root/hooks/handlers/useCreateMoneyFlowDialogHandler'
import * as UpdateMoneyFlowDialogHandler from '@/features/Main/Root/hooks/handlers/useUpdateMoneyFlowDialogHandler'
import * as DeleteMoneyFlowDialogHandler from '@/features/Main/Root/hooks/handlers/useDeleteMoneyFlowDialogHandler'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

// Mocking the ResultIdPresentational component
const PresentationalSpy = vi
  .spyOn(Presentational, 'MainRootPresentational')
  .mockImplementation(() => {
    return <div data-testid='mock-presentational'>Mocked MainRootPresentational</div>
  })

// Mocking the useMoneyFlowListHandle hook
const mockData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle',
    amount: 100,
    occurred_date: new Date('2025-09-05T12:00:00Z'),
    kind: 'income',
  },
]

// Mocking the useMoneyFlowsHandler hoostk
const mockTargetDate = new Date('2025-09-01T12:00:00Z')
const mockTargetMonthlyTotalAmount = 2500
const mockTargetMonthlyIncomeData = mockData
const mockTargetMonthlyIncomeTotalAmount = 4000
const mockTargetMonthlyExpenseData = mockData
const mockTargetMonthlyExpenseTotalAmount = 1500
const mockoOnSubmitTargetDate = vi.fn()
vi.spyOn(moneyFlowsHandler, 'useMoneyFlowsHandler').mockReturnValue({
  targetDate: mockTargetDate,
  targetMonthlyTotalAmount: mockTargetMonthlyTotalAmount,
  targetMonthlyIncomeData: mockTargetMonthlyIncomeData,
  targetMonthlyIncomeTotalAmount: mockTargetMonthlyIncomeTotalAmount,
  targetMonthlyExpenseData: mockTargetMonthlyExpenseData,
  targetMonthlyExpenseTotalAmount: mockTargetMonthlyExpenseTotalAmount,
  onSubmitTargetDate: mockoOnSubmitTargetDate,
})

// Mocking the useViewYearHandler hook
const mockViewYear = 2025
const mockOnViewPrevYea = vi.fn()
const mockOnViewNextYear = vi.fn()
vi.spyOn(viewYearHandler, 'useViewYearHandler').mockReturnValue({
  viewYear: mockViewYear,
  onViewPrevYear: mockOnViewPrevYea,
  onViewNextYear: mockOnViewNextYear,
})

// Mocking the useCreateMoneyFlowHandler hook
const mockHandleCreateMoneyFlow = vi.fn()
const mockOnCheckedChange = vi.fn()
const mockIsIncome = false
const mockIsDialogOpen = true
const mockOnDialogOpenChange = vi.fn()
vi.spyOn(CreateMoneyFlowDialogHandler, 'useCreateMoneyFlowDialogHandler').mockReturnValue({
  handleCreateMoneyFlow: mockHandleCreateMoneyFlow,
  onCheckedChange: mockOnCheckedChange,
  isIncome: mockIsIncome,
  isDialogOpen: mockIsDialogOpen,
  onDialogOpenChange: mockOnDialogOpenChange,
})

// Mocking the useUpdateMoneyFlowDialogHandle hook
const mockHandleUpdateMoneyFlow = vi.fn()
const mockOnCheckedChangeForUpdate = vi.fn()
const mockIsIncomeForUpdate = false
const mockIsUpdateDialogOpen = true
const mockOnUpdateDialogOpenChange = vi.fn()
const mockUpDateId = 1
const mockOnClickUpdateDialog = vi.fn()
const mockOnCloseUpdateDialog = vi.fn()
vi.spyOn(UpdateMoneyFlowDialogHandler, 'useUpdateMoneyFlowDialogHandler').mockReturnValue({
  handleUpdateMoneyFlow: mockHandleUpdateMoneyFlow,
  onCheckedChangeForUpdate: mockOnCheckedChangeForUpdate,
  isIncomeForUpdate: mockIsIncomeForUpdate,
  isUpdateDialogOpen: mockIsUpdateDialogOpen,
  onUpdateDialogOpenChange: mockOnUpdateDialogOpenChange,
  upDateId: mockUpDateId,
  onClickUpdateDialog: mockOnClickUpdateDialog,
  onCloseUpdateDialog: mockOnCloseUpdateDialog,
})

// Mocking the useDeleteMoneyFlowDialogHandler hook
const mockHandleDeleteMoneyFlow = vi.fn()
const mockIsDeleteDialogOpen = false
const mockOnDeleteDialogOpenChange = vi.fn()
const mockDeleteId: number | null = 1
const mockOnClickDeleteDialog = vi.fn()
const mockOnCloseDeleteDialog = vi.fn()
vi.spyOn(DeleteMoneyFlowDialogHandler, 'useDeleteMoneyFlowDialogHandler').mockReturnValue({
  handleDeleteMoneyFlow: mockHandleDeleteMoneyFlow,
  isDeleteDialogOpen: mockIsDeleteDialogOpen,
  onDeleteDialogOpenChange: mockOnDeleteDialogOpenChange,
  deleteId: mockDeleteId,
  onClickDeleteDialog: mockOnClickDeleteDialog,
  onCloseDeleteDialog: mockOnCloseDeleteDialog,
})

describe('MainRootContainer', () => {
  describe('正常系', () => {
    it('MainRootPresentationalに正しいpropsが渡される', () => {
      customRender(<MainRootContainer />)

      expect(screen.getByTestId('mock-presentational')).toBeInTheDocument()

      expect(PresentationalSpy.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          targetDate: mockTargetDate,
          targetMonthlyIncomeData: mockTargetMonthlyIncomeData,
          targetMonthlyIncomeTotalAmount: mockTargetMonthlyIncomeTotalAmount,
          targetMonthlyExpenseData: mockTargetMonthlyExpenseData,
          targetMonthlyExpenseTotalAmount: mockTargetMonthlyExpenseTotalAmount,
          onSubmitTargetDate: mockoOnSubmitTargetDate,
          viewYear: mockViewYear,
          onViewPrevYear: mockOnViewPrevYea,
          onViewNextYear: mockOnViewNextYear,
          targetMonthlyTotalAmount: mockTargetMonthlyTotalAmount,
          handleCreateMoneyFlow: mockHandleCreateMoneyFlow,
          onCheckedChange: mockOnCheckedChange,
          isIncome: mockIsIncome,
          isDialogOpen: mockIsDialogOpen,
          onDialogOpenChange: mockOnDialogOpenChange,
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
        }),
      )
    })
  })
})
