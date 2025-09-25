import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'

import { customRender } from '@/tests/helpers/customRender'
import { NotFoundContainer } from '../NotFoundContainer'
import * as Presentational from '../NotFoundPresentational'

// Mocking the NotFoundPresentational component
vi.spyOn(Presentational, 'NotFoundPresentational').mockImplementation(() => {
  return <div data-testid='mock-presentational'>Mocked NotFoundPresentational</div>
})

describe('NotFoundContainer', () => {
  it('NotFoundPresentationalコンポーネントが表示される', () => {
    customRender(<NotFoundContainer />)

    expect(screen.getByTestId('mock-presentational')).toBeInTheDocument()
  })
})
