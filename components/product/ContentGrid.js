import { Box } from "@mantine/core"

const ContentGrid = ({children}) => {

    const style = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '1fr 375px',
        gridGap: theme.spacing.md,
        alignItems: 'start',
        paddingTop: '2rem',
        gap: '4rem',
        '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr'
        }
    })


    return (
        <Box sx={style}>
            {children}
        </Box>
    )
}

export default ContentGrid