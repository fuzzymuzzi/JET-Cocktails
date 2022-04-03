import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CocktailSidebar from './CocktailSidebar'
import fetchMock from 'fetch-mock'
import { expectedCocktailData, testCocktailResponse } from '../../test/data'

describe('CocktailSidebar', () => {
  beforeEach(() => {
    fetchMock.reset()
    const defaultResponse = '[]'
    fetchMock.get('end:/list.php?i=list', defaultResponse)
    fetchMock.get('end:/list.php?c=list', defaultResponse)
    fetchMock.get('end:/list.php?g=list', defaultResponse)
  })

  test('should render the sidebar message when there been no query', async () => {
    render(<CocktailSidebar />)
    // eslint-disable-next-line testing-library/prefer-find-by
    const textElement = await screen.findByText(/Sidebar search and likes/)
    expect(textElement).toBeInTheDocument()
  })

  test('should render a input field', async () => {
    render(<CocktailSidebar />)
    const inputEl = await screen.findByTestId('sidebar-search-input')
    expect(inputEl).toBeInTheDocument()
  })

  test('should fetch cocktails when a user types into the search field', async () => {
    const testQuery = 'test'
    const searchIdentifier = `end:/search.php?s=${testQuery}`
    fetchMock.get(searchIdentifier, JSON.stringify(testCocktailResponse))

    render(<CocktailSidebar />)

    const inputEl = await screen.findByTestId('sidebar-search-input')
    await userEvent.type(inputEl, testQuery)

    await waitFor(() => {
      expect(fetchMock.mock().called(searchIdentifier)).toBe(true)
    })
  })

  test('should show the filter input when the filters button is clicked', async () => {
    render(<CocktailSidebar />)

    const filterButtonEl = await screen.findByTestId('sidebar-filter-button')
    await userEvent.click(filterButtonEl)

    const filterEl = screen.queryByTestId('sidebar-filter-input')
    expect(filterEl).toBeInTheDocument()
  })

  test('should NOT show the filter input when the filters button is clicked', () => {
    render(<CocktailSidebar />)

    const filterEl = screen.queryByTestId('sidebar-filter-input')
    expect(filterEl).not.toBeInTheDocument()
  })

  test('should only render the cocktails matching all selected filters when a search has been completed and filter(s) have been applied', async () => {
    const testGlassFilter = 'test-glass'
    const testCategoryFilter = 'test-category'
    const testIngredientFilter = 'test-ingredient'
    const testResponse = {
      drinks: [
        {
          idDrink: '1337',
          strDrink: 'some-match',
          strCategory: testCategoryFilter,
          strGlass: testGlassFilter,
          strIngredient1: 'Ingredient 1',
        },
        {
          // only this item is expected after all filters are applied
          idDrink: '42',
          strDrink: 'all-match',
          strCategory: testCategoryFilter,
          strGlass: testGlassFilter,
          strIngredient1: testIngredientFilter,
        },
        {
          idDrink: '123',
          strDrink: 'a-match',
          strCategory: 'A Drink Category',
          strGlass: testGlassFilter,
          strIngredient1: 'Ingredient 1',
        },
      ],
    }
    const testQuery = 'test'
    const searchIdentifier = `end:/search.php?s=${testQuery}`
    fetchMock.get(searchIdentifier, JSON.stringify(testResponse))
    fetchMock.get(
      'end:/list.php?c=list',
      JSON.stringify({
        drinks: [
          {
            strCategory: 'test-category',
          },
        ],
      }),
      {
        overwriteRoutes: true,
      },
    )
    fetchMock.get(
      'end:/list.php?i=list',
      JSON.stringify({
        drinks: [
          {
            ['strIngredient1']: 'test-ingredient',
          },
        ],
      }),
      {
        overwriteRoutes: true,
      },
    )
    fetchMock.get(
      'end:/list.php?g=list',
      JSON.stringify({
        drinks: [
          {
            strGlass: 'test-glass',
          },
        ],
      }),
      {
        overwriteRoutes: true,
      },
    )

    render(<CocktailSidebar />)

    const searchInputEl = await screen.findByTestId('sidebar-search-input')
    await userEvent.type(searchInputEl, testQuery)

    // initial state after the search
    let listItemEls = await screen.findAllByTestId('sidebar-search-list-item')
    expect(listItemEls.length).toBe(3)

    // open the filter input
    const filterButtonEl = await screen.findByTestId('sidebar-filter-button')
    await userEvent.click(filterButtonEl)

    // start applying filters
    const filterInputEl = await screen.findByTestId('sidebar-filter-input')
    // apply the category filter
    await userEvent.type(filterInputEl, `${testCategoryFilter}{enter}`)
    listItemEls = await screen.findAllByTestId('sidebar-search-list-item')
    expect(listItemEls.length).toBe(2)

    // apply the glass filter
    await userEvent.type(filterInputEl, `${testGlassFilter}{enter}`)
    listItemEls = await screen.findAllByTestId('sidebar-search-list-item')
    expect(listItemEls.length).toBe(2)

    // apply a ingredient filter
    await userEvent.type(filterInputEl, `${testIngredientFilter}{enter}`)
    listItemEls = await screen.findAllByTestId('sidebar-search-list-item')
    expect(listItemEls.length).toBe(1)
    const allMatchEl = await screen.findByText(/all-match/)
    expect(allMatchEl).toBeInTheDocument()
  })

  test('should call the provided onCocktailSelect when a search has been completed and a item is clicked', async () => {
    const testQuery = 'test'
    const searchIdentifier = `end:/search.php?s=${testQuery}`
    fetchMock.get(searchIdentifier, JSON.stringify(testCocktailResponse))

    const mockedOnCocktailSelect = jest.fn()

    render(<CocktailSidebar onCocktailSelect={mockedOnCocktailSelect} />)

    // click the item
    const searchInputEl = await screen.findByTestId('sidebar-search-input')
    await userEvent.type(searchInputEl, testQuery)

    // click the item
    let listItemEl = await screen.findByTestId('sidebar-search-list-item')
    await userEvent.click(listItemEl)

    await waitFor(() => {
      expect(mockedOnCocktailSelect).toHaveBeenCalledWith(
        expectedCocktailData[0],
      )
    })
  })

  test('should not filter the cocktails when a search has been completed, filter(s) have been applied but the filter input is hidden', async () => {
    const testResponse = {
      drinks: [
        {
          idDrink: '1337',
          strDrink: 'some-match',
          strCategory: 'some-category',
          strGlass: 'some-glass',
          strIngredient1: 'Ingredient 1',
        },
        {
          idDrink: '42',
          strDrink: 'another-match',
          strCategory: 'another-category',
          strGlass: 'a-glass',
          strIngredient1: 'Ingredient 2',
        },
      ],
    }
    const testQuery = 'test'
    const searchIdentifier = `end:/search.php?s=${testQuery}`
    fetchMock.get(searchIdentifier, JSON.stringify(testResponse))
    fetchMock.get(
      'end:/list.php?c=list',
      JSON.stringify({
        drinks: [
          {
            strCategory: 'no-result-category',
          },
        ],
      }),
      {
        overwriteRoutes: true,
      },
    )

    render(<CocktailSidebar />)

    const searchInputEl = await screen.findByTestId('sidebar-search-input')
    await userEvent.type(searchInputEl, testQuery)

    // initial state after the search
    let listItemEls = await screen.findAllByTestId('sidebar-search-list-item')
    expect(listItemEls.length).toBe(2)

    // open the filter input
    const filterButtonEl = await screen.findByTestId('sidebar-filter-button')
    await userEvent.click(filterButtonEl)

    // apply a filter
    const filterInputEl = await screen.findByTestId('sidebar-filter-input')
    await userEvent.type(filterInputEl, 'no-result-category{enter}')
    listItemEls = screen.queryAllByTestId('sidebar-search-list-item')
    expect(listItemEls.length).toBe(0)

    // close the filter input
    await userEvent.click(filterButtonEl)
    listItemEls = await screen.findAllByTestId('sidebar-search-list-item')
    expect(listItemEls.length).toBe(2)
  })
})
