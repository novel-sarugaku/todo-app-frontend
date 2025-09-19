import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  Switch,
  Text,
  Box,
  Grid,
} from '@chakra-ui/react'
import { CiMemoPad } from 'react-icons/ci'

import { toaster } from '@/components/ui/toaster'
import { formatDate, formatDateLocal } from '@/share/utils/format/dateFormatters'
import { kindToJa } from '@/share/utils/format/labelFormatters'
import { type UpdateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type Kind } from '@/models/constants/kind'
import { type moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

interface UpdateDialogCardProps {
  item: moneyFlowData
  onSubmitTargetDate: (year: number, monthIndex0to11: number) => void
  handleUpdateMoneyFlow: (request: UpdateMoneyFlowRequest) => void
  onCheckedChangeForUpdate: (checked: { checked: boolean }) => void
  isIncomeForUpdate: boolean
  isUpdateDialogOpen: boolean
  onUpdateDialogOpenChange: (open: boolean) => void
  upDateId: number | null
  onClickUpdateDialog: (id: number) => void
  onCloseUpdateDialog: () => void
}

export const UpdateDialogCard = ({
  item,
  onSubmitTargetDate,
  handleUpdateMoneyFlow,
  onCheckedChangeForUpdate,
  isIncomeForUpdate,
  isUpdateDialogOpen,
  onUpdateDialogOpenChange,
  upDateId,
  onClickUpdateDialog,
  onCloseUpdateDialog,
}: UpdateDialogCardProps) => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() // デフォルトのフォーム送信を防止

    const formData = new FormData(event.target as HTMLFormElement)
    const kindData = formData.get('kind') as Kind
    const occurredDateData = formData.get('occurred_date') as string
    const titleData = formData.get('title') as string
    const amountData = formData.get('amount') as string

    const targetYear = occurredDateData.split('-')[0]

    try {
      if (Number(targetYear) < 1970) {
        throw new Error('1970年未満の年月の指定はできません。')
      }

      handleUpdateMoneyFlow({
        id: item.id,
        title: titleData,
        amount: Number(amountData),
        occurred_date: occurredDateData,
        kind: kindData,
      })

      const occurredDate = new Date(occurredDateData)

      onSubmitTargetDate(occurredDate.getFullYear(), occurredDate.getMonth())

      const kindLabel = kindToJa(kindData)
      const occurredJa = formatDate(occurredDate)
      const amountStr = Number(amountData).toLocaleString('ja-JP')

      toaster.create({
        description: `「【種別】${kindLabel}【発生日】${occurredJa}【タイトル】${titleData}【金額】${amountStr}円」にデータを編集しました。`,
        type: 'success',
      })
    } catch (e) {
      toaster.create({
        title: 'データの編集に失敗しました。',
        description: (e as Error).message,
        type: 'error',
      })
    }
  }

  return (
    <>
      {/* 「収支を登録する」ボタンを押す
      →Dialog.Triggerが内部的に「開く」イベントを発火
      →onOpenChangeが呼ばれる
      →その引数event.openがtrueになる
      →onDialogOpenChange(event.open)が呼ばれる
      →setDialogOpen(true)が実行 */}
      <Dialog.Root
        open={item.id == upDateId && isUpdateDialogOpen} //現状
        onOpenChange={(event) => {
          onUpdateDialogOpenChange(event.open)
          onClickUpdateDialog(item.id)
          onCheckedChangeForUpdate({ checked: item.kind == 'income' })
        }}
      >
        <Dialog.Trigger asChild>
          <CiMemoPad data-testid="update-dialog-trigger"/>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius={'2xl'} bgColor={'green.100'}>
              <Dialog.Header justifyContent={'center'}>
                <Dialog.Title>収支編集</Dialog.Title>
              </Dialog.Header>

              <form onSubmit={handleSubmit}>
                <Dialog.Body py={2}>
                  <Stack gap={'3'}>
                    <Field.Root>
                      <Switch.Root
                        checked={isIncomeForUpdate}
                        onCheckedChange={onCheckedChangeForUpdate}
                        size='lg'
                        name='kind'
                        value='income'
                      >
                        <Switch.HiddenInput />
                        <Input type={'hidden'} name={'kind'} value={'expense'} />
                        <Switch.Label fontWeight={'bold'}>収支選択</Switch.Label>
                        <Switch.Control w='65px' bg={isIncomeForUpdate ? 'orange.500' : 'blue.500'}>
                          <Switch.Thumb w='40px'>
                            <Switch.ThumbIndicator
                              fallback={
                                <Text textAlign='center' w='100%'>
                                  支出
                                </Text>
                              }
                            >
                              収入
                            </Switch.ThumbIndicator>
                          </Switch.Thumb>
                        </Switch.Control>
                      </Switch.Root>
                    </Field.Root>

                    <Field.Root>
                      <Field.Label fontWeight={'bold'}>発生日</Field.Label>
                      <Input
                        required //値を入力しない限りフォームを送信できない
                        type={'date'}
                        bgColor={'white'}
                        borderColor={'black'}
                        name='occurred_date'
                        defaultValue={formatDateLocal(item.occurred_date)}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label fontWeight={'bold'}>タイトル</Field.Label>
                      <Input
                        required
                        type={'string'}
                        bgColor={'white'}
                        borderColor={'black'}
                        name='title'
                        defaultValue={item.title}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label fontWeight={'bold'}>金額</Field.Label>
                      <Input
                        required
                        type={'number'}
                        bgColor={'white'}
                        borderColor={'black'}
                        name='amount'
                        min={1}
                        defaultValue={item.amount}
                      />
                    </Field.Root>
                  </Stack>

                  <Box pt={4} pb={7}>
                    <Grid templateColumns={'1fr auto 1fr'} alignItems={'center'}>
                      <Box />

                      <Button
                        type={'submit'}
                        color={'black'}
                        fontWeight={'bold'}
                        bgColor={'green.300'}
                        borderColor={'black'}
                      >
                        編集完了
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
                            onCloseUpdateDialog()
                          }}
                        >
                          戻る
                        </Button>
                      </Dialog.ActionTrigger>
                    </Grid>
                  </Box>
                </Dialog.Body>
              </form>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
