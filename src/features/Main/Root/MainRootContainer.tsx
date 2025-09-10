import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import { useMoneyFlowListHandler } from './hooks/handlers/useMoneyFlowListHandler'
import { useMonthNavigationHandler } from './hooks/handlers/useMonthNavigationHandler'
import { filterByMonth } from './hooks/handlers/filterHandlers'
import { buildYearMonthLabelFromItems } from './hooks/handlers/labelHandlers'
import { useViewYearHandler } from './hooks/handlers/useViewYearHandler'

export const MainRootContainer = () => {
  const { data = [] } = useMoneyFlowListHandler()
  const { currentMonth, goToMonth } = useMonthNavigationHandler(data)
  const monthlyItems = filterByMonth(data, currentMonth)
  const yearAndMonthLabel = buildYearMonthLabelFromItems(monthlyItems)
  const { viewYear, onViewPrevYear, onViewNextYear } = useViewYearHandler(currentMonth)

  return (
    <MainRootPresentational
      monthlyItems={monthlyItems}
      yearAndMonthLabel={yearAndMonthLabel}
      onChangeMonth={goToMonth}
      currentYear={currentMonth.getFullYear()}
      currentMonth={currentMonth.getMonth()}
      viewYear={viewYear}
      onViewPrevYear={onViewPrevYear}
      onViewNextYear={onViewNextYear}
    />
  )
}
