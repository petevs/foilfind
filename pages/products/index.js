import { Container, Card, Box, Skeleton, Text, Button, Menu, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import ContentSlider from "../../components/ContentSlider";
import ProductCard from "../../components/ProductCard";
import BasicShell from "../../components/shells/BasicShell";
import { getCollection} from "../../helpers/firebaseHelpers";
import { toKebabCase } from "../../helpers/formatters";
import useCheckAdmin from "../../hooks/useCheckAdmin";
import Hero from "../../components/Hero";
import CategoryPicker from "../../components/CategoryPicker";
import { useState } from "react";
import CategoryFilters from "../../components/productPage/CategoryFilters";
import CategoryContentLayout from "../../components/productPage/CategoryContentLayout";
import CategorySort from "../../components/productPage/CategorySort";
import ProductKCard from "../../components/productPage/ProductKCard";
import HideMobileBox from "../../components/HideMobileBox";
import CategoryHeader from "../../components/CategoryHeader";
import CategorySlider from "../../components/CategorySlider";
import { NextLink } from "@mantine/next";


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
        />
        <Box mt='xl'>
          <Title order={1}>Products</Title>
          <Title order={2}>Find by Category</Title>
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
                      height: '206px', 
                      backgroundColor: theme.colors.gray[2], 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      borderRadius: theme.radius.md,
                      '&:hover': {
                        border: `1px solid ${theme.colors.dark[2]}`,
                      }
                    })}>
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
          toPath='/products/categories/foils'
          products={foils}
        />
        <CategorySlider
          headline='Popular Wings'
          toPath='/products/categories/wings'
          products={wings}
        />
        <CategorySlider
          headline='Popular Boards'
          toPath='/products/categories/boards'
          products={boards}
        />
      </Container>
    </BasicShell>
  )
}