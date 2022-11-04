import { Chip, MultiSelect, Indicator, Button, TextInput } from '@mantine/core'
import { Box } from '@mantine/core'
import { IconAdjustmentsHorizontal, IconSearch, IconSortAscending } from '@tabler/icons'

const RetailerMapFilters = ({filters, setFilters}) => {

    console.log(filters)

  return (
    <Box 
        sx={{display: 'grid', gridAutoFlow: 'column', gap: '.5rem', justifyContent: 'end'}}
        pt='xs'
    >
            <TextInput
                placeholder='Search'
                icon={<IconSearch size={16} />}
                size='xs'
                sx={{width: '300px'}}
            />
              <Button 
                size='xs'
                variant='default' 
                leftIcon={<IconSortAscending size={16} />}
                // sx={(theme) => ({border: `2px solid ${theme.colors.dark[5]}`})}
                onClick={() => setOpened(true)}
              >Sort</Button>
            <Indicator label={3} showZero size={22} color='dark' withBorder>
              <Button 
                size='xs'
                variant='default' 
                leftIcon={<IconAdjustmentsHorizontal size={16} />}
                sx={(theme) => ({border: `2px solid ${theme.colors.dark[5]}`})}
                onClick={() => setOpened(true)}
              >Filters</Button>
            </Indicator>
    </Box>
  )
}

export default RetailerMapFilters