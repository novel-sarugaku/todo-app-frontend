import { act } from 'react'
import { describe, it, vi, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import { useQueryClient } from '@tanstack/react-query'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useUpdateMoneyFlowMutation } from '../useUpdateMoneyFlowMutation'
import { moneyFlowsQueryKeys } from '@/features/Main/Root/hooks/queries/queryKeys'
import * as moneyFlowsService from '@/services/internal/backend/v1/moneyFlows'
import { type UpdateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type UpdateMoneyFlowResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'

const mockUpdateMoneyFlowRequest: UpdateMoneyFlowRequest = {
  id: 1,
  title: 'mockTitele',
  amount: 1000,
  occurred_date: '2025-01-01T01:22:50.540Z',
  kind: 'income',
}

const mockUpdateMoneyFlowResponse: UpdateMoneyFlowResponse = {
  id: 1,
  title: 'mockTitele',
  amount: 1000,
  occurred_date: '2025-01-01T01:22:50.540Z',
  kind: 'income',
}

describe('useUpdateMoneyFlowMutation', () => {
  describe('正常系', () => {
    it('収支データ編集APIの呼び出しに成功した場合、正しいレスポンスが返り、invalidateQueriesが呼ばれる', async () => {
      vi.spyOn(moneyFlowsService, 'updateMoneyFlow').mockResolvedValue(mockUpdateMoneyFlowResponse)

      const { result } = customRenderHook(() => {
        const mockQueryClient = useQueryClient()
        const mockUpdateMoneyFlowMutation = useUpdateMoneyFlowMutation()
        return { mockQueryClient, mockUpdateMoneyFlowMutation }
      })

      const invalidateSpy = vi.spyOn(result.current.mockQueryClient, 'invalidateQueries')

      act(() => {
        result.current.mockUpdateMoneyFlowMutation.mutate(mockUpdateMoneyFlowRequest)
      })

      await waitFor(() => {
        expect(result.current.mockUpdateMoneyFlowMutation.isSuccess).toBe(true)
      })

      expect(result.current.mockUpdateMoneyFlowMutation.data).toEqual(mockUpdateMoneyFlowResponse)
      expect(invalidateSpy).toHaveBeenCalledTimes(1)
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: moneyFlowsQueryKeys.all,
      })
    })
  })

  describe('異常系', () => {
    it('収支データ編集APIの呼び出しに失敗した場合、エラーが返される', async () => {
      const mockError = new Error('収支データの編集に失敗しました')

      vi.spyOn(moneyFlowsService, 'updateMoneyFlow').mockRejectedValue(mockError)

      const { result } = customRenderHook(() => useUpdateMoneyFlowMutation())

      act(() => {
        result.current.mutate(mockUpdateMoneyFlowRequest)
      })

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })

      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.error?.message).toBe('収支データの編集に失敗しました')
    })
  })
})
