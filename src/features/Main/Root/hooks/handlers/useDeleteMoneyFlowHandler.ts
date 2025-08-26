import { useDeleteMoneyFlowMutation } from '../mutations/useDeleteMoneyFlowMutation'

export const useDeleteMoneyFlowHandler = () => {
  const mutation = useDeleteMoneyFlowMutation()

  const handleDelete = (id: number) => {
    mutation.mutate({ id })
  }

  return {
    handleDelete,
    isPending: mutation.isPending,
    isError: mutation.isError,
  }
}
