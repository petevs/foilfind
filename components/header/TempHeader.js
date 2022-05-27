import { Box, Container, Group, Button } from "@mantine/core"
import FoilFindLogo from "../FoilFindLogo"
import { Mail } from "tabler-icons-react"


const TempHeader = () => {
    return (
        <Box sx={(theme) => ({borderBottom: `1px solid ${theme.colors.dark[0]}`})}>
        <Container size='xl' p='xs'>
            <Group position='apart'>
                <FoilFindLogo width='75' />
                <Button 
                    component='a' 
                    href='mailto:hey@foilfind.com?subject=Inquiry from the site' 
                    variant="outline" 
                    radius='xl' 
                    size='xs' 
                    leftIcon={<Mail height='12px' width='12px' />}
                    sx={{
                        '& span': {
                            marginRight: '5px'
                        }
                    }}
                >
                    hey@foilfind.com
                </Button>
            </Group>
        </Container>
    </Box>
    )
}

export default TempHeader