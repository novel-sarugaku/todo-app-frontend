import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type UpdateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type UpdateMoneyFlowResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'
import { moneyFlowsQueryKeys } from '@/features/Main/Root/hooks/queries/queryKeys'
import { updateMoneyFlow } from '@/services/internal/backend/v1/moneyFlows'

// 更新
export const useUpdateMoneyFlowMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<UpdateMoneyFlowResponse, Error, UpdateMoneyFlowRequest>({
    mutationFn: updateMoneyFlow,
    // 更新が成功した場合、一覧キャッシュが無効化され、useQueryが自動で最新の一覧を再取得
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: moneyFlowsQueryKeys.all })
    },
  })
}
