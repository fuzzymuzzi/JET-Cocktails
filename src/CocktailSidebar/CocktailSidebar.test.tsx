import React from 'react'
import { render, screen } from '@testing-library/react'
import CocktailSidebar from './CocktailSidebar'

test('should render the sidebar message', () => {
  render(<CocktailSidebar />)
  const textElement = screen.getByText(/sidebar search and liked/)
  expect(textElement).toBeInTheDocument()
})
