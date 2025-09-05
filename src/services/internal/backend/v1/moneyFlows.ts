import { internalBackendV1Client } from './client'
import {
  type DeleteMoneyFlowRequest,
  type CreateMoneyFlowRequest,
  type UpdateMoneyFlowRequest,
} from '@/models/api/internal/backend/v1/request/moneyFlows'
import {
  type GetMoneyFlowResponseItem,
  type GetMoneyFlowsResponse,
  type CreateMoneyFlowResponse,
  type UpdateMoneyFlowResponse,
  type Kind,
} from '@/models/api/internal/backend/v1/response/moneyFlows'

// 1件取得
export const getMoneyFlow = async (id: number): Promise<GetMoneyFlowResponseItem> => {
  const response = await internalBackendV1Client.get<GetMoneyFlowResponseItem>(
    `/money_flows/${String(id)}`,
  )
  return response.data
}

// 全件取得
export const getMoneyFlows = async (kind?: Kind): Promise<GetMoneyFlowsResponse> => {
  const response = await internalBackendV1Client.get<GetMoneyFlowsResponse>('/money_flows', {
    params: kind ? { kind } : undefined,
  })
  return response.data
}

// 登録
export const createMoneyFlow = async (
  request: CreateMoneyFlowRequest,
): Promise<CreateMoneyFlowResponse> => {
  const response = await internalBackendV1Client.post<CreateMoneyFlowResponse>(
    '/money_flows',
    request,
  )
  return response.data
}

// 更新
export const updateMoneyFlow = async (
  request: UpdateMoneyFlowRequest,
): Promise<UpdateMoneyFlowResponse> => {
  const response = await internalBackendV1Client.put<UpdateMoneyFlowResponse>(
    '/money_flows',
    request,
  )
  return response.data
}

// 削除
export const deleteMoneyFlows = async (request: DeleteMoneyFlowRequest): Promise<void> => {
  await internalBackendV1Client.delete('/money_flows', { data: request })
}
