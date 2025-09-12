import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import { useMoneyFlowsHandler } from './hooks/handlers/useMoneyFlowsHandler'
import { useViewYearHandler } from './hooks/handlers/useViewYearHandler'

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
    />
  )
}
