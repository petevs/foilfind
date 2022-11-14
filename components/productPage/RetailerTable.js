import { Divider, Paper, Box, Text, Button, Indicator, Title, TextInput, Modal, UnstyledButton, Group } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconArrowsSort, IconChevronRight, IconAdjustmentsHorizontal, IconLocation, IconSelector, IconChevronUp, IconChevronDown } from '@tabler/icons'
import { getDistanceBetweenPoints } from '../../helpers/getDistanceBetween'
import { useState } from 'react'
import { geocodeAddress } from '../../helpers/geocodeAddress'



const RetailerTable = ({data, brand}) => {

    const columns = ['retailer', 'distance', 'in stock', 'price']
    const [location, setLocation] = useLocalStorage({key: 'location', defaultValue: ''})
    const [geo, setGeo] = useLocalStorage({key: 'geopoint', defaultValue: [0, 0]})
    const [opened, setOpened] = useState(false)
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field) => {
      const reversed = field === sortBy ? !reverseSortDirection : false;
      setReverseSortDirection(reversed);
      setSortBy(field);

      if(field === 'distance') {
        setSortedData(data.sort((a, b) => {
          const aDistance = getDistanceBetweenPoints(geo, [a.geo.latitude, a.geo.longitude])
          const bDistance = getDistanceBetweenPoints(geo, [b.geo.latitude, b.geo.longitude])
          return reversed ? bDistance - aDistance : aDistance - bDistance;
        }));
      }
      
      if(field === 'in stock') {
        setSortedData(data.sort((a, b) => {
          const aStock = a.stock ? 1 : 0
          const bStock = b.stock ? 1 : 0
          return reversed ? bStock - aStock : aStock - bStock;
        }));
      }

      setSortedData([...data].sort((a, b) => {
        if (a[field] > b[field]) return reversed ? -1 : 1;
        if (a[field] < b[field]) return reversed ? 1 : -1;
        return 0;
      }));
    };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="sm"
        title="Set your location"
        closeOnClickOutside={false}
      >
        <Box padding="md">
          <TextInput
            placeholder="Enter your location"
            onChange={(e) => setLocation(e.target.value)}
            icon={<IconLocation size={16} />}
            value={location}
          />
          <Button
            size='sm'
            mt='sm'
            onClick={async () => {
              const geo = await geocodeAddress(location)
              setGeo(geo)
              setOpened(false)
            }}
            color="dark"
            variant="filled"
            fullWidth
          >
            Set location
          </Button>
        </Box>
      </Modal>
      
      <Box>
        <Divider my='lg' />
       
        <Box
          sx={{display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem'}}
        >
          <Box>
          <Title order={3}>Compare Retailers</Title>
          <Text color='dimmed'>Find the closest retailer with the best price</Text>
          </Box>
          <Box sx={{display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '1rem'}}>
            <Button
              size='xs'
              onClick={() => setOpened(true)}
              color="dark"
              variant="default"
              leftIcon={<IconLocation size={16} />}
            >
              {geo[0] === 0 && geo[0] === 0 ? 'Set Location' : location}
            </Button>
 
                <Indicator label={0} showZero size={22} color='dark' withBorder>
                  <Button 
                    size='xs'
                    variant='default' 
                    leftIcon={<IconAdjustmentsHorizontal size={16} />}
                    sx={(theme) => ({border: `2px solid ${theme.colors.dark[5]}`})}
                    // onClick={() => setOpened(true)}
                  >Filters</Button>
                </Indicator>
            </Box>
        </Box>
        <Paper withBorder radius='md'>
        <Box sx={{
          display: 'grid', 
          gridTemplateColumns: `repeat(${columns.length}, 1fr) 18px`,
          padding: '.75rem 1.5rem', 
          backgroundColor: '#F9FAFB', 
          borderRadius: '8px 8px 0 0', 
          gap: '1rem'
        }}>
            {
                columns.map((header, index) => (
                    <UnstyledButton 
                      key={index} 
                      size='md' 
                      transform='capitalize' 
                      weight={600}
                      onClick={() => setSorting(header)}
                    >
                      <Group position='apart'>
                        <Text transform='capitalize'>{header}</Text>
                        {sortBy != header && <IconSelector size={16} />}
                        {sortBy === header && reverseSortDirection && <IconChevronUp size={16} />}
                        {sortBy === header && !reverseSortDirection && <IconChevronDown size={16} />}
                      </Group>
                    </UnstyledButton>
                ))
            }
        </Box>
        <Divider />
        {
                    sortedData.map((row, index) => (
                        <Box
                        component='a'
                        href={row.link} 
                        target='_blank'
                        key={index}
                        sx={(theme) => ({
                          '& :hover': {
                            cursor: 'pointer',
                            backgroundColor: theme.colors.blue[0],
                            '& svg': {
                              stroke: theme.colors.dark[5]
                            }
                          },
                        })}>
                          <Box
                            sx={(theme) => ({
                              display: 'grid', 
                              gridTemplateColumns: `repeat(${columns.length}, 1fr) 18px`,
                              padding: '.75rem 1.5rem', 
                              borderBottom: `1px solid ${theme.colors.gray[2]}`,
                              alignItems: 'center',
                              gap: '1rem'
                            })}
                          >
                            <Text weight={600} size='md'>{row.retailer}</Text>
                            <Text color='dimmed'>
                              {
                                (geo[0] === 0 & geo[1] === 0) ? 
                                <Button
                                  size='xs'
                                  compact
                                  variant='default'
                                  color='gray'
                                  onClick={(e) => {e.preventDefault(); setOpened(true)}}
                                >
                                  Set Your Location
                                </Button> 
                                :
                                getDistanceBetweenPoints(geo, [row.geo.latitude, row.geo.longitude]) + ' km'
                              }
                            </Text>
                            {
                                row.inStock ?
                                <Text color='green'>In Stock</Text>
                                :
                                <Text color='red'>Out of Stock</Text>
                            }
                            <Text transform='capitalize' color='dimmed'>${row.price}</Text>
                            <IconChevronRight size={18} color='gray' />
                          </Box>
                        </Box>
                  ))}
                  <Box
                    sx={(theme) => ({
                        padding: '.5rem 1.5rem'})}
                  >
                    <Text weight={500} size='xs' color='dimmed'>View more retailers that carry {brand} products</Text>
                  </Box>
        </Paper>
      </Box>
    </>
  )
}

export default RetailerTable