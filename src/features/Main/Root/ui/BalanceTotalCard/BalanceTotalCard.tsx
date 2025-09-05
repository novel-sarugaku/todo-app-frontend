import { Box, Table } from '@chakra-ui/react'

import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'
import { formatPrice } from '@/features/Main/Root/hooks/handlers/formatters'
import { balanceTotal } from '@/features/Main/Root/hooks/handlers/amountCalculators'
import { buildYearMonthLabelFromItems } from '@/features/Main/Root/hooks/handlers/labelHandlers'

interface MainRootPresentationalProps {
  items: moneyFlowData[]
}

export const BalanceTotalCard = ({ items }: MainRootPresentationalProps) => {
  const balanceTotalValue = balanceTotal(items)
  const yearAndMonthLabel = buildYearMonthLabelFromItems(items)

  return (
    <>
      <Box textAlign={'start'}>
        <Table.Root size='sm' showColumnBorder display={'inline-table'} w={'100%'}>
          <Table.Header>
            <Table.Row bg={'yellow.300'}>
              <Table.ColumnHeader
                textAlign={'center'}
                fontWeight={'bold'}
                border={'1px solid black'}
              >
                {yearAndMonthLabel} 収支合計額
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='center' borderColor={'black'} border={'1px solid black'}>
                {formatPrice(balanceTotalValue)}円
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </>
  )
}
