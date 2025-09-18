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

import { toaster } from '@/components/ui/toaster'
import { formatDateJa } from '@/share/utils/format/dateFormatters'
import { kindToJa } from '@/share/utils/format/labelFormatters'
import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type Kind } from '@/models/constants/kind'

interface CreateDialogCardProps {
  handleCreateMoneyFlow: (request: CreateMoneyFlowRequest) => void
  onCheckedChange: ({ checked }: { checked: boolean }) => void
  isIncome: boolean
  isDialogOpen: boolean
  onDialogOpenChange: (open: boolean) => void
  jumpToMonthByOccurredDate: (occurred: string) => void
}

export const CreateDialogCard = ({
  handleCreateMoneyFlow,
  onCheckedChange,
  isIncome,
  isDialogOpen,
  onDialogOpenChange,
  jumpToMonthByOccurredDate,
}: CreateDialogCardProps) => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() // デフォルトのフォーム送信を防止

    const formData = new FormData(event.target as HTMLFormElement)
    const kindData = formData.get('kind') as Kind
    const occurredDateData = formData.get('occurred_date') as string
    const titleData = formData.get('title') as string
    const amountData = formData.get('amount') as string

    try {
      handleCreateMoneyFlow({
        title: titleData,
        amount: Number(amountData),
        occurred_date: occurredDateData,
        kind: kindData,
      })

      jumpToMonthByOccurredDate(occurredDateData)

      const kindLabel = kindToJa(kindData)
      const occurredJa = formatDateJa(occurredDateData)
      const amountStr = Number(amountData).toLocaleString('ja-JP')

      toaster.create({
        description: `「【種別】${kindLabel}【発生日】${occurredJa}【タイトル】${titleData}【金額】${amountStr}円」のデータを登録しました。`,
        type: 'success',
      })
    } catch {
      toaster.create({
        description: 'データの登録に失敗しました。',
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
        open={isDialogOpen} //現状
        onOpenChange={(event) => {
          onDialogOpenChange(event.open)
        }}
      >
        <Dialog.Trigger asChild>
          <Button color={'black'} bgColor={'orange.100'} borderColor={'black'}>
            収支を登録する
          </Button>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius={'2xl'} bgColor={'orange.100'}>
              <Dialog.Header justifyContent={'center'}>
                <Dialog.Title>収支登録</Dialog.Title>
              </Dialog.Header>

              <form onSubmit={handleSubmit}>
                <Dialog.Body py={2}>
                  <Stack gap={'3'}>
                    <Field.Root>
                      <Switch.Root
                        checked={isIncome}
                        onCheckedChange={onCheckedChange}
                        size='lg'
                        name='kind'
                        value='income'
                      >
                        <Switch.HiddenInput />
                        <Input type={'hidden'} name={'kind'} value={'expense'} />
                        <Switch.Label fontWeight={'bold'}>収支選択</Switch.Label>
                        <Switch.Control w='65px' bg={isIncome ? 'orange.500' : 'blue.500'}>
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
                        bgColor={'orange.300'}
                        borderColor={'black'}
                      >
                        登録する
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
                        >
                          収支一覧に戻る
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
