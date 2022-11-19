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

  const browseCategory = [
    {label: 'Foil Kits', category: 'foils', subcategory: 'foil kits', path: '/foils/foil kits'},
    {label: 'Front Wings', category: 'foils', subcategory: 'front wings', path: '/foils/front wings'},
    {label: 'Tail Wings', category: 'foils', subcategory: 'tail wings', path: '/foils/tail wings'},
    {label: 'Masts', category: 'foils', subcategory: 'masts', path: '/foils/masts'},
    {label: 'Fuselages', category: 'foils', subcategory: 'fuselages', path: '/foils/fuselages'},
    {label: 'Foil Hardware', category: 'foils', subcategory: 'hardware', path: '/foils/hardware'},
    {label: 'Hard Boards', category: 'boards', subcategory: 'hard boards', path: '/boards/hard boards'},
    {label: 'Inflatable Boards', category: 'boards', subcategory: 'inflatable boards', path: '/boards/inflatable'},
    {label: 'Wings', category: 'wings', subcategory: 'wings', path: '/wings'},
    {label: 'Pumps', category: 'accessories', subcategory: 'pumps', path: '/accessories/pumps'},
    {label: 'Leashes', category: 'accessories', subcategory: 'leashes', path: '/accessories/leashes'},
    {label: 'Foot Straps', category: 'accessories', subcategory: 'foot straps', path: '/accessories/foot straps'},
    {label: 'Board Bags', category: 'accessories', subcategory: 'Board bags', path: '/accessories/board bags'},
    {label: 'Wing Bars', category: 'accessories', subcategory: 'wing bars', path: '/accessories/wing bars'},
    {label: 'Harnesses', category: 'accessories', subcategory: 'harnesses', path: '/accessories/harnesses'},
    {label: 'Harness Lines', category: 'accessories', subcategory: 'harness lines', path: '/accessories/harness lines'},
  ]


  const categoryImages = {
    'Foil Kits': 'https://www.armstrongfoils.com/media/1886/1050-money-4.png',
    'Front Wings': 'https://www.armstrongfoils.com/media/1903/1050-wing-money-1.png',
    'Tail Wings': 'https://www.armstrongfoils.com/media/2264/flying-v-money-view-1.png',
    'Masts': 'https://www.armstrongfoils.com/media/2737/performance-mast-795mm-money-1.png',
    'Fuselages': 'https://www.armstrongfoils.com/media/2274/tc-fuselage-money-web.png',
    'Foil Hardware': 'https://www.armstrongfoils.com/media/2160/ttf-money-1.png',
    'Hard Boards': 'https://www.armstrongfoils.com/media/2367/52-wing-sup-top.png',
    'Inflatable Boards': 'https://www.f-one.world/app/uploads/2020/06/rocket-air-650x650.png',
    'Wings': 'https://www.f-one.world/app/uploads/2021/05/strike-cwc-11-450x450.png',
    'Pumps': 'https://www.armstrongfoils.com/media/2193/a-wing-pump-money-1.png',
    'Leashes': 'https://www.armstrongfoils.com/media/1990/leash-money-2.png',
    'Foot Straps': 'https://www.f-one.world/app/uploads/2022/03/v-straps-foilboard-450x450.png',
    'Board Bags': 'https://www.armstrongfoils.com/media/2440/wing-surf-board-bag-money-1.png',
    'Wing Bars': 'https://www.armstrongfoils.com/media/2185/powerlink-bar-money-1.png',
    'Harnesses': 'https://cdn.shopify.com/s/files/1/0588/1721/6691/products/113782_4a24d48279e4304ecb5b84ed9897dcac7bcb604e_845x.png',
    'Harness Lines': 'https://www.f-one.world/app/uploads/2019/10/HARNESS-LEASH-450x450.png'
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
            browseCategory.map(category => (
              <Link key={category.label} href={`/products/category${category.path}`} passHref>
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
                        src={categoryImages[category.label]}
                        layout='fill'
                        objectFit='contain'
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
                    {category.label}
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