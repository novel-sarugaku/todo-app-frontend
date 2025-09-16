import { useCreateMoneyFlowMutation } from '../mutations/useCreateMoneyFlowMutation'
import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'

export const useCreateMoneyFlowHandler = () => {
  const mutation = useCreateMoneyFlowMutation()

  const handleCreateMoneyFlow = (request: CreateMoneyFlowRequest) => {
    mutation.mutate(request)
  }

  return { handleCreateMoneyFlow }
}
