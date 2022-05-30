import { Box, Text, Container, Divider, Button, Center, Breadcrumbs, Anchor } from "@mantine/core"
import ContentGrid from "./ContentGrid"
import { ImageGrid } from "./ImageGrid"
import PriceBox from "./PriceBox"
import ShortDescription from "./ShortDescription"
import ReviewTable from "./ReviewTable"
import VideoSlider from "./VideoSlider"
import { useRouter } from "next/router"
import { useMediaQuery } from "@mantine/hooks"


const ProductLayout = ({ product }) => {

    const mobile = useMediaQuery('(max-width: 1024px)');

    const { asPath } = useRouter()

    let path = asPath.split('/')
    path.shift()
    let currentPath = ''

    const breadcrumbs = path.map((item, index) => {
            
            currentPath += `/${item}`

            return {
                title: item,
                href: currentPath
            }

    })

    breadcrumbs.pop()
    
    const items = breadcrumbs.map((item, index) => (
        <Anchor href={item.href} key={index} transform='capitalize'>
          {item.title}
        </Anchor>
      ));

    

    return (
        <>
            <Container size='xl' p='xl'>
                <Breadcrumbs mt='md' mb='md'>{items}</Breadcrumbs>
                <Box pb='lg'>
                    <Text weight={900} sx={{fontSize: '2rem'}}>{product.title ? product.title : ''}</Text>
                    <Text size='sm'>{product.brand ? product.brand : ''} · 3 Reviews · Top 10 </Text>
                </Box>
                <ImageGrid images={product.images} />
                <Text mt='md' color='dimmed' size='xs'>Brand: ArmstrongFoils.com</Text>
                <ContentGrid>
                    <Box>
                        <Text size='xl' weight={900} mb='md'>Summary Based on 8 Reviews</Text>
                        <Text>
                        Customers are very happy with the board and its performance. They say it is easy to use and perfect for anyone looking to get into the sport. They also say it is a great choice for those who want to progress and have fun. The boards are designed to get off the water quickly and with minimal effort. They have a lot of concave decking to give the rider more control, and the bottom shape is designed to help the rider take off early and with less swing weight. Boards include a board bag, a carbon tail patch, and a deck pad.
                        </Text>
                        <ShortDescription
                            description={product.description || ''}
                        />
                        <Box>
                        <Divider mb='lg' mt='lg' />
                        <Text weight={900} size='xl' mb='md'>Videos</Text>
                        </Box>
                    </Box>
                    {
                        !mobile &&
                        <Box>
                            <PriceBox 
                                product={product}
                            />
                            <Center mt='md'>
                                <Button size='xs' variant='subtle' color='dimmed'>Have One to Sell?</Button>
                            </Center>
                        </Box>
                    }
                </ContentGrid>
                <VideoSlider videos={product.brandVideos} />
                <Box>
                    <Divider mt='lg' mb='lg' />
                    <Text size='xl' weight={900} mb='md'>Reviews</Text>
                    <ReviewTable />
                </Box>
            </Container>
    
        </>
    )
}

export default ProductLayout