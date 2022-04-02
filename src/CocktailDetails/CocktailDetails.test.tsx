import React from 'react'
import { render, screen } from '@testing-library/react'
import CocktailDetails from './CocktailDetails'

test('should render the default welcome message when no cocktail has been selected', () => {
  render(<CocktailDetails />)
  const textElement = screen.getByText(/Yay Cocktails!/)
  expect(textElement).toBeInTheDocument()
})
