import { Container, Show, Box, Text, HStack, Grid } from '@chakra-ui/react'

import { Header } from '@/components/organisms/Header'
import { IncomeTableCard } from '@/features/Main/Root/ui/IncomeTableCard/IncomeTableCard'
import { ExpensesTableCard } from '@/features/Main/Root/ui/ExpensesTableCard/ExpensesTableCard'
import { BalanceTotalCard } from '@/features/Main/Root/ui/BalanceTotalCard/BalanceTotalCard'
import { MonthPickerCard } from '@/features/Main/Root/ui/MonthPickerCard/MonthPickerCard'
import { type moneyFlowData } from './types/moneyFlowData'

interface MainRootPresentationalProps {
  monthlyItems: moneyFlowData[]
  yearAndMonthLabel: string
  onChangeMonth: (year: number, monthIndex0to11: number) => void
  currentYear: number
  currentMonth: number
  viewYear: number
  onViewPrevYear: () => void
  onViewNextYear: () => void
}

export const MainRootPresentational = ({
  monthlyItems,
  yearAndMonthLabel,
  onChangeMonth,
  currentYear,
  currentMonth,
  viewYear,
  onViewPrevYear,
  onViewNextYear,
}: MainRootPresentationalProps) => {
  return (
    <>
      <Header />
      <Container>
        <Show when={monthlyItems.length === 0}>
          <Box justifySelf='center' pt={14}>
            <MonthPickerCard
              yearAndMonthLabel={yearAndMonthLabel}
              onChangeMonth={onChangeMonth}
              currentYear={currentYear}
              currentMonth={currentMonth}
              viewYear={viewYear}
              onViewPrevYear={onViewPrevYear}
              onViewNextYear={onViewNextYear}
            />
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
          {/* templateColumns="1fr auto 1fr"：左余白・中身・右余白の3列構成を作る */}
          <Grid templateColumns='1fr auto 1fr' pt={10}>
            <Box justifySelf='start'>
              <BalanceTotalCard items={monthlyItems} />
            </Box>

            <HStack>
              <MonthPickerCard
                yearAndMonthLabel={yearAndMonthLabel}
                onChangeMonth={onChangeMonth}
                currentYear={currentYear}
                currentMonth={currentMonth}
                viewYear={viewYear}
                onViewPrevYear={onViewPrevYear}
                onViewNextYear={onViewNextYear}
              />
            </HStack>
          </Grid>
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
