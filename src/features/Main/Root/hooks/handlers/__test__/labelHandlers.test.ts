import { describe, it, expect } from 'vitest'

import { buildYearMonthLabelFromItems } from '@/features/Main/Root/hooks/handlers/labelHandlers'
import type { moneyFlowData } from '@/features/Main/Root/types/moneyFlowData'

const mockMoneyFlowData: moneyFlowData[] = [
  {
    id: 1,
    title: 'mockTitle1',
    amount: 100,
    occurred_date: '2025-09-10T12:00:00Z',
    kind: 'income',
  },
  {
    id: 2,
    title: 'mockTitle2',
    amount: 200,
    occurred_date: '2025-09-25T12:00:00Z',
    kind: 'expense',
  },
]

describe('buildYearMonthLabelFromItems', () => {
  describe('正常系', () => {
    it('最初の要素の日付から「YYYY年M月」を返す', () => {
      expect(buildYearMonthLabelFromItems(mockMoneyFlowData)).toBe('2025年9月')
    })

    it('該当データが無い月は「—年—月」を返す', () => {
      expect(buildYearMonthLabelFromItems([])).toBe('—年—月')
    })
  })
})
