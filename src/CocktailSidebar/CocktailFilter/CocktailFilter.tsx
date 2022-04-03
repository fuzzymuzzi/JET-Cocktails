import { BoxProps, TextInput } from 'grommet'
import { Filter } from 'grommet-icons'
import SideBarBox from '../components/SideBarBox'

interface ICocktailFilterProps extends BoxProps {
  hasFilters: boolean
}

const CocktailFilter: React.FC<ICocktailFilterProps> = ({
  hasFilters,
  ...props
}) => {
  return hasFilters ? (
    <SideBarBox {...props}>
      <TextInput
        placeholder='Ingredients, categories or glass'
        data-testid={'sidebar-filter-input'}
        a11yTitle='Filter on Ingredients, categories or glass'
        value={''}
        icon={<Filter />}
        onChange={event => {}}
      />
    </SideBarBox>
  ) : null
}

export default CocktailFilter
