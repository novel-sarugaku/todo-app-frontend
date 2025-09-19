import { createToaster } from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top', // 上部に表示
  pauseOnPageIdle: true,
})
