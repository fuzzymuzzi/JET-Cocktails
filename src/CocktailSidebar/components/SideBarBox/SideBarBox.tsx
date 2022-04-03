import { Box, BoxProps } from 'grommet'

const SideBarBox: React.FC<BoxProps> = ({ children, ...props }) => (
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

export default SideBarBox
