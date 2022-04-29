import { Box, Button } from "@mantine/core"
import { FiChevronDown } from 'react-icons/fi'

const FilterBar = () => {

    const style = {
        display: 'grid',
        gridAutoFlow: 'column',
        alignContent: 'center',
        justifyContent: 'start',
        gap: '.5rem',
        height: '60px',
        borderBottom: '1px solid #ced4da',
        padding: '0 1rem'
    }

    return (
        <Box sx={style}>
            <Button
                variant='outline'
                radius='xl'
                size='md'
                color='dark' 
                rightIcon={<FiChevronDown />}
                sx={{height: '28px', lineHeight: 1.55, fontWeight: 400, fontSize: '14px'}}
            >
                Brands
            </Button>
        </Box>
    )


}

export default FilterBar