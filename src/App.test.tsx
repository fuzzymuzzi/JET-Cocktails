import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('should render welcome message', () => {
  render(<App />)
  const linkElement = screen.getByText(/Yay Cocktails!/)
  expect(linkElement).toBeInTheDocument()
})
