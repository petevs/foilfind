import { Box, Button, Card, ScrollArea, Text } from "@mantine/core"

const Listings = () => {


    const listingColumn = {
        borderRight: '1px solid #ced4da',
        padding: '1rem',
        height: 'calc(100vh - 62px - 60px)',
        backgroundColor: 'white'
    }

    return (
        <Box>
            <ScrollArea
                sx={listingColumn}
            >
                <Card
                    withBorder
                >
                    <Text weight={900} mb='xs'>Mac Kiteboarding</Text>
                    <Button variant='light' size='xs'>Website</Button>
                </Card>
                <Card
                    withBorder
                    mt='md'
                >
                    <Text weight={900} mb='xs'>Silent Sports</Text>
                    <Button variant='light' size='xs'>Website</Button>
                </Card>
            </ScrollArea>
        </Box>
    )
}

export default Listings