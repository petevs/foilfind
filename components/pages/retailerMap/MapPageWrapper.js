import { Box, ScrollArea, Text } from "@mantine/core";

export default function MapPageWrapper() {

  const showList = true

  const wrapper = (theme) => ({
    display: 'grid',
    gridTemplateColumns: showList ? '375px 1fr' : '1fr',
    backgroundColor: 'blue',
    height: `calc(100vh - ${theme.other.headerHeight}px)`,
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  })


  return (
      <Box sx={wrapper}>
        <Box sx={{backgroundColor: 'red', overflowY: 'scroll'}}>
          <Text>Sidebar</Text>
        </Box>
        <Box>
          <Text>Map</Text>
        </Box>
      </Box>
  )
}