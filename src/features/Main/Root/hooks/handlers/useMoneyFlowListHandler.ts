import { useGetMoneyFlowsQuery } from '@/features/Main/Root/hooks/queries/useGetMoneyFlowsQuery'

export const useMoneyFlowListHandler = () => {
  const { data = [], isLoading, isError } = useGetMoneyFlowsQuery()

  return {
    moneyFlows: data,
    isLoading,
    isError,
  }
}
