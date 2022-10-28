import BasicShell from "../../../components/shells/BasicShell";
import { Box, Button, Container, Paper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import ProductForm from "../../../components/productForms/ProductForm"
import { getCollection } from "../../../helpers/firebaseHelpers";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from 'react'
import { UserContext } from "../../../state/UserContext";
import { IconChevronLeft } from "@tabler/icons";
import EditProduct from "../../../components/productForms/EditProduct";


export async function getServerSideProps(props){

  const brands = await getCollection('brands')
  const brandList = brands.map(brand => brand.brand)


  // get product
  const q = query(collection(db, 'products'), where('path', '==', props.query.product));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });

  const product = data[0];

  return {
    props: {
      brands: brandList,
      product
    }
  }
}


export default function EditProductPage(props) {

  const { userDetails } = useContext(UserContext);
  const router = useRouter();

  return (
    <BasicShell>
      <Container size='xl' p='lg'>
        {
          userDetails && userDetails.role === 'admin' ?
          <>
            <h1>{props.product.id}</h1>
            <EditProduct brands={props.brands} product={props.product} />
          </>
          : 
          <Box sx={(theme) => ({
            minHeight: `calc(100vh - ${theme.other.headerHeight}px)`,
          })}>
            <Paper withBorder shadow='md'>
              <Box
                sx={{height: '300px', display: 'grid', gridAutoFlow: 'row', gap: '1rem', placeItems: 'center', alignContent: 'center'}}
              >
                <Text>

                Sorry you are not authorized to view this page.
                </Text>
                <Button
                  size='xs'
                  variant='light'
                  leftIcon={<IconChevronLeft size={16} />}
                  onClick={() => router.back()}
                >Go Back</Button>
              </Box>
            </Paper>
          </Box>
        }
      </Container>
    </BasicShell>
  )
}