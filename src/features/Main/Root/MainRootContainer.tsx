import { MainRootPresentational } from '@/features/Main/Root/MainRootPresentational'
import { useGetMoneyFlowsQuery } from '@/features/Main/Root/hooks/queries/useGetMoneyFlowsQuery'

export const MainRootContainer = () => {
  const { data = [] } = useGetMoneyFlowsQuery()

  return <MainRootPresentational items={data} />
}
