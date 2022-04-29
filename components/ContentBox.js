import { Box } from "@mantine/core"

const ContentBox = ({fixedNav, children}) => {

    const style = (theme) => ({
        position: 'fixed',
        left: fixedNav ? '240px' : '70px',
        top: '62px',
        width: fixedNav ? 'calc(100vw - 240px)' : 'calc(100vw - 70px)',
        height: 'calc(100vh - 62px)',

    })

    return(
        <Box sx={style}>
            {children}
        </Box>
    )
}

export default ContentBox