import { Box, Container } from "@mantine/core"
import AppShell from "../components/appshell/AppShell"
import BackButton from "../components/BackButton"

const MissingPage = () => {


    const style = {
        minHeight: '600px',
        display: 'grid',
        gridTemplateColumn: '1fr',
        alignContent: 'center',
        justifyContent: 'center',
        justifyItems: 'center'
    }

    return (
        <AppShell>
            <Container size='xl'>
                <Box sx={style}>
                    <h1>Oops this page does not exist</h1>
                    <BackButton />
                </Box>
            </Container>
        </AppShell>
    )
}

export default MissingPage