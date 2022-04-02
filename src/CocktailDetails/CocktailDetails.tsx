import { Box } from 'grommet'

interface ICocktailDetailsProps {}

const CocktailDetails: React.FC<ICocktailDetailsProps> = props => {
  return (
    <Box flex align='center' justify='center' {...props}>
      Yay Cocktails!
    </Box>
  )
}

export default CocktailDetails
