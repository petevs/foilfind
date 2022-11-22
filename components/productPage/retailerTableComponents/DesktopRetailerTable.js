import { Box, Button, Divider, Group, Paper, Text, UnstyledButton } from '@mantine/core';
import { IconChevronDown, IconChevronRight, IconChevronUp, IconSelector } from '@tabler/icons'

const DesktopRetailerTable = (props) => {

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


  return (
    <Box
          sx={{
            '@media (max-width: 768px)': {
              display: 'none'
            }
          }}
        >
          <Paper withBorder radius='md'>
          <Box sx={{
            display: 'grid', 
            gridTemplateColumns: `repeat(${columns.length}, 1fr) 18px`,
            padding: '.75rem 1.5rem', 
            backgroundColor: '#F9FAFB', 
            borderRadius: '8px 8px 0 0', 
            gap: '1rem'
          }}>
              {
                  columns.map((header, index) => (
                      <UnstyledButton 
                        key={index} 
                        size='md' 
                        transform='capitalize' 
                        weight={600}
                        onClick={() => setSorting(header)}
                      >
                        <Group position='apart'>
                          <Text transform='capitalize'>{header}</Text>
                          {sortBy != header && <IconSelector size={16} />}
                          {sortBy === header && reverseSortDirection && <IconChevronUp size={16} />}
                          {sortBy === header && !reverseSortDirection && <IconChevronDown size={16} />}
                        </Group>
                      </UnstyledButton>
                  ))
              }
          </Box>
          <Divider />
          {
                      sortedData.map((row, index) => (
                          <Box
                          component='a'
                          href={row.link} 
                          target='_blank'
                          key={index}
                          sx={(theme) => ({
                            '& :hover': {
                              cursor: 'pointer',
                              backgroundColor: theme.colors.blue[0],
                              '& svg': {
                                stroke: theme.colors.dark[5]
                              }
                            },
                          })}>
                            <Box
                              sx={(theme) => ({
                                display: 'grid', 
                                gridTemplateColumns: `repeat(${columns.length}, 1fr) 18px`,
                                padding: '.75rem 1.5rem', 
                                borderBottom: `1px solid ${theme.colors.gray[2]}`,
                                alignItems: 'center',
                                gap: '1rem'
                              })}
                            >
                              <Text weight={600} size='md'>{row.retailer}</Text>
                              <Text color='dimmed'>
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
                              {
                                  row.inStock ?
                                  <Text color='green'>In Stock</Text>
                                  :
                                  <Text color='red'>Out of Stock</Text>
                              }
                              <Text transform='capitalize' color='dimmed'>${row.price}</Text>
                              <IconChevronRight size={18} color='gray' />
                            </Box>
                          </Box>
                    ))}
                    <Box
                      sx={(theme) => ({
                          padding: '.5rem 1.5rem'})}
                    >
                      <Text weight={500} size='xs' color='dimmed'>View more retailers that carry {brand} products</Text>
                    </Box>
          </Paper>
        </Box>
  )
}

export default DesktopRetailerTable