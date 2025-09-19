import { useState } from 'react'

import { useUpdateMoneyFlowMutation } from '../mutations/useUpdateMoneyFlowMutation'
import { type UpdateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type Kind } from '@/models/constants/kind'

export const useUpdateMoneyFlowDialogHandler = () => {
  const mutation = useUpdateMoneyFlowMutation()

  const [upDateId, setUpdateId] = useState<number | null>(null)

  const [kind, setKind] = useState<Kind>('expense')
  const isIncomeForUpdate = kind === 'income'

  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false)
  const closeDialog = () => {
    setUpdateDialogOpen(false)
  }

  const onUpdateDialogOpenChange = (open: boolean) => {
    setUpdateDialogOpen(open)
  }

  // 編集完了ボタンを押したときに呼ぶ関数
  const handleUpdateMoneyFlow = (request: UpdateMoneyFlowRequest) => {
    mutation.mutate(request)
    closeDialog() // 成功したら閉じる
  }

  // 収支選択スイッチを切り替えたときに呼ばれる関数
  const onCheckedChangeForUpdate = ({ checked }: { checked: boolean }) => {
    setKind(checked ? 'income' : 'expense') // checked === true → setKind('income') → isIncomeがtrue。checked === false → setKind('expense') → isIncomeがfalse
  }

  const onClickUpdateDialog = (id: number) => {
    setUpdateId(id)
  }

  const onCloseUpdateDialog = () => {
    setUpdateId(null)
  }

  return {
    handleUpdateMoneyFlow,
    onCheckedChangeForUpdate,
    isIncomeForUpdate,
    isUpdateDialogOpen,
    onUpdateDialogOpenChange,
    upDateId,
    onClickUpdateDialog,
    onCloseUpdateDialog,
  }
}
