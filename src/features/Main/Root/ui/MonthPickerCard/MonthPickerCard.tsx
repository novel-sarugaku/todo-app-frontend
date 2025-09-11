import { Text, HStack, Grid, Popover, Button } from '@chakra-ui/react'
import { SlArrowLeft } from 'react-icons/sl'
import { SlArrowRight } from 'react-icons/sl'
import { monthLabels } from '@/models/constants/monthLabels'
import { formatMonthly } from '@/share/utils/format/dateFormatters'

interface MonthPickerCardProps {
  targetDate: Date
  onSubmitTargetDate: (year: number, monthIndex0to11: number) => void
  viewYear: number
  onViewPrevYear: () => void
  onViewNextYear: () => void
}

export const MonthPickerCard = ({
  targetDate,
  onSubmitTargetDate,
  viewYear,
  onViewPrevYear,
  onViewNextYear,
}: MonthPickerCardProps) => {
  return (
    <>
      <Popover.Root>
        {/* asChild：子コンポーネント(Button)をトリガーに使う */}
        <Popover.Trigger asChild>
          <Button color={'black'}>【{formatMonthly(targetDate)}】</Button>
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
                    color={
                      viewYear === targetDate.getFullYear() && index === targetDate.getMonth()
                        ? 'blue.500'
                        : 'black'
                    }
                    onClick={() => {
                      onSubmitTargetDate(viewYear, index)
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
