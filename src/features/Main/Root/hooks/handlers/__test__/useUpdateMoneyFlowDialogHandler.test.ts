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

    // it('onDialogOpenChangeがtrueのときはisDialogOpenがtrueになる、onDialogOpenChangeがfalseのときはisDialogOpenがfalseになる', () => {
    //   const { result } = customRenderHook(() => useCreateMoneyFlowDialogHandler())

    //   act(() => {
    //     result.current.onDialogOpenChange(true)
    //   })

    //   expect(result.current.isDialogOpen).toBe(true)

    //   act(() => {
    //     result.current.onDialogOpenChange(false)
    //   })

    //   expect(result.current.isDialogOpen).toBe(false)
    // })

//     it('onCheckedChangeでchecked=trueのときisIncome=trueになり、checked=falseのときisIncome=falseになる', () => {
//       const { result } = customRenderHook(() => useCreateMoneyFlowDialogHandler())

//       expect(result.current.isIncome).toBe(false) // expense（初期値）

//       act(() => {
//         result.current.onCheckedChange({ checked: true }) // incomeに切り替え
//       })

//       expect(result.current.isIncome).toBe(true) // income

//       act(() => {
//         result.current.onCheckedChange({ checked: false }) // expenseに切り替え
//       })

//       expect(result.current.isIncome).toBe(false) // expense
//     })
  })
})