import { Box, Container, Group, Skeleton, Text, Button } from "@mantine/core"
import Image from "next/image"
import { BuildingStore, Map, Phone, School, TruckDelivery } from "tabler-icons-react"
import NavMenuSlider from "../NavMenuSlider"

const RetailerLayout = ({ retailer }) => {

    const topSection = (theme) => ({
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '1rem',
        padding: theme.spacing.lg
    })


    const Feature = ({text, icon}) => {
        return (
            <Group
                spacing='xs'
                sx={{
                    '& svg': {
                        height: '18px',
                        width: '18px'
                    }
                }}
            >
                {icon}
                <Text size='sm' color='dimmed'>{text}</Text>
            </Group>
        )
    }

    return (
        <>
            <Container size='xl'>
                <Box sx={topSection}>
                    <Box>
                        <Skeleton height='140px' width='140px' />
                    </Box>
                    <Box>
                        <Text
                            size='xl'
                            weight={900}
                        >
                            {retailer.name}
                        </Text>
                        <Text size='xs' color='dimmed'>{retailer.location}</Text>
                        <Box mt='sm' mb='sm'>
                            <Feature text='Storefront' icon={<BuildingStore />} />
                            <Feature text='Ships to you' icon={<TruckDelivery />} />
                            <Feature text='Lessons' icon={<School />} />
                        </Box>
                        <Group
                            sx={{
                                '& svg': {
                                    height: '14px',
                                    width: '14px'
                                }
                            }}
                        >
                            <Button 
                                variant='outline' 
                                radius='xl'
                                size='sm'
                                leftIcon={<Phone />}
                            >
                                1-888-234-2342
                            </Button>
                            <Button 
                                variant='outline' 
                                radius='xl'
                                size='sm'
                                leftIcon={<Map />}
                            >
                                Directions
                            </Button>
                        </Group>
                    </Box>
                </Box>
            </Container>
            <NavMenuSlider />
            <Container size='xl'>
                <Box sx={{minHeight: '300px'}} p='md'>
                    content area
                </Box>
            </Container>
        </>
    )
}

export default RetailerLayout