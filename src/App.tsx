import React, { useState } from 'react'

import { Grommet, Box } from 'grommet'
import CocktailDetails from './CocktailDetails'
import CocktailSearchbar from './CocktailSidebar'
import ICocktail from './interfaces/ICocktail'

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
  const [selectedCocktail, setSelectedCocktail] = useState<ICocktail>()

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar />
        <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
          <CocktailSearchbar
            data-testid={'cocktail-fragment-searchbar'}
            onCocktailSelect={cocktail => {
              setSelectedCocktail(cocktail)
            }}
          />
          <CocktailDetails
            data-testid={'cocktail-fragment-details'}
            selectedCocktail={selectedCocktail}
          />
        </Box>
      </Box>
    </Grommet>
  )
}

export default App
