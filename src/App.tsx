import React from 'react'

import { Grommet } from 'grommet'
import CocktailDetails from './CocktailDetails'

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

const App: React.FC<unknown> = () => {
  return (
    <Grommet theme={theme} full>
      <CocktailDetails data-testid={'cocktail-details-fragment'} />
    </Grommet>
  )
}

export default App
