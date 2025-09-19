import { describe, it, vi, expect } from 'vitest'
import { act } from 'react'
import { type UseMutationResult } from '@tanstack/react-query'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useUpdateMoneyFlowDialogHandler } from '@/features/Main/Root/hooks/handlers/useUpdateMoneyFlowDialogHandler'
import * as updateMoneyFlowMutation from '@/features/Main/Root/hooks/mutations/useUpdateMoneyFlowMutation'
import { type UpdateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type UpdateMoneyFlowResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'

// Mocking the useUpdateMoneyFlowMutation hook
const mockMutate = vi.fn()
vi.spyOn(updateMoneyFlowMutation, 'useUpdateMoneyFlowMutation').mockReturnValue({
  mutate: mockMutate,
} as unknown as UseMutationResult<UpdateMoneyFlowResponse, Error, UpdateMoneyFlowRequest>)

const mockUpdateMoneyFlowRequest: UpdateMoneyFlowRequest = {
  id: 1,
  title: 'mockTitele',
  amount: 1000,
  occurred_date: '2025-01-01T01:22:50.540Z',
  kind: 'income',
}

describe('useUpdateMoneyFlowDialogHandler', () => {
  describe('正常系', () => {
    it('handleUpdateMoneyFlowが呼ばれたとき、mutateに正しいリクエストが渡され、編集後にisUpdateDialogOpenがfalseになる', () => {
      const { result } = customRenderHook(() => useUpdateMoneyFlowDialogHandler())

      act(() => {
        result.current.handleUpdateMoneyFlow(mockUpdateMoneyFlowRequest)
      })

      expect(mockMutate).toHaveBeenCalledTimes(1)
      expect(mockMutate).toHaveBeenCalledWith(mockUpdateMoneyFlowRequest)

      expect(result.current.isUpdateDialogOpen).toBe(false)
    })

    it('onUpdateDialogOpenChangeがtrueのときはisUpdateDialogOpenがtrueになる、onUpdateDialogOpenChangeがfalseのときはisUpdateDialogOpenがfalseになる', () => {
      const { result } = customRenderHook(() => useUpdateMoneyFlowDialogHandler())

      act(() => {
        result.current.onUpdateDialogOpenChange(true)
      })

      expect(result.current.isUpdateDialogOpen).toBe(true)

      act(() => {
        result.current.onUpdateDialogOpenChange(false)
      })

      expect(result.current.isUpdateDialogOpen).toBe(false)
    })

    it('onUpdateDialogOpenChangeでchecked=trueのときisIncome=trueになり、checked=falseのときisIncome=falseになる', () => {
      const { result } = customRenderHook(() => useUpdateMoneyFlowDialogHandler())

      expect(result.current.isIncomeForUpdate).toBe(false) // expense（初期値）

      act(() => {
        result.current.onCheckedChangeForUpdate({ checked: true }) // incomeに切り替え
      })

      expect(result.current.isIncomeForUpdate).toBe(true) // income

      act(() => {
        result.current.onCheckedChangeForUpdate({ checked: false }) // expenseに切り替え
      })

      expect(result.current.isIncomeForUpdate).toBe(false) // expense
    })

    it('onClickUpdateDialogを発火させたときにsetUpdateIdに正しくid(number)が渡される', () => {
      const { result } = customRenderHook(() => useUpdateMoneyFlowDialogHandler())

      act(() => {
        result.current.onClickUpdateDialog(1)
      })

      expect(result.current.upDateId).toBe(1)
    })

    it('onCloseUpdateDialogを発火させたときにsetUpdateIdに正しくnullが渡される', () => {
      const { result } = customRenderHook(() => useUpdateMoneyFlowDialogHandler())

      act(() => {
        result.current.onCloseUpdateDialog()
      })

      expect(result.current.upDateId).toBe(null)
    })
  })
})
