import { Box, Text, Anchor, Paper, Card } from "@mantine/core"
import Link from "next/link"
// import ContentSliderCard from "./ContentSliderCard"
import { useRouter } from "next/router"


const ContentSlider = ({ title, cards, parentPath }) => {

    const router = useRouter()


    const slider = (theme) => ({
        display: 'grid',
        gridAutoFlow: 'column',
        justifyContent: 'start',
        gap: '1rem',
        overflowX: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    })

    return (
        <Box mt='xl'>
            <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'baseline',}}>
                <Text weight={900} size='lg' mb='md'>{title}</Text>
                <Anchor
                    sx={{justifySelf: 'end'}}
                    size='sm'
                    weight={700}
                    color='gray'
                    onClick={() => router.push(parentPath)}
                >
                    View All
                    </Anchor>
            </Box>
            <Box sx={slider}>
                {/* {
                    cards.map((card, index) => (
                        <ContentSliderCard
                            key={index}
                            imgSrc={card.imgSrc}
                            alt={card.alt}
                            title={card.title}
                            light={card.light}
                            color={card.color}
                            href={card.href}
                        />
                    ))
                } */}
                {
                    cards.map((card) => (
                        <Link href={`${parentPath}/${card.path}`} key={card.path} passHref>
                        <Card 
                            withBorder
                            sx={(theme) => ({
                                display: 'grid', 
                                alignContent: 'center',
                                justifyContent: 'center', 
                                height: '144px', 
                                width: '144px',
                                backgroundColor: theme.colors.gray[2],
                                color: theme.colors.gray[6],
                                '&:hover': {
                                    cursor: 'pointer',
                                    border: `1px solid ${theme.colors.dark[1]}`,
                                    color: theme.colors.dark[3]
                                }
                            })}
                            radius='md'

                        >
                                <Text align='center' weight={600}>{card.title}</Text>
                        </Card>
                        </Link>
                    ))
                }
            </Box>
        </Box>
    )
}

export default ContentSlider