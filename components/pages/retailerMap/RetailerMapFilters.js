import { Chip, MultiSelect, Indicator, Button, TextInput, UnstyledButton } from '@mantine/core'
import { Box } from '@mantine/core'
import { IconAdjustmentsHorizontal, IconChevronDown, IconSearch, IconSortAscending } from '@tabler/icons'

const RetailerMapFilters = ({filters, setFilters}) => {

    const chips = [
        {label: 'Featured', value: 'featured'},
        {label: 'Open Now', value: 'openNow'},
        {label: 'Online Shop', value: 'onlineShop'},
        {label: 'Storefront', value: 'storefront'},
        {label: 'Lessons', value: 'lessons'},
        {label: 'Rentals', value: 'rentals'},
    ]



  return (
    <Box 
        sx={{display: 'grid', gridAutoFlow: 'column', gap: '.5rem', justifyContent: 'end'}}
    >
            {
                chips.map(chip => (
                    <Chip
                        key={chip}
                        variant='outline'
                        size='xs'
                        color='dark'
                        value={filters[chip.value]}
                        onChange={(value) => setFilters({...filters, [chip.value]: value})}
                    >
                        {chip.label}
                    </Chip>
                ))
            }
            <UnstyledButton
                sx={(theme) => ({
                    fontSize: theme.fontSizes.xs,
                    border: '1px solid',
                    borderColor: theme.colors.dark[0],
                    padding: `0 ${theme.spacing.md}px`,
                    borderRadius: theme.radius.xl,
                    backgroundColor: 'white',
                    marginTop: '2px'
                })}
            >
                <Box
                    sx={{display: 'grid', gridAutoFlow: 'column', alignItems: 'center', gap: '.25rem'}}
                >
                Brands
                <IconChevronDown size={14} />
                </Box>
            </UnstyledButton>
            <UnstyledButton
                sx={(theme) => ({
                    fontSize: theme.fontSizes.xs,
                    border: '1px solid',
                    borderColor: theme.colors.dark[0],
                    padding: `0 ${theme.spacing.md}px`,
                    borderRadius: theme.radius.xl,
                    backgroundColor: 'white',
                    marginTop: '2px'
                })}
            >
                <Box
                    sx={{display: 'grid', gridAutoFlow: 'column', alignItems: 'center', gap: '.25rem'}}
                >
                Amenities
                <IconChevronDown size={14} />
                </Box>
            </UnstyledButton>
            <UnstyledButton
                sx={(theme) => ({
                    fontSize: theme.fontSizes.xs,
                    border: '1px solid',
                    borderColor: theme.colors.dark[0],
                    padding: `0 ${theme.spacing.md}px`,
                    borderRadius: theme.radius.xl,
                    backgroundColor: 'white',
                    marginTop: '2px'
                })}
            >
                <Box
                    sx={{display: 'grid', gridAutoFlow: 'column', alignItems: 'center', gap: '.25rem'}}
                >
                Sort By
                <IconChevronDown size={14} />
                </Box>
            </UnstyledButton>
    </Box>
  )
}

export default RetailerMapFilters