import { getCollection } from "../../../../helpers/firebaseHelpers";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import BasicShell from "../../../../components/shells/BasicShell";
import { Container, Button, Box, Title, Paper, Text, Divider, Indicator, TextInput, Avatar, Skeleton, Rating, Modal, Slider, RangeSlider, Checkbox, MultiSelect } from "@mantine/core";
import CategoryContentLayout from "../../../../components/productPage/CategoryContentLayout";
import HideMobileBox from "../../../../components/HideMobileBox";
import CategoryFilters from "../../../../components/productPage/CategoryFilters";
import CategorySort from "../../../../components/productPage/CategorySort";
import ProductKCard from "../../../../components/productPage/ProductKCard";
import useCheckAdmin from "../../../../hooks/useCheckAdmin";
import { IconChevronRight, IconAdjustmentsHorizontal, IconSearch, IconStar, IconStarHalf, IconX } from "@tabler/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

  const categories = ['foils', 'wings', 'boards']


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

  useEffect(() => {

    const filtered = products.reduce( (acc, product) => {
      let add = false;

      //check if product matches all filters
      if(product.name.toLowerCase().includes(search.toLowerCase())) {
        add = true;
      }

      if(product.brand.toLowerCase().includes(search.toLowerCase())) {
        add = true;
      }

      if(add){
        acc.push(product)
      }

      return acc;


    }, [])

    setFilteredProducts(filtered)

  },[search, products])


  return (
    <>
      <Modal
        opened={opened}
        size='lg'
        onClose={() => setOpened(false)}
        withCloseButton={false}
        sx={{
          '& .mantine-Modal-modal': {
            padding: 0
          }
        }}
      >
          <Box>
            <Box sx={{display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center'}} py='md' px='lg'>
              <IconX onClick={() => setOpened(false)} size={16} />
              <Text weight={600} align='center'>Filters</Text>
            </Box>
            <Divider />
          </Box>

          <Box
          py='md'
          px='lg'
          sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gap: '1rem',
            height: '50vh',
            alignContent: 'start',
            overflowY: 'scroll'
          }}
        >
          
          <Text size='xl' weight={600}>Price Range</Text>
          <RangeSlider 
            min={0}
            max={1000}
            label={null}
          />
          <Box
            sx={{display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '.5rem', alignItems: 'center'}}
          >
            <TextInput
              label='Min Price'
              placeholder='Min Price'
            />
            <Text color='dimmed' mt='lg'>-</Text>
            <TextInput
              label='Max Price'
              placeholder='Max Price'
            />
          </Box>

          <Divider my='sm' />

          <Text size='xl' weight={600}>Categories</Text>
          <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', alignItems: 'center'}}>
            <Checkbox label='Complete Foil Kits' />
            <Checkbox label='Front Wings' />
            <Checkbox label='Tail Wings' />
            <Checkbox label='Fuselages' />
            <Checkbox label='Masts' />
            <Checkbox label='Accessories' />
            <Checkbox label='Hardware' />
          </Box>

          <Divider my='sm' />

          <Text size='xl' weight={600}>Foil Style</Text>
          <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', alignItems: 'center'}}>
            <Checkbox label='High Speed' />
            <Checkbox label='High Aspect' />
            <Checkbox label='Carving / Freeride' />
          </Box>

          <Divider my='sm' />

          <Text size='xl' weight={600}>Rider Weight</Text>



        </Box>

        <Divider mt='sm' />
        <Box py='md' px='lg' sx={{display: 'grid', gridTemplateColumns: 'auto auto', justifyContent: 'space-between', alignItems: 'center'}}>
          <Button size='sm' color='dark' variant='subtle' compact
            onClick={() => setFilters(initialFilters)}
          >Clear All</Button>
          <Button size='sm' color='dark'
            onClick={() => setOpened(false)}
          >Show {filteredProducts.length} Foil Kits</Button>
        </Box>



        </Modal>



      <BasicShell>
        <Container size='xl' p='xl' sx={(theme) => ({minHeight: `calc(100vh - ${theme.other.headerHeight}px)`})}>
        <Box sx={{position: 'relative', width: '100%', overflowX: 'hidden'}}>
          <Box sx={(theme) => ({
            display: 'grid', 
            gridAutoFlow: 'column', 
            gap: '1.5rem', 
            justifyContent: 'start',
            borderBottom: `1px solid ${theme.colors.gray[3]}`, 
            overflowX: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none'
          }
          })}>
            {
              categories.map((cat, index) => (
                <Link href={`/products/category/${cat}`} key={index}>
                  <Box
                    sx={(theme) => ({
                      color: cat === category ? theme.colors.blue[5] : theme.colors.dark[2],
                      paddingBottom: '.5rem',
                      borderBottom: cat === category ? '2px solid' : 'none',
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        cursor: cat === category ? 'auto' : 'pointer',
                        color: cat === category ? theme.colors.blue[5] : theme.colors.dark[5],
                        borderBottom: '2px solid',
                      }
                    })}

                  >
                      {cat}
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
              <Title order={1} transform='capitalize'>Find {category.substring(0, category.length - 1)} Gear</Title>
            </Box>
            <Box sx={{display: 'grid', gridTemplateColumns: isAdmin ? 'auto auto' : 'auto', gap: '1rem'}}>
              {
                isAdmin && (
                  <Link href='/products/add-new' passHref>
                    <Button component='a' size='xs' color='dark' variant='subtle'>Add New</Button>
                  </Link>
                )
              }
              <Indicator label={0} showZero size={22} color='dark' withBorder>
                <Button 
                  size='xs'
                  variant='default' 
                  leftIcon={<IconAdjustmentsHorizontal size={16} />}
                  sx={(theme) => ({border: `2px solid ${theme.colors.dark[5]}`})}
                  onClick={() => setOpened(true)}
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
                  <Link key={index} href={`/products/${product.path}`}>
                  <Box sx={(theme) => ({
                    '& :hover': {
                      cursor: 'pointer',
                      backgroundColor: theme.colors.blue[0],
                    }
                  })}>
                    <Box
                    sx={(theme) => ({
                      display: 'grid',
                      padding: theme.spacing.md,
                      borderBottom: `1px solid ${theme.colors.gray[2]}`,
                      gridTemplateColumns: '1fr auto auto auto',
                      gap: '2rem',
                      alignItems: 'center',
                      '@media screen and (max-width: 768px)': {
                        gridTemplateColumns: '1fr auto',
                        gap: '1rem',
                      }
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

                    <Box sx={{
                      '@media screen and (max-width: 768px)': {
                        display: 'none'
                      }
                    }}>
                      <Box sx={{position: 'relative'}}>
                        <Box
                          sx={(theme) => ({
                            '& svg': {
                              fill: theme.colors.gray[3],
                              stroke: 'none'
                            }
                          })}
                        >
                          {[1,2,3,4,5].map((star, index) => (
                            <IconStar size={16} key={index} />
                          ))}
                        </Box>
                        <Box sx={(theme) => ({
                          position: 'absolute',
                          top: 0,
                          '& svg': {
                            fill: theme.colors.yellow[5], 
                            stroke: 'none'
                          }})}>
                          {
                            ['full', 'full', 'full', 'half'].map((star, index) => (
                              star === 'full' ? <IconStar size={16} key={index} /> : <IconStarHalf size={16} key={index} />
                            ))
                          }
                        </Box>
                      </Box>
                      <Text size='xs' color='dimmed'>Based on 36 reviews</Text>
                    </Box>

                    <Box
                      sx={{
                        '@media screen and (max-width: 768px)': {
                          display: 'none'
                        }
                      }}
                    >
                      <Text size='md' weight={500}>$500 - $955</Text>
                      <Text size='xs' color='dimmed'>New (5) · Used (3)</Text>
                    </Box>
        
                    <Box sx={{justifySelf: 'end', alignSelf: 'center'}}>
                      <IconChevronRight size={18} color='gray' />
                    </Box>
                  </Box>

                  </Box>
                  </Link>
                ))
              }



            </Paper>
        </Container>      
      </BasicShell>
    </>
  )
}