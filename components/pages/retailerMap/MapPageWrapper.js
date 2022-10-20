import { Box } from "@mantine/core";

export default function MapPageWrapper() {

  const showList = true

  const wrapper = (theme) => ({
    display: 'grid',
    gridTemplateColumns: showList ? '375px 1fr' : '1fr',
    width: '100%',
    height: 'calc(100vh - 106.7px - 120px)',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  })


  return (
    <div>
      <Box
        sx={wrapper}
      >
        <Box>
          I am the sidebar
        </Box>
        <Box>
          I am the map
        </Box>
      </Box>
    </div>
  )
}