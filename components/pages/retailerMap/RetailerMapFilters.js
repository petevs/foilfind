import { Chip, MultiSelect } from '@mantine/core'

const RetailerMapFilters = ({filters, setFilters}) => {

  return (
    <>
        <Chip
            variant='filled'
            checked={filters.onlineShop}
            onChange={(e) => setFilters({...filters, onlineShop: e})}
        >
            Online shop
        </Chip>  
    </>
  )
}

export default RetailerMapFilters