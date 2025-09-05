import { describe, it, vi, expect } from 'vitest'

import { customRenderHook } from '@/tests/helpers/customRenderHook'
import { useMoneyFlowListHandler } from '@/features/Main/Root/hooks/handlers/useMoneyFlowListHandler'
import * as getMoneyFlowsQuery from '@/features/Main/Root/hooks/queries/useGetMoneyFlowsQuery'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'
import type { UseQueryResult } from '@tanstack/react-query'
import type { GetMoneyFlowsResponse } from '@/models/api/internal/backend/v1/response/moneyFlows'

const mockMoneyFlowData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle1',
    amount: 550,
    occurred_date: '2025-09-10T12:00:00Z',
    kind: 'income',
  },
]

// Mocking the useGetMoneyFlowsQuer hook
const useGetMoneyFlowsQuerySpy = vi.spyOn(getMoneyFlowsQuery, 'useGetMoneyFlowsQuery')

describe('useMoneyFlowListHandler', () => {
  describe('正常系', () => {
    it('dataを返す', () => {
      useGetMoneyFlowsQuerySpy.mockReturnValue({
        data: mockMoneyFlowData,
      } as unknown as UseQueryResult<GetMoneyFlowsResponse>)

      const { result } = customRenderHook(() => useMoneyFlowListHandler())

      expect(result.current.data).toEqual(mockMoneyFlowData)
    })
  })

  it('dataがない場合、[]を返す', () => {
    useGetMoneyFlowsQuerySpy.mockReturnValue({
      data: undefined,
    } as unknown as UseQueryResult<GetMoneyFlowsResponse>)

    const { result } = customRenderHook(() => useMoneyFlowListHandler())
    console.log(result.current.data)

    expect(result.current.data).toEqual([])
  })
})
