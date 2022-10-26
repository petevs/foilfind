import BasicShell from "../../../components/shells/BasicShell";
import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import ProductForm from "../../../components/productForms/ProductForm"
import { getCollection } from "../../../helpers/firebaseHelpers";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase";


export async function getStaticPaths() {
  // get all products
  const products = await getCollection("products");

  // create paths for each product
  const paths = products.map((product) => ({
    params: { product: product.path },
  }));

  return { paths, fallback: false };
}



export async function getStaticProps({ params }){

  const brands = await getCollection('brands')
  const brandList = brands.map(brand => brand.brand)


  // get product
  const q = query(collection(db, 'products'), where('path', '==', params.product));
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

  return (
    <BasicShell>
      <Container size='xl' p='lg'>
        <h1>{props.product.id}</h1>
        <ProductForm {...props} />
      </Container>
    </BasicShell>
  )
}