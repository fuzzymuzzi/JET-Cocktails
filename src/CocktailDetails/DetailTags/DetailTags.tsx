import { BoxProps, Tag } from 'grommet'
import DetailBox from '../components/DetailBox'

interface IDetailTags extends BoxProps {
  tags: string[]
}

const DetailTags: React.FC<IDetailTags> = ({ tags, ...props }) => {
  return (
    <DetailBox gap={'xsmall'} direction='row' {...props}>
      {tags.map(tag => (
        <Tag
          key={tag}
          value={tag}
          a11yTitle={`Cocktail tag - ${tag}`}
          data-testid={'detail-tags-tag'}
        />
      ))}
    </DetailBox>
  )
}

export default DetailTags
