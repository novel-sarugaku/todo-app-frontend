import { internalBackendV1Client } from './client'
import {
  type DeleteMoneyFlowRequest,
  type CreateMoneyFlowRequest,
  type UpdateMoneyFlowRequest,
} from '@/models/api/internal/backend/v1/request/moneyFlows'
import {
  type GetMoneyFlowsResponse,
  type CreateMoneyFlowResponse,
  type UpdateMoneyFlowResponse,
} from '@/models/api/internal/backend/v1/response/moneyFlows'

// 全件取得
export const getMoneyFlows = async (): Promise<GetMoneyFlowsResponse> => {
  const response = await internalBackendV1Client.get<GetMoneyFlowsResponse>('/money_flows')
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
