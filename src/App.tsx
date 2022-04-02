import React from 'react'

import { Grommet, Box } from 'grommet'
import CocktailDetails from './CocktailDetails'
import CocktailSidebar from './CocktailSidebar'

const theme = {
  global: {
    colors: {
      brand: '#f86600',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
}

const AppBar: React.FC<any> = props => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    {...props}
  />
)

const App: React.FC<unknown> = () => {
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar />
        <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
          <CocktailSidebar data-testid={'cocktail-fragment-sidebar'} />
          <CocktailDetails data-testid={'cocktail-fragment-details'} />
        </Box>
      </Box>
    </Grommet>
  )
}

export default App
