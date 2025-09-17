import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import { useMoneyFlowsHandler } from './hooks/handlers/useMoneyFlowsHandler'
import { useViewYearHandler } from './hooks/handlers/useViewYearHandler'
import { useCreateMoneyFlowHandler } from './hooks/handlers/useCreateMoneyFlowHandler'

export const MainRootContainer = () => {
  const {
    targetDate,
    targetMonthlyTotalAmount,
    targetMonthlyIncomeData,
    targetMonthlyIncomeTotalAmount,
    targetMonthlyExpenseData,
    targetMonthlyExpenseTotalAmount,
    onSubmitTargetDate,
    jumpToMonthByOccurredDate,
  } = useMoneyFlowsHandler()
  const { viewYear, onViewPrevYear, onViewNextYear } = useViewYearHandler(targetDate)
  const {
    handleCreateMoneyFlow,
    onCheckedChange,
    isIncome,
    isDialogOpen,
    onDialogOpenChange,
  } = useCreateMoneyFlowHandler()

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
      handleCreateMoneyFlow={handleCreateMoneyFlow}
      onCheckedChange={onCheckedChange}
      isIncome={isIncome}
      isDialogOpen={isDialogOpen}
      onDialogOpenChange={onDialogOpenChange}
      jumpToMonthByOccurredDate={jumpToMonthByOccurredDate}
    />
  )
}
