import { Container, Box, Skeleton, Card, Group, Text, Button } from "@mantine/core"
import { Link } from "tabler-icons-react"
import Map from '../Map'

const BrandRetailers = () => {

    const layout = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '275px 1fr',
        gap: '2rem',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    })

    const testList = [
        { retailerName: 'Real Watersports', location: 'Cape Hatteras, NC', logo: 'https://via.placeholder.com/150' },
        { retailerName: 'MacKite', location: 'Grand Haven, MI', logo: 'https://via.placeholder.com/150' },
        { retailerName: 'SurfFX', location: 'Australia', logo: 'https://via.placeholder.com/150' },
    ]


    const MapCard = ({ name, location, url}) => {

        return (
            <Card withBorder shadow='xs' mb='md'>
                <Group>
                    <Skeleton height={75} width={75} />
                    <Box>
                        <Text size='sm' weight={700}>{name}</Text>
                        <Text size='xs'>{location}</Text>
                        <Button size='xs' compact variant='default' radius='md'>Website</Button>
                    </Box>
                </Group>
            </Card>
        )
    }

    return (
        <Container size='xl'>
            <Box sx={layout}>
                <Box>
                    {
                        testList.map((item, index) => (
                            <MapCard 
                                key={index}
                                name={item.retailerName}
                                location={item.location}
                            />
                        )
                        )

                    }
                </Box>
                <Box>
                    {/* <Skeleton width='100%' height={500} /> */}
                    <Map />
                </Box>
            </Box>
        </Container>
    )
}

export default BrandRetailers