import { Anchor, Box, Button, ScrollArea, Text } from "@mantine/core"
import Link from "next/link"

const Links = () => {

    const style = (theme) => ({
        display: 'grid',
        gridArea: 'links',
        gridAutoFlow: 'column',
        justifyContent: 'start',
        alignContent: 'start',
        gap: '1rem',
        padding: '0 .75rem 1rem .5rem',
        '@media (max-width: 1024px)': {
            padding: '0 .75rem .75rem .75rem',
            overflowX: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }
    })

    const list = [
        { title: 'Marketplace', href: '/#'},
        { title: 'Retailers', href: '/#'},
        { title: 'Products', href: '/#'},
        { title: 'Brands', href: '/brands'},
        { title: 'Maps', href: '/#'},
        { title: 'Rentals', href: '/#'},
        { title: 'Lessons', href: '/#'},
        { title: 'Learn', href: '/#'},
        { title: 'Community', href: '/#'},
    ]

    return (
            <Box sx={style}>
                {
                    list.map((item, index) => (
                        <Anchor
                            component={Link}
                            passHref={true}
                            href={item.href}
                            key={index}
                            size='sm'
                            color='dark'
                            sx={(theme) => ({
                                '&:hover': {
                                    color: theme.colors.blue[5]
                                }
                            })}
                        >
                            {item.title}
                        </Anchor>
                    ))
                }
            </Box>
    )
}

export default Links