import { Box, Container, Title, Button, Skeleton, Text, Group, Divider } from "@mantine/core"
import { query, collection, where, getDocs } from 'firebase/firestore';
import BasicShell from "../../../components/shells/BasicShell";
import { db } from "../../../firebase";
import { getCollection } from "../../../helpers/firebaseHelpers";
import useCheckAdmin from "../../../hooks/useCheckAdmin";
import { useRouter } from "next/router";
import RatingsReadOnly from "../../../components/RatingsReadOnly";

// get static paths for each product
export async function getStaticPaths() {
  // get all products
  const products = await getCollection("products");

  // create paths for each product
  const paths = products.map((product) => ({
    params: { product: product.path },
  }));

  return { paths, fallback: false };
}


// get static props for each product

export async function getStaticProps({ params }) {

  const q = query(collection(db, 'products'), where('path', '==', params.product));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });

  const product = data[0];

  return {
    props: {
      product,
    },
  }
}


export default function ProductPage(props) {

  const { isAdmin, user } = useCheckAdmin();
  const router = useRouter();

  const { product } = props;

  return (
    <BasicShell>
      <Container size='xl' p='lg'>
        <Box sx={{display: 'grid', gridTemplateColumns: '150px 2fr', gap: '2rem', marginBottom: '2rem'}}>
        <Skeleton
          style={{ width: "100%", height: "100%" }}
        />
        <Box>
          <Title order={1}>{product.name}</Title>
          <Text size='sm' color='dimmed'>{product.brand}</Text>
          <Text size='xl' weight={600}>{product.priceRange ? `$${product.priceRange.minPrice} - $${product.priceRange.maxPrice}` : 'No Data'}</Text>
          <Group spacing='xs'>
            <RatingsReadOnly rating={product.reviewSummary.rating} />
            <Text sx={{marginTop: '-5px'}} color='dimmed' size='xs'>Based on {product.reviewSummary.numOfReviews} Reviews</Text>
          </Group>
        </Box>
        </Box>
        <Box
          sx={(theme) => ({
            border: `1px solid ${theme.colors.gray[2]}`,
            borderRadius: theme.radius.md,
            paddingBottom: '3rem'
          })}
        >
          <Box
            sx={
              (theme) => (
                {
                  padding: `${theme.spacing.md}px`,
                  backgroundColor: theme.colors.gray[0],
                  borderRadius: `${theme.radius.md}px ${theme.radius.md}px 0 0`,
              }
              )}
          >
            <Text weight={600}>Compare Offers</Text>
          </Box>
          <Divider />
          {
            product.inventory.map((item, index) => (
              <>
              <Box key={index} sx={
                (theme) => (
                  {
                    display: 'grid', 
                    gridTemplateColumns: 'auto 1fr', 
                    gap: '1rem', 
                    alignItems: 'center', 
                    padding: `${theme.spacing.md}px`,
                }
                )}>
                <Text size='sm' weight={600}>${item.price}</Text>
                <Text size='sm'>{item.retailer}</Text>
              </Box>
              <Divider />
              </>
            ))
          }

        </Box>
        
        <Box py='xl'>
          {
            isAdmin && (
              <Button
                onClick={() => router.push(`${router.asPath}/edit`)}
              >Edit</Button>
            )
          }
        </Box>
      </Container>
    </BasicShell>
  )
}