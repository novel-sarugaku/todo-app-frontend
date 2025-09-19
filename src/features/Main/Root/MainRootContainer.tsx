import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import { useMoneyFlowsHandler } from './hooks/handlers/useMoneyFlowsHandler'
import { useViewYearHandler } from './hooks/handlers/useViewYearHandler'
import { useUpdateMoneyFlowHandler } from './hooks/handlers/useUpdateMoneyFlowDialogHandler'

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
  } = useUpdateMoneyFlowHandler()

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
    />
  )
}
