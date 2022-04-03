import { Box, TextInput, Spinner } from 'grommet'
import { Filter, Search } from 'grommet-icons'
import { useEffect, useMemo, useState } from 'react'
import useCocktailsApi from './hooks/useCocktailsApi'
import ICocktail from './interfaces/ICocktail'
import constructDebouncedCall from '../utils/constructDebouncedCall'
import CocktailList from './CocktailList'
import { SideBarBox } from './components'

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
      <SideBarBox>
        {hasFilters ? (
          <TextInput
            placeholder='Ingredients, categories or glass'
            data-testid={'sidebar-filter-input'}
            value={''}
            icon={<Filter />}
            onChange={event => {}}
          />
        ) : null}
      </SideBarBox>
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
            cocktails={cocktailOptions}
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
