import { Container, Box, VStack } from '@chakra-ui/react'

export const NotFoundPresentational = () => {
  return (
    <>
      <Container minH='100vh' display='flex' alignItems='center' justifyContent='center' py={8}>
        <VStack>
          <Box fontSize='7xl' fontWeight='bold' color='blue.500'>
            404
          </Box>
          <Box fontSize='3xl'>Page Not Found</Box>
        </VStack>
      </Container>
    </>
  )
}
