import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { getCollection } from '../../../helpers/firebaseHelpers';
import BasicShell from "../../../components/shells/BasicShell";
import { Box, Overlay, Title, Text, Container, Divider, Checkbox } from '@mantine/core';
import Head from 'next/head';
import BrandHeader from '../../../components/BrandHeader';
import BrandContentShell from '../../../components/BrandContentShell';

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


export default function BrandAboutPage(props){
  const { brand } = props;

  return (
    <>
    <Head>
      <title>{brand.brand}</title>
    </Head>
    <BasicShell>
        <BrandHeader brand={brand.brand} active='about' />
        <BrandContentShell>
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
        </BrandContentShell>
    </BasicShell>
    </>
  )
}