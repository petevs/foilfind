import BasicShell from "../../../components/shells/BasicShell"
import { Container, Text } from "@mantine/core"
import { db } from "../../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { getCollection } from "../../../helpers/firebaseHelpers";
import BrandHeader from "../../../components/BrandHeader";
import BrandContentShell from "../../../components/BrandContentShell";
import MapShell from "../../../components/shells/MapShell";
import MapPageWrapper from "../../../components/pages/retailerMap/MapPageWrapper";

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

  const retailers = await getCollection('retailers');
  const retailersWithBrand = retailers.filter((retailer) => retailer.brands[brand.brand].carry);


  return {
    props: {
      brand,
      retailers: retailersWithBrand,
    },
  }
}



export default function BrandProducts(props){

  const { brand, retailers } = props;

  return (
    <BasicShell>
      <BrandHeader brand={brand.brand} active='retailers'/>
          <MapPageWrapper
            parsedRetailers={retailers}
            brandPage={true}
          />
    </BasicShell>
  )
}