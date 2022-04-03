import React from 'react'
import { render, screen } from '@testing-library/react'
import CocktailDetails from './CocktailDetails'
import { expectedCocktailData } from '../../test/data'

describe('CocktailDetail', () => {
  test('should render the default welcome message when no cocktail has been selected', () => {
    render(<CocktailDetails />)
    const textElement = screen.getByText(/Yay Cocktails!/)
    expect(textElement).toBeInTheDocument()
  })
  test("should render the cocktail's name in a heading when a cocktail has been provided", async () => {
    const testName = 'test-name'
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          name: testName,
        }}
      />,
    )
    const textElement = screen.getByText(/test-name/)
    expect(textElement).toBeInTheDocument()
  })
})
