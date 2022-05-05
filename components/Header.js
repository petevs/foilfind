import { Text, Box, ThemeIcon } from "@mantine/core"
import Logo from "./Logo"

const Header = ({fixedNav}) => {


    const style = (theme) => ({
        position: 'fixed',
        left: fixedNav ? '240px' : '70px',
        padding: theme.spacing.sm,
        width: fixedNav ? 'calc(100vw - 240px)' : 'calc(100vw - 70px)',
        height: '62px',
        borderBottom: '1px solid black',

    })

    return (
        <Box sx={style}>
            <Logo />
        </Box>
    )
}

export default Header