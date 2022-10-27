import Link from "next/link"
import { Card, Box, Skeleton, Text } from "@mantine/core"

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
                  <Skeleton radius="md" style={{width: '150px', height: '150px'}} />
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