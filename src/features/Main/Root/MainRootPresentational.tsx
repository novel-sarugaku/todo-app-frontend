import { Header } from '@/components/organisms/Header'
import { Container, Text } from '@chakra-ui/react'

export const MainRootPresentational = () => {
  return (
    <>
      <Header />
      <Container>
        <Text textStyle='md'>表示の確認</Text>
      </Container>
    </>
  )
}
