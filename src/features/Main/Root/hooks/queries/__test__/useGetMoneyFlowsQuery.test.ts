import { describe, it, vi, expect } from 'vitest'
import { waitFor } from '@testing-library/react'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useGetMoneyFlowsQuery } from '../useGetMoneyFlowsQuery'
import * as moneyFlowsService from '@/services/internal/backend/v1/moneyFlows'
import { type GetMoneyFlowsResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'

const mockMoneyFlowItemResponse: GetMoneyFlowsResponse = [
  {
    id: 1,
    title: 'mockTitele',
    amount: 1000,
    occurred_date: '2025-01-01T01:22:50.540Z',
    kind: 'income',
  },
]

describe('useGetMoneyFlowsQuery', () => {
  describe('正常系', () => {
    it('収支データ全件取得APIの呼び出しに成功した場合、正しいレスポンスが返る', async () => {
      vi.spyOn(moneyFlowsService, 'getMoneyFlows').mockResolvedValue(mockMoneyFlowItemResponse)

      const { result } = customRenderHook(() => useGetMoneyFlowsQuery())

      await waitFor(() => {
        expect(result.current.data).toEqual(mockMoneyFlowItemResponse)
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.isSuccess).toBe(true)
    })
  })

  describe('異常系', () => {
    it('収支データ全件取得APIの呼び出しに失敗した場合、エラーが返される', async () => {
      const mockError = new Error('収支データ全件取得に失敗しました')
      vi.spyOn(moneyFlowsService, 'getMoneyFlows').mockRejectedValue(mockError)

      const { result } = customRenderHook(() => useGetMoneyFlowsQuery())

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })

      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.error?.message).toBe('収支データ全件取得に失敗しました')
    })
  })
})
