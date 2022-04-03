import { Box, Text, Avatar, BoxProps } from 'grommet'
import ICocktail from '../../interfaces/ICocktail'

interface ICocktailItemProps extends BoxProps {
  isSelected: boolean
  cocktail: ICocktail
}
const CocktailItem: React.FC<ICocktailItemProps> = ({
  isSelected,
  cocktail,
  ...props
}) => (
  <Box
    as='li'
    pad={{ horizontal: 'small', vertical: 'small' }}
    direction='row'
    gap={'medium'}
    align='center'
    border={'horizontal'}
    fill='horizontal'
    background={isSelected ? 'light-3' : undefined}
    data-testid={'cocktail-item'}
    {...props}
  >
    {cocktail.drinkThumb ? (
      <Avatar
        role={'img'}
        size='medium'
        src={cocktail.drinkThumb}
        a11yTitle='cocktail-thumbnail'
        data-testid={'cocktail-item-avatar'}
      />
    ) : null}

    <Text weight='bold' truncate>
      {cocktail.name}
    </Text>
  </Box>
)

export default CocktailItem
