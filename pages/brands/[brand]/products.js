import BasicShell from "../../../components/shells/BasicShell"
import { Card, Container, Text, Box, Checkbox, Skeleton } from "@mantine/core"
import { db } from "../../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { getCollection } from "../../../helpers/firebaseHelpers";
import BrandHeader from "../../../components/BrandHeader";
import BrandContentShell from "../../../components/BrandContentShell";
import { useState, useEffect } from "react";

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


  const [categories, setCategories] = useState({
    'foils': true,
    'wings': true,
    'boards': true,
  })

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = products.filter((product) => {
      return categories[product.category];
    })
    setFilteredProducts(filtered);
  },[categories, products])


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <BasicShell>
      <BrandHeader brand={brand.brand} active='products'/>
      <BrandContentShell>
        <Box sx={{display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem'}}>
          <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '.5rem', alignContent: 'start'}}>
              {
                Object.keys(categories).map((category) => (
                  <Checkbox
                    key={category}
                    label={capitalizeFirstLetter(category)}
                    checked={brand[category] ? categories[category] : false}
                    onChange={(event) => {
                      setCategories({ ...categories, [category]: event.currentTarget.checked });
                    }}
                    disabled={!brand[category]}
                  />
                ))
              }
    
          </Box>
          <Box>
            {
              filteredProducts.map((product) => (
                <Card key={product.id} shadow="sm" padding="md" radius="md" style={{marginBottom: '1rem'}} withBorder>
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
              ))
            }
          </Box>
        </Box>
      </BrandContentShell>
    </BasicShell>
  )
}