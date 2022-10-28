import { Box, Text, Button, Group, Skeleton } from "@mantine/core"
import Image from "next/image"
import Link from "next/link"

const ProductKCard = ({product}) => {

  const productDummy = {
    minPrice: 0,
    maxPrice: 1000,
    price: 500
  }

  return (
    <Link href={`/products/${product.path}`} passHref>
      <Box
        component='a' 
      >
        <Box
          sx={(theme) => ({
            border: '1px solid #e9ecef',
            borderRadius: '6px',
            boxShadow: '0 0 2px 0 rgba(19,26,31,0.12),0 2px 4px 0 rgba(19,26,31,0.22)',
            backgroundColor: '#fff',
            marginBottom: '1rem',
            color: theme.colors.dark
          })}
        >

          <Box sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: '.5fr 2fr 1fr',
            gap: '2rem',
            padding: '1rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr 2fr',
            },
          })}>
            <Box
              sx={{padding: '0 1rem', position: 'relative'}}
            >
              {/* <Image placeholder='blur' alt={product.productName} layout='fill' objectFit="contain" /> */}
              <Skeleton height={90} />
            </Box>
            <Box sx={{
              display: 'grid',
              gridTemplateRows: 'auto auto 1fr',
              '& svg': {
                height: '12px',
                width: '12px',
                color: '#f6c347'
              }
            }}>
              <Group position='apart'>
                <Text weight={700} size='lg'>{product.name}</Text>
                <Text size='xs' color='dimmed' transform='uppercase'>{product.brand}</Text>
              </Group>
            </Box>
            <Box
              sx={{
                borderLeft: '1px solid #e9ecef',
                paddingLeft: '1rem',
                display: 'grid',
                gridTemplateRows: '1fr auto',
                '@media (max-width: 768px)': {
                  display: 'none'
                }
              }}
            >
              <Box sx={{display: 'grid', alignContent: 'center'}}>
                <Text size='xl' weight={700}>${'minPrice' in product ? `${productDummy.minPrice} - $${productDummy.maxPrice}` : productDummy.price}</Text>
                <Text color='dimmed' size='xs'>New (5) · Used (3)</Text>
              </Box>
              <Button variant='filled' mt='xs' size='sm' sx={{alignSelf: 'end'}}>Compare Offers</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default ProductKCard