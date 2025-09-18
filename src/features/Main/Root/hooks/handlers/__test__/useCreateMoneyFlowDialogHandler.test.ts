import { describe, it, vi, expect } from 'vitest'
import { act } from 'react'
import { type UseMutationResult } from '@tanstack/react-query'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useCreateMoneyFlowDialogHandler } from '@/features/Main/Root/hooks/handlers/useCreateMoneyFlowDialogHandler'
import * as createMoneyFlowMutation from '@/features/Main/Root/hooks/mutations/useCreateMoneyFlowMutation'
import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type CreateMoneyFlowResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'

// Mocking the useCreateMoneyFlowMutation hook
const mockMutate = vi.fn()
vi.spyOn(createMoneyFlowMutation, 'useCreateMoneyFlowMutation').mockReturnValue({
  mutate: mockMutate,
} as unknown as UseMutationResult<CreateMoneyFlowResponse, Error, CreateMoneyFlowRequest>)

const mockCreateMoneyFlowRequest: CreateMoneyFlowRequest = {
  title: 'mockTitele',
  amount: 1000,
  occurred_date: '2025-01-01T01:22:50.540Z',
  kind: 'income',
}

describe('useCreateMoneyFlowHandler', () => {
  describe('正常系', () => {
    it('handleCreateMoneyFlowが呼ばれたとき、mutateに正しいリクエストが渡され、登録後にisDialogOpenがfalseになる', () => {
      const { result } = customRenderHook(() => useCreateMoneyFlowDialogHandler())

      act(() => {
        result.current.handleCreateMoneyFlow(mockCreateMoneyFlowRequest)
      })

      expect(mockMutate).toHaveBeenCalledTimes(1)
      expect(mockMutate).toHaveBeenCalledWith(mockCreateMoneyFlowRequest)

      expect(result.current.isDialogOpen).toBe(false)
    })

    it('onDialogOpenChangeがtrueのときはisDialogOpenがtrueになる、onDialogOpenChangeがfalseのときはisDialogOpenがfalseになる', () => {
      const { result } = customRenderHook(() => useCreateMoneyFlowDialogHandler())

      act(() => {
        result.current.onDialogOpenChange(true)
      })

      expect(result.current.isDialogOpen).toBe(true)

      act(() => {
        result.current.onDialogOpenChange(false)
      })

      expect(result.current.isDialogOpen).toBe(false)
    })

    it('onCheckedChangeでchecked=trueのときisIncome=trueになり、checked=falseのときisIncome=falseになる', () => {
      const { result } = customRenderHook(() => useCreateMoneyFlowDialogHandler())

      expect(result.current.isIncome).toBe(false) // expense（初期値）

      act(() => {
        result.current.onCheckedChange({ checked: true }) // incomeに切り替え
      })

      expect(result.current.isIncome).toBe(true) // income

      act(() => {
        result.current.onCheckedChange({ checked: false }) // expenseに切り替え
      })

      expect(result.current.isIncome).toBe(false) // expense
    })
  })
})
