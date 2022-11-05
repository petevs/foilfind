import { Chip, MultiSelect, Indicator, Button, TextInput, UnstyledButton, Menu, Checkbox } from '@mantine/core'
import { Box } from '@mantine/core'
import { IconAdjustmentsHorizontal, IconChevronDown, IconChevronUp, IconSearch, IconSortAscending } from '@tabler/icons'
import { useState } from 'react'
import { getBrands } from './filterListingsReducer'

const RetailerMapFilters = ({filters, setFilters}) => {

    const chips = [
        {label: 'Featured', value: 'featured'},
        {label: 'Open Now', value: 'openNow'},
        {label: 'Online Shop', value: 'onlineShop'},
        {label: 'Storefront', value: 'storefront'},
        {label: 'Lessons', value: 'lessons'},
        {label: 'Rentals', value: 'rentals'},
    ]

    const dropdowns = [
        {label: 'Brands', value: 'brands'},
        // {label: 'Sort By', value: 'sortBy'},
        // {label: 'Amenities', value: 'amenities'},
    ]

    const [dropdownMenus, setDropdownMenus] = useState({
        brands: false,
        sortBy: false,
        amenities: false,
    })


  return (
    <Box 
        sx={{display: 'grid', gridAutoFlow: 'column', gap: '.5rem', justifyContent: 'start'}}
    >
            {
                chips.map(chip => (
                    <Chip
                        key={chip.label}
                        variant='outline'
                        size='sm'
                        color='dark'
                        value={filters[chip.value]}
                        onChange={(value) => setFilters({...filters, [chip.value]: value})}
                    >
                        {chip.label}
                    </Chip>
                ))
            }
            {
                dropdowns.map(dropdown => (
                <Menu key={dropdown.label} opened={dropdownMenus[dropdown]} onChange={(e) => setDropdownMenus({...dropdownMenus, [dropdown]: e})}>
                    <Menu.Target>
                        <UnstyledButton
                            sx={(theme) => ({
                                fontSize: theme.fontSizes.sm,
                                border: '1px solid',
                                borderColor: getBrands(filters.brands).length > 0  ? theme.colors.dark[5] : theme.colors.dark[0],
                                padding: `0 ${theme.spacing.md}px`,
                                borderRadius: theme.radius.xl,
                                backgroundColor: dropdownMenus[dropdown] ? theme.colors.dark[5] : 'white',
                                color: dropdownMenus[dropdown] ? 'white' : theme.colors.dark[5],
                                marginTop: '2px'
                            })}
                        >
                            <Box
                                sx={{display: 'grid', gridAutoFlow: 'column', alignItems: 'center', gap: '.25rem'}}
                            >
                            {dropdown.label}
                            {
                                dropdownMenus[dropdown] ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                            }
                            </Box>
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Box p='lg' sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', minWidth: '200px', columnGap: '1.5rem', rowGap: '.5rem'}}>
                            {
                                Object.keys(filters.brands).map(brand => (
                                    <Checkbox
                                        key={brand}
                                        label={brand}
                                        checked={filters.brands[brand]}
                                        onChange={(event) => setFilters({...filters, brands: {...filters.brands, [brand]: event.target.checked}})}
                                    />
                                ))
                            }
                        </Box>
                    </Menu.Dropdown>
                </Menu>
                ))
            }
    </Box>
  )
}

export default RetailerMapFilters