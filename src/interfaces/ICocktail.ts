import IInstruction from '../CocktailSidebar/interfaces/IInstruction'

interface ICocktail {
  id: string
  name: string
  instructions: IInstruction[]
  measurements: string[]
  ingredients: string[]
  tags: string[]
  IBA: string | null
  alcoholic: string | null
  category: string | null
  creativeCommonsConfirmed: string
  dateModified: string
  drinkAlternate: string | null
  drinkThumb: string | null
  glass: string | null
  imageAttribution: string | null
  imageSource: string | null
  video: string | null
}

export default ICocktail
