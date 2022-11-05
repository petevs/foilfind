import { Chip, MultiSelect, Indicator, Button, TextInput, UnstyledButton, Menu, Checkbox } from '@mantine/core'
import { Box } from '@mantine/core'
import { IconAdjustmentsHorizontal, IconChevronDown, IconChevronUp, IconSearch, IconSortAscending } from '@tabler/icons'
import { useState } from 'react'
import DropdownChip from './DropdownChip'
import { getBrands } from './filterListingsReducer'


const BrandsDropdownContent = ({filters, setFilters}) => {
    return (
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
    )
}

const ShoppingOptionsDropdown = ({filters, setFilters}) => {
    return (
        <Box p='lg' sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', minWidth: '200px', columnGap: '1.5rem', rowGap: '.5rem'}}>
        {
            Object.keys(filters.shoppingOptions).map(option => (
                <Checkbox
                    key={option}
                    label={option}
                    checked={filters.shoppingOptions[option]}
                    onChange={(event) => setFilters({...filters, shoppingOptions: {...filters.shoppingOptions, [option]: event.target.checked}})}
                />
            ))
        }
    </Box>
    )
}

const SupportOptionsDropdown = ({filters, setFilters}) => {
    return (
        <Box p='lg' sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', minWidth: '200px', columnGap: '1.5rem', rowGap: '.5rem'}}>
        {
            Object.keys(filters.support).map(option => (
                <Checkbox
                    key={option}
                    label={option}
                    checked={filters.support[option]}
                    onChange={(event) => setFilters({...filters, support: {...filters.support, [option]: event.target.checked}})}
                />
            ))
        }
    </Box>
    )
}



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
        {label: 'Brands', value: 'brands', content: <BrandsDropdownContent filters={filters} setFilters={setFilters} />},
        {label: 'Shopping Options', value: 'shoppingOptions', content: <ShoppingOptionsDropdown filters={filters} setFilters={setFilters} />},
        {label: 'Support', value: 'support', content: <SupportOptionsDropdown filters={filters} setFilters={setFilters} />},
    ]

    const [dropdownMenus, setDropdownMenus] = useState({
        brands: false,
        shoppingOptions: false,
        support: false,
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
                    <DropdownChip
                        key={dropdown.label}
                        label={dropdown.label}
                    >
                        {dropdown.content}
                    </DropdownChip>
                ))
            }
    </Box>
  )
}

export default RetailerMapFilters