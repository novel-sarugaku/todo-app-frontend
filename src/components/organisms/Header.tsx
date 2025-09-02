import { Box, Heading } from '@chakra-ui/react'

export const Header = () => {
  return (
    <>
      <Box as={'header'} p={4} zIndex={100} borderBottom={'1px solid black'}>
        <Heading size={'2xl'}>家計簿</Heading>
      </Box>
    </>
  )
}
