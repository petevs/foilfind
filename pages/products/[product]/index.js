import { Box, Container, Title, Button, Skeleton, Text, Group, Divider, Center, Badge, Slider, RangeSlider, Checkbox, Paper, Menu, ActionIcon, Select, UnstyledButton, Progress } from "@mantine/core"
import { query, collection, where, getDocs } from 'firebase/firestore';
import BasicShell from "../../../components/shells/BasicShell";
import { db } from "../../../firebase";
import { getCollection, getCollectionWhere, getDocument } from "../../../helpers/firebaseHelpers";
import useCheckAdmin from "../../../hooks/useCheckAdmin";
import { useRouter } from "next/router";
import RatingsReadOnly from "../../../components/RatingsReadOnly";
import Head from "next/head";
import Link from "next/link";
import { IconEdit, IconClipboardCopy, IconCheck, IconChevronDown, IconChevronRight, IconDiscountCheck, IconGripHorizontal, IconHeart, IconShare, IconTemperature, IconThumbUp, IconCopy } from "@tabler/icons";
import ResourceCard from "../../../components/productListing/ResourceCard";
import { camelToTitleCase} from '../../../helpers/formatters'
import WingRangeChart from "../../../components/WingRangeChart";
import Image from "next/image";
import RetailerTable from "../../../components/productPage/RetailerTable";
import UsedTable from "../../../components/productPage/UsedTable";
import { thousandSeparator } from "../../../helpers/formatters";
import BrandDescriptionModal from "../../../components/productPage/BrandDescriptionModal";
import PhotoSection from "../../../components/productPage/PhotoSection";
import { ConfirmedFit } from "../../../components/productPage/ConfirmedFit";
import DesktopTitle from "../../../components/productPage/DesktopTitle";
import MobileTitle from "../../../components/productPage/MobileTitle";
import { useScrollIntoView } from "@mantine/hooks";
import FoilSpecs from "../../../components/productPage/FoilSpecs";
import ProductReviews from "../../../components/productPage/ProductReviews";
import OtherSizeProducts from "../../../components/productPage/OtherSizeProducts";
import Router from "next/dist/server/router";
import ProductBreadcrumbs from "../../../components/productPage/ProductBreadcrumbs";
import RelatedProducts from "../../../components/productPage/RelatedProducts";
import OtherSizeSelect from "../../../components/productPage/OtherSizeSelect";

// get static paths for each product
export async function getStaticPaths() {
  // get all products
  const products = await getCollection("products");

  // create paths for each product
  const paths = products.map((product) => ({
    params: { product: product.path },
  }));

  return { paths, fallback: false };
}


// get static props for each product

export async function getStaticProps({ params }) {

  const q = query(collection(db, 'products'), where('path', '==', params.product));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });

  const product = data[0];

  const relatedResources = await getCollectionWhere("resources", "relatedProducts", "array-contains", product.id);
  const reviews = await getCollectionWhere("product-reviews", "productID", "==", product.id);
  
  const otherSizeProducts = []
  
  for (const otherSizeProductID of product.otherSizes) {
    const otherSizeProduct = await getDocument("products", otherSizeProductID)
    otherSizeProducts.push(otherSizeProduct)
  }

  const relatedProducts = []

  for (const relatedProductID of product.relatedProducts) {
    const relatedProduct = await getDocument("products", relatedProductID)
    relatedProducts.push(relatedProduct)
  }


  return {
    props: {
      product,
      relatedResources,
      reviews,
      otherSizeProducts,
      relatedProducts
    },
  }
}


