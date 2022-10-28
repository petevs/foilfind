import CategoryHeader from "./CategoryHeader"
import { Box, Text } from "@mantine/core"
import Link from "next/link"

const CategorySlider = ({ headline, toPath, products}) => {
  return (
    <>
      <CategoryHeader
        headline={headline}
        toPath={toPath}
      />
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          justifyContent: 'start',
          gap: '1rem',
          overflowX: 'scroll',
          '&::-webkit-scrollbar': {
              display: 'none'
          }
        }}

      >
        {
          products.map(product => (
            <Link key={product.id} href={`/products/${product.path}`}>
              <Box sx={{
                '&:hover': { 
                  cursor: 'pointer',
                }}}>
                <Box
                  sx={(theme) => ({
                    height: '206px',
                    width: '206px',
                    backgroundColor: theme.colors.gray[2],
                    borderRadius: theme.radius.md,
                    '&:hover': {
                      border: `1px solid ${theme.colors.dark[2]}`,
                    }
                  })}
                  mb='sm'
                >
                </Box>
                <Box>
                  <Text size='xs'  align='center'>{product.name}</Text>
                  <Text size='xs' transform='uppercase' color='dimmed' align='center'>{product.brand}</Text>
                </Box>
              </Box>
            </Link>
            )
          )
        }
      </Box>
    </>
  )
}

export default CategorySlider