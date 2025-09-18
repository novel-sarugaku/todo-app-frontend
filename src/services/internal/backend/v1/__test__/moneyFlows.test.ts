import { describe, it, expect, vi } from 'vitest'

import * as client from '../client'
import { getMoneyFlows, updateMoneyFlow } from '../moneyFlows'
import { type UpdateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import {
  type GetMoneyFlowsResponse,
  type UpdateMoneyFlowResponse,
} from '@/models/api/internal/backend/v1/response/moneyFlows'

const mockGetMoneyFlowsResponse: GetMoneyFlowsResponse = [
  {
    id: 1,
    title: 'mockTitle',
    amount: 100,
    occurred_date: '2025-01-01T00:00:00.000Z',
    kind: 'income',
  },
]

const mockUpdateMoneyFlowRequest: UpdateMoneyFlowRequest = {
  id: 1,
  title: 'mockTitle',
  amount: 200,
  occurred_date: '2025-01-01T00:00:00.000Z',
  kind: 'income',
}

const mockUpdateMoneyFlowResponse: UpdateMoneyFlowResponse = {
  id: 1,
  title: 'mockTitle',
  amount: 200,
  occurred_date: '2025-01-01T00:00:00.000Z',
  kind: 'income',
}

describe('getMoneyFlows', () => {
  describe('正常系', () => {
    it('正しいURLでGETし、dataを返す', async () => {
      const clientGetSpy = vi
        .spyOn(client.internalBackendV1Client, 'get')
        .mockResolvedValue({ data: mockGetMoneyFlowsResponse })

      const result = await getMoneyFlows()

      expect(result).toEqual(mockGetMoneyFlowsResponse)
      expect(clientGetSpy).toHaveBeenCalled()

      const [[url]] = clientGetSpy.mock.calls

      expect(url).toBe('/money_flows')
    })
  })

  describe('異常系', () => {
    it('/money_flowsの呼び出しが失敗した場合、エラーを返す', async () => {
      const mockError = new Error('データの全件取得に失敗しました')
      const clientGetSpy = vi
        .spyOn(client.internalBackendV1Client, 'get')
        .mockRejectedValue(mockError)

      await expect(getMoneyFlows()).rejects.toThrow(mockError)
      expect(clientGetSpy).toHaveBeenCalled()
    })
  })

  describe('updateMoneyFlow', () => {
    describe('正常系', () => {
      it('正しいURL/ボディでPUTし、dataを返す', async () => {
        const clientCreateSpy = vi
          .spyOn(client.internalBackendV1Client, 'put')
          .mockResolvedValue({ data: mockUpdateMoneyFlowResponse })

        const result = await updateMoneyFlow(mockUpdateMoneyFlowRequest)

        expect(result).toBe(mockUpdateMoneyFlowResponse)
        expect(clientCreateSpy).toHaveBeenCalled()

        const [[url, body]] = clientCreateSpy.mock.calls

        expect(url).toBe('/money_flows')
        expect(body).toBe(mockUpdateMoneyFlowRequest)
      })
    })

    describe('異常系', () => {
      it('呼び出しが失敗した場合、エラーを返す', async () => {
        const mockError = new Error('データの編集に失敗しました')
        const clientCreateSpy = vi
          .spyOn(client.internalBackendV1Client, 'put')
          .mockRejectedValue(mockError)

        await expect(updateMoneyFlow(mockUpdateMoneyFlowRequest)).rejects.toThrow(mockError)
        expect(clientCreateSpy).toHaveBeenCalled()
      })
    })
  })
})
