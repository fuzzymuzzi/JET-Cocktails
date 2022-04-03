import { Box, BoxProps } from 'grommet'
import ICocktail from '../interfaces/ICocktail'
import CocktailItem from './CocktailItem'

interface ICocktailListProps extends BoxProps {
  cocktails: ICocktail[]
  onCocktailSelect: (selectedCocktail?: ICocktail) => void
  selectedCocktail?: ICocktail
}

const CocktailList: React.FC<ICocktailListProps> = ({
  cocktails,
  selectedCocktail,
  onCocktailSelect,
}) => {
  return (
    <Box
      overflow={{ vertical: 'auto', horizontal: 'hidden' }}
      tabIndex={0}
      as={'ul'}
      align={'center'}
      justify={'center'}
      margin='0'
      fill={'horizontal'}
      pad={{ horizontal: 'xsmall', vertical: 'xsmall' }}
      data-testid={'sidebar-search-list'}
    >
      {cocktails.map((cocktail: ICocktail, index: number) => {
        const { id } = cocktail
        return (
          <CocktailItem
            key={cocktail.id}
            cocktail={cocktail}
            isSelected={selectedCocktail?.id === id}
            hoverIndicator={true}
            onClick={() => {
              onCocktailSelect(
                selectedCocktail?.id === id ? undefined : cocktail,
              )
            }}
            data-testid={'sidebar-search-list-item'}
          />
        )
      })}
    </Box>
  )
}

export default CocktailList
