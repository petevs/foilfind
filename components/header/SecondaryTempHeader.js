import { Box, Container, Text, Divider } from "@mantine/core"


const SecondaryTempHeader = () => {

  return (
    <Box>
        <Container size='xl' py='xs'>
          <Box sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            gap: '1rem',
            justifyContent: 'start'
          }}
          >
            <Text weight={600} size='sm' transform='uppercase'>Gear</Text>
            <Text weight={600} size='sm' transform='uppercase'>Brands</Text>
            <Text weight={600} size='sm' transform='uppercase'>Shops</Text>
            <Text weight={600} size='sm' transform='uppercase'>Lessons</Text>
            <Text weight={600} size='sm' transform='uppercase'>Rentals</Text>
            <Text weight={600} size='sm' transform='uppercase'>Stays</Text>
            <Text weight={600} size='sm' transform='uppercase'>Spots</Text>
            <Text weight={600} size='sm' transform='uppercase'>Learn</Text>
          </Box>
      </Container>
      <Divider />
    </Box>
  )
}

export default SecondaryTempHeader;