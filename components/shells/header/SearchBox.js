import { TextInput, Box, Select } from "@mantine/core"
import { IconMapPin, IconSearch } from "@tabler/icons"

const SearchBox = () => {


    const wrapper = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '450px 175px',
        gridArea: 'search',
        padding: '.75rem',
        alignContent: 'start',
        '@media (max-width: 1024px)': {
            display: 'none'
        }
        
    })

    return (
        <Box sx={wrapper}>
            <TextInput
                icon={<IconSearch size={16} />} 
                radius='xs'
                size='sm'
                variant='filled'
                placeholder="Products, retailers, brands, and more"
                sx={(theme) => ({
                    '& input': {
                        borderRadius: '4px 0px 0px 4px',
                        borderRight: `1px solid ${theme.colors.dark[0]}`
                    },
                    '& input:focus': {
                        outline: 'none',
                        borderColor: 'transparent !important'
                    },
                })}
            />
            <Select
                icon={<IconMapPin size={16} />}
                sx={{
                    '& input': {
                        borderRadius: '0px 4px 4px 0px',
                        borderLeft: 'none'
                    },
                    '& input:focus': {
                        outline: 'none',
                        borderColor: 'transparent !important'
                    },
                }}
                data={[
                    { label: 'North America', value: 'na' },
                ]}
                placeholder="North America"
                variant='filled'
            />
            {/* <TextInput 
                icon={<IconMapPin size={18} />}
                size='sm'
                variant='filled'
                placeholder='Add your location'
                sx={{
                    '& input': {
                        borderRadius: '0px 4px 4px 0px',
                        borderLeft: 'none'
                    },
                    '& input:focus': {
                        outline: 'none',
                        borderColor: 'transparent !important'
                    },
                }}
            /> */}
        </Box>
    )
}

export default SearchBox