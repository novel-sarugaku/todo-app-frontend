import { useCreateMoneyFlowMutation } from '../mutations/useCreateMoneyFlowMutation'
import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'

export const useCreateMoneyFlowHandler = () => {
    const mutation = useCreateMoneyFlowMutation()

    const handleCreate = (request: CreateMoneyFlowRequest) => {
        mutation.mutate(request)
    }

    return {
        handleCreate,
        isPending: mutation.isPending,
        isError: mutation.isError,
    }
}
