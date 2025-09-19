import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import { useMoneyFlowsHandler } from './hooks/handlers/useMoneyFlowsHandler'
import { useViewYearHandler } from './hooks/handlers/useViewYearHandler'
import { useUpdateMoneyFlowDialogHandler } from './hooks/handlers/useUpdateMoneyFlowDialogHandler'
import { useCreateMoneyFlowDialogHandler } from './hooks/handlers/useCreateMoneyFlowDialogHandler'

export const MainRootContainer = () => {
  const {
    targetDate,
    targetMonthlyTotalAmount,
    targetMonthlyIncomeData,
    targetMonthlyIncomeTotalAmount,
    targetMonthlyExpenseData,
    targetMonthlyExpenseTotalAmount,
    onSubmitTargetDate,
  } = useMoneyFlowsHandler()
  const { viewYear, onViewPrevYear, onViewNextYear } = useViewYearHandler(targetDate)
  const {
    handleUpdateMoneyFlow,
    onCheckedChangeForUpdate,
    isIncomeForUpdate,
    isUpdateDialogOpen,
    onUpdateDialogOpenChange,
    upDateId,
    onClickUpdateDialog,
    onCloseUpdateDialog,
  } = useUpdateMoneyFlowDialogHandler()
  const { handleCreateMoneyFlow, onCheckedChange, isIncome, isDialogOpen, onDialogOpenChange } =
    useCreateMoneyFlowDialogHandler()

  return (
    <MainRootPresentational
      targetDate={targetDate}
      targetMonthlyIncomeData={targetMonthlyIncomeData}
      targetMonthlyIncomeTotalAmount={targetMonthlyIncomeTotalAmount}
      targetMonthlyExpenseData={targetMonthlyExpenseData}
      targetMonthlyExpenseTotalAmount={targetMonthlyExpenseTotalAmount}
      onSubmitTargetDate={onSubmitTargetDate}
      viewYear={viewYear}
      onViewPrevYear={onViewPrevYear}
      onViewNextYear={onViewNextYear}
      targetMonthlyTotalAmount={targetMonthlyTotalAmount}
      handleUpdateMoneyFlow={handleUpdateMoneyFlow}
      onCheckedChangeForUpdate={onCheckedChangeForUpdate}
      isIncomeForUpdate={isIncomeForUpdate}
      isUpdateDialogOpen={isUpdateDialogOpen}
      onUpdateDialogOpenChange={onUpdateDialogOpenChange}
      upDateId={upDateId}
      onClickUpdateDialog={onClickUpdateDialog}
      onCloseUpdateDialog={onCloseUpdateDialog}
      handleCreateMoneyFlow={handleCreateMoneyFlow}
      onCheckedChange={onCheckedChange}
      isIncome={isIncome}
      isDialogOpen={isDialogOpen}
      onDialogOpenChange={onDialogOpenChange}
    />
  )
}
