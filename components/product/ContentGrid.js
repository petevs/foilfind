import { Box } from "@mantine/core"

const ContentGrid = ({children}) => {

    const style = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridGap: theme.spacing.md,
    })


    return (
        <Box sx={style}>
            {children}
        </Box>
    )
}

export default ContentGrid