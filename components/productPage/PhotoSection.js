import { Box, Button } from "@mantine/core"
import Image from "next/image"
import { IconLayoutGrid } from "@tabler/icons"

const PhotoSection = ({product}) => {
  return (
    <>
    <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', height: '300px', gap: '.5rem', margin: '1rem 0',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
            }
          }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Image 
                  src={product.images[0]} 
                  alt={product.name} 
                  layout='fill'
                  objectFit='cover'
                  blurDataURL={product.images[0]}
                  placeholder='blur'
                />
              </Box>
            <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem',
              '@media (max-width: 768px)': {
                display: 'none'
              }
            }}>
              {
                product.images.slice(1, 5).map((image, index) => (
                  <Box
                    key={image}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <Image
                      src={image}
                      alt={product.name}
                      layout='fill'
                      objectFit="cover"
                      blurDataURL={image}
                      placeholder='blur'
                    />
                  </Box>
                ))
              }
            </Box>
          </Box>
        <Box sx={{position: 'relative', display: 'grid', justifyContent: 'end', padding: '0 2rem', marginTop: '-4rem', marginBottom: '4rem'}}>
            <Button variant='default'
                size='xs'
                sx={(theme) => ({border: '1px solid', borderColor: theme.colors.gray[7]})}
                leftIcon={<IconLayoutGrid size={14} />}
            >Show All Photos</Button>
        </Box>
    </>
  )
}

export default PhotoSection