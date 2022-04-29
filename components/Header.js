import { Text, Box, ThemeIcon } from "@mantine/core"

const Header = ({fixedNav}) => {


    const style = (theme) => ({
        position: 'fixed',
        left: fixedNav ? '240px' : '69px',
        padding: theme.spacing.sm,

    })

    return (
        <Box sx={style}>
            <Text size='xl' weight='900'>FoilFind</Text>
        </Box>
    )
}

export default Header