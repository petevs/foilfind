import { Box, Card, Text } from "@mantine/core"

const TypeCard = ({icon, title, subtitle}) => {

    const card = (theme) => ({
        width: '346px',
        height: '400px',
        textAlign: 'center',
        padding: theme.spacing.xl,
        display: 'grid',
        alignContent: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        gap: '2rem',
        '&:hover': {
            border: `5px solid ${theme.colors.gray[3]}`,
            cursor: 'pointer'
        },
        '& svg': {
            height: '120px',
            width: '120px'
        }
    })

    return (
        <Card
            shadow='xl'
            radius='md'
            sx={card}
        >
            {icon}
            <Box>
                <Text 
                    sx={{fontSize: '24px'}}
                    weight='900'
                >
                    {title}
                </Text>
                <Text>
                    {subtitle}
                </Text>
            </Box>
        </Card>
    )
}

export default TypeCard