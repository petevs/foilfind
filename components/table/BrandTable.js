import { Table, Box, createStyles, Container, Paper, Text, Checkbox, Divider, Button, Title, ActionIcon, Indicator } from "@mantine/core"
import { IconAdjustments, IconAdjustmentsHorizontal, IconChevronRight, IconFilter } from "@tabler/icons"
import Link from "next/link"


const BrandTable = ({columns, data}) => {

  const checkOfferings = (brand) => {
    const offerings = []
    if (brand.foils) {
      offerings.push('foils')
    }
    if (brand.wings) {
      offerings.push('wings')
    }
    if (brand.boards) {
      offerings.push('boards')
    }

    //add a · in between each offering
    return offerings.join(' · ')
  }


  return (
    <>
      <Container size='xl' p='xl'>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          padding: '1.5rem 0',
          alignItems: 'center'
        }}>
          <Box>
            <Title order={1}>Brands</Title>
            <Text size='sm' color='dimmed'>A list of all the brands</Text>
          </Box>
          <Indicator label='3' size={22} color='dark' withBorder>
            <Button 
              size='sm'
              variant='default' 
              leftIcon={<IconAdjustmentsHorizontal size={16} />}
              sx={(theme) => ({border: `2px solid ${theme.colors.dark[5]}`})}
            >Filters</Button>
          </Indicator>
        </Box>
          <Paper withBorder radius='md'>
            <Box sx={{display: 'grid', gridTemplateColumns: `repeat(${columns.length}, 1fr) auto`, padding: '.75rem 1.5rem', backgroundColor: '#F9FAFB', borderRadius: '8px 8px 0 0'}}>
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
                data.map((row, index) => (
                  <Link key={index} href={`/brands/${row.path}`}>
                    <Box sx={(theme) => ({
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
                          gridTemplateColumns: `repeat(${columns.length}, 1fr) auto`, 
                          padding: '.75rem 1.5rem', 
                          borderBottom: `1px solid ${theme.colors.gray[2]}`,
                          alignItems: 'center'
                        })}
                      >
                        <Text weight={600} size='md'>{row.brand}</Text>
                        <Text transform='capitalize' color='dimmed'>{checkOfferings(row)}</Text>
                        <IconChevronRight size={18} color='gray' />
                      </Box>
                    </Box>
                  </Link>
              ))}
          </Paper>
      </Container>
    </>
  )
}

export default BrandTable