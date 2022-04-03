import { Box, Heading } from 'grommet'
import ICocktail from '../interfaces/ICocktail'

interface ICocktailDetailsProps {
  selectedCocktail?: ICocktail
}

const CocktailDetails: React.FC<ICocktailDetailsProps> = ({
  selectedCocktail: cocktail,
  ...props
}) => {
  const hasCocktail = !!cocktail
  console.log({ cocktail })

  return (
    <Box flex align='center' justify='center' {...props}>
      <Box direction='column' pad='large' fill align='center'>
        {hasCocktail ? (
          <>
            <Heading margin='none'>{cocktail.name}</Heading>
          </>
        ) : (
          'Yay Cocktails!'
        )}
      </Box>
    </Box>
  )
}

export default CocktailDetails
