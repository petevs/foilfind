import { Container, Card, Box, Skeleton, Text, Button, Menu, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import BasicShell from "../../components/shells/BasicShell";
import { getCollection} from "../../helpers/firebaseHelpers";
import Hero from "../../components/Hero";
import { useState } from "react";
import CategorySlider from "../../components/CategorySlider";
import Image from "next/image";
import { useRouter } from "next/router";


//get static props
export async function getStaticProps() {
  // get all products
  const products = await getCollection("products");
  const categories = ['foils', 'wings', 'boards', 'accessories'];

  return {
    props: {
      products,
      categories
    },
  };

}

export default function ProductsHome(props){

  const [opened, setOpened] = useState(false);
  const productCategories = ['foils', 'wings', 'boards', 'accessories'];
  const router = useRouter()

  const categoryImages = {
    'foils': 'https://www.armstrongfoils.com/media/2298/foil-kit-cat-big-2.jpg',
    'wings': 'https://www.armstrongfoils.com/media/2356/a-wing-v2-cat-website.jpg',
    'boards': 'https://www.armstrongfoils.com/media/2404/fg-boards-cat-website-2.jpg',
    'accessories': 'https://www.armstrongfoils.com/media/2019/accessories-cat-big.jpg'
  }

  const foils = props.products.filter(product => product.category === 'foils');
  const wings = props.products.filter(product => product.category === 'wings');
  const boards = props.products.filter(product => product.category === 'boards');
  const accessories = props.products.filter(product => product.category === 'accessories');

  return (
    <BasicShell>
      <Container size='xl' py='xl'>
        <Hero 
          subhead='Everything about foil gear explained'
          head='Find Foil Answers'
          buttonText='Learn More'
          bgImg='https://images.unsplash.com/photo-1471079688237-3ac9a55f1d6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZCUyMG9jZWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
          buttonOnClick={() => router.push('/resources')}
        />
        <Box mt='xl'>
          <Title order={1}>Products</Title>
          <Title order={2} style={{margin: '.5rem 0'}}>Find by Category</Title>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            paddingTop: '1rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            }
          }}
        >
        {
            productCategories.map(category => (
              <Link key={category} href={`/products/category/${category}`} passHref>
                <Box 
                  component='a' 
                  key={category}
                >
                  <Box>
                    <Box sx={(theme) => ({
                      position: 'relative',
                      height: '206px', 
                      backgroundColor: theme.colors.gray[2], 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      borderRadius: theme.radius.md,
                      '& span': {
                        borderRadius: theme.radius.md,
                      },
                      '&:hover': {
                        border: `1px solid ${theme.colors.dark[2]}`,
                      }
                    })}>
                      <Image
                        src={categoryImages[category]}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                        alt={category}
                      />
                    </Box>
                  <Text 
                    align='center' 
                    transform='capitalize'
                    mt='sm'
                    color='dark'
                  >
                    {category}
                  </Text>
                  </Box>
                </Box>
              </Link>
            ))
          }
        </Box>
        <CategorySlider
          headline='Popular Foils'
          toPath='/products/category/foils'
          products={foils}
        />
        <CategorySlider
          headline='Popular Wings'
          toPath='/products/category/wings'
          products={wings}
        />
        <CategorySlider
          headline='Popular Boards'
          toPath='/products/category/boards'
          products={boards}
        />
      </Container>
    </BasicShell>
  )
}