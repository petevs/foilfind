import { Title, Box, Text, Group, UnstyledButton } from '@mantine/core'
import RatingsReadOnly from '../RatingsReadOnly'
import { IconShare, IconHeart } from '@tabler/icons'
import FavoritProductButton from './FavoriteProductButton'
import ProductShareButton from './ProductShareButton'

const MobileTitle = ({product, scrollIntoView, targetRef}) => {
  return (
    <Box
      sx={{
        '@media (min-width: 768px)': {
          display: 'none',
        },
      }}
    >
    <Title order={2}>{product.name}</Title>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            justifyContent: 'space-between',
            alignItems: 'center',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',

            }
          }}
        >
        <Box sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '.5rem', alignItems: 'center'}}>
          <Text size='sm' color='dimmed'>{product.brand}</Text>
          <Text color='dimmed' size='sm'>·</Text>
          <UnstyledButton
              onClick={() => scrollIntoView(targetRef)}
            >
              <Group spacing='xs'>
                <Box sx={{marginTop: '5px'}}>
                  <RatingsReadOnly rating={product.reviewSummary.rating} />
                </Box>
                <Text color='dimmed' size='sm'>Based on {product.reviewSummary.numOfReviews} Reviews</Text>
              </Group>
            </UnstyledButton>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gap: '1rem',
              '@media (max-width: 768px)': {
                gridTemplateColumns: 'auto auto',
                justifyContent: 'start',
              }
            }}
          >              
                      <ProductShareButton
              url={`https://foilfind.com/product/${product.path}`}
            />
            <FavoritProductButton 
              productID={product.id}
            />
        </Box>
        </Box>
  </Box>
  )
}

export default MobileTitle