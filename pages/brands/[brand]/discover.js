import { Box, Card, Container, Text, AspectRatio, Skeleton, ActionIcon, Group } from "@mantine/core"
import { useRouter } from "next/router"
import AppShell from "../../../components/appshell/AppShell"
import { BrandFacebook, BrandInstagram, BrandYoutube, Link } from "tabler-icons-react"
import { getBrands } from "../../../getPaths/getProductRoutes"
import BrandHeader from "../../../components/brand/BrandHeader"

// export async function getStaticPaths(){

//     const brandPaths = await getBrands()

//     const paths = brandPaths.map(item => ({
//         params: { brand: item }
//     }))
    

//     return {
//         paths,
//         fallback: false
//     }
    
// }

// export async function getStaticProps({ params }) {

    
//       return {
//         props: {
//         },
//       }
    
// }


const Discover = () => {

    const router = useRouter()
    const { brand } = router.query


    const slider = (theme) => ({
        display: 'grid',
        gridAutoFlow: 'column',
        justifyContent: 'start',
        gap: '1rem',
        overflowX: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    })


    const PlaceholderCard = () => {
        return (
            <Box sx={{':hover': {cursor: 'pointer'}}}>
                <Skeleton height={200} width={200} />
                <Text weight={500}>Product Name</Text>
            </Box>
        )
    }

    const dummyList = [1,2,3,4,5,6]

    return (
        <AppShell>
            <BrandHeader
                active='discover' 
                brand={brand}
            />
            <Container size='xl' pb='xl'>
                <Text weight={700} size='xl' mt='xl' mb='md'>About</Text>
                <Card withBorder shadow='xs'>
                    <Text>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here,</Text>
                </Card>
                <Text weight={700} size='xl' mt='xl' mb='md'>Links</Text>
                <Group>
                    <ActionIcon><Link /></ActionIcon>
                    <ActionIcon><BrandInstagram /></ActionIcon>
                    <ActionIcon><BrandFacebook /></ActionIcon>
                    <ActionIcon><BrandYoutube /></ActionIcon>
                </Group>
                <Text weight={700} size='xl' mt='xl' mb='md'>Popular Products</Text>
                <Box sx={slider}>
                    {
                        dummyList.map((item, index) => (
                            <PlaceholderCard key={index} />
                        ))
                    }
                </Box>
            </Container>
        </AppShell>
    )
}

export default Discover