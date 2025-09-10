import { Text, HStack, Grid, Popover, Button } from '@chakra-ui/react'
import { SlArrowLeft } from 'react-icons/sl'
import { SlArrowRight } from 'react-icons/sl'

interface MonthPickerCardProps {
  yearAndMonthLabel: string
  onChangeMonth: (year: number, monthIndex0to11: number) => void
  currentYear: number
  currentMonth: number
  viewYear: number
  onViewPrevYear: () => void
  onViewNextYear: () => void
}

const monthLabels = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
]

export const MonthPickerCard = ({
  yearAndMonthLabel,
  onChangeMonth,
  currentYear,
  currentMonth,
  viewYear,
  onViewPrevYear,
  onViewNextYear,
}: MonthPickerCardProps) => {
  return (
    <>
      <Popover.Root>
        {/* asChild：子コンポーネント(Button)をトリガーに使う */}
        <Popover.Trigger asChild>
          <Button color={'black'}>【{yearAndMonthLabel}】</Button>
        </Popover.Trigger>

        <Popover.Positioner>
          <Popover.Content>
            <Popover.Body>
              <HStack justify={'space-between'} mb={2}>
                <Button
                  size={'sm'}
                  aria-label={'prevYearBtn'}
                  onClick={() => {
                    onViewPrevYear()
                  }}
                >
                  <SlArrowLeft color={'black'} />
                </Button>

                <Text fontWeight={'bold'}>{viewYear}年</Text>

                <Button
                  size={'sm'}
                  aria-label={'nextYearBtn'}
                  onClick={() => {
                    onViewNextYear()
                  }}
                >
                  <SlArrowRight color={'black'} />
                </Button>
              </HStack>

              {/* Grid：表のように行と列を作って要素を並べられる。3列を作り、幅を均等に分ける */}
              <Grid templateColumns={'repeat(3, 1fr)'} gap={2}>
                {monthLabels.map((label, index) => (
                  <Button
                    key={label}
                    // aria-label={'changeMonthBtn'}
                    color={viewYear === currentYear && index === currentMonth ? 'gray.50' : 'black'}
                    onClick={() => {
                      onChangeMonth(viewYear, index)
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Grid>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </>
  )
}
