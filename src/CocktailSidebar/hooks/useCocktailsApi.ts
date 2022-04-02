import ICocktail from '../interfaces/ICocktail'
import cocktailConvertor from '../utils/cocktailConverter'

import useFetchApi from '../../hooks/useFetchApi'

const BASE_COCKTAILS_URL = 'https://www.thecocktaildb.com/api/json/v1/1'
interface IUseCocktailsApi {
  getCocktailsByQuery: (query: string) => Promise<ICocktail[]>
  getRandomCocktail: () => Promise<ICocktail[]>
}

const useCocktailsApi = (): IUseCocktailsApi => {
  const fetchApi = useFetchApi(BASE_COCKTAILS_URL, cocktailConvertor)

  const getRandomCocktail = () => fetchApi('random.php')
  const getCocktailsByQuery = (query: string) =>
    fetchApi(`search.php?s=${query}`)

  return {
    getCocktailsByQuery,
    getRandomCocktail,
  }
}

export default useCocktailsApi
