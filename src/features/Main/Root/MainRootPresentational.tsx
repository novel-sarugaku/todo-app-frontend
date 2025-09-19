import { Container, Show, Box, Text, Flex, Spacer } from '@chakra-ui/react'
import { Toaster } from '@/components/atoms/toaster'

import { Header } from '@/components/organisms/Header'
import { BalanceTotalCard } from '@/features/Main/Root/ui/BalanceTotalCard/BalanceTotalCard'
import { MoneyFlowDetailTableCard } from './ui/MoneyFlowDetailTableCard/MoneyFlowDetailTableCard'
import { MonthPickerCard } from '@/features/Main/Root/ui/MonthPickerCard/MonthPickerCard'
import { CreateDialogCard } from '@/features/Main/Root/ui/CreateDialogCard/CreateDialogCard'
import { type moneyFlowData } from './types/moneyFlowData'
import { type UpdateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'
import { type CreateMoneyFlowRequest } from '@/models/api/internal/backend/v1/request/moneyFlows'

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
  handleUpdateMoneyFlow: (request: UpdateMoneyFlowRequest) => void
  onCheckedChangeForUpdate: (checked: { checked: boolean }) => void
  isIncomeForUpdate: boolean
  isUpdateDialogOpen: boolean
  onUpdateDialogOpenChange: (open: boolean) => void
  upDateId: number | null
  onClickUpdateDialog: (id: number) => void
  onCloseUpdateDialog: () => void
  handleCreateMoneyFlow: (request: CreateMoneyFlowRequest) => void
  onCheckedChange: (checked: { checked: boolean }) => void
  isIncome: boolean
  isDialogOpen: boolean
  onDialogOpenChange: (open: boolean) => void
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
  handleUpdateMoneyFlow,
  onCheckedChangeForUpdate,
  isIncomeForUpdate,
  isUpdateDialogOpen,
  onUpdateDialogOpenChange,
  upDateId,
  onClickUpdateDialog,
  onCloseUpdateDialog,
  handleCreateMoneyFlow,
  onCheckedChange,
  isIncome,
  isDialogOpen,
  onDialogOpenChange,
}: MainRootPresentationalProps) => {
  return (
    <>
      <Header />

      <Container>
        <Toaster />
        <Toaster />
        <Show when={targetMonthlyIncomeData.length === 0 && targetMonthlyExpenseData.length === 0}>
          <Flex pt={10}>
            <Spacer />

            <MonthPickerCard
              targetDate={targetDate}
              onSubmitTargetDate={onSubmitTargetDate}
              viewYear={viewYear}
              onViewPrevYear={onViewPrevYear}
              onViewNextYear={onViewNextYear}
            />

            <Flex flex='1' justify='flex-end'>
              <CreateDialogCard
                handleCreateMoneyFlow={handleCreateMoneyFlow}
                onCheckedChange={onCheckedChange}
                isIncome={isIncome}
                isDialogOpen={isDialogOpen}
                onDialogOpenChange={onDialogOpenChange}
                onSubmitTargetDate={onSubmitTargetDate}
              />
            </Flex>
          </Flex>

          <Box mt={'150px'} p={4} bg={'blue.100'} borderRadius={'2xl'} border={'1px solid'}>
            <Text whiteSpace={'pre-line'}>
              {`選択した年月は収入・支出ともに登録がありません。
                  画面右上に表示されている「収支を登録する」ボタンから登録してください。
                  登録後こちらに一覧が表示されます。`}
            </Text>
          </Box>
        </Show>

        <Show when={targetMonthlyIncomeData.length > 0 || targetMonthlyExpenseData.length > 0}>
          <Flex pt={10} align='center'>
            <Flex flex='1'>
              <BalanceTotalCard
                targetDate={targetDate}
                targetMonthlyTotalAmount={targetMonthlyTotalAmount}
              />
            </Flex>

            <Box>
              <MonthPickerCard
                targetDate={targetDate}
                onSubmitTargetDate={onSubmitTargetDate}
                viewYear={viewYear}
                onViewPrevYear={onViewPrevYear}
                onViewNextYear={onViewNextYear}
              />
            </Box>

            <Flex flex='1' justify='flex-end' align='center'>
              <CreateDialogCard
                handleCreateMoneyFlow={handleCreateMoneyFlow}
                onCheckedChange={onCheckedChange}
                isIncome={isIncome}
                isDialogOpen={isDialogOpen}
                onDialogOpenChange={onDialogOpenChange}
                onSubmitTargetDate={onSubmitTargetDate}
              />
            </Flex>
          </Flex>
        </Show>

        {/* targetMonthlyData.some(...) :条件に当てはまる要素が1つでもあるかを調べる関数 */}
        <Show when={targetMonthlyIncomeData.length > 0}>
          <Box py={10}>
            <MoneyFlowDetailTableCard
              onSubmitTargetDate={onSubmitTargetDate}
              items={targetMonthlyIncomeData}
              totalAmount={targetMonthlyIncomeTotalAmount}
              kindFlag={'income'}
              handleUpdateMoneyFlow={handleUpdateMoneyFlow}
              onCheckedChangeForUpdate={onCheckedChangeForUpdate}
              isIncomeForUpdate={isIncomeForUpdate}
              isUpdateDialogOpen={isUpdateDialogOpen}
              onUpdateDialogOpenChange={onUpdateDialogOpenChange}
              upDateId={upDateId}
              onClickUpdateDialog={onClickUpdateDialog}
              onCloseUpdateDialog={onCloseUpdateDialog}
            />
          </Box>
        </Show>
        <Show when={targetMonthlyExpenseData.length > 0}>
          <Box py={10}>
            <MoneyFlowDetailTableCard
              onSubmitTargetDate={onSubmitTargetDate}
              items={targetMonthlyExpenseData}
              totalAmount={targetMonthlyExpenseTotalAmount}
              kindFlag={'expense'}
              handleUpdateMoneyFlow={handleUpdateMoneyFlow}
              onCheckedChangeForUpdate={onCheckedChangeForUpdate}
              isIncomeForUpdate={isIncomeForUpdate}
              isUpdateDialogOpen={isUpdateDialogOpen}
              onUpdateDialogOpenChange={onUpdateDialogOpenChange}
              upDateId={upDateId}
              onClickUpdateDialog={onClickUpdateDialog}
              onCloseUpdateDialog={onCloseUpdateDialog}
            />
          </Box>
        </Show>
      </Container>
    </>
  )
}
