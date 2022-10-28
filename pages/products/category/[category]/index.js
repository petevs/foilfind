import { getCollection } from "../../../../helpers/firebaseHelpers";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import BasicShell from "../../../../components/shells/BasicShell";
import { Container, Button, Box, Title } from "@mantine/core";
import CategoryContentLayout from "../../../../components/productPage/CategoryContentLayout";
import HideMobileBox from "../../../../components/HideMobileBox";
import CategoryFilters from "../../../../components/productPage/CategoryFilters";
import CategorySort from "../../../../components/productPage/CategorySort";
import ProductKCard from "../../../../components/productPage/ProductKCard";



export async function getStaticPaths(){

  const products = await getCollection('products');

  // get all unique categories
  const categories = [...new Set(products.map(product => product.category))];

  const paths = categories.map((category) => ({
    params: { category: category },
  }));

  return {
    paths,
    fallback: false
  }
}

//get static props for products from firebase
export async function getStaticProps({ params }) {

  const q = query(collection(db, 'products'), where('category', '==', params.category));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });
  
  const products = data;

  return {
    props: {
      products,
      category: params.category
    },
  }

}

export default function ProductCategoryPage(props) {

  const { products, category } = props;

  return (
    <BasicShell>
      <Container size='xl' py='xl'>
        <Box>
          <Button variant='subtle'>Foils</Button>
          <Button variant='subtle'>Wings</Button>
          <Button variant='subtle'>Boards</Button>
          <Button variant='subtle'>Accessories</Button>
        </Box>
        <Box py='md'>
          <Title order={2} transform='capitalize'>Find {category}</Title>
          <CategoryContentLayout>
            <HideMobileBox>
              <CategoryFilters />
            </HideMobileBox>
            <Box>
              <HideMobileBox>
                <CategorySort
                  filters={{sort: 'cheapest'}}
                  setFilters={() => {}}
                />
              </HideMobileBox>
              {
                props.products.map((product) => {
                  return (
                    <ProductKCard key={product.id} product={product} />
                  )
                })
              }
  
            </Box>
          </CategoryContentLayout>
        </Box>
      </Container>
    </BasicShell>
  )
}