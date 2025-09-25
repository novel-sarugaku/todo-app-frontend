import { Button, Dialog, Field, Portal, Stack, Text, Box, Grid } from '@chakra-ui/react'
import { AiTwotoneDelete } from 'react-icons/ai'

import { toaster } from '@/share/lib/createToaster'
import { formatDate } from '@/share/utils/format/dateFormatters'
import { kindToJa } from '@/share/utils/format/labelFormatters'
import { type DeleteMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

interface DeleteDialogCardProps {
  item: moneyFlowData
  handleDeleteMoneyFlow: (request: DeleteMoneyFlowRequest) => void
  isDeleteDialogOpen: boolean
  onDeleteDialogOpenChange: (open: boolean) => void
  deleteId: number | null
  onClickDeleteDialog: (id: number) => void
  onCloseDeleteDialog: () => void
}

export const DeleteDialogCard = ({
  item,
  handleDeleteMoneyFlow,
  isDeleteDialogOpen,
  onDeleteDialogOpenChange,
  deleteId,
  onClickDeleteDialog,
  onCloseDeleteDialog,
}: DeleteDialogCardProps) => {
  const onClickDeleteData = () => {
    try {
      handleDeleteMoneyFlow({ id: item.id })

      toaster.create({
        description: `「【種別】${kindToJa(item.kind)}【発生日】${formatDate(item.occurred_date)}【タイトル】${item.title}【金額】${item.amount.toLocaleString('ja-JP')}円」を削除しました。`,
        type: 'success',
      })
    } catch (e) {
      toaster.create({
        title: 'データの削除に失敗しました。',
        description: (e as Error).message,
        type: 'error',
      })
    }
  }

  return (
    <>
      <Dialog.Root
        open={item.id == deleteId && isDeleteDialogOpen} //現状
        onOpenChange={(event) => {
          onDeleteDialogOpenChange(event.open)
          onClickDeleteDialog(item.id)
        }}
      >
        <Dialog.Trigger asChild>
          <AiTwotoneDelete data-testid='delete-dialog-trigger' />
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius={'2xl'} bgColor={'red.300'}>
              <Dialog.Header justifyContent={'center'}>
                <Dialog.Title>以下の登録を削除しますか？</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body py={2}>
                <Stack gap={'3'}>
                  <Field.Root>
                    <Field.Label fontWeight={'bold'}>収支種別</Field.Label>
                    <Text
                      bgColor={'white'}
                      border={'1px solid'}
                      borderColor={'black'}
                      p={2}
                      borderRadius={'md'}
                      w={'100%'}
                    >
                      {kindToJa(item.kind)}
                    </Text>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label fontWeight={'bold'}>発生日</Field.Label>
                    <Text
                      bgColor={'white'}
                      border={'1px solid'}
                      borderColor={'black'}
                      p={2}
                      borderRadius={'md'}
                      w={'100%'}
                    >
                      {formatDate(item.occurred_date)}
                    </Text>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label fontWeight={'bold'}>タイトル</Field.Label>
                    <Text
                      bgColor={'white'}
                      border={'1px solid'}
                      borderColor={'black'}
                      p={2}
                      borderRadius={'md'}
                      w={'100%'}
                    >
                      {item.title}
                    </Text>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label fontWeight={'bold'}>金額</Field.Label>
                    <Text
                      bgColor={'white'}
                      border={'1px solid'}
                      borderColor={'black'}
                      p={2}
                      borderRadius={'md'}
                      w={'100%'}
                    >
                      {item.amount.toLocaleString('ja-JP')}円
                    </Text>
                  </Field.Root>
                </Stack>

                <Box pt={4} pb={7}>
                  <Grid templateColumns={'1fr auto 1fr'} alignItems={'center'}>
                    <Box />

                    <Button
                      type={'submit'}
                      color={'white'}
                      fontWeight={'bold'}
                      bgColor={'red.600'}
                      borderColor={'black'}
                      onClick={() => {
                        onClickDeleteData()
                      }}
                    >
                      削除
                    </Button>

                    <Dialog.ActionTrigger asChild>
                      <Button
                        color={'black'}
                        fontWeight={'bold'}
                        bgColor={'gray.300'}
                        borderColor={'black'}
                        h={'30px'}
                        justifySelf={'end'}
                        mr={7}
                        onClick={() => {
                          onCloseDeleteDialog()
                        }}
                      >
                        戻る
                      </Button>
                    </Dialog.ActionTrigger>
                  </Grid>
                </Box>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
