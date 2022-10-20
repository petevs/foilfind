import { Box, Paper, Text } from "@mantine/core"
const MapCard = ({listing, mouseEnter, mouseLeave, setListingDetail}) => {

  const cardWrapper = (theme) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
    border: `1px solid ${theme.colors.gray[3]}`,
    borderRadius: `${theme.radius.sm}px`,
    '&:hover': {
      cursor: 'pointer',
      border: `1px solid ${theme.colors.dark[0]}`,
    }
  })

  return (
    // <Link href={`/retailers/${listing.path}`}>
    //   <a target="_blank" style={{textDecoration: 'none'}}>
        <Box 
          mb='md'
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          onClick={() => setListingDetail(listing)}
        >
          <Paper>
            <Box p='sm' sx={cardWrapper}>
              <Box>
                <Text weight={600}>{listing.name}</Text>
                <Text size='sm' color='gray'>Retailer</Text>
              </Box>
            </Box>
          </Paper>
        </Box>
    //   </a>
    // </Link>
  )
}

export default MapCard