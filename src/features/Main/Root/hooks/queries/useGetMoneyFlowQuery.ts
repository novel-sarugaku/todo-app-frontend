import { useQuery } from '@tanstack/react-query'

import { type GetMoneyFlowResponseItem } from '@/models/api/internal/backend/v1/response/moneyFlows'
import { moneyFlowsQueryKeys } from './queryKeys'
import { getMoneyFlow } from '@/services/internal/backend/v1/moneyFlows'

// 1件取得
export const useGetMoneyFlowQuery = (id: number) => {
  return useQuery<GetMoneyFlowResponseItem>({
    queryKey: moneyFlowsQueryKeys.details(id),
    queryFn: () => getMoneyFlow(id),
    enabled: !!id, // idが存在する時だけクエリを動かす（idが0やundefined、nullのとき→false。idが1や5のような有効な数値のとき→true）
  })
}
