import { Text, Box, ThemeIcon } from "@mantine/core"

const Header = ({fixedNav}) => {


    const style = (theme) => ({
        position: 'fixed',
        left: fixedNav ? '240px' : '70px',
        padding: theme.spacing.sm,
        width: fixedNav ? 'calc(100vw - 240px)' : 'calc(100vw - 70px)',
        height: '62px'

    })

    return (
        <Box sx={style}>
            <Text size='xl' weight='900'>FoilFind</Text>
        </Box>
    )
}

export default Header