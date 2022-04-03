import { Box, TextInput, Spinner } from 'grommet'
import { Filter, Search } from 'grommet-icons'
import { useEffect, useMemo, useState } from 'react'
import useCocktailsApi from './hooks/useCocktailsApi'
import ICocktail from './interfaces/ICocktail'
import constructDebouncedCall from '../utils/constructDebouncedCall'
import CocktailList from './CocktailList'
import SideBarBox from './components/SideBarBox'
import CocktailFilter from './CocktailFilter'
import ICocktailFilters from './interfaces/ICocktailFilters'

interface ICocktailSidebarProps {
  onCocktailSelect?: (selectedCocktail: unknown) => {}
}

const CocktailSidebar: React.FC<ICocktailSidebarProps> = props => {
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
      cocktailOptions.filter(cocktail => {
        const {
          ingredient: ingredientFilters,
          glass: glassFilters,
          category: categoryFilters,
        } = selectedFilters

        const hasIngredientFilters = ingredientFilters.length > 0
        const hasCategoryFilters = categoryFilters.length > 0
        const hasGlassFilters = glassFilters.length > 0

        let filters = []

        if (hasCategoryFilters) {
          filters.push(categoryFilters.includes(cocktail.category || ''))
        }
        if (hasGlassFilters) {
          filters.push(glassFilters.includes(cocktail.glass || ''))
        }
        if (hasIngredientFilters) {
          ingredientFilters.forEach(filter => {
            filters.push(cocktail.ingredients.includes(filter))
          })
        }

        return filters.length > 0 ? filters.every(v => v === true) : true
      }),
    [cocktailOptions, selectedFilters],
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
      <SideBarBox>
        <TextInput
          placeholder='Search for cocktails'
          data-testid={'sidebar-search-input'}
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
          data-testid={'sidebar-filter-button'}
        >
          <Filter color={hasFilters ? 'brand' : ''} />
        </Box>
      </SideBarBox>
      <CocktailFilter
        hasFilters={hasFilters}
        onFiltersChange={setSelectedFilters}
      />
      {isFetching ? (
        <SideBarBox pad={{ vertical: 'medium' }}>
          <Spinner
            data-testid={'sidebar-search-spinner'}
            size={'large'}
            message={`Looking for cocktails containing "${query}"`}
          />
        </SideBarBox>
      ) : null}
      {!isFetching && hasCocktails ? (
        <SideBarBox fill={'horizontal'} direction='column' flex={false}>
          <CocktailList
            cocktails={filteredCocktailOptions}
            selectedCocktail={selectedCocktail}
            onCocktailSelect={setSelectedCocktail}
          />
        </SideBarBox>
      ) : (
        <SideBarBox pad={{ vertical: 'medium' }}>
          'Sidebar search and likes'
        </SideBarBox>
      )}
    </Box>
  )
}

export default CocktailSidebar
