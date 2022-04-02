import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CocktailSidebar from './CocktailSidebar'
import fetchMock from 'fetch-mock'
import { testCocktailResponse } from '../../test/data'

describe('CocktailSidebar', () => {
  beforeEach(() => {
    fetchMock.reset()
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
})
