import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CocktailSidebar from './CocktailFilter'

describe('CocktailSidebar', () => {
  test('should show the filter input when hasFilters is set to true', async () => {
    render(<CocktailSidebar hasFilters={true} />)

    const filterEl = screen.queryByTestId('sidebar-filter-input')
    expect(filterEl).toBeInTheDocument()
  })

  test('should NOT show the filter input when the filters button is clicked', () => {
    render(<CocktailSidebar hasFilters={false} />)

    const filterEl = screen.queryByTestId('sidebar-filter-input')
    expect(filterEl).not.toBeInTheDocument()
  })
})
