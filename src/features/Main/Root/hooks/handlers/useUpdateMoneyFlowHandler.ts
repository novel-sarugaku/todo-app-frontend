import { useUpdateMoneyFlowMutation } from '../mutations/useUpdateMoneyFlowMutation'
import { type UpdateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'

export const useUpdateMoneyFlowHandler = () => {
  const mutation = useUpdateMoneyFlowMutation()

  const handleUpdate = (request: UpdateMoneyFlowRequest) => {
    mutation.mutate(request)
  }

  return {
    handleUpdate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  }
}
