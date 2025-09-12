import { useQuery } from '@tanstack/react-query'

import { type GetMoneyFlowsResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'
import { moneyFlowsQueryKeys } from './queryKeys'
import { getMoneyFlows } from '@/services/internal/backend/v1/moneyFlows'

// 全件取得
export const useGetMoneyFlowsQuery = () => {
  // APIの生データ型(GetMoneyFlowsResponse)、アプリ内で変換したい型（MoneyFlow[]）
  return useQuery<GetMoneyFlowsResponse, Error, moneyFlowData[]>({
    queryKey: moneyFlowsQueryKeys.all,
    queryFn: () => getMoneyFlows(),
    // React Query v5でのデータ変換方法
    select: (data) =>
      data.map((item) => ({
        ...item, // 他のプロパティ（id,title,amount,kind）はそのままコピー
        occurred_date: new Date(item.occurred_date), // occurred_dateをDate型に変換
      })),
  })
}
