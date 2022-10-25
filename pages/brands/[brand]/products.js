import BasicShell from "../../../components/shells/BasicShell"
import { Container, Text } from "@mantine/core"
import { db } from "../../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { getCollection } from "../../../helpers/firebaseHelpers";
import BrandHeader from "../../../components/BrandHeader";
import BrandContentShell from "../../../components/BrandContentShell";

// get static paths for all brands
export async function getStaticPaths() {
  const brands = await getCollection('brands');
  const paths = brands.map((brand) => ({
    params: { brand: brand.path },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {

  const q = query(collection(db, 'brands'), where('path', '==', params.brand));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });

  const brand = data[0];

  const q2 = query(collection(db, 'products'), where('brand', '==', brand.brand));
  const querySnapshot2 = await getDocs(q2);
  const data2 = [];
  querySnapshot2.forEach((doc) => {
    data2.push({id: doc.id, ...doc.data()});
    });


  return {
    props: {
      brand,
      products: data2,
    },
  }
}



export default function BrandProducts(props){

  const { brand, products } = props;

  return (
    <BasicShell>
      <BrandHeader brand={brand.brand} active='products'/>
      <BrandContentShell>
        {
          products.map((product) => (
            <Text key={product.name}>{product.name}</Text>
          ))
        }
      </BrandContentShell>
    </BasicShell>
  )
}