import ICocktail from '../interfaces/ICocktail'
import cocktailConvertor from '../utils/cocktailConverter'

const testCocktailApiData = {
  drinks: [
    {
      idDrink: '15597',
      strDrink: 'Absolut Stress #2',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Ordinary Drink',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Collins Glass',
      strInstructions: 'Mix well. Garnish with Orange and Cherry. Enjoy',
      strInstructionsES: null,
      strInstructionsDE:
        'Gut mischen. Mit Orange und Kirsche garnieren. Genie\u00dfen.',
      strInstructionsFR: null,
      strInstructionsIT: 'Mescolare bene.\r\nGuarnire con arancia e ciliegia.',
      ['strInstructionsZH-HANS']: null,
      ['strInstructionsZH-HANT']: null,
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/xuyqrw1472811825.jpg',
      strIngredient1: 'Absolut Vodka',
      strIngredient2: 'Peach schnapps',
      strIngredient3: 'Coconut liqueur',
      strIngredient4: 'Cranberry juice',
      strIngredient5: 'Pineapple juice',
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
      strMeasure1: '1 1/2 oz',
      strMeasure2: '1/2 oz',
      strMeasure3: '1/2 oz',
      strMeasure4: '1 1/2 oz',
      strMeasure5: '1 1/2 oz',
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
      dateModified: '2016-09-02 11:23:45',
    },
  ],
}

interface IUseCocktailsApi {
  getRandomCocktail: () => Promise<ICocktail[]>
}

const useCocktailsApi = (): IUseCocktailsApi => {
  const getRandomCocktail = () =>
    Promise.resolve(cocktailConvertor(testCocktailApiData))

  return {
    getRandomCocktail,
  }
}

export default useCocktailsApi