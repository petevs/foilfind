import AppShell from "../../components/appshell/AppShell"
import { Container, Box, Text } from "@mantine/core"
import { getBrands, getBrandsWithDetails } from "../../getPaths/getProductRoutes"
import BrandCard from "../../components/cards/BrandCard"


export async function getStaticProps() {

      const res = await getBrandsWithDetails()
      const brands = JSON.parse(JSON.stringify(res))
    
      return {
        props: {
          brands,
        },
    
        revalidate: 900
      }
    
}

const AllBrands = ({ brands }) => {

    const wrapper = (theme) => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
    })


    return (
        <AppShell>
            <Container size='xl' p='lg'>
                <Text size='xl' weight={900} mb='lg'>All Brands</Text>
                <Box sx={wrapper}>
                    {
                        brands.map((brand, index) => (
                            <BrandCard
                                key={index}
                                imgSrc={brand.brandLogo}
                                altText={brand.brandName}
                                brandName={brand.brandName}
                            />
                        ))
                    }
                </Box>
            </Container>
        </AppShell>
    )
}

export default AllBrands