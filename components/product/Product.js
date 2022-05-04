import { Box, Text, Container, AspectRatio, Divider } from "@mantine/core"
import ContentGrid from "./ContentGrid"
import { ImageGrid } from "./ImageGrid"
import ShortDescription from "./ShortDescription"
import VideoContent from "./VideoContent"


const Product = ({ product }) => {


    if(!product) {

        return(
            <>
                loading...
            </>
        )
    }
    return (
        <Container size='lg'>
            <Box pb='lg'>
                <Text weight={900} size='xl'>{product.title ? product.title : ''}</Text>
                <Text size='sm'>{product.brand ? product.brand : ''}</Text>
            </Box>
            <ImageGrid images={product.images} />
            <ContentGrid>
                <Box>
                    <ShortDescription
                        description={product.description || ''}
                    />
                    <Box width='100%'>
                    <Divider mb='lg' mt='lg' />
                    <AspectRatio ratio={16 / 9}>
                            <iframe
                                src={product.brandVideos[0].replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                    </AspectRatio>
                    </Box>
                </Box>
            </ContentGrid>
        </Container>
    )
}

export default Product 