export default function ProductPage(props) {

  const { isAdmin, user } = useCheckAdmin();
  const router = useRouter();
  const { scrollIntoView, targetRef } = useScrollIntoView();

  const { product, relatedResources, reviews: foilFindReviews, otherSizeProducts, relatedProducts } = props;

  const imgURL = `http://localhost:3000/api/og?title=${encodeURI(product.name)}`

  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <meta property="og:image" content={imgURL} />
      </Head>
      <BasicShell>
          <ProductBreadcrumbs
            category={product.category}
            subcategory={product.subCategory}
          />
        <Container size='lg'>
            <ConfirmedFit 
              product={product}
            />
          <DesktopTitle
            product={product}
            scrollIntoView={scrollIntoView}
            targetRef={targetRef}
          />
          
          <PhotoSection
            product={product}
          />

          <MobileTitle
            product={product}
            scrollIntoView={scrollIntoView}
            targetRef={targetRef}
          />
          
          <Box sx={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              '& .column:nth-of-type(1)': {
                order: 2
              },
            }
          }}
        >
            <Box className='column'>
              {/* <Skeleton
                style={{ width: "100%", height: "400px" }}
              /> */}

              <Title order={3} style={{marginBottom: '1rem'}}>Summary of What We{"'"}ve Found</Title>
              <Text>
                  {product.summary}
              </Text>

              <Divider my='md' />

              <Title order={3} style={{margin: '1rem 0 .5rem'}}>Related Keywords</Title>
              {
                product.keywords.map((keyword, index) => (
                  <Badge key={index} style={{margin: '.5rem .5rem .5rem 0'}}>{keyword}</Badge>
                ))
              }

              <Divider my='md' />

              <Title order={3} style={{margin: '1rem 0 .5rem'}}>Description From {product.brand}</Title>
              <Box sx={{
                maxHeight: '6.2rem',
                overflowY: 'hidden',
                '@media (max-width: 768px)': {
                  maxHeight: '7rem',
                }
              }}>
                  <div dangerouslySetInnerHTML={{ __html: product.brandDescription }} />
                  {product.brandDescription}
              </Box>
              <BrandDescriptionModal
                description={product.brandDescription}
                brand={product.brand}
              />

              {
                product?.includes.length >= 1 && (
                  <>
                  <Title order={3} style={{margin: '1rem 0 .5rem'}}>What{"'s"} Included</Title>
                  <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                    {
                      product.includes.map((item, index) => (
                        <Group key={item}>
                          <IconCheck size={16} />
                          <Text color='dimmed' size='sm'>{item}</Text>
                        </Group>
                      ))
                    }
                  </Box>
                </>
                )
              }

            </Box>


            <Box className='column'>
              {/* <Title order={2}>{product.name}</Title>
              <Text size='sm' color='dimmed'>{product.brand}</Text>
              <Text size='xl' weight={600}>{product.priceRange ? `$${product.priceRange.minPrice} - $${product.priceRange.maxPrice}` : 'No Data'}</Text>
              <Group spacing='xs'>
                <RatingsReadOnly rating={product.reviewSummary.rating} />
                <Text sx={{marginTop: '-5px'}} color='dimmed' size='xs'>Based on {product.reviewSummary.numOfReviews} Reviews</Text>
              </Group>
            
              <Divider my='md' /> */}

              <Box sx={{
                '@media (max-width: 768px)': {
                  display: 'none'
                }
              }}>
                <Paper withBorder shadow='md' p='lg' radius='lg'>
                  <Box>
                    <Text size='xl' weight={600}>{product.priceRange ? `$${product.priceRange.minPrice} - $${product.priceRange.maxPrice}` : 'No Data'}</Text>
                    {
                      product.reviewSummary.numOfReviews ? (
                      <UnstyledButton
                        onClick={() => scrollIntoView(targetRef)}
                      >
                        <Group spacing='xs'>
                          <Box sx={{marginTop: '5px'}}>
                            <RatingsReadOnly rating={product.reviewSummary.rating} />
                          </Box>
                          <Text color='dimmed' size='sm'>Based on {product.reviewSummary.numOfReviews} Reviews</Text>
                        </Group>
                      </UnstyledButton>
                      )
                      :
                      <Text color='dimmed' size='sm'>No Reviews Yet</Text>
                    }
                    {
                      otherSizeProducts.length > 0 &&
                      <OtherSizeSelect
                        current={product.name} 
                        products={otherSizeProducts}
                      />
                    }
                    <Divider my='sm' />
                    <Box sx={{display: 'grid', gridTemplateColumns: '1fr auto'}}>
                      <Button color='red'
                        styles={(theme) => ({ root: { borderTopRightRadius: 0, borderBottomRightRadius: 0}})}
                      >View Best Offer</Button> 
                      <Menu>
                        <Menu.Target>
                          <ActionIcon
                            color='red'
                            size={36}
                            // styles={(theme) => ({ root: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, border: 0, borderLeft: `1px solid ${theme.colors.gray[2]}`}})}
                            sx={(theme) => ({ 
                              backgroundColor: theme.colors.red[6], 
                              borderRadius: '0 4px 4px 0', 
                              border: 0, 
                              borderLeft: `1px solid ${theme.colors.gray[2]}`,
                              ':hover': {
                                backgroundColor: theme.colors.red[7],
                              }
                          })}
                          >
                            <IconChevronDown size={16} stroke={1.5} color='white' />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          {
                            product.inventory.map((item, index) => (
                              <Menu.Item key={index} component='a' href={item.link} target='_blank'>
                                <Box sx={{display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.6rem'}}>
                                  <Box sx={{fontWeight: 600}}>
                                    ${item.price}
                                  </Box>
                                  <Box>
                                    {item.retailer}
                                  </Box>
                                </Box>
                              </Menu.Item>
                            ))
                          }
                        </Menu.Dropdown>
                      </Menu>
                    </Box>
                    {
                      product.inventory.length === 0 ?
                      <Text color='red' size='sm' weight={600}>Out of Stock</Text>
                      :
                      <Text align='center' size='xs' color='dimmed' mt='xs'>${product.inventory[0].price} at {product.inventory[0].retailer}</Text>
                    }
                  </Box>
                </Paper>
              </Box>
            
            
            
            
            </Box>
          
          </Box>

          <Box>
            <RetailerTable 
              data={product.inventory}
              brand={product.brand}
            />
            <Divider my='lg' />
            <Title order={3} style={{margin: '1rem 0'}}>Find It Used</Title> 
            <UsedTable 
              productName={product.name}
            />
            {/* <Divider my='lg' />
            <Title order={3} style={{margin: '1rem 0'}}>Size Chart</Title> */}

            {/* <WingRangeChart /> */}

            <Divider my='lg' />
            <Box
              sx={(theme) => ({
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                '@media (max-width: 768px)': {
                  gridTemplateColumns: '1fr',
                }
              }
              )}
            >
              {
                product.category === 'foils' &&
                <FoilSpecs 
                  product={product}
                />
              }
            </Box>

            <Divider my='lg' />
            <Title order={3} style={{margin: '1rem 0'}}>Related Resources</Title> 
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem',
              }}
            >
              {
                relatedResources.map((item, index) => (
                  <ResourceCard
                    key={index}
                    title={item.title}
                    type='video'
                    shortDescription={item.shortDescription}
                    path={item.path}
                  />
                ))
              }
            </Box>
          </Box>

          <OtherSizeProducts
            products={otherSizeProducts}
          />

          <RelatedProducts
            products={relatedProducts}
          />
{/* 
          <Divider my='lg' />
          <Title order={3} style={{margin: '1rem 0'}}>Related Products</Title>  */}

          {/* <Divider my='lg' />
          <Title order={3} style={{margin: '1rem 0'}}>Members Who Ride The {product.name}</Title>
 */}

          <ProductReviews
            targetRef={targetRef}
            product={product}
            foilFindReviews={foilFindReviews}
          />



            {
              isAdmin && (
                <Box py='xl'>
                  <Divider my='lg' />
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'auto auto',
                      justifyContent: 'end',
                      gap: '1rem'
                    }}
                  >

                    <Button
                      size='xs'
                      color='dark'
                      leftIcon={<IconEdit size={16} />}
                      onClick={() => router.push(`${router.asPath}/edit`)}
                    >
                      Edit
                    </Button>

                    <Button
                      size='xs'
                      color='dark'
                      leftIcon={<IconCopy size={16} />}
                      onClick={() => router.push({
                        pathname: `/products/add-new`,
                        query: { pid: product.id }
                      })}
                    >
                      Clone
                    </Button>
                  </Box>
              </Box>
              )
            }
        </Container>
      </BasicShell>
    </div>
  )
}