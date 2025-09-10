// 月選択ポップオーバーの表示年管理用

import { useState, useEffect } from 'react'

export const useViewYearHandler = (currentMonth: Date) => {
  // 現在表示している年
  const [viewYear, setViewYear] = useState(currentMonth.getFullYear())

  useEffect(() => {
    // 選ばれている月が変わったら、その年にviewYearをセット
    // .getFullYear()で年だけ取り出して、setViewYearに渡してviewYearを更新
    setViewYear(currentMonth.getFullYear())
  }, [currentMonth]) // currentMonthが変わったときだけ、useEffectの中身を実行

  // ＜ ボタンを押したときの処理
  // viewYearを1年減らす
  const onViewPrevYear = () => {
    setViewYear((prevYear) => prevYear - 1)
  }

  // ＞ ボタンを押したときの処理
  // viewYearを1年増やす
  const onViewNextYear = () => {
    setViewYear((prevYear) => prevYear + 1)
  }

  return { viewYear, onViewPrevYear, onViewNextYear, setViewYear }
}
