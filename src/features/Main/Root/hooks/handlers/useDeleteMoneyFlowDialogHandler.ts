import { useState } from 'react'

import { useDeleteMoneyFlowMutation } from '../mutations/useDeleteMoneyFlowMutation'
import { type DeleteMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'

export const useDeleteMoneyFlowDialogHandler = () => {
  const mutation = useDeleteMoneyFlowMutation()

  const [deleteId, setDeleteId] = useState<number | null>(null)

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const closeDialog = () => {
    setDeleteDialogOpen(false)
  }

  const onDeleteDialogOpenChange = (open: boolean) => {
    setDeleteDialogOpen(open)
  }

  // 削除ボタンを押したときに呼ぶ関数
  const handleDeleteMoneyFlow = (request: DeleteMoneyFlowRequest) => {
    mutation.mutate(request)
    closeDialog() // 成功したら閉じる
  }

  const onClickDeleteDialog = (id: number) => {
    setDeleteId(id)
  }

  const onCloseDeleteDialog = () => {
    setDeleteId(null)
  }

  return {
    handleDeleteMoneyFlow,
    isDeleteDialogOpen,
    onDeleteDialogOpenChange,
    deleteId,
    onClickDeleteDialog,
    onCloseDeleteDialog,
  }
}
