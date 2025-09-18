'use client'

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top', // 上部に表示
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      {/* 横幅を広げ、ヘッダー下部に表示 */}
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }} style={{ marginTop: 50 }}>
        {(toast) => (
          <Toast.Root width={{ md: '2lg' }}>
            {toast.type === 'loading' ? (
              <Spinner size='sm' color='blue.solid' />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap='1' flex='1' maxWidth='100%'>
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
            </Stack>
            {toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
