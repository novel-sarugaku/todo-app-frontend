import { describe, it, expect, vi } from 'vitest'

import * as client from '../client'
import { getMoneyFlows, createMoneyFlow } from '../moneyFlows'
import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import {
  type GetMoneyFlowsResponse,
  type CreateMoneyFlowResponse,
} from '@/models/api/internal/backend/v1/response/moneyFlows'

const mockCreateMoneyFlowRequest: CreateMoneyFlowRequest = {
  title: 'mockTitle',
  amount: 200,
  occurred_date: '2025-01-01T00:00:00.000Z',
  kind: 'income',
}

const mockGetMoneyFlowsResponse: GetMoneyFlowsResponse = [
  {
    id: 1,
    title: 'mockTitle',
    amount: 100,
    occurred_date: '2025-01-01T00:00:00.000Z',
    kind: 'income',
  },
]

const mockCreateMoneyFlowResponse: CreateMoneyFlowResponse = {
  id: 2,
  title: 'mockTitle',
  amount: 200,
  occurred_date: '2025-01-01T00:00:00.000Z',
  kind: 'income',
}

// 全件取得
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
})

// 登録
describe('createMoneyFlow', () => {
  describe('正常系', () => {
    it('正しいURL/ボディでPOSTし、dataを返す', async () => {
      const clientCreateSpy = vi
        .spyOn(client.internalBackendV1Client, 'post')
        .mockResolvedValue({ data: mockCreateMoneyFlowResponse })

      const result = await createMoneyFlow(mockCreateMoneyFlowRequest)

      expect(result).toBe(mockCreateMoneyFlowResponse)
      expect(clientCreateSpy).toHaveBeenCalled()

      const [[url, body]] = clientCreateSpy.mock.calls

      expect(url).toBe('/money_flows')
      expect(body).toBe(mockCreateMoneyFlowRequest)
    })
  })

  describe('異常系', () => {
    it('呼び出しが失敗した場合、エラーを返す', async () => {
      const mockError = new Error('データの登録に失敗しました')
      const clientCreateSpy = vi
        .spyOn(client.internalBackendV1Client, 'post')
        .mockRejectedValue(mockError)

      await expect(createMoneyFlow(mockCreateMoneyFlowRequest)).rejects.toThrow(mockError)
      expect(clientCreateSpy).toHaveBeenCalled()
    })
  })
})
