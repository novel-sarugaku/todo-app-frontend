import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { NotFoundPresentational } from '../NotFoundPresentational'

describe('NotFoundPresentational', () => {
  it('「404」と「Page Not Found」が表示される', () => {
    customRender(<NotFoundPresentational />)

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
  })
})
