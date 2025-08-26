import { type moneyFlowData } from './types/moneyFlowData'

interface MainRootPresentationalProps {
  items: moneyFlowData[]
}

export const MainRootPresentational = ({ items }: MainRootPresentationalProps) => {
  return (
    <>
      <h1>useQeryが機能しているか確認中</h1>
      {items.map((flow) => (
        <li key={flow.id}>
          {flow.title}
          {flow.amount}円 ({flow.occurred_date})
        </li>
      ))}
    </>
  )
}
