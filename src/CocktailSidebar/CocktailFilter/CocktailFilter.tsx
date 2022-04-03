import { BoxProps } from 'grommet'
import { useEffect, useMemo, useState } from 'react'
import SideBarBox from '../components/SideBarBox'
import useCocktailFiltersApi from './hooks/useCocktailFiltersApi'
import TagInput from './TagInput'

interface ICocktailFilterProps extends BoxProps {
  hasFilters: boolean
}

const allSuggestions = ['one', 'two', 'thre', 'four']

const CocktailFilter: React.FC<ICocktailFilterProps> = ({
  hasFilters,
  ...props
}) => {
  const [selectedFilters, setSelectedFilters] = useState(['one', 'two'])
  const [suggestions, setSuggestions] = useState(allSuggestions)

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
    console.log({ filteredSuggestions })
    setSuggestions(filteredSuggestions)
  }

  const api = useCocktailFiltersApi()

  const getCocktailCategoryFilters = useMemo(
    () => async () => {
      try {
        const categoryFilters = await api.getCategoryFilters()
        console.log({ categoryFilters })
      } catch (error) {
        console.error(error)
      }
    },
    [],
  )

  useEffect(() => {
    getCocktailCategoryFilters()
  }, [])

  return hasFilters ? (
    <SideBarBox {...props}>
      <TagInput
        placeholder='Filter ingredients, categories or glass'
        data-testid={'sidebar-filter-input'}
        suggestions={suggestions}
        selectedTags={selectedFilters}
        onRemove={onRemoveFilter}
        onAdd={onAddFilter}
        onChange={event => onFilterSuggestion(event.target.value)}
        a11yTitle='Filter on Ingredients, categories or glass'
      />
    </SideBarBox>
  ) : null
}

export default CocktailFilter
