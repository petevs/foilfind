import { Container, Card, Box, Skeleton, Text } from "@mantine/core";
import Link from "next/link";
import BasicShell from "../../components/shells/BasicShell";
import { getCollection } from "../../helpers/firebaseHelpers";
import { toKebabCase } from "../../helpers/formatters";


//get static props
export async function getStaticProps() {
  // get all products
  const products = await getCollection("products");

  return {
    props: {
      products,
    },
  };

}

export default function ProductsHome(props){

  console.log(props)


  return (
    <BasicShell>
      <Container>
        <h1>Products Home</h1>
        {
          props.products.map(product => {
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
                    <Text weight={500}>{product.name}</Text>
                  </Box>
                </Box>
              </Card>
            </Link>
            )
          }
          )
        }
      </Container>
    </BasicShell>
  )
}