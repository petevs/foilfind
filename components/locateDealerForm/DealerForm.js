import Location from "./Location"
import { Box } from "@mantine/core"
import { Text } from "@mantine/core"

const DealerForm = () => {

    const wrapper = (theme) => ({
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center',
        backgroundColor: '#f5f5f5',
        height: '100%'
    })

    const headline = (theme ) => ({
        fontSize: '50px',
        fontWeight: 900,
        marginBottom: theme.spacing.xl
    })

    return (
        <Box sx={wrapper}>
            <Text>Locate a Dealer</Text>
            <Location />
        </Box>

    )
}

export default DealerForm