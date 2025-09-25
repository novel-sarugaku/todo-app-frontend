import { Box, Table } from '@chakra-ui/react'

import { UpdateDialogCard } from '@/features/Main/Root/ui/MoneyFlowDetailTableCard/UpdateDialogCard/UpdateDialogCard'
import { DeleteDialogCard } from '@/features/Main/Root/ui/MoneyFlowDetailTableCard/DeleteDialogCard/DeleteDialogCard'
import { formatMonthly, formatDate } from '@/share/utils/format/dateFormatters'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'
import { type Kind } from '@/models/constants/kind'
import { type UpdateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type DeleteMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'

interface MoneyFlowDetailTableCardProps {
  onSubmitTargetDate: (year: number, monthIndex0to11: number) => void
  items: moneyFlowData[]
  totalAmount: number
  kindFlag: Kind
  handleUpdateMoneyFlow: (request: UpdateMoneyFlowRequest) => void
  onCheckedChangeForUpdate: (checked: { checked: boolean }) => void
  isIncomeForUpdate: boolean
  isUpdateDialogOpen: boolean
  onUpdateDialogOpenChange: (open: boolean) => void
  upDateId: number | null
  onClickUpdateDialog: (id: number) => void
  onCloseUpdateDialog: () => void
  handleDeleteMoneyFlow: (request: DeleteMoneyFlowRequest) => void
  isDeleteDialogOpen: boolean
  onDeleteDialogOpenChange: (open: boolean) => void
  deleteId: number | null
  onClickDeleteDialog: (id: number) => void
  onCloseDeleteDialog: () => void
}

export const MoneyFlowDetailTableCard = ({
  onSubmitTargetDate,
  items,
  totalAmount,
  kindFlag,
  handleUpdateMoneyFlow,
  onCheckedChangeForUpdate,
  isIncomeForUpdate,
  isUpdateDialogOpen,
  onUpdateDialogOpenChange,
  upDateId,
  onClickUpdateDialog,
  onCloseUpdateDialog,
  handleDeleteMoneyFlow,
  isDeleteDialogOpen,
  onDeleteDialogOpenChange,
  deleteId,
  onClickDeleteDialog,
  onCloseDeleteDialog,
}: MoneyFlowDetailTableCardProps) => {
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
                    <UpdateDialogCard
                      item={item}
                      onSubmitTargetDate={onSubmitTargetDate}
                      handleUpdateMoneyFlow={handleUpdateMoneyFlow}
                      onCheckedChangeForUpdate={onCheckedChangeForUpdate}
                      isIncomeForUpdate={isIncomeForUpdate}
                      isUpdateDialogOpen={isUpdateDialogOpen}
                      onUpdateDialogOpenChange={onUpdateDialogOpenChange}
                      upDateId={upDateId}
                      onClickUpdateDialog={onClickUpdateDialog}
                      onCloseUpdateDialog={onCloseUpdateDialog}
                    />
                  </Box>
                </BodyCell>
                <BodyCell>
                  <Box display={'flex'} justifyContent={'center'}>
                    <DeleteDialogCard
                      item={item}
                      handleDeleteMoneyFlow={handleDeleteMoneyFlow}
                      isDeleteDialogOpen={isDeleteDialogOpen}
                      onDeleteDialogOpenChange={onDeleteDialogOpenChange}
                      deleteId={deleteId}
                      onClickDeleteDialog={onClickDeleteDialog}
                      onCloseDeleteDialog={onCloseDeleteDialog}
                    />
                  </Box>
                </BodyCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
