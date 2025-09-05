import { Box, Table } from '@chakra-ui/react'

import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'
import { formatDate, formatPrice } from '@/features/Main/Root/hooks/handlers/formatters'
import { incomeTotal } from '@/features/Main/Root/hooks/handlers/amountCalculators'
import { buildYearMonthLabelFromItems } from '@/features/Main/Root/hooks/handlers/labelHandlers'

interface MainRootPresentationalProps {
  items: moneyFlowData[]
}

export const IncomeTableCard = ({ items }: MainRootPresentationalProps) => {
  const incomeTotalValue = incomeTotal(items)
  const yearAndMonthLabel = buildYearMonthLabelFromItems(items)
  const HeaderCell = ({ children }: { children: React.ReactNode }) => {
    return (
      <Table.ColumnHeader
        textAlign={'center'}
        color={'white'}
        fontWeight={'bold'}
        borderColor={'white'}
      >
        {children}
      </Table.ColumnHeader>
    )
  }
  const BodyCell = ({ children }: { children: React.ReactNode }) => {
    return (
      <Table.Cell textAlign={'center'} borderColor={'white'}>
        {children}
      </Table.Cell>
    )
  }

  return (
    <>
      <Box textAlign={'start'} mb={4}>
        <Table.Root
          size='sm'
          showColumnBorder
          borderColor={'white'}
          display={'inline-table'}
          w={'32%'}
        >
          <Table.Header>
            <Table.Row bg={'orange.500'}>
              <HeaderCell>{yearAndMonthLabel} 合計収入額</HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row bg={'orange.100'}>
              <BodyCell>{formatPrice(incomeTotalValue)}円</BodyCell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>

      <Table.Root size={'sm'} showColumnBorder>
        <Table.Header>
          <Table.Row bg={'orange.500'}>
            <HeaderCell>収入日</HeaderCell>
            <HeaderCell>タイトル</HeaderCell>
            <HeaderCell>金額</HeaderCell>
            <HeaderCell>編集</HeaderCell>
            <HeaderCell>削除</HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            .filter((item) => item.kind === 'income')
            .sort(
              (dateA, dateB) =>
                new Date(dateB.occurred_date).getTime() - new Date(dateA.occurred_date).getTime(),
            ) // 降順
            .map((item, index) => (
              <Table.Row key={item.id} bg={index % 2 === 0 ? 'orange.100' : 'orange.50'}>
                <BodyCell>{formatDate(item.occurred_date)}</BodyCell>
                <BodyCell>{item.title}</BodyCell>
                <BodyCell>{formatPrice(item.amount)}円</BodyCell>
                <BodyCell>編集アイコン</BodyCell>
                <BodyCell>削除アイコン</BodyCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
