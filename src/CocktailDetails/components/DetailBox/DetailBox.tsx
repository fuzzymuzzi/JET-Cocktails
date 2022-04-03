import { Box, BoxProps } from 'grommet'

const DetailBox: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box
    direction='column'
    alignSelf='start'
    pad={'small'}
    flex={false}
    {...props}
  >
    {children}
  </Box>
)
export default DetailBox
