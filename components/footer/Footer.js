
import { footerItems } from "./footerItems"
import { Box, Container, Group, Text } from "@mantine/core"
import FooterList from "./FooterList"
import FooterHeader from "./FooterHeader"
import FFLogo from "../FFLogo"

const Footer = () => {

    const style = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '2fr repeat(4, 1fr)',
        paddingTop: theme.spacing.xl,
        gap: '.75rem',
        padding: '2rem 1rem',
        '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr',
            padding: '2rem 0',
            gap: '0'
        }
    })

    return (
        <Box sx={{borderTop: '1px solid #e0e0e0',}}>
            <Container size='xl'>
                <Box sx={style}>
                    <FooterHeader />
                    <FooterList
                        title='About'
                        items={footerItems['About']}
                    />
                    <FooterList
                        title='Discover'
                        items={footerItems['Discover']}
                    />
                    <FooterList
                        title='Legal'
                        items={footerItems['Legal']}
                    />
                    <Box
                        p='xl'
                        sx={{
                            backgroundColor: '#252935',
                            borderRadius: '6px',
                            '@media (max-width: 1024px)': {
                                marginTop: '1rem'
                        }}}
                    >
                        <Group spacing='xs' mb='sm'>
                            <FFLogo 
                            width='35'
                            />
                            <Text
                                size='lg'
                                weight={900}
                                color='white'
                            >
                                Business
                            </Text>
                        </Group>
                        {
                            footerItems['Business'].map((item, index) => (
                                <>
                                    <Text
                                        key={index}
                                        size='md'
                                        color='white'
                                    >
                                        {item.title}
                                    </Text>
                                </>
                            ))
                        }
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer