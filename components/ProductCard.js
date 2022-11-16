import Link from "next/link"
import { Card, Box, Skeleton, Text } from "@mantine/core"
import Image from "next/image"

const ProductCard = ({ product }) => {

  return (
    <Link href={`/products/${product.path}`} key={product.id} passHref>
                <Card shadow="sm" padding="md" radius="md" style={{marginBottom: '1rem'}} withBorder
                  sx={(theme) => ({
                    '&:hover': {
                      cursor: 'pointer',
                      boxShadow: theme.shadows.md,
                    }
                  })}
                >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '1rem'
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      position: 'relative',
                      height: '150px',
                      width: '150px',
                      borderRadius: theme.radius.md,
                      '& span': {
                        borderRadius: theme.radius.md,
                      }
                    })}
                  >
                    <Image
                      src={product.images[0]}
                      layout="fill"
                      objectFit="cover"
                      alt={product.name}
                    />
                  </Box>
                  <Box p='md'>
                    <Text weight={500} size='lg'>{product.name}</Text>
                    <Text transform='uppercase' color='dimmed' size='sm'>{product.category} · {product.brand}</Text>
                  </Box>
                </Box>
              </Card>
            </Link>
  )
}

export default ProductCard