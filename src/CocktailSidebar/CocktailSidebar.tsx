import { Box, BoxProps, TextInput, Spinner } from 'grommet'
import { Search } from 'grommet-icons'
import { useCallback, useEffect, useState } from 'react'
import useCocktailsApi from './hooks/useCocktailsApi'
import ICocktail from './interfaces/ICocktail'
import { debounce } from 'lodash'

interface ICocktailSidebarProps {
  onCocktailSelect?: (selectedCocktail: unknown) => {}
}

const SideBarBox: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box
    width='medium'
    align='center'
    justify='center'
    direction='row'
    {...props}
  >
    {children}
  </Box>
)

const DEFAULT_DEBOUNCE_TIMEOUT = 500

const constructDebouncedCall = (
  callback: (params?: unknown) => void,
  timeout: number = DEFAULT_DEBOUNCE_TIMEOUT,
) => debounce(callback, timeout)

const CocktailSidebar: React.FC<ICocktailSidebarProps> = props => {
  const [cocktailOptions, setCocktailOptions] = useState([] as ICocktail[])
  const [query, setQuery] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const api = useCocktailsApi()

  const getCocktailsByQuery = useCallback(
    constructDebouncedCall(async () => {
      setIsFetching(true)
      try {
        const cocktails = await api.getRandomCocktail()
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
    if (query.length > 0) {
      getCocktailsByQuery()
    }
  }, [getCocktailsByQuery, query])

  return (
    <Box
      width='medium'
      background='light-1'
      elevation='medium'
      align='center'
      justify='start'
      pad={{ left: 'medium', right: 'medium', vertical: 'large' }}
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
      </SideBarBox>
      <SideBarBox pad={{ vertical: 'medium' }}>
        {isFetching ? (
          <Spinner
            data-testid={'sidebar-search-spinner'}
            size={'large'}
            message={`Looking for cocktails containing "${query}"`}
          />
        ) : (
          'Sidebar search and likes'
        )}
      </SideBarBox>
    </Box>
  )
}

export default CocktailSidebar
