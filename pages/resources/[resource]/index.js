import { Container, Text, AspectRatio, Box, Title, Button, Divider } from "@mantine/core"
import BasicShell from "../../../components/shells/BasicShell"
import { getCollectionWhere, getDocument } from '../../../helpers/firebaseHelpers'
import useCheckAdmin from "../../../hooks/useCheckAdmin"
import { useRouter } from "next/router"
import Link from "next/link"

export async function getServerSideProps(context) {

    const resourceDoc = await getCollectionWhere('resources', 'path', '==', context.params.resource)
    const resource = JSON.stringify(resourceDoc[0])
    
    const relatedProducts = []

    for (const product of resourceDoc[0].relatedProducts) {
        const productDoc = await getDocument('products', product)
        relatedProducts.push(productDoc)
    }


    return {
        props: {
            resource: resource,
            relatedProducts: relatedProducts
        }
    }
}

export default function ResourcePage(props) {

    const resource = JSON.parse(props.resource)
    const relatedProducts = props.relatedProducts
    const { isAdmin }   = useCheckAdmin()
    const router = useRouter()

    const getIDFromYoutubeURL = (url) => {
        const id = url.split('v=')[1]
        const ampersandPosition = id.indexOf('&')
        if(ampersandPosition != -1) {
            return id.substring(0, ampersandPosition)
        }
        return id
    }

    console.log(relatedProducts)


    return (
        <BasicShell>
            <Container size='lg' p='lg'>
                {
                    resource.type === 'youtube' &&
                    <Box py='xl'>
                        <AspectRatio ratio={16 / 9}>
                            <iframe width="560" height="315" 
                            src={`https://www.youtube.com/embed/${getIDFromYoutubeURL(resource.link)}`} 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            >
                            </iframe>
                        </AspectRatio>
                    </Box>

                }
                <Title order={1}>{resource.title}</Title>
                <div dangerouslySetInnerHTML={{__html: resource.description}}></div>

                <Box>
                    <Title order={3}>Related Products</Title>
                    {
                        relatedProducts.map((product, index) => (
                            <Link href={`/products/${product.path}`} key={index} passHref>
                            <Box component='a'>
                                <Text>{product.name}</Text>
                            </Box>
                            </Link>
                        ))
                    }
                </Box>
                {
                    isAdmin &&
                    <Box>
                        <Divider my='lg' />
                        <Button
                            color='dark'
                            size='xs'
                            onClick={() => router.push({
                                pathname: '/resources/edit',
                                query: {
                                    rid: resource.id
                                }
                            })}

                        >
                            Edit
                        </Button>
                    </Box>
                }
            </Container>
        </BasicShell>
    )
}
