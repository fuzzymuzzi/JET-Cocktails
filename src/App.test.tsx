import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('should render a cocktail detail wrapper', () => {
  render(<App />)
  const CocktailDetailWrapper = screen.getByTestId('cocktail-details-fragment')
  expect(CocktailDetailWrapper).toBeInTheDocument()
})
