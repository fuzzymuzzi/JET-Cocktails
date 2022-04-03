import { BoxProps } from 'grommet'
import { useEffect, useMemo, useState } from 'react'
import SideBarBox from '../components/SideBarBox'
import useCocktailFiltersApi from './hooks/useCocktailFiltersApi'
import TagInput from './TagInput'

interface ICocktailFilters {
  category: string[]
  ingredient: string[]
  glass: string[]
}
interface ICocktailFilterProps extends BoxProps {
  hasFilters: boolean
  onFiltersChange?: (filters: ICocktailFilters) => void
}

const CocktailFilter: React.FC<ICocktailFilterProps> = ({
  hasFilters,
  onFiltersChange,
  ...props
}) => {
  const [categoryFilters, setCategoryFilters] = useState<string[]>([])
  const [glassFilters, setGlassFilters] = useState<string[]>([])
  const [ingredientFilters, setIngredientFilters] = useState<string[]>([])

  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const allSuggestions = useMemo(
    () => categoryFilters.concat(ingredientFilters, glassFilters),
    [categoryFilters, ingredientFilters, glassFilters],
  )

  const hasFilter = (filter: string) => selectedFilters.includes(filter)

  const onRemoveFilter = (filterToRemove: any) => {
    setSelectedFilters(
      selectedFilters.filter((filter: any) => filter !== filterToRemove),
    )
  }

  const onAddFilter = (filter: string) => {
    if (!hasFilter(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const onFilterSuggestion = (value: string) => {
    const filteredSuggestions = allSuggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0 &&
        !hasFilter(value),
    )
    setSuggestions(filteredSuggestions)
  }

  const api = useCocktailFiltersApi()

  const getCocktailCategoryFilters = useMemo(
    () => async () => {
      try {
        const categoryFilters = await api.getCategoryFilters()
        setCategoryFilters(categoryFilters)
      } catch (error) {
        console.error(error)
      }
    },
    [],
  )
  const getCocktailGlassFilters = useMemo(
    () => async () => {
      try {
        const glassFilters = await api.getGlassFilters()
        setGlassFilters(glassFilters)
      } catch (error) {
        console.error(error)
      }
    },
    [],
  )
  const getCocktailIngredientFilters = useMemo(
    () => async () => {
      try {
        const ingredientFilters = await api.getIngredientFilters()
        setIngredientFilters(ingredientFilters)
      } catch (error) {
        console.error(error)
      }
    },
    [],
  )

  useEffect(() => {
    getCocktailCategoryFilters()
    getCocktailGlassFilters()
    getCocktailIngredientFilters()
  }, [])

  useEffect(() => {
    const filters = {
      category: categoryFilters.filter((filter: string) =>
        selectedFilters.includes(filter),
      ),
      glass: glassFilters.filter((filter: string) =>
        selectedFilters.includes(filter),
      ),
      ingredient: ingredientFilters.filter((filter: string) =>
        selectedFilters.includes(filter),
      ),
    }
    if (onFiltersChange) {
      onFiltersChange(filters)
    }
  }, [selectedFilters, onFiltersChange])

  return hasFilters ? (
    <SideBarBox {...props}>
      <TagInput
        placeholder='Filter ingredients, categories or glass'
        data-testid={'sidebar-filter-input'}
        suggestions={suggestions}
        selectedTags={selectedFilters}
        onRemove={onRemoveFilter}
        onAdd={onAddFilter}
        onChange={event => {
          onFilterSuggestion(event.target.value)
        }}
        a11yTitle='Filter on Ingredients, categories or glass'
      />
    </SideBarBox>
  ) : null
}

export default CocktailFilter
