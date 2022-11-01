import { getCollection } from "../../../../helpers/firebaseHelpers";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import BasicShell from "../../../../components/shells/BasicShell";
import { Container, Button, Box, Title, Paper, Text, Divider, Indicator, TextInput, Avatar, Skeleton, Rating } from "@mantine/core";
import CategoryContentLayout from "../../../../components/productPage/CategoryContentLayout";
import HideMobileBox from "../../../../components/HideMobileBox";
import CategoryFilters from "../../../../components/productPage/CategoryFilters";
import CategorySort from "../../../../components/productPage/CategorySort";
import ProductKCard from "../../../../components/productPage/ProductKCard";
import useCheckAdmin from "../../../../hooks/useCheckAdmin";
import { IconChevronRight, IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons";
import Link from "next/link";
import { useState } from "react";

export async function getStaticPaths(){

  const products = await getCollection('products');

  // get all unique categories
  const categories = [...new Set(products.map(product => product.category))];

  const paths = categories.map((category) => ({
    params: { category: category },
  }));

  return {
    paths,
    fallback: false
  }
}

//get static props for products from firebase
export async function getStaticProps({ params }) {

  const q = query(collection(db, 'products'), where('category', '==', params.category));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });
  
  const products = data;

  return {
    props: {
      products,
      category: params.category
    },
  }

}

