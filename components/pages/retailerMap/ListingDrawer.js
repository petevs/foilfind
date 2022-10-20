import { Box, Center, Divider, Text, Group } from "@mantine/core"
import MapCard from "./MapCard"
import { IconChevronLeft, IconX } from "@tabler/icons"
import RetailerDetailCard from "./RetailerDetailCard"

const ListingDrawer = (props) => {

  const {
    listings,
    highlightedListing,
    setHighlightedListing,
    listingDetail,
    setListingDetail
  } = props


  const wrapper = (theme) => ({
    position: 'relative', 
    // marginTop: '10px',
    marginTop: `-100px`,
    minHeight: '100vh',
    zIndex: 5, 
    backgroundColor: 'white', 
    width: '100%', 
    borderTopLeftRadius: '32px', 
    borderTopRightRadius: '32px',
    paddingBottom: '2rem',
    '@media (min-width: 769px)': {
      display: 'none'
    }
  })

  return (

    <Box sx={wrapper}>

      <Box>
        <Center>
        <Divider 
          sx={{width: '2.185rem'}} 
          size='lg' 
          my='sm' 
        />
        </Center>
      </Box>

      <Box p='md'>

        {
          listingDetail
          ?
          <Box>
          <Group
            sx={{
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            spacing='xs' 
            onClick={() => setListingDetail(null)}
          >
            <IconChevronLeft size={14} />
            <Text weight={600}>Back to Results</Text>
          </Group>
          <Divider mt='md' />
        </Box>
        :
        <Box>
          <Text 
            weight={600} 
            size='sm' 
            align='center'
          >
            Showing Results 1 - {listings.length}
          </Text>
 
          <Divider my='md' />
        </Box>
        }
      </Box>

      <Box p='md'>
        {
          listingDetail
          ?
          <Box px='md'>
            <RetailerDetailCard retailer={listingDetail} />
          </Box>
          :
          listings.map((listing, index) => (
            <MapCard
              key={index}
              listing={listing}
              mouseEnter={() => setHighlightedListing(listing.name)}
              mouseLeave={() => setHighlightedListing(null)}
              setListingDetail={setListingDetail}
            />
          ))
        }
      </Box>

    </Box>
  )
}

export default ListingDrawer