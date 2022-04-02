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
  const testCocktailApiData = {
    drinks: [
      {
        idDrink: '1337',
        strDrink: 'Some random name',
        strDrinkAlternate: null,
        strTags: 'tagOne,tagTwo',
        strVideo: null,
        strCategory: 'A Drink Category',
        strIBA: null,
        strAlcoholic: 'Alcoholic',
        strGlass: 'A Glass',
        strInstructions: 'Some instructions',
        strInstructionsES: 'Some other instructions',
        strInstructionsDE: null,
        strInstructionsFR: null,
        strInstructionsIT: null,
        ['strInstructionsZH-HANS']: null,
        ['strInstructionsZH-HANT']: null,
        strDrinkThumb: 'Some source',
        strIngredient1: 'Ingredient 1',
        strIngredient2: 'Ingredient 2',
        strIngredient3: null,
        strIngredient4: null,
        strIngredient5: null,
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: 'Measurement 1',
        strMeasure2: 'Measurement 2',
        strMeasure3: null,
        strMeasure4: null,
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strImageSource: null,
        strImageAttribution: null,
        strCreativeCommonsConfirmed: 'No',
        dateModified: '2022-04-02 15:43:45',
      },
    ],
  }
  const expectedCocktailData = [
    {
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
        { id: 'DE', label: null },
        { id: 'FR', label: null },
        { id: 'IT', label: null },
        { id: 'ZH-HANS', label: null },
        { id: 'ZH-HANT', label: null },
      ],
      measurements: ['Measurement 1', 'Measurement 2'],
      name: 'Some random name',
      tags: ['tagOne', 'tagTwo'],
      video: null,
    },
  ]

  expect(cocktailConverter(testCocktailApiData)).toEqual(expectedCocktailData)
})
