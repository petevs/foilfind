import { Table, Box, createStyles, Container, Paper, Text, Checkbox, Divider, Button, Title, ActionIcon, Indicator, Modal, MultiSelect, TextInput } from "@mantine/core"
import { IconAdjustments, IconAdjustmentsHorizontal, IconChevronRight, IconFilter, IconPlus, IconSearch, IconX } from "@tabler/icons"
import Link from "next/link"
import { useState } from "react"


const BrandTable = ({columns, data}) => {

  const [opened, setOpened] = useState(false)

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
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        sx={{
          '& root': {
            padding: 0
          }
        }}
      >
          <Box>
            <Box sx={{display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center'}} py='sm' px='md'>
              <IconX onClick={() => setOpened(false)} size={16} />
              <Text weight={600} align='center'>Filters</Text>
            </Box>
            <Divider />
          </Box>
        <Box
          py='sm'
          px='md'
          sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gap: '1rem'
          }}
        >
        <MultiSelect
          size='sm'
          label="Categories"
          placeholder="Filter by category"
          data={[
            { label: 'Foils', value: 'foils' },
            { label: 'Wings', value: 'wings' },
            { label: 'Boards', value: 'boards' },
          ]}
        />
        <MultiSelect
          size='sm'
          label='Country of Origin'
          placeholder='Filter by country of origin'
          data={[
            { label: 'USA', value: 'usa' },
            { label: 'France', value: 'france' },
            { label: 'Germany', value: 'germany' },
            { label: 'Spain', value: 'spain' },
          ]}
        />
        </Box>
        <Divider mt='sm' />
        <Box py='sm' px='md' sx={{display: 'grid', gridTemplateColumns: 'auto auto', justifyContent: 'space-between', alignItems: 'center'}}>
          <Button size='sm' color='dark' variant='subtle' compact>Clear All</Button>
          <Button size='sm' color='dark'>Show 54 Brands</Button>
        </Box>
      </Modal>
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
          <Box sx={{display: 'grid', gridTemplateColumns: 'auto auto', gap: '1rem'}}>
            <Button size='xs' color='dark' variant='subtle'>Add New</Button>
            <Indicator label='3' size={22} color='dark' withBorder>
              <Button 
                size='xs'
                variant='default' 
                leftIcon={<IconAdjustmentsHorizontal size={16} />}
                sx={(theme) => ({border: `2px solid ${theme.colors.dark[5]}`})}
                onClick={() => setOpened(true)}
              >Filters</Button>
            </Indicator>
          </Box>
        </Box>
          <TextInput
            placeholder='Search by any field'
            icon={<IconSearch size={16} />}
            mb='md'
          />
          <Paper withBorder radius='md'>
            <Box sx={{display: 'grid', gridTemplateColumns: `repeat(${columns.length}, 1fr) 100px 18px`, padding: '.75rem 1.5rem', backgroundColor: '#F9FAFB', borderRadius: '8px 8px 0 0', gap: '1rem'}}>
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
                          gridTemplateColumns: `repeat(${columns.length}, 1fr) 100px 18px`, 
                          padding: '.75rem 1.5rem', 
                          borderBottom: `1px solid ${theme.colors.gray[2]}`,
                          alignItems: 'center',
                          gap: '1rem'
                        })}
                      >
                        <Text weight={600} size='md'>{row.brand}</Text>
                        <Text transform='capitalize' color='dimmed'>{checkOfferings(row)}</Text>
                        <Button variant='subtle' size='sm' onClick={(e) => {
                          e.preventDefault()
                          alert('hey')
                        }}>Edit</Button>
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