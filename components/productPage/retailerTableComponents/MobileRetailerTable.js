import { Box, Text, Button, Group, Modal, Menu } from '@mantine/core'
import { IconArrowDown, IconArrowsSort, IconArrowUp, IconSort09, IconSort90, IconSortAscending, IconSortDescending } from '@tabler/icons'
import React from 'react'

const MobileRetailerTable = (props) => {

    const {
        columns,
        sortBy,
        reverseSortDirection,
        setSorting,
        sortedData,
        getDistanceBetweenPoints,
        geo,
        brand
    } = props

    const [opened, setOpened] = React.useState(false)

  return (
    <>
        <Box
            sx={{
                '@media (min-width: 768px)': {
                    display: 'none'
                }
            }}
        >
            {
                sortedData.map((row, index) => (
                    <Box
                        component='a'
                        href={row.link}
                        target='_blank' 
                        key={index}
                        sx={(theme) => ({
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            padding: theme.spacing.md,
                            border: `1px solid ${theme.colors.gray[3]}`,
                            borderRadius: theme.radius.md,
                            marginBottom: theme.spacing.sm,
                            alignItems: 'center',
                            '&:hover': {
                                backgroundColor: theme.colors.blue[0],
                                cursor: 'pointer'
                            }
                        })}
                    >
                        <Box>
                            <Text weight={600} color='dark'>{row.retailer}</Text>
                            <Group spacing='xs'>
                                <Text color='dimmed' size='xs'>
                                            {
                                            (geo[0] === 0 & geo[1] === 0) ? 
                                            <Button
                                                size='xs'
                                                compact
                                                variant='default'
                                                color='gray'
                                                onClick={(e) => {e.preventDefault(); setOpened(true)}}
                                            >
                                                Set Your Location
                                            </Button> 
                                            :
                                                getDistanceBetweenPoints(geo, [row.geo.latitude, row.geo.longitude]) + ' km'
                                            }
                                </Text>
                                <Text color='dimmed'>·</Text>
                                {
                                    row.inStock ?
                                    <Text size='xs' color='green'>In Stock</Text>
                                    :
                                    <Text size='xs' color='red'>Out of Stock</Text>
                                }
                            </Group>
                        </Box>
                        <Text color='dark' weight={600}>${row.price}</Text>
                    </Box>
                ))
            }

        </Box>
    </>
  )
}

export default MobileRetailerTable