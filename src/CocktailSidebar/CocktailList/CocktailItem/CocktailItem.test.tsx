import React from 'react'
import { render, screen } from '@testing-library/react'
import CocktailItem from './CocktailItem'

const testCocktail = {
  IBA: null,
  alcoholic: 'Alcoholic',
  category: 'A Drink Category',
  creativeCommonsConfirmed: 'No',
  dateModified: '2022-04-02 15:43:45',
  drinkAlternate: null,
  drinkThumb: 'someSource',
  glass: 'A Glass',
  id: '1337',
  imageAttribution: null,
  imageSource: null,
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  instructions: [
    { id: 'EN', label: 'Some instructions' },
    { id: 'ES', label: 'Some other instructions' },
  ],
  measurements: ['Measurement 1', 'Measurement 2'],
  name: 'Some random name',
  tags: ['tagOne', 'tagTwo'],
  video: null,
}

describe('CocktailItem', () => {
  test('should render a li item for the provided cocktail', async () => {
    render(<CocktailItem cocktail={testCocktail} isSelected={false} />)
    const listItemEl = await screen.findByTestId('cocktail-item')
    expect(listItemEl).toBeInTheDocument()
  })

  test('should render a li containing the name of the provided cocktail', async () => {
    render(<CocktailItem cocktail={testCocktail} isSelected={false} />)
    const textEl = await screen.findByText(/Some random name/)
    expect(textEl).toBeInTheDocument()
  })

  test('should NOT render an Avatar when provided with a cocktail not containing a drinkThumb', () => {
    render(
      <CocktailItem
        cocktail={{
          ...testCocktail,
          drinkThumb: null,
        }}
        isSelected={false}
      />,
    )
    const avatarEl = screen.queryByTestId('cocktail-item-avatar')
    expect(avatarEl).not.toBeInTheDocument()
  })

  test('should render an Avatar when provided cocktail contains a drinkThumb', async () => {
    render(<CocktailItem cocktail={testCocktail} isSelected={false} />)
    const avatarEl = await screen.findByTestId('cocktail-item-avatar')
    expect(avatarEl).toBeInTheDocument()
  })

  test('should render with the selected background when isSelected is true', async () => {
    render(<CocktailItem cocktail={testCocktail} isSelected={true} />)
    const listItemEl = await screen.findByTestId('cocktail-item')
    expect(listItemEl).toHaveStyle(`background-color: #EDEDED`)
  })
})
