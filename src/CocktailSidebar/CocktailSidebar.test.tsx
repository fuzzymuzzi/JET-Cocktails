import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CocktailSidebar from './CocktailSidebar'
import fetchMock from 'fetch-mock'
import { testCocktailResponse } from '../../test/data'

describe('CocktailSidebar', () => {
  beforeEach(() => {
    fetchMock.reset()
    const defaultResponse = '[]'
    fetchMock.get('end:/list.php?i=list', defaultResponse)
    fetchMock.get('end:/list.php?c=list', defaultResponse)
    fetchMock.get('end:/list.php?g=list', defaultResponse)
  })

  test('should render the sidebar message', async () => {
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
})
