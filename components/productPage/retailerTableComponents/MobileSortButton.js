import { Box, Menu, Button, Text, Group } from '@mantine/core'
import { IconSortAscending, IconSortDescending, IconArrowsSort } from '@tabler/icons'


const MobileSortButton = (props) => {

    const {
        sortBy,
        reverseSortDirection,
        setSorting,
    } = props

  return (
    <Box
            sx={{
                '@media (min-width: 768px)': {
                    display: 'none'
                }
            }}
        >
        <Menu
                width={150}
                shadow='md'
            >
                <Menu.Target>
                    <Button
                        size='xs'
                        variant='default'
                        color='dark'
                        leftIcon={reverseSortDirection ? <IconSortAscending size={16} /> : <IconSortDescending size={16} />}
                    >
                        <Text transform='capitalize'>Sort By: {sortBy}</Text>
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={() => setSorting('price')}>
                        <Group position='apart'>
                            <Text transform='capitalize'>Price</Text>
                            {sortBy != 'price' && <IconArrowsSort size={16} />}
                            {sortBy === 'price' && reverseSortDirection && <IconSortDescending size={16} />}
                            {sortBy === 'price' && !reverseSortDirection && <IconSortAscending size={16} />}
                        </Group>
                    </Menu.Item>
                    <Menu.Item onClick={() => setSorting('distance')}>
                        <Group position='apart'>
                            <Text transform='capitalize'>Distance</Text>
                            {sortBy != 'distance' && <IconArrowsSort size={16} />}
                            {sortBy === 'distance' && reverseSortDirection && <IconSortDescending size={16} />}
                            {sortBy === 'distance' && !reverseSortDirection && <IconSortAscending size={16} />}
                        </Group>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Box>
  )
}

export default MobileSortButton