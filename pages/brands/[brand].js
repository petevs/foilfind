import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { getCollection } from '../../helpers/firebaseHelpers';
import BasicShell from "../../components/shells/BasicShell";
import { Box, Overlay, Title, Text, Container, Divider, Checkbox } from '@mantine/core';
import Head from 'next/head';

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

  return {
    props: {
      brand,
    },
  }
}


export default function BrandPage(props){
  const { brand } = props;

  console.log(brand)

  return (
    <>
    <Head>
      <title>{brand.brand}</title>
    </Head>
    <BasicShell>
      <Box sx={{
        height: '300px', 
        position: 'relative',
        backgroundImage: 'url(https://images.unsplash.com/photo-1523469409786-14311feb8e7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3216&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />
        <Box sx={{display: 'grid', height: '100%', justifyContent: 'center', alignContent: 'center', position: 'relative', zIndex: 2}}>
          <Title color='white' order={1}>{brand.brand}</Title>
        </Box>
      </Box>
        <Container p='sm'>
          <Box sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '1rem'}}>
            <Text color='blue'>About</Text>
            <Text>Products</Text>
            <Text>Deals</Text>
            <Text>Retailers</Text>
          </Box>
        </Container>
        <Divider />
        <Container>
          <Box sx={(theme) => ({ minHeight: `calc(100vh - ${theme.other.headerHeight}px - 300px)` })}>
            <Text my='lg' size='lg' weight={700}>Product Offerings:</Text>
            <Box sx={{display: 'grid', gridAutoFlow: 'column', gap: '1rem', justifyContent: 'start'}}>
            <Checkbox
              label="Foils"
              checked={brand.foils}
              readOnly
            />
            <Checkbox
              label="Wings"
              checked={brand.wings}
              readOnly
            />
            <Checkbox
              label="Boards"
              checked={brand.boards}
              readOnly
            />
            </Box>
            <Text mt='lg' size='lg' weight={700}>Website:</Text>
            <a href={brand.url} target="_blank" rel="noreferrer">{brand.url}</a>
          </Box>
        </Container>
    </BasicShell>
    </>
  )
}