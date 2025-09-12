// APIからの収支データ取得用
import { useState } from 'react'

import { useGetMoneyFlowsQuery } from '@/features/Main/Root/hooks/queries/useGetMoneyFlowsQuery'

export const useMoneyFlowsHandler = () => {
  const { data = [] } = useGetMoneyFlowsQuery() // dataがない場合は、空配列を入れる

  const [targetDate, setTargetDate] = useState(new Date())

  const targetMonthlyData = data
    .filter((item) => {
      const startDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1)
      const endDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 1)
      return startDate <= item.occurred_date && item.occurred_date < endDate
    })
    .sort((dateA, dateB) => dateB.occurred_date.getTime() - dateA.occurred_date.getTime())

  const targetMonthlyTotalAmount = targetMonthlyData.reduce((total, item) => {
    if (item.kind === 'income') {
      //収入ならプラス、支出ならマイナスに処理を分ける
      return total + item.amount // 収入なら合計に足す
    } else {
      return total - item.amount // 支出なら合計から引く
    }
  }, 0) // 初期値0

  const targetMonthlyIncomeData = targetMonthlyData.filter((item) => {
    return item.kind == 'income'
  })
  const targetMonthlyExpenseData = targetMonthlyData.filter((item) => {
    return item.kind == 'expense'
  })

  const targetMonthlyIncomeTotalAmount = targetMonthlyIncomeData.reduce((total, item) => {
    return total + item.amount
  }, 0)
  const targetMonthlyExpenseTotalAmount = targetMonthlyExpenseData.reduce((total, item) => {
    return total + item.amount
  }, 0)

  const onSubmitTargetDate = (year: number, monthIndex0to11: number) => {
    setTargetDate(new Date(year, monthIndex0to11, 1))
  }

  return {
    targetDate,
    targetMonthlyTotalAmount,
    targetMonthlyIncomeData,
    targetMonthlyIncomeTotalAmount,
    targetMonthlyExpenseData,
    targetMonthlyExpenseTotalAmount,
    onSubmitTargetDate,
  }
}
