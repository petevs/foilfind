import { Title, Box, Text, Group, UnstyledButton } from '@mantine/core'
import RatingsReadOnly from '../RatingsReadOnly'
import { IconShare, IconHeart } from '@tabler/icons'
const DesktopTitle = ({product}) => {
  return (
    <Box
      sx={{
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          display: 'none',
        }
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
          <Box sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '.5rem', alignItems: 'center',
        }}>
            <Text size='sm' color='dimmed'>{product.brand}</Text>
            <Text color='dimmed' size='sm'>·</Text>
            <Box sx={{marginTop: '5px'}}>
              <RatingsReadOnly rating={product.reviewSummary.rating} />
            </Box>
            <Text color='dimmed' size='sm'>Based on {product.reviewSummary.numOfReviews} Reviews</Text>
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
            <UnstyledButton>
                      <Group spacing='xs'>
                        <IconShare size={14} />
                        <Text underline weight={600} color='primary' size='sm'>Share</Text>
                      </Group>
            </UnstyledButton>
            <UnstyledButton>
                      <Group spacing='xs'>
                        <IconHeart size={14} />
                        <Text underline weight={600} color='primary' size='sm'>Save to Wishlist</Text>
                      </Group>
            </UnstyledButton>
          </Box>
          </Box>
    </Box>
  )
}

export default DesktopTitle