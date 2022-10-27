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
        { title: 'Products', href: '/products'},
        { title: 'Retailers', href: '/retailers'},
        { title: 'Brands', href: '/brands'},
        { title: 'Vacations', href: '/#'},
        { title: 'Rentals', href: '/#'},
        { title: 'Lessons', href: '/#'},
        { title: 'Learn', href: '/#'},
        { title: 'Community', href: '/#'},
    ]

    return (
            <Box sx={style}>
                {
                    list.map((item, index) => (
                        <Link key={index} href={item.href}>
                            <Text
                                size='sm'
                                color='dark'
                                sx={(theme) => ({
                                    '& a': {
                                        color: 'gray'
                                    },
                                    '&:hover': {
                                        color: theme.colors.blue[5],
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }
                                })}
                            >
                                {item.title}
                            </Text>
                        </Link>
                    ))
                }
            </Box>
    )
}

export default Links