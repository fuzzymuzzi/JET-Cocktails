import { Box, TextInput, Spinner } from 'grommet'
import { Filter, Search } from 'grommet-icons'
import { useEffect, useMemo, useState } from 'react'
import useCocktailsApi from './hooks/useCocktailsApi'
import ICocktail from '../interfaces/ICocktail'
import constructDebouncedCall from '../utils/constructDebouncedCall'
import CocktailList from './CocktailList'
import SearchbarBox from './components/SearchbarBox'
import CocktailFilter from './CocktailFilter'
import ICocktailFilters from './interfaces/ICocktailFilters'

interface ICocktailSearchbarProps {
  onCocktailSelect?: (selectedCocktail: ICocktail) => void
}

const CocktailSearchbar: React.FC<ICocktailSearchbarProps> = ({
  onCocktailSelect,
  ...props
}) => {
  const [cocktailOptions, setCocktailOptions] = useState([] as ICocktail[])
  const [query, setQuery] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const api = useCocktailsApi()

  const getCocktailsByQuery = useMemo(
    () =>
      constructDebouncedCall(async (query: string) => {
        setSelectedCocktail(undefined)
        setIsFetching(true)
        try {
          const cocktails = await api.getCocktailsByQuery(query)
          setCocktailOptions(cocktails)
          setIsFetching(false)
        } catch (error) {
          setIsFetching(false)
          console.error(error)
        }
      }),
    [],
  )

  useEffect(() => {
    if (query) {
      getCocktailsByQuery(query)
    }
  }, [getCocktailsByQuery, query])

  const hasCocktails = cocktailOptions.length > 0
  const [selectedCocktail, setSelectedCocktail] = useState<ICocktail>()

  const [hasFilters, setHasFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<ICocktailFilters>({
    category: [],
    ingredient: [],
    glass: [],
  })

  const filteredCocktailOptions = useMemo(
    () =>
      hasFilters
        ? cocktailOptions.filter(cocktail => {
            const {
              ingredient: ingredientFilters,
              glass: glassFilters,
              category: categoryFilters,
            } = selectedFilters

            const hasIngredientFilters = ingredientFilters.length > 0
            const hasCategoryFilters = categoryFilters.length > 0
            const hasGlassFilters = glassFilters.length > 0

            let filterEvals = []

            if (hasCategoryFilters) {
              filterEvals.push(
                categoryFilters.includes(cocktail.category || ''),
              )
            }
            if (hasGlassFilters) {
              filterEvals.push(glassFilters.includes(cocktail.glass || ''))
            }
            if (hasIngredientFilters) {
              ingredientFilters.forEach(filter => {
                filterEvals.push(cocktail.ingredients.includes(filter))
              })
            }

            return filterEvals.length > 0
              ? filterEvals.every(v => v === true)
              : true
          })
        : cocktailOptions,
    [cocktailOptions, selectedFilters, hasFilters],
  )

  return (
    <Box
      width='medium'
      background='light-1'
      elevation='medium'
      align='center'
      justify='start'
      pad={{ left: 'medium', right: 'medium', vertical: 'large' }}
      gap={'medium'}
      fill={'vertical'}
      flex={false}
      overflow={{
        vertical: 'auto',
        horizontal: 'hidden',
      }}
      {...props}
    >
      <SearchbarBox gap='small'>
        <TextInput
          placeholder='Search for cocktails names'
          data-testid={'searchbar-search-input'}
          value={query}
          icon={<Search />}
          onChange={event => {
            setQuery(event.target.value)
          }}
        />
        <Box
          hoverIndicator
          a11yTitle='filter cocktail'
          role={'button'}
          onClick={() => {
            setHasFilters(!hasFilters)
          }}
          data-testid={'searchbar-filter-button'}
        >
          <Filter color={hasFilters ? 'brand' : ''} />
        </Box>
      </SearchbarBox>
      <CocktailFilter
        hasFilters={hasFilters}
        onFiltersChange={setSelectedFilters}
      />
      {isFetching ? (
        <SearchbarBox pad={{ vertical: 'medium' }}>
          <Spinner
            data-testid={'searchbar-search-spinner'}
            size={'large'}
            message={`Looking for cocktails containing "${query}"`}
          />
        </SearchbarBox>
      ) : null}
      {!isFetching && hasCocktails ? (
        <SearchbarBox fill={'horizontal'} direction='column' flex={false}>
          <CocktailList
            cocktails={filteredCocktailOptions}
            selectedCocktail={selectedCocktail}
            onCocktailSelect={selectedCocktail => {
              setSelectedCocktail(selectedCocktail)
              if (selectedCocktail && onCocktailSelect) {
                onCocktailSelect(selectedCocktail)
              }
            }}
          />
        </SearchbarBox>
      ) : (
        <SearchbarBox pad={{ vertical: 'medium' }}>
          No Search results or likes
        </SearchbarBox>
      )}
    </Box>
  )
}

export default CocktailSearchbar
