import { Box, Container, Title, Button, Skeleton, Text, Group, Divider, Center, Badge, Slider, RangeSlider, Checkbox, Paper, Menu, ActionIcon, Select, UnstyledButton } from "@mantine/core"
import { query, collection, where, getDocs } from 'firebase/firestore';
import BasicShell from "../../../components/shells/BasicShell";
import { db } from "../../../firebase";
import { getCollection, getCollectionWhere } from "../../../helpers/firebaseHelpers";
import useCheckAdmin from "../../../hooks/useCheckAdmin";
import { useRouter } from "next/router";
import RatingsReadOnly from "../../../components/RatingsReadOnly";
import Head from "next/head";
import Link from "next/link";
import { IconBuildingStore, IconCheck, IconChevronDown, IconChevronRight, IconDiscountCheck, IconHeart, IconShare, IconThumbUp } from "@tabler/icons";
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

  return {
    props: {
      product,
      relatedResources
    },
  }
}

const PriceTable = ({headerTitle, content, footer}) => {
  return (
    <>
      <Box
        sx={(theme) => ({
          border: `1px solid ${theme.colors.gray[2]}`,
          borderRadius: theme.radius.md,
          boxShadow: theme.shadows.sm,
        })}
      >
        <Box
          sx={
            (theme) => (
              {
                padding: `${theme.spacing.md}px`,
                backgroundColor: theme.colors.gray[0],
                borderRadius: `${theme.radius.md}px ${theme.radius.md}px 0 0`,
            }
            )}
        >
          <Text weight={600}>{headerTitle}</Text>
        </Box>
        <Divider />
        <Box
          sx={{maxHeight: '200px', overflow: 'scroll'}}
        >
          {content}
        </Box>
      </Box>
      <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            gap: '.5rem',
          }}
        >
          {footer}
        </Box>
    </>
  )
}


