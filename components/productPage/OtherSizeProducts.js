import { Divider, Title, Box, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

const OtherSizeProducts = ({products}) => {

  console.log(products)

  return (
    <>
      <Divider my='lg' />
      <Title order={3} style={{margin: '1rem 0'}}>Other Sizes</Title>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 300px))',
          height: '200px',
          padding: '1rem 0'
        }}
      >
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
                  height: '100%', 
                  width: '100%',
                  position: 'relative'
                }} 
              >
                  <Image src={product.images[0]} alt={product.name} layout='fill' objectFit='cover' />
              </Box>
              <Text align='center' size='sm' color='dimmed'>{product.name}</Text>
            </Box>
            </Link>
          ))
        }
      </Box>
    </>
  )
}

export default OtherSizeProducts