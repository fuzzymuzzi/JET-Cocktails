import React from 'react'
import { render, screen } from '@testing-library/react'
import CocktailList from './CocktailList'
import userEvent from '@testing-library/user-event'

const testCocktailOne = {
  IBA: null,
  alcoholic: 'Alcoholic',
  category: 'A Drink Category',
  creativeCommonsConfirmed: 'No',
  dateModified: '2022-04-02 15:43:45',
  drinkAlternate: null,
  drinkThumb: 'Some source',
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
const testCocktailTwo = {
  IBA: null,
  alcoholic: 'Alcoholic',
  category: 'Another Drink Category',
  creativeCommonsConfirmed: 'No',
  dateModified: '2022-04-02 13:37:42',
  drinkAlternate: null,
  drinkThumb: 'Some source',
  glass: 'A Glass',
  id: '42',
  imageAttribution: null,
  imageSource: null,
  ingredients: ['Ingredient 1'],
  instructions: [{ id: 'EN', label: 'Some instructions' }],
  measurements: ['Measurement 1'],
  name: 'Another name',
  tags: ['tagOne', 'tagTwo'],
  video: null,
}

describe('CocktailList', () => {
  test('should render an ul', async () => {
    render(<CocktailList cocktails={[]} onCocktailSelect={() => {}} />)
    const listEl = await screen.findByTestId('searchbar-search-list')
    expect(listEl).toBeInTheDocument()
  })

  test('should render a li for each cocktail when provided in the cocktails', async () => {
    render(
      <CocktailList
        cocktails={[testCocktailOne, testCocktailTwo]}
        onCocktailSelect={() => {}}
      />,
    )
    const listItemEls = await screen.findAllByTestId(
      'searchbar-search-list-item',
    )
    expect(listItemEls.length).toBe(2)

    const listItemOneText = await screen.findByText(/Some random name/)
    expect(listItemOneText).toBeInTheDocument()

    const listItemTwoText = await screen.findByText(/Another name/)
    expect(listItemTwoText).toBeInTheDocument()
  })

  test('should call the provided onCocktailSelect with the newly selected item when the item is clicked', async () => {
    const mockedOnCocktailSelect = jest.fn()
    render(
      <CocktailList
        cocktails={[testCocktailOne]}
        onCocktailSelect={mockedOnCocktailSelect}
      />,
    )

    const listItemEl = await screen.findByTestId('searchbar-search-list-item')
    await userEvent.click(listItemEl)

    expect(mockedOnCocktailSelect).toBeCalled()
    expect(mockedOnCocktailSelect).toBeCalledWith(testCocktailOne)
  })
})
