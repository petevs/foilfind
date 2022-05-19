import { Box, Button, Center, Container, Text, TextInput, Group, Timeline, Divider } from "@mantine/core"
import { Circle, Mail, Search } from "tabler-icons-react"
import FoilFindLogo from "../components/FoilFindLogo"

const ComingSoon = () => {

    const style = {
        display: 'grid',
    }

    const timelineItemStyle = (theme) => ({
        '& .mantine-Timeline-itemBody': {
            ':hover': {
            color: theme.colors.blue,
            cursor: 'pointer',
        }
        }
    })

    const articleSection = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '100px auto 1fr',
        gap: '3rem',
        alignContent: 'start',
        marginBottom: '3rem'
    })

    return (
        <Box>
            <Box sx={(theme) => ({borderBottom: `1px solid ${theme.colors.dark[0]}`})}>
                <Container size='xl' p='xs'>
                    <Group position='apart'>
                        <FoilFindLogo width='75' />
                        <Text size='sm' color='dimmed'>Coming Soon</Text>
                    </Group>
                </Container>
            </Box>
            <Container sx={style}>
                <Box p='xl' mt='xl'>
                    <Text sx={{fontSize: '2.5rem'}} weight={700} align='center'>Coming Soon</Text>
                    <Text align='center' color='dimmed'>A community connecting wing foiling riders, retailers, coaches, brands and more.</Text>
                    <Center>
                        <Group mt='md'>
                            <TextInput
                                icon={<Mail />} 
                                placeholder='Subscribe via email'
                            />
                            <Button>Notify Me</Button>
                        </Group>
                    </Center>
                </Box>
                <Container size='md' pt='xl'>
                    <Box sx={articleSection}>
                        <Text color='dimmed' size='sm'>May 19, 2022</Text>
                        <Divider orientation="vertical"/>
                        <Box
                            sx={(theme) => ({
                                padding: '1rem',
                                borderRadius: '6px',
                                margin: '-1rem',
                                '&:hover': {
                                    backgroundColor: theme.colors.gray[0],
                                    cursor: 'pointer'
                                }
                            })}
                        >
                            <Text weight={700} size='md'>First Post Headline</Text>
                            <Text size='sm' color='dimmed'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution</Text>
                            <Text size='sm' color='blue' mt='sm'>Read More</Text>
                        </Box>
                    </Box>
                </Container>
            </Container>
        </Box>
    )
}

export default ComingSoon