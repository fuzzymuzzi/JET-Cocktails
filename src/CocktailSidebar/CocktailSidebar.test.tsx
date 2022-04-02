import React from 'react'
import { render, screen } from '@testing-library/react'
import CocktailSidebar from './CocktailSidebar'

test('should render the sidebar message', async () => {
  render(<CocktailSidebar />)
  // eslint-disable-next-line testing-library/prefer-find-by
  const textElement = await screen.findByText(/Sidebar search and likes/)
  expect(textElement).toBeInTheDocument()
})

test('should render a input field', async () => {
  render(<CocktailSidebar />)
  const textElement = await screen.findByTestId('sidebar-search-input')
  expect(textElement).toBeInTheDocument()
})
