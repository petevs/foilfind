import { Box } from "@mantine/core"

const CategoryContentLayout = ({children}) => {

  const style = (theme) => ({
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: `${theme.spacing.lg}px`,
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

export default CategoryContentLayout