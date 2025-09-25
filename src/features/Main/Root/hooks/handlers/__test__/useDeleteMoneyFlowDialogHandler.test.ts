import { describe, it, vi, expect } from 'vitest'
import { act } from 'react'
import { type UseMutationResult } from '@tanstack/react-query'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useDeleteMoneyFlowDialogHandler } from '@/features/Main/Root/hooks/handlers/useDeleteMoneyFlowDialogHandler'
import * as useDeleteMoneyFlowMutation from '@/features/Main/Root/hooks/mutations/useDeleteMoneyFlowMutation'
import { type DeleteMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'

// Mocking the useDeleteMoneyFlowMutation hook
const mockMutate = vi.fn()
vi.spyOn(useDeleteMoneyFlowMutation, 'useDeleteMoneyFlowMutation').mockReturnValue({
  mutate: mockMutate,
} as unknown as UseMutationResult<unknown, Error, DeleteMoneyFlowRequest>)

const mockDeleteMoneyFlowRequest: DeleteMoneyFlowRequest = {
  id: 1,
}

describe('useDeleteMoneyFlowDialogHandler', () => {
  describe('正常系', () => {
    it('handleDeleteMoneyFlowが呼ばれたとき、mutateに正しいリクエストが渡され、削除後にisDeleteDialogOpenがfalseになる', () => {
      const { result } = customRenderHook(() => useDeleteMoneyFlowDialogHandler())

      act(() => {
        result.current.handleDeleteMoneyFlow(mockDeleteMoneyFlowRequest)
      })

      expect(mockMutate).toHaveBeenCalledTimes(1)
      expect(mockMutate).toHaveBeenCalledWith(mockDeleteMoneyFlowRequest)

      expect(result.current.isDeleteDialogOpen).toBe(false)
    })

    it('onDeleteDialogOpenChangeがtrueのときはisDeleteDialogOpenがtrueになる、onDeleteDialogOpenChangeがfalseのときはisDeleteDialogOpenがfalseになる', () => {
      const { result } = customRenderHook(() => useDeleteMoneyFlowDialogHandler())

      act(() => {
        result.current.onDeleteDialogOpenChange(true)
      })

      expect(result.current.isDeleteDialogOpen).toBe(true)

      act(() => {
        result.current.onDeleteDialogOpenChange(false)
      })

      expect(result.current.isDeleteDialogOpen).toBe(false)
    })

    it('onClickDeleteDialogを発火させたときにsetDeleteIdに正しくid(number)が渡される', () => {
      const { result } = customRenderHook(() => useDeleteMoneyFlowDialogHandler())

      act(() => {
        result.current.onClickDeleteDialog(1)
      })

      expect(result.current.deleteId).toBe(1)
    })

    it('onCloseDeleteDialogを発火させたときにsetDeleteIdに正しくnullが渡される', () => {
      const { result } = customRenderHook(() => useDeleteMoneyFlowDialogHandler())

      act(() => {
        result.current.onCloseDeleteDialog()
      })

      expect(result.current.deleteId).toBe(null)
    })
  })
})
