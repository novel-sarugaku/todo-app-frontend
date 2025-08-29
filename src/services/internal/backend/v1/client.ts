import { config } from '@/core/config'
import { createBaseClient } from '@/services/base/client'

export const internalBackendV1Client = createBaseClient({
  baseURL: `${config.backendUrl}/api/v1`,
  timeout: 10000,
  withCredentials: false,
})
