import { Anchor, Box, BoxProps, Image, Text } from 'grommet'
import DetailBox from '../components/DetailBox'

interface IDetailImage extends BoxProps {
  imageSrc: string
  imageSource: string
  imageAttribution?: string
}

const DetailImage: React.FC<IDetailImage> = ({
  imageAttribution,
  imageSource,
  imageSrc,
  ...props
}) => {
  return (
    <DetailBox {...props}>
      <Anchor href={imageSource} as='a' data-testid={'detail-image'}>
        <Box height='medium' width='medium'>
          <Image fit='cover' src={imageSrc} />
        </Box>
      </Anchor>
      {imageAttribution ? (
        <Text
          data-testid={'detail-image-attribution'}
        >{`Image source: ${imageAttribution}`}</Text>
      ) : null}
    </DetailBox>
  )
}

export default DetailImage
