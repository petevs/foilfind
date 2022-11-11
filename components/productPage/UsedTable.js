import { Divider, Paper, Box, Text, Button, Checkbox } from '@mantine/core'
import { IconCheckbox, IconChevronRight, IconCross, IconX } from '@tabler/icons'

const UsedTable = ({data, brand}) => {
    const columns = ['Source', 'location', 'distance', 'price']




  return (
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
                <Text key={index} size='md' transform='capitalize' weight={600}>
                {header}
                </Text>
            ))
        }
    </Box>
    <Divider />
    {
        !data ?
        <Box sx={{padding: '1.5rem'}}>
            <Text align='center' color='dimmed' size='md' weight={600}>No used CF1200 currently found</Text>
            <Text align='center' color='blue' size='sm'>List a used CF1200 here</Text>
        </Box>
        :

                data.map((row, index) => (
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
                        <Text color='dimmed'>Location</Text>
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
              {/* <Box
                sx={(theme) => ({
                    padding: '.5rem 1.5rem'})}
              >
                <Text weight={500} size='xs' color='dimmed'>View more retailers that carry {brand} products</Text>
              </Box> */}
    </Paper>
  )
}

export default UsedTable