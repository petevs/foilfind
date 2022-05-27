import { Container, Box, Skeleton, Card, Group, Text, Button } from "@mantine/core"
import Link from 'next/link'
import Map from '../Map'
import { toKebabCase } from "../../getPaths/getProductRoutes"

const BrandRetailers = ({ retailers }) => {

    const layout = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '275px 1fr',
        gap: '2rem',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    })

    const MapCard = ({ name, location, url}) => {

        return (
            <Link
                passHref={true}
                href={`/retailers/${toKebabCase(name)}`}
            >
                <Card 
                    withBorder 
                    hadow='xs' 
                    mb='md'
                    sx={{
                        ':hover': {
                            cursor: 'pointer'
                        }
                    }}
                >
                    <Group>
                        <Skeleton height={75} width={75} />
                        <Box>
                            <Text size='sm' weight={700}>{name}</Text>
                            <Text size='xs'>{location}</Text>
                        </Box>
                    </Group>
                </Card>
            </Link>
        )
    }

    return (
        <Container size='xl'>
            <Box sx={layout}>
                <Box>
                    {
                        retailers.map((item, index) => (
                            <MapCard 
                                key={index}
                                name={item.name}
                                location={item.location}
                            />
                        )
                        )

                    }
                </Box>
                <Box>
                    {/* <Skeleton width='100%' height={500} /> */}
                    <Map 
                        listings={retailers}
                    />
                </Box>
            </Box>
        </Container>
    )
}

export default BrandRetailers