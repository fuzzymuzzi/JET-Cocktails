import { renderHook } from '@testing-library/react-hooks'
import fetchMock from 'fetch-mock'
import useCocktailsApi from './useCocktailsApi'
import { testCocktailResponse, expectedCocktailData } from '../../../test/data'

describe('useCocktailsApi', () => {
  beforeEach(() => {
    fetchMock.reset()
  })

  test('should call random.php when getRandomCocktail is called', async () => {
    const randomIdentifier = 'end:/random.php'
    fetchMock.get(randomIdentifier, JSON.stringify({}))
    const { result } = renderHook(() => useCocktailsApi())

    await result.current.getRandomCocktail()

    expect(fetchMock.mock().called(randomIdentifier)).toBe(true)
  })

  test('should convert api result when getRandomCocktail is called', async () => {
    const randomIdentifier = 'end:/random.php'
    fetchMock.get(randomIdentifier, JSON.stringify(testCocktailResponse))
    const { result } = renderHook(() => useCocktailsApi())

    const value = await result.current.getRandomCocktail()

    expect(value).toEqual(expectedCocktailData)
  })

  test('should call search.php with a query when useCocktailsApi is called', async () => {
    const testQuery = 'test'
    const searchIdentifier = `end:/search.php?s=${testQuery}`
    fetchMock.get(searchIdentifier, JSON.stringify({}))
    const { result } = renderHook(() => useCocktailsApi())

    await result.current.getCocktailsByQuery(testQuery)

    expect(fetchMock.mock().called(searchIdentifier)).toBe(true)
  })

  test('should convert api result when getCocktailsByQuery is called', async () => {
    const testQuery = 'test'
    const searchIdentifier = `end:/search.php?s=${testQuery}`
    fetchMock.get(searchIdentifier, JSON.stringify(testCocktailResponse))
    const { result } = renderHook(() => useCocktailsApi())

    const value = await result.current.getCocktailsByQuery(testQuery)

    expect(value).toEqual(expectedCocktailData)
  })
})
