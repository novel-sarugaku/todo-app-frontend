import { describe, it, expect } from 'vitest'

import {
  formatDate,
  formatMonthly,
  formatPrice,
} from '@/features/Main/Root/hooks/handlers/formatters'

describe('formatDate', () => {
  describe('正常系', () => {
    it('日付文字列を「YYYY年M月D日」に整形できる', () => {
      expect(formatDate('2025-09-01T00:00:00Z')).toBe('2025年9月1日')
    })
  })
})

describe('formatMonthly', () => {
  describe('正常系', () => {
    it('日付文字列を「YYYY年M月」に整形できる', () => {
      expect(formatMonthly('2025-09-01T12:00:00Z')).toBe('2025年9月')
    })
  })
})

describe('formatPrice', () => {
  describe('正常系', () => {
    it('数値をカンマ区切りの文字列に整形できる', () => {
      expect(formatPrice(1000000)).toBe('1,000,000')
    })

    it('4桁未満の数値もそのまま文字列に変換できる', () => {
      expect(formatPrice(123)).toBe('123')
    })
  })
})
