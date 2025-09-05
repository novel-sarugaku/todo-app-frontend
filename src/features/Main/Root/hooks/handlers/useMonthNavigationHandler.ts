// 表示月の管理用

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
    setCurrentMonth(addMonth(currentMonth, +1))
  }

  return { currentMonth, goPrevMonth, goNextMonth }
}
