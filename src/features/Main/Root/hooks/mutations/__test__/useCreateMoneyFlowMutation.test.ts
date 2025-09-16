import { act } from 'react'
import { describe, it, vi, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import { useQueryClient } from '@tanstack/react-query'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useCreateMoneyFlowMutation } from '../useCreateMoneyFlowMutation'
import { moneyFlowsQueryKeys } from '@/features/Main/Root/hooks/queries/queryKeys'
import * as moneyFlowsService from '@/services/internal/backend/v1/moneyFlows'
import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type CreateMoneyFlowResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'

const mockCreateMoneyFlowRequest: CreateMoneyFlowRequest = {
  title: 'mockTitele',
  amount: 1000,
  occurred_date: '2025-01-01T01:22:50.540Z',
  kind: 'income',
}

const mockCreateMoneyFlowResponse: CreateMoneyFlowResponse = {
  id: 1,
  title: 'mockTitele',
  amount: 1000,
  occurred_date: '2025-01-01T01:22:50.540Z',
  kind: 'income',
}

describe('useCreateMoneyFlowMutation', () => {
  describe('正常系', () => {
    it('収支データ登録APIの呼び出しに成功した場合、正しいレスポンスが返り、invalidateQueriesが呼ばれる', async () => {
      vi.spyOn(moneyFlowsService, 'createMoneyFlow').mockResolvedValue(mockCreateMoneyFlowResponse)

      const { result } = customRenderHook(() => {
        const mockQueryClient = useQueryClient()
        const mockCreateMoneyFlowMutation = useCreateMoneyFlowMutation()
        return { mockQueryClient, mockCreateMoneyFlowMutation }
      })

      const invalidateSpy = vi.spyOn(result.current.mockQueryClient, 'invalidateQueries')

      act(() => {
        result.current.mockCreateMoneyFlowMutation.mutate(mockCreateMoneyFlowRequest)
      })

      await waitFor(() => {
        expect(result.current.mockCreateMoneyFlowMutation.isSuccess).toBe(true)
      })

      expect(result.current.mockCreateMoneyFlowMutation.data).toEqual(mockCreateMoneyFlowResponse)
      expect(invalidateSpy).toHaveBeenCalledTimes(1)
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: moneyFlowsQueryKeys.all,
      })
    })
  })

  describe('異常系', () => {
    it('収支データ登録APIの呼び出しに失敗した場合、エラーが返される', async () => {
      const mockError = new Error('収支データの登録に失敗しました')

      vi.spyOn(moneyFlowsService, 'createMoneyFlow').mockRejectedValue(mockError)

      const { result } = customRenderHook(() => useCreateMoneyFlowMutation())

      act(() => {
        result.current.mutate(mockCreateMoneyFlowRequest)
      })

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })

      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.error?.message).toBe('収支データの登録に失敗しました')
    })
  })
})
