import { Box } from 'grommet'

interface ICocktailSidebarProps {
  onCocktailSelect?: (selectedCocktail: unknown) => {}
}

const CocktailSidebar: React.FC<ICocktailSidebarProps> = props => {
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
