import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import { useMoneyFlowListHandler } from './hooks/handlers/useMoneyFlowListHandler'
import { useMonthNavigationHandler } from './hooks/handlers/useMonthNavigationHandler'

export const MainRootContainer = () => {
  const { data = [] } = useMoneyFlowListHandler()
  const { currentMonth, goPrevMonth, goNextMonth } = useMonthNavigationHandler(data)

  return (
    <MainRootPresentational
      items={data}
      currentMonth={currentMonth}
      onPrevMonth={goPrevMonth}
      onNextMonth={goNextMonth}
    />
  )
}
