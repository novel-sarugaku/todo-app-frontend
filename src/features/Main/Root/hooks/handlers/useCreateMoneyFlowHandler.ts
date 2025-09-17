import { useState } from 'react'

import { useCreateMoneyFlowMutation } from '../mutations/useCreateMoneyFlowMutation'
import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type Kind } from '@/models/constants/kind'

export const useCreateMoneyFlowHandler = () => {
  const mutation = useCreateMoneyFlowMutation()

  const [kind, setKind] = useState<Kind>('expense')
  const isIncome = kind === 'income'

  const [isDialogOpen, setDialogOpen] = useState(false)
  const closeDialog = () => {
    setDialogOpen(false)
  }

  const onDialogOpenChange = (open: boolean) => {
    setDialogOpen(open)
  }

  // 登録ボタンを押したときに呼ぶ関数
  const handleCreateMoneyFlow = (request: CreateMoneyFlowRequest) => {
    mutation.mutate(request)
    closeDialog() // 成功したら閉じる
  }

  // 収支選択スイッチを切り替えたときに呼ばれる関数
  const onCheckedChange = ({ checked }: { checked: boolean }) => {
    setKind(checked ? 'income' : 'expense') // checked === true → setKind('income') → isIncomeがtrue。checked === false → setKind('expense') → isIncomeがfalse
  }

  return { handleCreateMoneyFlow, onCheckedChange, isIncome, isDialogOpen, onDialogOpenChange }
}
