import { TextInput, Box } from "@mantine/core"
import { MapPin, Search } from "tabler-icons-react"

const SearchBox = () => {


    const wrapper = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '325px 325px',
        gridArea: 'search',
        padding: '.75rem',
        alignContent: 'start',
        '@media (max-width: 1024px)': {
            paddingTop: '0',
            gridTemplateColumns: '1fr 1fr'
        }
        
    })

    return (
        <Box sx={wrapper}>
            <TextInput
                icon={<Search size={18} />} 
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
            <TextInput 
                icon={<MapPin size={18} />}
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
            />
        </Box>
    )
}

export default SearchBox