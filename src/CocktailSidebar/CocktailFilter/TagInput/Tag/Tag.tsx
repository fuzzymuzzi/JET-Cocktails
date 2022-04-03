import { Box, BoxProps, Button, Text } from 'grommet'
import { FormClose } from 'grommet-icons'

interface ITagProps extends BoxProps {
  onRemove?: () => void
}
const Tag: React.FC<ITagProps> = ({ children, onRemove, ...rest }) => {
  const tag = (
    <Box
      direction='row'
      align='center'
      background='brand'
      pad={{ horizontal: 'xxsmall', vertical: 'xxsmall' }}
      margin={{ vertical: 'xxsmall' }}
      round='medium'
      data-testid={'tag-box'}
      {...rest}
    >
      <Text size='small' margin={{ horizontal: 'xxsmall' }}>
        {children}
      </Text>
      {onRemove ? <FormClose size='medium' color='white' /> : null}
    </Box>
  )

  if (onRemove) {
    return (
      <Button onClick={onRemove} data-testid={'tag-button'}>
        {tag}
      </Button>
    )
  }
  return tag
}

export default Tag
