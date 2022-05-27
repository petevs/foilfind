import { Container, Divider, Box, Anchor } from "@mantine/core"
import Link from "next/link"

const NavMenuSlider = () => {

    const menu = [
        { title: 'Products', href: 'discover' },
        { title: 'Details', href: 'products' },
        { title: 'Deals', href: 'deals' },
        { title: 'Reviews', href: 'feed' },
        { title: 'Media', href: 'retailers' },
    ]

    const anchorStyle = (theme) => ({
        display: 'grid',
        gridAutoFlow: 'column',
        gap: '1rem',
        justifyContent: 'start'
    })

    const active = true

    return (
        <>
            <Divider />
            <Container size='xl'>
                <Box sx={anchorStyle}>
                    {
                            menu.map((item, index) => (
                                <Link passhref={true} key={index} href={``}>
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

export default NavMenuSlider