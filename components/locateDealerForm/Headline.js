import { Text } from "@mantine/core"

const Headline = ({title}) => {

    const headline = (theme ) => ({
        fontSize: '50px',
        fontWeight: 900,
        marginBottom: theme.spacing.xl
    })

    return (
        <Text sx={headline}>{title}</Text>
    )
}

export default Headline