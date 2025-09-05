// APIからの収支データ取得用

import { useGetMoneyFlowsQuery } from '@/features/Main/Root/hooks/queries/useGetMoneyFlowsQuery'

export const useMoneyFlowListHandler = () => {
  const { data = [] } = useGetMoneyFlowsQuery() // dataがない場合は、空配列を入れる

  return {
    data,
  }
}
