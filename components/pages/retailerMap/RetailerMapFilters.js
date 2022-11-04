import { Chip, MultiSelect } from '@mantine/core'
import { Box } from '@mantine/core'

const RetailerMapFilters = ({filters, setFilters}) => {

  return (
    <Box 
        sx={{display: 'grid', gridAutoFlow: 'column', gap: '1rem', justifyContent: 'start'}}
        pt='xs'
    >
        <Chip
            size='sm'
            color='dark'
            variant='outline'
            checked={filters.onlineShop}
            onChange={(e) => setFilters({...filters, onlineShop: e})}
        >
            Online shop
        </Chip>  
        <Chip
            size='sm'
            color='dark'
            variant='outline'
            checked={filters.storefront}
            onChange={(e) => setFilters({...filters, storefront: e})}
        >
            Storefront
        </Chip>
        <Chip
            size='sm'
            color='dark'
            variant='outline'
            checked={filters.lessons}
            onChange={(e) => setFilters({...filters, lessons: e})}
        >
            Lessons
        </Chip>
        <Chip
            size='sm'
            color='dark'
            variant='outline'
            checked={filters.rentals}
            onChange={(e) => setFilters({...filters, rentals: e})}
        >
            Rentals
        </Chip>
    </Box>
  )
}

export default RetailerMapFilters