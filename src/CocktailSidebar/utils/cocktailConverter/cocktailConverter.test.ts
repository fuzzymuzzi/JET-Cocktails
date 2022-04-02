import {
  testCocktailResponse,
  expectedCocktailData,
} from '../../../../test/data'
import cocktailConverter from './cocktailConverter'

test('should return an empty array when the provided api response is null', async () => {
  // @ts-ignore
  expect(cocktailConverter(null)).toEqual([])
})

test('should return an empty array when the provided api response is undefined', async () => {
  // @ts-ignore
  expect(cocktailConverter(undefined)).toEqual([])
})

test("should return an empty array when the provided api response does not contain the 'drinks' key", async () => {
  // @ts-ignore
  expect(cocktailConverter({})).toEqual([])
})

test("should return an empty array when the provided api response key 'drinks' contains no data", async () => {
  expect(cocktailConverter({ drinks: [] })).toEqual([])
})

test('should return an array of converted cocktail data when provided with an thecocktaildb api response', async () => {
  expect(cocktailConverter(testCocktailResponse)).toEqual(expectedCocktailData)
})
