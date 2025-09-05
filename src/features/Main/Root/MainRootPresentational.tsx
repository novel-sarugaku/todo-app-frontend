import { Container, Show, Box, Text, HStack, Flex } from '@chakra-ui/react'
import { SlArrowLeft } from 'react-icons/sl'
import { SlArrowRight } from 'react-icons/sl'

import { Header } from '@/components/organisms/Header'
import { IncomeTableCard } from '@/features/Main/Root/ui/IncomeTableCard/IncomeTableCard'
import { ExpensesTableCard } from '@/features/Main/Root/ui/ExpensesTableCard/ExpensesTableCard'
import { BalanceTotalCard } from '@/features/Main/Root/ui/BalanceTotalCard/BalanceTotalCard'
import { filterByMont } from './hooks/handlers/filterHandlers'
import { buildYearMonthLabelFromItems } from './hooks/handlers/labelHandlers'
import { type moneyFlowData } from './types/moneyFlowData'

interface MainRootPresentationalProps {
  items: moneyFlowData[]
  currentMonth: Date
  onPrevMonth: () => void
  onNextMonth: () => void
}

export const MainRootPresentational = ({
  items,
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: MainRootPresentationalProps) => {
  const monthlyItems = filterByMont(items, currentMonth)
  const yearAndMonthLabel = buildYearMonthLabelFromItems(monthlyItems)

  return (
    <>
      <Header />
      <Container>
        <Show when={monthlyItems.length === 0}>
          <Box>
            <HStack pt={16} align={'center'} justify={'center'}>
              <SlArrowLeft data-testid='prev-icon' onClick={onPrevMonth} cursor={'pointer'} />
              <Text>{yearAndMonthLabel}</Text>
              <SlArrowRight data-testid='next-icon' onClick={onNextMonth} cursor={'pointer'} />
            </HStack>
          </Box>

          <Box mt={'150px'} p={4} bg={'blue.100'} borderRadius={'2xl'} border={'1px solid'}>
            <Text whiteSpace={'pre-line'}>
              {`選択した年月は収入・支出ともに登録がありません。
              画面右上に表示されている「収支を登録する」ボタンから登録してください。
              登録後こちらに一覧が表示されます。`}
            </Text>
          </Box>
        </Show>

        <Show when={monthlyItems.length > 0}>
          <Flex pt={10} align={'center'}>
            {/* 左：画面の32%固定 */}
            <Box flex='32% 0 0'>
              <BalanceTotalCard items={monthlyItems} />
            </Box>

            {/* 中央：残りスペース使用 */}
            <Box flex='1 0 0'>
              <HStack justify={'center'}>
                <SlArrowLeft data-testid='prev-icon' onClick={onPrevMonth} cursor={'pointer'} />
                <Text>{yearAndMonthLabel}</Text>
                <SlArrowRight data-testid='next-icon' onClick={onNextMonth} cursor={'pointer'} />
              </HStack>
            </Box>

            {/* 右：画面の32%固定 */}
            <Box flex='32% 0 0' />
          </Flex>
        </Show>

        {/* monthlyItems.some(...) :条件に当てはまる要素が1つでもあるかを調べる関数 */}
        <Show when={monthlyItems.some((item) => item.kind === 'income')}>
          <Box pt={10}>
            <IncomeTableCard items={monthlyItems} />
          </Box>
        </Show>
        <Show when={monthlyItems.some((item) => item.kind === 'expense')}>
          <Box py={10}>
            <ExpensesTableCard items={monthlyItems} />
          </Box>
        </Show>
      </Container>
    </>
  )
}
