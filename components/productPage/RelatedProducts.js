import { Divider, Title, Box, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

const RelatedProducts = ({products}) => {

  if(products.length < 1) return <></>

  const slider = (theme) => ({
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'start',
    gap: '1rem',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none'
    }
})

  return (
    <>
      <Divider my='lg' />
      <Title order={3} style={{margin: '1rem 0'}}>Related Products</Title>
      <Box sx={slider}>
      {
          products.map((product, index) => (
            <Link
              key={index}
              href={`/products/${product.path}`}
              passHref
            >
            <Box
              component='a'
              sx={(theme) => ({
                border: `1px solid ${theme.colors.gray[3]}`,
                borderRadius: theme.radius.md,
                '& span': {
                  borderRadius: theme.radius.md
                },
              })}
            >
              <Box
                sx={{
                  height: '200px', 
                  width: '200px',
                  position: 'relative'
                }} 
              >
                  <Image src={product.images[0]} alt={product.name} layout='fill' objectFit='cover' />
              </Box>
              <Text p='xs' align='center' size='sm' color='dimmed'>{product.name}</Text>
            </Box>
            </Link>
          ))
        }
      </Box>
    </>
  )
}

export default RelatedProducts