import { Box } from 'grommet'
import { useEffect, useState } from 'react'
import useCocktailsApi from './hooks/useCocktailsApi'
import ICocktail from './interfaces/ICocktail'

interface ICocktailSidebarProps {
  onCocktailSelect?: (selectedCocktail: unknown) => {}
}

const CocktailSidebar: React.FC<ICocktailSidebarProps> = props => {
  const [cocktailOptions, setCocktailOptions] = useState([] as ICocktail[])

  const api = useCocktailsApi()

  const fetchCocktails = async () => {
    const cocktails = await api.getRandomCocktail()
    setCocktailOptions(cocktails)
  }

  useEffect(() => {
    fetchCocktails()
  }, [])

  useEffect(() => {
    console.log(cocktailOptions)
  }, [cocktailOptions])

  return (
    <Box
      width='medium'
      background='light-1'
      elevation='medium'
      align='center'
      justify='center'
      {...props}
    >
      sidebar search and liked
    </Box>
  )
}

export default CocktailSidebar
