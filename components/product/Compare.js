import { Modal, Button, Card, Image, Box, Text, Group } from "@mantine/core"
import { useState } from "react"
import CompareTable from "./CompareTable"

const Compare = ({ product }) => {
    
    const [isOpen, setIsOpen] = useState(false)

    const imageStyle = (theme) => ({
        backgroundColor: '#D40101', 
        padding: '.25rem', 
        borderRadius: theme.radius.xl,
        display: 'grid',
        alignItems: 'center',
    })

    const cardStyle = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '50px 2fr auto',
        gap: '1rem'
        
    })

    return (

        <>
            <Button
                fullWidth
                mt='md'
                onClick={() => setIsOpen(true)}
            >Compare Prices</Button>
            <Modal
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                size='xl'
            >
                <Group mb='md'>
                    <Box sx={{width: '75px'}}>
                        <Image src={product.images[0]} radius='xs' />
                    </Box>
                    <Box>
                        <Text size='lg' weight={900}>{product.brand} {product.title}</Text>
                        <Text>4'8 x 22.5" x 3" Vol: 50L</Text>
                    </Box>
                </Group>
                <Box
                    sx={(theme) => ({backgroundColor: theme.colors.gray[0], marginLeft: '-1rem', marginRight: '-1rem', padding: `${theme.spacing.sm}px ${theme.spacing.md}px`})}
                    mb='xs'
                >
                    <Text weight={500}>Compare New</Text>
                    <Text size='xs'>Last Updated: Thu May 5, 10:25am</Text>
                </Box>
                <CompareTable />
                {/* <Card
                    withBorder
                    sx={cardStyle}
                >
                    <Box
                        sx={imageStyle}
                    >
                        <Image
                            src='https://cdn.shopify.com/s/files/1/2062/5873/files/logo_white_v12_x220.png?v=1522987169'
                        />
                    </Box>
                    <Box sx={{display: 'grid', justifyItems: 'center'}}>
                        <Text sx={{textAlign: 'right'}} weight={500} size='xl'>$1,949.99</Text>
                        <Button size='xs' variant='subtle' radius='lg'>See Offer</Button>
                    </Box>
                    <Box>
                        <Text size='lg' weight={600}>RealWatersports.com</Text>
                        <Text size='xs'>Free Shipping</Text>
                    </Box>
                
                </Card> */}
            </Modal>

        </>
    )
}

export default Compare