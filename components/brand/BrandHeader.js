import { Box, Text, ActionIcon, Container, Anchor, Divider, Button } from "@mantine/core"
import Link from "next/link"
import { ExternalLink } from "tabler-icons-react"

const BrandHeader = ({ brand, active }) => {

    console.log(active)

    const wrapper = (theme) => ({
        background: '#005AA7',
        background: '-webkit-linear-gradient(to top, #0f2027, #203a43, #2c5364)',
        background: 'linear-gradient(to top, #0f2027, #203a43, #2c5364)',
    })

    const innerWrap = (theme) => ({
        display: 'grid',
        height: '400px',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        justifyContent: 'start',
        justifyItems: 'start',
        alignContent: 'end',
        paddingBottom: '1rem',
        '@media (max-width: 768px)': {
            height: '240px'
        }
    })

    const menu = [
        { title: 'Discover', href: 'discover' },
        { title: 'Products', href: 'products' },
        { title: 'Deals', href: 'deals' },
        { title: 'Feed', href: 'feed' },
        { title: 'Retailers', href: 'retailers' },
    ]

    const anchorStyle = (theme) => ({
        display: 'grid',
        gridAutoFlow: 'column',
        gap: '1rem',
        justifyContent: 'start'
    })

    return (
        <>
        <Box sx={wrapper}>
            <Container size='xl'>
                <Box sx={innerWrap}>
                    <Text sx={{fontSize: '2rem'}} weight={700} transform='capitalize' color='white'>{brand}</Text>
                    <Button sx={{justifySelf: 'end'}} size='xs' variant='default' leftIcon={<ExternalLink size='14px' />}>Website</Button>
                </Box>
            </Container>
        </Box>
            <Container size='xl'>
                <Box sx={anchorStyle}>
                    {
                        menu.map((item, index) => (
                            <Link passhref={true} key={index} href={`/brands/${brand}/${item.href}`}>
                                <Anchor
                                    size='sm'
                                    color='dark'
                                    p='xs'
                                    weight={active === item.title.toLowerCase() ? 700 : 400}
                                    sx={(theme) => ({
                                        borderBottom: active === item.title.toLowerCase() ? `2px solid #228be6` : 'none',
                                        '&:hover': {
                                            color: theme.colors.blue[5]
                                        }
                                    })}
                                >
                                    {item.title}
                                </Anchor>
                            </Link>
                        ))
                    }
                </Box>
            </Container>
            <Divider />
        </>
    )
}

export default BrandHeader