import useFetchApi from '../../../hooks/useFetchApi'
import BASE_COCKTAILS_URL from '../../../utils/baseUrl'

interface IUseCocktailFiltersApi {
  getIngredientFilters: () => Promise<string[]>
  getCategoryFilters: () => Promise<string[]>
  getGlassFilters: () => Promise<string[]>
}

interface IFilterApiResponse {
  drinks: any[]
}

const apiFilterToFilter = (apiFilter: any): string => {
  const { strGlass, strIngredient, strCategory } = apiFilter
  return strGlass || strIngredient || strCategory
}

const filterConvertor = (data: IFilterApiResponse): string[] => {
  if (!data || !data.drinks) {
    return []
  }
  return data.drinks.map(apiFilterToFilter)
}

const useCocktailFiltersApi = (): IUseCocktailFiltersApi => {
  const fetchApi = useFetchApi(BASE_COCKTAILS_URL, filterConvertor)

  const getIngredientFilters = () => fetchApi('list.php?i=list')
  const getCategoryFilters = () => fetchApi('list.php?c=list')
  const getGlassFilters = () => fetchApi('list.php?g=list')

  return {
    getIngredientFilters,
    getCategoryFilters,
    getGlassFilters,
  }
}

export default useCocktailFiltersApi
