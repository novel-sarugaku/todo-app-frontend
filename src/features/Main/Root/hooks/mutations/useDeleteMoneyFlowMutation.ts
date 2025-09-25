import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type DeleteMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { moneyFlowsQueryKeys } from '@/features/Main/Root/hooks/queries/queryKeys'
import { deleteMoneyFlow } from '@/services/internal/backend/v1/moneyFlows'

// 削除
export const useDeleteMoneyFlowMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, Error, DeleteMoneyFlowRequest>({
    mutationFn: deleteMoneyFlow,
    // 削除が成功した場合、一覧キャッシュが無効化され、useQueryが自動で最新の一覧を再取得
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: moneyFlowsQueryKeys.all })
    },
  })
}
