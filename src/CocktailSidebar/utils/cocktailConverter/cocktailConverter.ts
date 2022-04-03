import { isNil } from 'lodash'
import ICocktail from '../../../interfaces/ICocktail'
import IApiCocktail from './interfaces/IApiCocktail'
import IApiResponse from './interfaces/IApiResponse'

const splitStr = (string: string) => string.split('str')[1] || ''
const lowerCaseFirst = (string: string) =>
  string.charAt(0).toLowerCase().concat(string.slice(1))

const apiCocktailToCocktail = (apiCocktail: IApiCocktail): ICocktail => {
  const { strDrink, idDrink, ...rest } = apiCocktail

  const convertedCocktail = {
    id: idDrink,
    name: strDrink,
    instructions: [],
    ingredients: [],
    measurements: [],
  } as unknown as ICocktail

  Object.keys(rest).forEach((key: string) => {
    const value = apiCocktail[key as keyof IApiCocktail]
    if (key.includes('Instructions')) {
      if (value) {
        const instructionId = key.split('Instructions')[1] || 'EN'
        convertedCocktail.instructions.push({
          id: instructionId,
          label: value,
        })
      }
    } else if (key.includes('Ingredient')) {
      if (value) {
        convertedCocktail.ingredients.push(value)
      }
    } else if (key.includes('Measure')) {
      if (value) {
        convertedCocktail.measurements.push(value)
      }
    } else if (key.includes('Tags')) {
      convertedCocktail.tags = value ? value.split(',') : []
    } else {
      let newKey = key
      if (key.includes('str')) {
        const split = splitStr(key)
        newKey = key.includes('IBA') ? split : lowerCaseFirst(split)
      }
      // @ts-ignore
      convertedCocktail[newKey] = value
    }
  })
  return convertedCocktail
}

const cocktailConvertor = (data: IApiResponse): ICocktail[] => {
  if (!data || !data.drinks) {
    return []
  }
  return data.drinks.map(apiCocktailToCocktail)
}

export default cocktailConvertor
