import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type CreateMoneyFlowResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'
import { moneyFlowsQueryKeys } from '@/features/Main/Root/hooks/queries/queryKeys'
import { createMoneyFlow } from '@/services/internal/backend/v1/moneyFlows'

// 登録
export const useCreateMoneyFlowMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<CreateMoneyFlowResponse, Error, CreateMoneyFlowRequest>({
    mutationFn: createMoneyFlow,
    // 登録が成功した場合、一覧キャッシュが無効化され、useQueryが自動で最新の一覧を再取得
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: moneyFlowsQueryKeys.all })
    },
  })
}
