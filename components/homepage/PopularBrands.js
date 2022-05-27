import BrandCard from "../cards/BrandCard"
import { Box, Anchor, Text } from "@mantine/core"
import Link from "next/link"

const PopularBrands = ({ brands }) => {

    const titleArea = (theme) => ({
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        alignItems: 'baseline',
        marginTop: theme.spacing.xl
    })

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

    return (
        <>
            <Box sx={titleArea}>
                <Text weight={900} size='lg' mb='md'>
                    Popular Brands
                </Text>
                <Box
                    sx={{
                        display: 'grid',
                        justifyItems: 'end'
                    }}
                >
                    <Anchor
                        component={Link}
                        href='/brands'
                        sx={{ justifySelf: 'end' }}
                        size='xs'
                        weight={700}
                        color='gray'
                    >
                        View All
                    </Anchor>
                </Box>
            </Box>
            <Box
                sx={slider}
                mb='xl'
            >
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
        </>
    )
}

export default PopularBrands