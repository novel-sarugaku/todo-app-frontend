import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender.tsx'
import { Header } from '../Header'

describe('Header', () => {
  describe('正常系', () => {
    it('表示されるべきテキストが表示される', () => {
      customRender(<Header />)

      expect(screen.getByText('家計簿')).toBeInTheDocument()
    })
  })
})
