import { Box, Text, Container, AspectRatio, Divider, ThemeIcon, Button, Center } from "@mantine/core"
import FoilIcon from "../FoilIcon"
import Header from "../Header"
import Logo from "../Logo"
import ContentGrid from "./ContentGrid"
import { ImageGrid } from "./ImageGrid"
import PriceBox from "./PriceBox"
import ShortDescription from "./ShortDescription"
import VideoContent from "./VideoContent"
import Shell from '../Shell'
import { HeaderTwo } from "../HeaderTwo"


const Product = ({ product }) => {


    if(!product) {

        return(
            <>
                loading...
            </>
        )
    }
    return (
        <>
            <Container size='xl'>
                <Box pb='lg'>
                    <Text weight={900} size='xl'>{product.title ? product.title : ''}</Text>
                    <Text size='sm'>{product.brand ? product.brand : ''} · 3 Reviews · Top 10 </Text>
                </Box>
                <ImageGrid images={product.images} />
                <ContentGrid>
                    <Box>
                        <ShortDescription
                            description={product.description || ''}
                        />
                        <Box width='100%'>
                        <Divider mb='lg' mt='lg' />
                        <Text weight={900} size='xl' mb='md'>Videos</Text>
                        <AspectRatio ratio={16 / 9}>
                                <iframe
                                    src={product.brandVideos[0].replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                        </AspectRatio>
                        <Button variant='outline' color='dark' size='sm' mt='md'>See 7 More Videos</Button>
                        </Box>
                    </Box>
                    <Box>
                        <PriceBox />
                        <Center mt='md'>
                            <Button size='xs' variant='subtle' color='dimmed'>Have One to Sell?</Button>
                        </Center>
                    </Box>
                </ContentGrid>
            </Container>
        </>
    )
}

export default Product 