// 最新月の表示・移動管理用

import { useState } from 'react'

import { getInitialMonth, addMonth } from './monthHandlers'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

export const useMonthNavigationHandler = (items: moneyFlowData[]) => {
  // 初期表示する月（最新月）
  const [currentMonth, setCurrentMonth] = useState(getInitialMonth(items))

  // 前月に移動
  const goPrevMonth = () => {
    setCurrentMonth(addMonth(currentMonth, -1))
  }

  // 翌月に移動
  const goNextMonth = () => {
    setCurrentMonth(addMonth(currentMonth, 1))
  }

  // 任意の年月に移動
  // new Date：1日を指定、toMonthStart()：どんな日付でもその月の1日にそろえる
  const goToMonth = (year: number, monthIndex0to11: number) => {
    setCurrentMonth(new Date(year, monthIndex0to11, 1))
  }

  return { currentMonth, goPrevMonth, goNextMonth, goToMonth }
}
