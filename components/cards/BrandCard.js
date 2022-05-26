import Image from "next/image"
import { Box, Text } from "@mantine/core"
import Link from "next/link"

const BrandCard = (props) => {

    console.log(props)

    const {
        imgSrc,
        altText,
        brandName,
    } = props

    const cardStyle = (theme) => ({
        ':hover': {
            cursor: 'pointer'
        }
    })

    const outerWrapper = (theme) => ({
        height: '215px',
        width: '215px',
        position: 'relative',
        backgroundColor: '#08151F',
        // borderRadius: theme.radius.md,
        padding: '1rem'
    })

    const imgStyle = (theme) => ({
        height: '100%',
        width: '100%',
        position: 'relative'
    })

    return (
        <Link
            passHref={true}
            href={`brands/${brandName}`}
        >
            <Box sx={cardStyle}>
                <Box sx={outerWrapper}>
                    <Box sx={imgStyle}>
                        <Image 
                            src={imgSrc} 
                            alt={altText} 
                            layout='fill' 
                            objectFit='contain'
                        />
                    </Box>
                </Box>
                <Text
                    weight={600}
                    mt='xs'
                >
                    {brandName}
                </Text>
            </Box>
        </Link>
    )
}

export default BrandCard