export default function ProductCategoryPage(props) {

  const { products, category } = props;
  const { isAdmin } = useCheckAdmin();

  const columns = ['name', 'brand', 'price range', 'new', 'used', 'avg rating']
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [opened, setOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})

  const categories = ['foil kits', 'front wings', 'tail wings', 'masts', 'fuselages', 'wings', 'boards']


  const filterOptions = [
    'availability',
    'condition',
    'style',
    'brands',
    'rider weight',
    'rider skill level',
    'release year',
    'construction material',
    'wing span',
    'weight'
  ]


  return (
    <BasicShell>
      <Container size='xl' p='xl' sx={(theme) => ({minHeight: `calc(100vh - ${theme.other.headerHeight}px)`})}>
      <Box sx={{position: 'relative', width: '100%', overflowX: 'hidden'}}>
        <Box sx={{
          display: 'grid', 
          gridAutoFlow: 'column', 
          gap: '1.5rem', 
          justifyContent: 'start', 
          overflowX: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none'
        }
        }}>
          {
            categories.map((category, index) => (
              <Link href={`/products/category/${category}`} key={index}>
                <Box
                  sx={(theme) => ({
                    color: category === 'foil kits' ? theme.colors.blue[5] : theme.colors.dark[2],
                    paddingBottom: '.5rem',
                    borderBottom: category === 'foil kits' ? '2px solid' : 'none',
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      cursor: category === 'foil kits' ? 'auto' : 'pointer',
                      color: category === 'foil kits' ? theme.colors.blue[5] : theme.colors.dark[5],
                      borderBottom: '2px solid',
                    }
                  })}

                >
                    {category}
                </Box>
              </Link>
            ))
          }
        </Box>
      </Box>
      <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          padding: '1.5rem 0',
          alignItems: 'center'
        }}>
          <Box>
            <Title order={1}>Find Foil Kits</Title>
            <Text size='sm' color='dimmed'>Find Foil Kits</Text>
          </Box>
          <Box sx={{display: 'grid', gridTemplateColumns: isAdmin ? 'auto auto' : 'auto', gap: '1rem'}}>
            {
              isAdmin && (
                <Button size='xs' color='dark' variant='subtle'>Add New</Button>
              )
            }
            <Indicator label={0} showZero size={22} color='dark' withBorder>
              <Button 
                size='xs'
                variant='default' 
                leftIcon={<IconAdjustmentsHorizontal size={16} />}
                sx={(theme) => ({border: `2px solid ${theme.colors.dark[5]}`})}
                // onClick={() => setOpened(true)}
              >Filters</Button>
            </Indicator>
          </Box>
        </Box>
          <TextInput
            placeholder='Search by product, brand, keywords'
            icon={<IconSearch size={16} />}
            mb='md'
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          <Paper withBorder radius='md'>
            {
              filteredProducts.map((product, index) => (
                <Box key={index}
                  sx={(theme) => ({
                    display: 'grid',
                    padding: theme.spacing.md,
                    borderBottom: `1px solid ${theme.colors.gray[2]}`,
                    gridTemplateColumns: '1fr auto auto auto',
                    gap: '2rem',
                    alignItems: 'center'
                  })}
                >
                  <Box sx={{
                    display: 'grid', 
                    gridTemplateColumns: 'auto auto', 
                    justifyContent: 'start', 
                    gap: '1rem', 
                    alignItems: 'center'
                  }}>
                    <Skeleton height={50} circle />
                    <Box>
                      <Text weight={600} size='md'>{product.name}</Text>
                      <Text size='sm' color='dimmed'>{product.brand}</Text>
                    </Box>
                  </Box>

                  <Box>
                    {/* <Rating size='sm' value={4.5} fractions={2} readOnly /> */}
                    <Text size='xs' color='dimmed'>Based on 36 reviews</Text>
                  </Box>

                  <Box>
                    <Text size='sm' weight={500}>$500 - $955</Text>
                    <Text size='xs' color='dimmed'>New (5) · Used (3)</Text>
                  </Box>
      
                  <Box sx={{justifySelf: 'end', alignSelf: 'center'}}>
                    <IconChevronRight size={18} color='gray' />
                  </Box>
                </Box>
              ))
            }



          </Paper>

        
      {/* <Paper withBorder radius='md'>
            <Box sx={{
              display: 'grid', 
              gridTemplateColumns: isAdmin ? `repeat(${columns.length}, 1fr) 100px 18px` : `repeat(${columns.length}, 1fr) 18px`,
              padding: '.75rem 1.5rem', 
              backgroundColor: '#F9FAFB', 
              borderRadius: '8px 8px 0 0', 
              gap: '1rem',
            }}>
              {
                columns.map((header, index) => (
                  <Text key={index} size='md' transform='capitalize' weight={600}>
                    {header}
                  </Text>
                ))
              }
            </Box>
            <Divider />

            {
              filteredProducts.map((product, index) => (
                <Link key={index} href={`/products/${product.path}`}>
                  <Box sx={(theme) => ({
                    '& :hover': {
                      cursor: 'pointer',
                      backgroundColor: theme.colors.blue[0],
                      '& svg': {
                        stroke: theme.colors.dark[5]
                      }
                    },
                  })}>
                    <Box
                      sx={(theme) => ({
                        display: 'grid',
                        gridTemplateColumns: isAdmin ? `repeat(${columns.length}, 1fr) 100px 18px` : `repeat(${columns.length}, 1fr) 18px`,
                        padding: '.75rem 1.5rem',
                        gap: '1rem',
                        backgroundColor: index % 2 === 0 ? theme.colors.gray[0] : 'white',
                        borderRadius: '0 0 8px 8px',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          backgroundColor: theme.colors.blue[0],
                        },
                      })}
                    >
                      <Text weight={600} size='md'>{product.name}</Text>
                      <Text size='sm' transform='capitalize' color='dimmed'>{product.brand}</Text>
                      <Text size='sm' transform='capitalize' color='dimmed'>$500 - $995</Text>
                      <Text size='sm' transform='capitalize' color='dimmed'>6</Text>
                      <Text size='sm' transform='capitalize' color='dimmed'>2</Text>
                      <Text size='sm' transform='capitalize' color='dimmed'>4.5</Text>
                        {
                          isAdmin &&
                          <Button variant='subtle' size='sm' onClick={(e) => {
                            e.preventDefault()
                            alert('hey')
                          }}>Edit</Button>
                        }
                        <IconChevronRight size={18} color='gray' />
                    </Box>
                  </Box>
                </Link>
              ))
            }


        </Paper> */}
      </Container>      





      {/* <Container size='xl' py='xl'>
        <Box>
          <Button variant='subtle'>Foils</Button>
          <Button variant='subtle'>Wings</Button>
          <Button variant='subtle'>Boards</Button>
          <Button variant='subtle'>Accessories</Button>
        </Box>
        <Box py='md'>
          <Title order={2} transform='capitalize'>Find {category}</Title>
          <CategoryContentLayout>
            <HideMobileBox>
              <CategoryFilters />
            </HideMobileBox>
            <Box>
              <HideMobileBox>
                <CategorySort
                  filters={{sort: 'cheapest'}}
                  setFilters={() => {}}
                />
              </HideMobileBox>
              {
                props.products.map((product) => {
                  return (
                    <ProductKCard key={product.id} product={product} />
                  )
                })
              }
  
            </Box>
          </CategoryContentLayout>
        </Box>
      </Container> */}
    </BasicShell>
  )
}