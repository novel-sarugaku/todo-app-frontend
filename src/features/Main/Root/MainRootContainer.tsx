// import { useEffect } from 'react'
// import { getMoneyFlow, getMoneyFlows, createMoneyFlow, updateMoneyFlow, deleteMoneyFlows } from '@/services/internal/backend/v1/moneyFlows'
import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import { useMoneyFlowListHandler } from './hooks/handlers/useMoneyFlowListHandler'

export const MainRootContainer = () => {
    /*
//   API疎通確認用
    useEffect(() => {
  getMoneyFlow(4)
    .then((data) => {
      console.log('１件取得成功！:', data)
    })
    .catch(() => {
      console.error('１件取得エラー！:')
    })
  getMoneyFlows()
    .then((data) => {
      console.log('全件取得成功！:', data)
    })
    .catch(() => {
      console.error('全件取得エラー！:')
    })
  createMoneyFlow({
    title: 'ランチ',
    amount: 2000,
    occurred_date: '2025-08-01',
  })
    .then((data) => {
      console.log('登録成功！:', data)
    })
    .catch(() => {
      console.error('登録エラー！:')
    })
  updateMoneyFlow({
    id: 6,
    title: 'ランチ',
    amount: 3000,
    occurred_date: '2025-08-01',
  })
    .then((data) => {
      console.log('更新成功！:', data)
    })
    .catch(() => {
      console.error('更新エラー！:')
    })
  deleteMoneyFlows({
    id: 4,
  })
    .then((data) => {
      console.log('削除成功！:', data)
    })
    .catch(() => {
      console.error('削除エラー！:')
    })
    }, [])
*/
  const { moneyFlows } = useMoneyFlowListHandler()

  return <MainRootPresentational items={moneyFlows} />
}
