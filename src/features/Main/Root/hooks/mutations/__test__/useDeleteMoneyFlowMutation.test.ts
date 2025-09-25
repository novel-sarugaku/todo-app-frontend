import { act } from 'react'
import { describe, it, vi, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import { useQueryClient } from '@tanstack/react-query'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useDeleteMoneyFlowMutation } from '../useDeleteMoneyFlowMutation'
import { moneyFlowsQueryKeys } from '@/features/Main/Root/hooks/queries/queryKeys'
import * as moneyFlowsService from '@/services/internal/backend/v1/moneyFlows'
import { type DeleteMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'

const mockDeleteMoneyFlowRequest: DeleteMoneyFlowRequest = {
  id: 1,
}

describe('useDeleteMoneyFlowMutation', () => {
  describe('正常系', () => {
    it('収支データ削除APIの呼び出しに成功した場合、invalidateQueriesが呼ばれる', async () => {
      vi.spyOn(moneyFlowsService, 'deleteMoneyFlow').mockResolvedValue(undefined)

      const { result } = customRenderHook(() => {
        const mockQueryClient = useQueryClient()
        const mockuseDeleteMoneyFlowMutation = useDeleteMoneyFlowMutation()
        return { mockQueryClient, mockuseDeleteMoneyFlowMutation }
      })

      const invalidateSpy = vi.spyOn(result.current.mockQueryClient, 'invalidateQueries')

      act(() => {
        result.current.mockuseDeleteMoneyFlowMutation.mutate(mockDeleteMoneyFlowRequest)
      })

      await waitFor(() => {
        expect(result.current.mockuseDeleteMoneyFlowMutation.isSuccess).toBe(true)
      })

      expect(result.current.mockuseDeleteMoneyFlowMutation.data).toEqual(undefined)
      expect(invalidateSpy).toHaveBeenCalledTimes(1)
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: moneyFlowsQueryKeys.all,
      })
    })
  })

  describe('異常系', () => {
    it('収支データ削除APIの呼び出しに失敗した場合、エラーが返される', async () => {
      const mockError = new Error('収支データの削除に失敗しました')

      vi.spyOn(moneyFlowsService, 'deleteMoneyFlow').mockRejectedValue(mockError)

      const { result } = customRenderHook(() => useDeleteMoneyFlowMutation())

      act(() => {
        result.current.mutate(mockDeleteMoneyFlowRequest)
      })

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })

      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.error?.message).toBe('収支データの削除に失敗しました')
    })
  })
})
