import { type moneyFlowData } from './types/moneyFlowData'

interface MainRootPresentationalProps {
  items: moneyFlowData[]
}

export const MainRootPresentational = ({ items }: MainRootPresentationalProps) => {
  return (
    <>
      <h1>useQeryが機能しているか確認中¥</h1>
      {items.map((item) => (
        <li key={item.id}>
          {item.title}
          {item.amount}円 ({item.occurred_date})
        </li>
      ))}
    </>
  )
}
