import { describe, it, expect } from 'vitest'

import type { Kind } from '@/models/constants/kind'
import { kindToJa } from '../labelFormatters'

describe('labelFormatters', () => {
  describe('正常系', () => {
    it('kindが「income」のときは「収入」を返す', () => {
      expect(kindToJa('income' as Kind)).toBe('収入')
    })

    it('kindが「expense」のときは「支出」を返す', () => {
      expect(kindToJa('expense' as Kind)).toBe('支出')
    })
  })
})
