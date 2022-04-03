import { Box } from 'grommet'
import React from 'react'
import ICocktail from '../interfaces/ICocktail'
import DetailBox from './components/DetailBox'
import DetailHeading from './components/DetailHeading'
import DetailImage from './DetailImage'
import DetailInstructions from './DetailInstructions'
import DetailRequirements from './DetailRequirements'
import DetailTags from './DetailTags'

interface ICocktailDetailsProps {
  selectedCocktail?: ICocktail
}

const CocktailDetails: React.FC<ICocktailDetailsProps> = ({
  selectedCocktail: cocktail,
  ...props
}) => {
  const hasCocktail = !!cocktail

  const {
    drinkThumb,
    imageSource,
    imageAttribution,
    glass,
    tags = [],
    ingredients = [],
    measurements = [],
    instructions = [],
  } = cocktail || {}

  const hasImage = drinkThumb && imageSource

  return (
    <Box
      pad={{ horizontal: 'xlarge' }}
      flex
      align='center'
      justify='center'
      {...props}
    >
      <Box
        direction='column'
        pad={{ vertical: 'large', horizontal: 'xlarge' }}
        fill
        align='center'
        flex={false}
        overflow={{
          vertical: 'auto',
          horizontal: 'hidden',
        }}
      >
        {hasCocktail ? (
          <>
            <DetailBox>
              <DetailHeading data-testid={'detail-name'}>
                {cocktail.name}
              </DetailHeading>
              <DetailHeading level={2} data-testid={'detail-category'}>
                {cocktail.category}
              </DetailHeading>
            </DetailBox>
            {hasImage ? (
              <DetailImage
                imageSource={imageSource}
                imageSrc={drinkThumb}
                imageAttribution={imageAttribution || ''}
              />
            ) : null}
            {tags.length > 0 ? <DetailTags tags={tags} /> : null}
            {glass ? (
              <DetailRequirements
                measurements={measurements}
                ingredients={ingredients}
                glass={glass}
              />
            ) : null}

            <DetailInstructions instructions={instructions} />
          </>
        ) : (
          'Yay Cocktails!'
        )}
      </Box>
    </Box>
  )
}

export default CocktailDetails
