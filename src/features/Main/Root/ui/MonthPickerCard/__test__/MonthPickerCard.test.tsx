import { act } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { MonthPickerCard } from '@/features/Main/Root/ui/MonthPickerCard/MonthPickerCard'

const mockTargetDate = new Date('2025-09-01T12:00:00Z')
const mockTargetDateFullYear = mockTargetDate.getFullYear()
const mockTargetDateMonth = mockTargetDate.getMonth() + 1
const mockTargetDateString = `${mockTargetDateFullYear.toString()}年${mockTargetDateMonth.toString()}月`
const mockoOnSubmitTargetDate = vi.fn()
const mockViewYear = 2025
const mockOnViewPrevYear = vi.fn()
const mockOnViewNextYear = vi.fn()
const defaultProps = {
  targetDate: mockTargetDate,
  onSubmitTargetDate: mockoOnSubmitTargetDate,
  viewYear: mockViewYear,
  onViewPrevYear: mockOnViewPrevYear,
  onViewNextYear: mockOnViewNextYear,
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

describe('MonthPickerCard', () => {
  describe('正常系', () => {
    it('データが登録されている月を表示した場合、「【2025年9月】」が表示される', () => {
      customRender(<MonthPickerCard {...defaultProps} />)

      expect(
        screen.getByRole('button', { name: `【${mockTargetDateString}】` }),
      ).toBeInTheDocument()
    })

    it('トリガーをクリックするとポップオーバーが開き、月ボタンが表示される', async () => {
      customRender(<MonthPickerCard {...defaultProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: `【${mockTargetDateString}】` }))
      })

      await waitFor(() => {
        monthLabels.forEach((monthLabel) => {
          expect(screen.getByRole('button', { name: monthLabel })).toBeInTheDocument()
        })
      })
    })

    it('選択した月ボタンの文字色がblue.500になる', async () => {
      customRender(<MonthPickerCard {...defaultProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: `【${mockTargetDateString}】` }))
      })

      await waitFor(() => {
        expect(getComputedStyle(screen.getByRole('button', { name: '9月' })).color).toBe(
          'var(--chakra-colors-blue-500)',
        )
      })
    })

    it('選択していない月ボタンの文字色がblackになる', async () => {
      customRender(<MonthPickerCard {...defaultProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: `【${mockTargetDateString}】` }))
      })

      await waitFor(() => {
        expect(getComputedStyle(screen.getByRole('button', { name: '1月' })).color).toBe(
          'var(--chakra-colors-black)',
        )
      })
    })

    it('< ボタンを押すと、onViewPrevYearが呼ばれる', async () => {
      customRender(<MonthPickerCard {...defaultProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: `【${mockTargetDateString}】` }))
      })

      await waitFor(() => {
        fireEvent.click(screen.getByRole('button', { name: 'prevYearBtn' }))
      })

      expect(mockOnViewPrevYear).toHaveBeenCalledTimes(1)
    })

    it('> ボタンを押すと、onViewNextYearが呼ばれる', async () => {
      customRender(<MonthPickerCard {...defaultProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: `【${mockTargetDateString}】` }))
      })

      await waitFor(() => {
        fireEvent.click(screen.getByRole('button', { name: 'nextYearBtn' }))
      })

      expect(mockOnViewNextYear).toHaveBeenCalledTimes(1)
    })

    it('月ボタンを押すと、mockoOnSubmitTargetDateが呼ばれる', async () => {
      customRender(<MonthPickerCard {...defaultProps} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: `【${mockTargetDateString}】` }))
      })

      await waitFor(() => {
        fireEvent.click(screen.getByRole('button', { name: '8月' }))
      })

      expect(mockoOnSubmitTargetDate).toHaveBeenCalledTimes(1)
    })
  })
})
