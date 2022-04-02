import React from 'react'
import { render, screen } from '@testing-library/react'
import CocktailSidebar from './CocktailSidebar'

test('should render the sidebar message', async () => {
  render(<CocktailSidebar />)
  // eslint-disable-next-line testing-library/prefer-find-by
  const textElement = await screen.findByText(/sidebar search and liked/)
  expect(textElement).toBeInTheDocument()
})
