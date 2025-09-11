import { Box, Table } from '@chakra-ui/react'

import { formatMonthly } from '@/share/utils/format/dateFormatters'

interface MainRootPresentationalProps {
  targetDate: Date
  targetMonthlyTotalAmount: number
}

export const BalanceTotalCard = ({
  targetDate,
  targetMonthlyTotalAmount,
}: MainRootPresentationalProps) => {
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
                {formatMonthly(targetDate)} 収支合計額
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='center' borderColor={'black'} border={'1px solid black'}>
                {targetMonthlyTotalAmount.toLocaleString('ja-JP')}円
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </>
  )
}
