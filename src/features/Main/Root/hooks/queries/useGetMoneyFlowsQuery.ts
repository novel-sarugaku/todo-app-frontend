import { useQuery } from '@tanstack/react-query'

import { type GetMoneyFlowsResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'
import { moneyFlowsQueryKeys } from './queryKeys'
import { getMoneyFlows } from '@/services/internal/backend/v1/moneyFlows'

// 全件取得
export const useGetMoneyFlowsQuery = () => {
  return useQuery<GetMoneyFlowsResponse>({
    queryKey: moneyFlowsQueryKeys.all,
    queryFn: () => getMoneyFlows(),
  })
}
