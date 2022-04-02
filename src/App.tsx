import React from 'react'

import { Grommet } from 'grommet'

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
      <div>Yay Cocktails!</div>
    </Grommet>
  )
}

export default App
