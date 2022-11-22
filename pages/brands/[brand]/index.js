import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { getCollection } from '../../../helpers/firebaseHelpers';
import BasicShell from "../../../components/shells/BasicShell";
import { Box, TextInput, Chip, Select } from '@mantine/core';
import Head from 'next/head';
import BrandHeader from '../../../components/BrandHeader';
import BrandContentShell from '../../../components/BrandContentShell';
import { useState, useEffect } from 'react';
import ProductCard from '../../../components/ProductCard';
import { IconSearch } from '@tabler/icons';

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

//get static props for brand from firebase
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


export default function BrandPage(props){
  const { brand, products } = props;


  const [categories, setCategories] = useState({
    'foils': true,
    'wings': true,
    'boards': true,
  })

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = products.filter((product) => {
      if(categories[product.category]){
        return true;
      } else {
        return false;
      }
    })
    setFilteredProducts(filtered);
  },[categories, products])


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const chips = [
    { label: 'Foils', value: 'foils' },
    { label: 'Wings', value: 'wings' },
    { label: 'Boards', value: 'boards' },
  ];

  return (
    <>
    <Head>
      <title>{brand.brand}</title>
    </Head>
    <BasicShell>
        <BrandHeader brand={brand.brand} active='products' />
        <BrandContentShell>
        <Box sx={{display: 'grid', gridTemplateColumns: '1fr', gap: '1rem'}}>
          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              justifyContent: 'start',
              gap: '1rem'
            }}
          >
            {
                    chips.map(chip => (
                        <Chip
                            key={chip.label}
                            variant='outline'
                            size='sm'
                            color='dark'
                            onClick={() => setCategories({...categories, [chip.value]: !categories[chip.value]})}
                            checked={categories[chip.value]}
                            
                        >
                            {chip.label}
                        </Chip>
                    ))
                }
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1rem'
            }}
          >
            <TextInput
                placeholder='Search by product, category, keywords'
                icon={<IconSearch size={16} />}
                // value={search}
                // onChange={(event) => setSearch(event.currentTarget.value)}
              />
              <Select
                defaultValue={'featured'}
                data={[
                  { label: 'Featured', value: 'featured' },
                  { label: 'Price: Low to High', value: 'price-low' },
                  { label: 'Price: High to Low', value: 'price-high' },
                  { label: 'Newest', value: 'newest' },
                ]}
              />
          </Box>

          <Box>
            {
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            }
          </Box>
        </Box>
        </BrandContentShell>
    </BasicShell>
    </>
  )
}