export default function ProductPage(props) {

  const { isAdmin, user } = useCheckAdmin();
  const router = useRouter();

  const { product, relatedResources } = props;

  const imgURL = `http://localhost:3000/api/og?title=${encodeURI(product.name)}`

  const aggregateReviewsBySource = (reviews) => {
    const sources = reviews.map(review => review.source)
    const uniqueSources = [...new Set(sources)]
    const reviewsBySource = uniqueSources.map(source => {
      const reviewsForSource = reviews.filter(review => review.source === source)
      const averageRating = reviewsForSource.reduce((acc, review) => acc + review.rating, 0) / reviewsForSource.length
      return {
        source,
        averageRating,
        reviews: reviewsForSource,
        link: reviewsForSource[0].link
      }
    })
    return reviewsBySource
  }

  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <meta property="og:image" content={imgURL} />
      </Head>
      <BasicShell>
        <Container size='lg'>
        <ConfirmedFit 
          category={product.category}
        />
          <Title order={2}>{product.name}</Title>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
          <Box sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '.5rem', alignItems: 'center'}}>
            <Text size='sm' color='dimmed'>{product.brand}</Text>
            <Text color='dimmed' size='sm'>·</Text>
            <Box sx={{marginTop: '5px'}}>
              <RatingsReadOnly rating={product.reviewSummary.rating} />
            </Box>
            <Text color='dimmed' size='sm'>Based on {product.reviewSummary.numOfReviews} Reviews</Text>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                gap: '1rem'
              }}
            >              
            <UnstyledButton>
                      <Group spacing='xs'>
                        <IconShare size={14} />
                        <Text underline weight={600} color='primary' size='sm'>Share</Text>
                      </Group>
            </UnstyledButton>
            <UnstyledButton>
                      <Group spacing='xs'>
                        <IconHeart size={14} />
                        <Text underline weight={600} color='primary' size='sm'>Save to Wishlist</Text>
                      </Group>
            </UnstyledButton>
          </Box>
          </Box>
          
          <PhotoSection
            product={product}
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

              <Title order={3} style={{margin: '1rem 0 .5rem'}}>Summary of What We{"'"}ve Found</Title>
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

              {/* <Title order={3} style={{marginTop: '2rem'}}>Is This Foil Right For Me?</Title>
              <Box sx={{display: 'grid', gap: '.5rem', paddingTop: '.5rem'}}>

                <Text color='dimmed'>Your Weight</Text>
                <Slider
                  defaultValue={50}
                  min={0}
                  max={100}
                  step={1}
                />
                <Text color='dimmed'>Wind Range You Ride In</Text>
                <RangeSlider
                  defaultValue={[20, 80]}
                  min={0}
                  max={100}
                  step={1}
                />
                <Text color='dimmed'>Your Skill Level</Text>
                <Slider
                  defaultValue={1}
                  min={0}
                  max={4}
                  step={1}
                  marks={[
                    { value: 0, label: ''},
                    { value: 1, label: 'Beginner' },
                    { value: 2, label: 'Intermediate' },
                    { value: 3, label: 'Advanced' },
                    { value: 4, label: 'Expert' },
                  ]}
                mb='xl'
                />
                <Divider my='xs' />
                <Box
                  sx={(theme) => ({
                    display: 'grid',
                    gridAutoFlow: 'column',
                    justifyContent: 'start',
                    color: theme.colors.dark,
                    gap: theme.spacing.sm,
                    backgroundColor: theme.colors.gray[0],
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.gray[2]}`,
                    boxShadow: theme.shadows.sm,
                    borderRadius: theme.radius.md,
                  })}
                >
                  <IconThumbUp size={24} />
                  <Text color='dark'>Based on your answers, this foil should be good fit for you!</Text>
                </Box>
              </Box> */}

              <Divider my='md' />

              <Title order={3} style={{margin: '1rem 0 .5rem'}}>Description From {product.brand}</Title>
              <Box sx={{
                maxHeight: '6.2rem',
                overflowY: 'hidden',
                '@media (max-width: 768px)': {
                  maxHeight: '7rem',
                }
              }}>
                <Text>
                  {product.brandDescription}
                </Text>
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

              <Box>
                <Paper withBorder shadow='md' p='lg' radius='lg'>
                  <Box>
                    <Text size='xl' weight={600}>{product.priceRange ? `$${product.priceRange.minPrice} - $${product.priceRange.maxPrice}` : 'No Data'}</Text>
                    <Group spacing='xs'>
                      <RatingsReadOnly rating={product.reviewSummary.rating} />
                      <Text sx={{marginTop: '-5px'}} color='dimmed' size='xs'>Based on {product.reviewSummary.numOfReviews} Reviews</Text>
                    </Group>
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
                    <Text align='center' size='xs' color='dimmed' mt='xs'>${product.inventory[0].price} at {product.inventory[0].retailer}</Text>
                  </Box>
                </Paper>


                {/* <PriceTable 
                  headerTitle={<Text size='md' weight={600}>Compare New {product.priceRange ? `$${product.priceRange.minPrice} - $${product.priceRange.maxPrice}` : 'No Data'}</Text>}
                  content={
                    product.inventory.map((item, index) => (
                      <>
                      <Box key={index} sx={
                        (theme) => (
                          {
                            display: 'grid', 
                            gridTemplateColumns: 'auto 1fr', 
                            gap: '1rem', 
                            alignItems: 'center', 
                            padding: `${theme.spacing.md}px`,
                        }
                        )}>
                        <Text size='sm' weight={600}>${item.price}</Text>
                        <Text size='sm'>{item.retailer}</Text>
                      </Box>
                      {
                        index !== product.inventory.length - 1 && <Divider />
                      }
                      </>
                    ))
                  }
                  footer={
                    <>
                      <Text weight={600} size='xs' color='indigo'>Do You Sell The {product.name}?</Text>
                    </>
                  }
                />





              <PriceTable 
                headerTitle='Compare Used'
                content={
                  <Box
                    sx={{minHeight: '150px', display: 'grid', alignContent: 'center', gap: '.5rem'}}
                  >
                    <Text align='center' color='dimmed'>Sorry, we can{"'"}t find any used {product.name} for sale right now.</Text>
                  </Box>
                }
                footer={
                  <>
                    <Text weight={600} size='xs' color='indigo'>Do You Have a Used {product.name} to Sell?</Text>
                  </>
                }
              /> */}
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
            <Divider my='lg' />
            <Title order={3} style={{margin: '1rem 0'}}>Size Chart</Title>

            <WingRangeChart />

            <Divider my='lg' />
            <Title order={3} style={{margin: '1rem 0'}}>Foil Specs</Title>
            <Box>
              {
                [
                  { value: 'areaCM', label: 'Area (cm²)' },
                  { value: 'wingSpanMillimeters', label: 'Wing Span (mm)' },
                  { value: 'weightGrams', label: 'Weight (g)' },
                  { value: 'ar', label: 'Aspect Ratio' },
                ].map((key, index) => (
                  <Box key={index} 
                    sx={{display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '1rem',
                    '@media screen and (max-width: 768px)': {
                      gridTemplateColumns: 'auto auto',
                      justifyContent: 'space-between',
                    }
                  }}
                  >
                    <Text size='md' weight={600}>{key.label}</Text>
                    <Text size='md'>{thousandSeparator(product.frontWing[key.value])}</Text>
                  </Box>
                ))
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
                    description={item.description}
                  />
                ))
              }
            </Box>
          </Box>


          <Box>
            <Divider my='lg' />
            <Title order={3} style={{margin: '1rem 0'}}>Reviews</Title> 
            {
              aggregateReviewsBySource(product.reviews).map((item, index) => (
                <Box key={index} sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '1rem', alignItems: 'center'}}>
                    <Text color='dimmed'>{item.averageRating} /  5</Text>
                    <Box sx={{marginTop: '8px'}}>
                    <RatingsReadOnly rating={item.averageRating} size={18} />
                    </Box>
                    <Text component='a' underline size='md'> {item.reviews.length} {item.source} reviews</Text>
                </Box>
              ))

            }
          </Box>
  

          




          <Box py='xl'>
            {
              isAdmin && (
                <Button
                  onClick={() => router.push(`${router.asPath}/edit`)}
                >Edit</Button>
              )
            }
          </Box>
        </Container>
      </BasicShell>
    </div>
  )
}