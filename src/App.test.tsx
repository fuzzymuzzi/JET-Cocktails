import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('should render a cocktail detail wrapper', () => {
  render(<App />)
  const CocktailDetailWrapper = screen.getByTestId('cocktail-fragment-details')
  expect(CocktailDetailWrapper).toBeInTheDocument()
})

test('should render a cocktail sidebar', () => {
  render(<App />)
  const CocktailSidebarWrapper = screen.getByTestId('cocktail-fragment-sidebar')
  expect(CocktailSidebarWrapper).toBeInTheDocument()
})
