import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { testCocktailResponse } from '../test/data'
import userEvent from '@testing-library/user-event'
import fetchMock from 'fetch-mock'

describe('App', () => {
  beforeEach(() => {
    fetchMock.reset()
    const defaultResponse = '[]'
    fetchMock.get('end:/list.php?i=list', defaultResponse)
    fetchMock.get('end:/list.php?c=list', defaultResponse)
    fetchMock.get('end:/list.php?g=list', defaultResponse)
  })

  test('should render a cocktail detail wrapper', () => {
    render(<App />)
    const CocktailDetailWrapper = screen.getByTestId(
      'cocktail-fragment-details',
    )
    expect(CocktailDetailWrapper).toBeInTheDocument()
  })

  test('should render a cocktail sidebar', () => {
    render(<App />)
    const CocktailSidebarWrapper = screen.getByTestId(
      'cocktail-fragment-sidebar',
    )
    expect(CocktailSidebarWrapper).toBeInTheDocument()
  })

  test('should call the provided onCocktailSelect when a search has been completed and a item is clicked', async () => {
    const testName = 'some-test-name'
    const testQuery = 'test'
    const searchIdentifier = `end:/search.php?s=${testQuery}`
    const testCocktail = testCocktailResponse.drinks[0]
    fetchMock.get(
      searchIdentifier,
      JSON.stringify({
        ...testCocktailResponse,
        drinks: [{ ...testCocktail, strDrink: testName }],
      }),
    )

    render(<App />)

    // click the item
    const searchInputEl = await screen.findByTestId('sidebar-search-input')
    await userEvent.type(searchInputEl, testQuery)
    expect(searchInputEl).toBeInTheDocument()

    // click the item
    let listItemEl = await screen.findByTestId('sidebar-search-list-item')
    expect(listItemEl).toBeInTheDocument()
    await userEvent.click(listItemEl)

    const textElements = screen.getAllByText(/test-name/)
    expect(textElements.length).toBe(2)
  })
})
