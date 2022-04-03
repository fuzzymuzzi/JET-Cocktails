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

  test("should render the cocktail's category when a cocktail has been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          category: 'a-category',
        }}
      />,
    )
    const textElement = screen.getByText(/a-category/)

    expect(textElement).toBeInTheDocument()
  })

  test("should render the cocktail's image and attribution when a cocktail's image has been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          imageSource: 'someImageSource',
          imageAttribution: 'some-img-attr',
        }}
      />,
    )
    const anchorEl = screen.queryByRole('img')
    expect(anchorEl).toBeInTheDocument()

    const textElement = screen.getByText(/Image source: some-img-attr/)

    expect(textElement).toBeInTheDocument()
  })

  test("should NOT render the cocktail's image and attribution when a cocktail's image has not been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          imageSource: null,
          imageAttribution: null,
        }}
      />,
    )
    const anchorEl = screen.queryByRole('img')
    expect(anchorEl).not.toBeInTheDocument()

    const textElement = screen.queryByText(/Image source: some-img-attr/)

    expect(textElement).not.toBeInTheDocument()
  })

  test("should NOT render the cocktail's image attribution when a cocktail's image attribution has not been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          imageSource: 'some-image',
          imageAttribution: null,
        }}
      />,
    )
    const anchorEl = screen.queryByRole('img')
    expect(anchorEl).toBeInTheDocument()

    const textElement = screen.queryByText(/Image source: some-img-attr/)

    expect(textElement).not.toBeInTheDocument()
  })

  test("should render the cocktail's tags when a cocktail's tags have been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          tags: ['a-tag', 'another-tag'],
        }}
      />,
    )

    const tagEls = screen.queryAllByTestId('detail-tags-tag')

    expect(tagEls.length).toBe(2)
  })

  test("should NOT render the cocktail's tags when a cocktail's tags have not been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          tags: [],
        }}
      />,
    )

    const tagEls = screen.queryAllByTestId('detail-tags-tag')

    expect(tagEls.length).toBe(0)
  })

  test("should render the cocktail's requirements when a cocktail's glass, ingredients and measurements have been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          glass: 'a-test-glass',
          ingredients: ['some liquor'],
          measurements: ['a unit'],
        }}
      />,
    )
    let textElement = screen.getByText(/a-test-glass/)
    expect(textElement).toBeInTheDocument()

    textElement = screen.getByText(/some liquor/)
    expect(textElement).toBeInTheDocument()

    textElement = screen.getByText(/a unit/)
    expect(textElement).toBeInTheDocument()
  })

  test("should render the cocktail's measurement requirements with '-' when a cocktail's there are more ingredients than measurements that have been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          glass: 'a-test-glass',
          ingredients: ['some liquor', 'another liquor'],
          measurements: ['a unit'],
        }}
      />,
    )
    let textElement = screen.getByText(/a-test-glass/)
    expect(textElement).toBeInTheDocument()

    textElement = screen.getByText(/some liquor/)
    expect(textElement).toBeInTheDocument()

    textElement = screen.getByText(/a unit/)
    expect(textElement).toBeInTheDocument()

    textElement = screen.getByText(/No measurement/)
    expect(textElement).toBeInTheDocument()
  })

  test("should NOT render the cocktail's requirements when a cocktail's glass has not been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          glass: null,
          ingredients: ['some liquor'],
          measurements: ['a unit'],
        }}
      />,
    )

    let textElement = screen.queryByText(/some liquor/)
    expect(textElement).not.toBeInTheDocument()

    textElement = screen.queryByText(/a unit/)
    expect(textElement).not.toBeInTheDocument()
  })

  test("should render the cocktail's default instruction when cocktail instructions have has been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          instructions: [
            {
              id: 'EN',
              label: 'a-test-instruction',
            },
          ],
        }}
      />,
    )
    const textElement = screen.getByText(/a-test-instruction/)

    expect(textElement).toBeInTheDocument()
  })

  test("should render the cocktail's fallback instruction text when no cocktail instructions have have been provided", async () => {
    render(
      <CocktailDetails
        selectedCocktail={{
          ...expectedCocktailData[0],
          instructions: [],
        }}
      />,
    )
    const textElement = screen.getByText(/No Instructions for this Cocktail/)

    expect(textElement).toBeInTheDocument()
  })
})
