import { Container, Box, Text, Card, UnstyledButton, Group, ThemeIcon, Stack } from "@mantine/core"
import { BrandFacebook, BrandInstagram, BrandTiktok, BrandTwitter, BrandYoutube, ExternalLink, Link, MoodEmpty } from "tabler-icons-react"


const BrandFeed = ({ brand }) => {

    const layout = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '275px 1fr',
        minHeight: '300px',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        gap: '2rem'
    })


    const SocialButton = ({ icon, social}) => {
        return (
            <UnstyledButton>
                    <Group>
                        {icon}
                        <Text>{social}</Text>
                    </Group>
            </UnstyledButton>
        )
    }


    return (
        <Container size='xl'>
        <Box sx={layout}>
            <Box>
                <Text weight={700} mb='lg'>Social</Text>
                <Card withBorder shadow='xs' p='lg'>
                    <Stack
                        spacing='lg'
                    >
                        <SocialButton
                            icon={<BrandInstagram size={20} />}
                            social='Instagram'
                        />
                        <SocialButton
                            icon={<BrandYoutube size={20} />}
                            social='YouTube'
                        />
                        <SocialButton
                            icon={<BrandFacebook size={20} />}
                            social='Facebook'
                        />
                        <SocialButton
                            icon={<BrandTwitter size={20} />}
                            social='Twitter'
                        />
                        <SocialButton
                            icon={<BrandTiktok size={20} />}
                            social='Tiktok'
                        />
                        <SocialButton
                            icon={<Link size={20} />}
                            social='Website'
                        />
                    </Stack>
                </Card>
            </Box>
            <Box>
                <Text weight={700} mb='lg'>Latest Posts</Text>
                <Box sx={{textAlign: 'center', paddingTop: '3rem'}}>
                    <ThemeIcon size={75} variant='outline' sx={{borderRadius: '50%', border: '3px solid #228be6'}} mb='sm'><MoodEmpty height='50px' width='50px' /></ThemeIcon>
                    <Text weight={700} size='xl'>No Posts Yet</Text>
                    <Text color='dimmed' size='sm'><span style={{textTransform: 'capitalize'}}>{brand}</span> currently has no posts. Please, check back later.</Text>
                </Box>
            </Box>
        </Box>

    </Container>
    )
}

export default BrandFeed