import { describe, it, expect } from 'vitest'

import { formatDate, formatMonthly, formatDateJa } from '@/share/utils/format/dateFormatters'

describe('formatDate', () => {
  describe('正常系', () => {
    it('日付を「YYYY年M月D日」に整形できる', () => {
      expect(formatDate(new Date('2025-09-01T00:00:00Z'))).toBe('2025年9月1日')
    })
  })
})

describe('formatMonthly', () => {
  describe('正常系', () => {
    it('日付を「YYYY年M月」に整形できる', () => {
      expect(formatMonthly(new Date('2025-09-01T12:00:00Z'))).toBe('2025年9月')
    })
  })
})

describe('formatDateJa', () => {
  describe('正常系', () => {
    it('「YYYY-M-D」を「YYYY年M月D日」に整形できる', () => {
      expect(formatDateJa('2025-09-01')).toBe('2025年9月1日')
      expect(formatDateJa('2025-10-01')).toBe('2025年10月1日')
      expect(formatDateJa('2025-12-31')).toBe('2025年12月31日')
    })
  })
})
