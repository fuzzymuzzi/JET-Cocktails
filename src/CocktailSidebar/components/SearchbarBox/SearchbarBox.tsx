import { Box, BoxProps } from 'grommet'

const SearchbarBox: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box
    width='medium'
    align='center'
    justify='center'
    direction='row'
    flex={false}
    {...props}
  >
    {children}
  </Box>
)

export default SearchbarBox
