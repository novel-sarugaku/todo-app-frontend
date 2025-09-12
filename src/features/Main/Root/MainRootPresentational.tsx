import { Container, Show, Box, Text, HStack, Grid } from '@chakra-ui/react'

import { Header } from '@/components/organisms/Header'
import { BalanceTotalCard } from '@/features/Main/Root/ui/BalanceTotalCard/BalanceTotalCard'
import { MoneyFlowDetailTableCard } from './ui/MoneyFlowDetailTableCard/MoneyFlowDetailTableCard'
import { MonthPickerCard } from '@/features/Main/Root/ui/MonthPickerCard/MonthPickerCard'
import { type moneyFlowData } from './types/moneyFlowData'

interface MainRootPresentationalProps {
  targetDate: Date
  targetMonthlyIncomeData: moneyFlowData[]
  targetMonthlyIncomeTotalAmount: number
  targetMonthlyExpenseData: moneyFlowData[]
  targetMonthlyExpenseTotalAmount: number
  onSubmitTargetDate: (year: number, monthIndex0to11: number) => void
  viewYear: number
  onViewPrevYear: () => void
  onViewNextYear: () => void
  targetMonthlyTotalAmount: number
}

export const MainRootPresentational = ({
  targetDate,
  targetMonthlyIncomeData,
  targetMonthlyIncomeTotalAmount,
  targetMonthlyExpenseData,
  targetMonthlyExpenseTotalAmount,
  onSubmitTargetDate,
  viewYear,
  onViewPrevYear,
  onViewNextYear,
  targetMonthlyTotalAmount,
}: MainRootPresentationalProps) => {
  return (
    <>
      <Header />
      <Container>
        <Show when={targetMonthlyIncomeData.length === 0 && targetMonthlyExpenseData.length === 0}>
          <Box justifySelf='center' pt={14}>
            <MonthPickerCard
              targetDate={targetDate}
              onSubmitTargetDate={onSubmitTargetDate}
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

        <Show when={targetMonthlyIncomeData.length > 0 || targetMonthlyExpenseData.length > 0}>
          {/* templateColumns="1fr auto 1fr"：左余白・中身・右余白の3列構成を作る */}
          <Grid templateColumns='1fr auto 1fr' pt={10}>
            <Box justifySelf='start'>
              <BalanceTotalCard
                targetDate={targetDate}
                targetMonthlyTotalAmount={targetMonthlyTotalAmount}
              />
            </Box>

            <HStack>
              <MonthPickerCard
                targetDate={targetDate}
                onSubmitTargetDate={onSubmitTargetDate}
                viewYear={viewYear}
                onViewPrevYear={onViewPrevYear}
                onViewNextYear={onViewNextYear}
              />
            </HStack>
          </Grid>
        </Show>

        {/* targetMonthlyData.some(...) :条件に当てはまる要素が1つでもあるかを調べる関数 */}
        <Show when={targetMonthlyIncomeData.length > 0}>
          <Box py={10}>
            <MoneyFlowDetailTableCard
              items={targetMonthlyIncomeData}
              totalAmount={targetMonthlyIncomeTotalAmount}
              kindFlag={'income'}
            />
          </Box>
        </Show>
        <Show when={targetMonthlyExpenseData.length > 0}>
          <Box py={10}>
            <MoneyFlowDetailTableCard
              items={targetMonthlyExpenseData}
              totalAmount={targetMonthlyExpenseTotalAmount}
              kindFlag={'expense'}
            />
          </Box>
        </Show>
      </Container>
    </>
  )
}
