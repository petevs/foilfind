import { Chip, MultiSelect } from '@mantine/core'
import { Box } from '@mantine/core'

const RetailerMapFilters = ({filters, setFilters}) => {

    console.log(filters)

  return (
    <Box 
        sx={{display: 'grid', gridAutoFlow: 'column', gap: '1rem', justifyContent: 'start'}}
        pt='xs'
    >
        {
            Object.keys(filters).map((filter, i) => (
                <Chip
                    key={filter}
                    variant='outline'
                    color='gray'
                    checked={filters[filter]}
                    onChange={(e) => setFilters({...filters, [filter]: e})}
                >
                    {filter}
                </Chip>
            )
        )
        }
        <MultiSelect
            placeholder='Brands'
            data={[
                { label: 'Armstrong', value: 'armstrong'}
            ]}
            onChange={(e) => console.log(e)}
        />
    </Box>
  )
}

export default RetailerMapFilters