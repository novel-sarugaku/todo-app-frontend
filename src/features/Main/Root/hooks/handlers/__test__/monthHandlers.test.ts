import { describe, it, expect, vi } from 'vitest'

import {
  toMonthStart,
  addMonth,
  getInitialMonth,
} from '@/features/Main/Root/hooks/handlers/monthHandlers'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

const mockMoneyFlowData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle1',
    amount: 550,
    occurred_date: '2025-03-10T12:00:00Z',
    kind: 'income',
  },
  {
    id: 2,
    title: 'mockTitle2',
    amount: 1000000,
    occurred_date: '2025-07-25T12:00:00Z',
    kind: 'expense',
  },
  {
    id: 3,
    title: 'mockTitle3',
    amount: 1000,
    occurred_date: '2025-09-01T12:00:00Z',
    kind: 'income',
  },
]

describe('toMonthStart', () => {
  describe('正常系', () => {
    it('渡した日付をその月の1日に変換する', () => {
      const mockDate = new Date(2025, 8, 15) // 0始まりのため8 = 9月
      const result = toMonthStart(mockDate)

      expect(result.getFullYear()).toBe(2025)
      expect(result.getMonth()).toBe(8) // 9月
      expect(result.getDate()).toBe(1) // 1日
    })
  })
})

describe('addMonth', () => {
  describe('正常系', () => {
    it('基準月の翌月を返す（+1）', () => {
      const mockBaseDate = new Date(2025, 8, 1)
      const result = addMonth(mockBaseDate, 1)

      expect(result.getFullYear()).toBe(2025)
      expect(result.getMonth()).toBe(9) // 10月
    })

    it('基準月の前月を返す（-1）', () => {
      const mockBaseDate = new Date(2025, 8, 1)
      const result = addMonth(mockBaseDate, -1)

      expect(result.getFullYear()).toBe(2025)
      expect(result.getMonth()).toBe(7) // 8月
    })

    it('基準月の前月を返す（-1、年を跨ぐ場合)', () => {
      const mockBaseDate = new Date(2025, 0, 15) // 2025年1月15日
      const result = addMonth(mockBaseDate, -1)

      expect(result.getFullYear()).toBe(2024) // 前の年
      expect(result.getMonth()).toBe(11) // 12月
    })
  })
})

describe('getInitialMonth', () => {
  describe('正常系', () => {
    it('データがある場合、occurred_dateが最新日の月の1日を返す', () => {
      const result = getInitialMonth(mockMoneyFlowData)

      expect(result.getFullYear()).toBe(2025)
      expect(result.getMonth()).toBe(8) // 9月
      expect(result.getDate()).toBe(1) // 1日
    })

    it('データがない(空配列)の場合、今日の月の1日を返す', () => {
      // setSystemTime：テスト中の現在時刻を仮想的に固定できる
      vi.setSystemTime(new Date(2025, 8, 5)) // 2025年9月5日
      const result = getInitialMonth([])

      expect(result.getFullYear()).toBe(2025)
      expect(result.getMonth()).toBe(8) // 9月
      expect(result.getDate()).toBe(1)

      vi.useRealTimers() // テスト専用の時間設定を解除
    })
  })
})
