import { BoxProps, Paragraph, Text } from 'grommet'
import IInstruction from '../../interfaces/IInstruction'

import DetailBox from '../components/DetailBox'
import DetailHeading from '../components/DetailHeading'

interface IDetailRequirements extends BoxProps {
  instructions: IInstruction[]
}

const DetailInstructions: React.FC<IDetailRequirements> = ({
  instructions,
  ...props
}) => {
  return (
    <DetailBox gap='small' {...props}>
      <DetailHeading level={3} data-testid={'detail-name'}>
        Instructions
      </DetailHeading>
      {instructions.length > 0 ? (
        <Paragraph fill>{instructions[0].label}</Paragraph>
      ) : (
        <Text> No Instructions for this Cocktail </Text>
      )}
    </DetailBox>
  )
}

export default DetailInstructions
