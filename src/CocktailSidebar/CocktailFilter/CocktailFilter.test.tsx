import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CocktailFilter from './CocktailFilter'

import fetchMock from 'fetch-mock'

describe('CocktailSearchbarbar', () => {
  beforeEach(() => {
    fetchMock.reset()
    const defaultResponse = '[]'
    fetchMock.get('end:/list.php?i=list', defaultResponse)
    fetchMock.get('end:/list.php?c=list', defaultResponse)
    fetchMock.get('end:/list.php?g=list', defaultResponse)
  })

  test('should show the filter input when hasFilters is set to true', async () => {
    render(<CocktailFilter hasFilters={true} />)

    const filterEl = screen.queryByTestId('searchbar-filter-input')
    expect(filterEl).toBeInTheDocument()
  })

  test('should NOT show the filter input when the filters button is clicked', () => {
    render(<CocktailFilter hasFilters={false} />)

    const filterEl = screen.queryByTestId('searchbar-filter-input')
    expect(filterEl).not.toBeInTheDocument()
  })

  test('should fetch the ingredient filters on the initial render', async () => {
    const ingredientListIdentifier = 'end:/list.php?i=list'
    fetchMock.get(ingredientListIdentifier, JSON.stringify([]), {
      overwriteRoutes: true,
    })

    render(<CocktailFilter hasFilters />)

    await waitFor(() => {
      expect(fetchMock.mock().calls(ingredientListIdentifier).length).toBe(1)
    })
  })

  test('should fetch the glass filters on the initial render', async () => {
    const glassListIdentifier = 'end:/list.php?g=list'
    fetchMock.get(glassListIdentifier, JSON.stringify([]), {
      overwriteRoutes: true,
    })

    render(<CocktailFilter hasFilters />)

    await waitFor(() => {
      expect(fetchMock.mock().calls(glassListIdentifier).length).toBe(1)
    })
  })

  test('should fetch the category filters on the initial render', async () => {
    const categoryListIdentifier = `end:/list.php?c=list`
    fetchMock.get(categoryListIdentifier, JSON.stringify([]), {
      overwriteRoutes: true,
    })

    render(<CocktailFilter hasFilters />)

    await waitFor(() => {
      expect(fetchMock.mock().calls(categoryListIdentifier).length).toBe(1)
    })
  })

  test('should call the provided onFiltersChange with the selected filters when a filter is selected', async () => {
    const categoryListIdentifier = 'end:/list.php?c=list'
    fetchMock.get(
      categoryListIdentifier,
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

    const mockedOnFiltersChange = jest.fn()
    render(
      <CocktailFilter hasFilters onFiltersChange={mockedOnFiltersChange} />,
    )

    const inputEl = await screen.findByTestId('searchbar-filter-input')
    await userEvent.type(inputEl, 'test-category{enter}')

    await waitFor(() => {
      expect(mockedOnFiltersChange).toBeCalledWith({
        category: ['test-category'],
        ingredient: [],
        glass: [],
      })
    })
  })

  test('should call the provided onFiltersChange with the selected filters when a filter is is removed from the selection', async () => {
    const categoryListIdentifier = 'end:/list.php?c=list'
    fetchMock.get(
      categoryListIdentifier,
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

    const mockedOnFiltersChange = jest.fn()
    render(
      <CocktailFilter hasFilters onFiltersChange={mockedOnFiltersChange} />,
    )

    await waitFor(() => {
      expect(mockedOnFiltersChange).toBeCalledWith({
        category: [],
        ingredient: [],
        glass: [],
      })
    })

    const inputEl = await screen.findByTestId('searchbar-filter-input')
    await userEvent.type(inputEl, 'test-category{enter}')

    await waitFor(() => {
      expect(mockedOnFiltersChange).toHaveBeenNthCalledWith(2, {
        category: ['test-category'],
        ingredient: [],
        glass: [],
      })
    })

    const tagEl = await screen.findByTestId('tag-input-tag')
    await userEvent.click(tagEl)

    await waitFor(() => {
      expect(mockedOnFiltersChange).toHaveBeenNthCalledWith(3, {
        category: [],
        ingredient: [],
        glass: [],
      })
    })
  })
})
