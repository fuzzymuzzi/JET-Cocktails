import { BoxProps, NameValueList, NameValuePair, Text } from 'grommet'

import DetailBox from '../components/DetailBox'
import DetailHeading from '../components/DetailHeading'

interface IDetailRequirements extends BoxProps {
  glass: string
  ingredients: string[]
  measurements: string[]
}

const MEASUREMENT_FALLBACK = 'No measurement'

const DetailRequirements: React.FC<IDetailRequirements> = ({
  glass,
  ingredients,
  measurements,
  ...props
}) => {
  return (
    <DetailBox gap='small' {...props}>
      <DetailHeading level={3} data-testid={'detail-name'}>
        Requirements
      </DetailHeading>
      <NameValueList>
        <NameValuePair name={'Glass'}>
          <Text color='text-strong'>{glass}</Text>
        </NameValuePair>
        {ingredients?.map((ingredient, index) => {
          const measurement = measurements[index] || MEASUREMENT_FALLBACK
          return (
            <NameValuePair
              name={ingredient}
              key={`${ingredient}-${measurement}-${index}`}
            >
              <Text color='text-strong'>{measurement}</Text>
            </NameValuePair>
          )
        })}
      </NameValueList>
    </DetailBox>
  )
}

export default DetailRequirements
