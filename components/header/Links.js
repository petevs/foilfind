import { Anchor, Box, Button, ScrollArea, Text } from "@mantine/core"

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
        { title: 'Marketplace'},
        { title: 'Retailers'},
        { title: 'Products'},
        { title: 'Brands'},
        { title: 'Maps'},
        { title: 'Rentals'},
        { title: 'Lessons'},
        { title: 'Learn'},
        { title: 'Community'},
    ]

    return (
            <Box sx={style}>
                {
                    list.map((item, index) => (
                        <Anchor
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