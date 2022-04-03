import { Heading, HeadingProps } from 'grommet'

const DetailHeading: React.FC<HeadingProps> = ({ children, ...props }) => (
  <Heading tabIndex={0} margin='none' {...props}>
    {children}
  </Heading>
)
export default DetailHeading
