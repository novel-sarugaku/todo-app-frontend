import { Box, Table } from '@chakra-ui/react'
import { CiMemoPad } from 'react-icons/ci'
import { AiTwotoneDelete } from 'react-icons/ai'

import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'
import { type Kind } from '@/models/constants/kind'
import { formatMonthly, formatDate } from '@/share/utils/format/dateFormatters'

interface MainRootPresentationalProps {
  items: moneyFlowData[]
  totalAmount: number
  kindFlag: Kind
}

export const MoneyFlowDetailTableCard = ({
  items,
  totalAmount,
  kindFlag,
}: MainRootPresentationalProps) => {
  const kindJa = {
    income: '収入',
    expense: '支出',
  }

  const kindTableColor = {
    income: 'orange',
    expense: 'blue',
  }

  const targetDate = items[0].occurred_date

  const detailHeaderCols = [kindJa[kindFlag].concat('日'), 'タイトル', '金額', '編集', '削除']

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
            <Table.Row bg={`${kindTableColor[kindFlag]}.500`}>
              <Table.ColumnHeader
                textAlign={'center'}
                color={'white'}
                fontWeight={'bold'}
                borderColor={'white'}
              >
                {formatMonthly(targetDate)}合計{kindJa[kindFlag]}額
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row bg={`${kindTableColor[kindFlag]}.100`}>
              <BodyCell>{totalAmount.toLocaleString('ja-JP')}円</BodyCell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>

      <Table.Root size={'sm'} showColumnBorder>
        <Table.Header>
          <Table.Row bg={`${kindTableColor[kindFlag]}.500`}>
            {detailHeaderCols.map((col) => (
              <>
                <Table.ColumnHeader
                  textAlign={'center'}
                  color={'white'}
                  fontWeight={'bold'}
                  borderColor={'white'}
                >
                  {col}
                </Table.ColumnHeader>
              </>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            .filter((item) => item.kind === kindFlag)
            .map((item, index) => (
              <Table.Row
                key={item.id}
                bg={
                  index % 2 === 0
                    ? `${kindTableColor[kindFlag]}.100`
                    : `${kindTableColor[kindFlag]}.50`
                }
              >
                <BodyCell>{formatDate(item.occurred_date)}</BodyCell>
                <BodyCell>{item.title}</BodyCell>
                <BodyCell>{item.amount.toLocaleString('ja-JP')}円</BodyCell>
                <BodyCell>
                  <Box display={'flex'} justifyContent={'center'}>
                    <CiMemoPad />
                  </Box>
                </BodyCell>
                <BodyCell>
                  <Box display={'flex'} justifyContent={'center'}>
                    <AiTwotoneDelete />
                  </Box>
                </BodyCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
