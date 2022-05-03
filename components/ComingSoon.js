import { Box, Center, Container, Text } from "@mantine/core"

const ComingSoon = () => {

    const style = {
        display: 'grid',
        minHeight: '100vh',
        justifyItems: 'center',
        alignContent: 'center'
    }
    return (
        <Container sx={style}>
                <Text size='xl' weight={900}>FoilFind</Text>
                <Text>Coming Soon</Text>
        </Container>
    )
}

export default ComingSoon