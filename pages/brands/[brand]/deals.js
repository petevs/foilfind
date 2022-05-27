import { Box, Container, Text, ThemeIcon } from "@mantine/core"
import { useRouter } from "next/router"
import AppShell from "../../../components/appshell/AppShell"
import { Discount2 } from "tabler-icons-react"
import BrandHeader from "../../../components/brand/BrandHeader"
import { getBrands } from "../../../getPaths/getProductRoutes"

export async function getStaticPaths(){

    const brandPaths = await getBrands()

    const paths = brandPaths.map(item => ({
        params: { brand: item }
    }))
    

    return {
        paths,
        fallback: false
    }
    
}

export async function getStaticProps({ params }) {

    
      return {
        props: {
        },
      }
    
}

const Deals = () => {

    const router = useRouter()
    const { brand } = router.query

    return (
        <AppShell>
            <BrandHeader
                active='deals'
                brand={brand}
            />
            <Container size='xl'>
                <Box sx={{minHeight: '300px', textAlign: 'center', paddingTop: '3rem'}}>
                    <ThemeIcon size={75} variant='outline' sx={{borderRadius: '50%', border: '3px solid #228be6'}} mb='sm'><Discount2 height='50px' width='50px' /></ThemeIcon>
                    <Text weight={700} size='xl'>No Deals Yet</Text>
                    <Text color='dimmed' size='sm'><span style={{textTransform: 'capitalize'}}>{brand}</span> currently has no deals. Please, check back later.</Text>
                </Box>

            </Container>
        </AppShell>
    )
}

export default Deals