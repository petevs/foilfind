import { Divider, Paper, Box, Text, Button, Indicator, Title, TextInput, Modal, UnstyledButton, Group } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconArrowsSort, IconChevronRight, IconAdjustmentsHorizontal, IconLocation, IconSelector, IconChevronUp, IconChevronDown } from '@tabler/icons'
import { getDistanceBetweenPoints } from '../../helpers/getDistanceBetween'
import { useState } from 'react'
import { geocodeAddress } from '../../helpers/geocodeAddress'
import DesktopRetailerTable from './retailerTableComponents/DesktopRetailerTable'
import MobileRetailerTable from './retailerTableComponents/MobileRetailerTable'
import MobileSortButton from './retailerTableComponents/MobileSortButton'



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
            sx={{ width: '100%' }}
          >
            Set location
          </Button>
        </Box>
      </Modal>
      
      <Box>
        <Divider my='lg' />
       
        <Box
          sx={{
            display: 'grid', 
            gridTemplateColumns: 'auto auto', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            paddingBottom: '1rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '1rem',
            }
          }}
        >
          <Box>
          <Title order={3}>Compare Retailers</Title>
          <Text color='dimmed'>Find the closest retailer with the best price</Text>
          </Box>
          <Box sx={{display: 'grid', gridTemplateColumns: 'auto', gap: '1rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: 'auto auto',
              justifyContent: 'space-between'
            }
          }}>
            <MobileSortButton
              setSorting={setSorting}
              sortBy={sortBy}
              reverseSortDirection={reverseSortDirection}
            />
            <Button
              size='xs'
              onClick={() => setOpened(true)}
              color="dark"
              variant="default"
              leftIcon={<IconLocation size={16} />}
            >
              {geo[0] === 0 && geo[0] === 0 ? 'Set Location' : location}
            </Button>
            </Box>
        </Box>
        <DesktopRetailerTable
          columns={columns}
          sortBy={sortBy}
          reverseSortDirection={reverseSortDirection}
          setSorting={setSorting}
          sortedData={sortedData}
          getDistanceBetweenPoints={getDistanceBetweenPoints}
          geo={geo}
          brand={brand}
        />
        <MobileRetailerTable
          columns={columns}
          sortBy={sortBy}
          reverseSortDirection={reverseSortDirection}
          setSorting={setSorting}
          sortedData={sortedData}
          getDistanceBetweenPoints={getDistanceBetweenPoints}
          geo={geo}
          brand={brand}
        />     
      </Box>
    </>
  )
}

export default RetailerTable