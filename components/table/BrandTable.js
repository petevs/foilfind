import { Table, Box, createStyles, Container, Paper, Text, Checkbox, Divider, Button, Title, ActionIcon, Indicator, Modal, MultiSelect, TextInput } from "@mantine/core"
import { IconAdjustments, IconAdjustmentsHorizontal, IconChevronRight, IconFilter, IconPlus, IconSearch, IconX } from "@tabler/icons"
import Link from "next/link"
import { useState, useEffect } from "react"
import useCheckAdmin from "../../hooks/useCheckAdmin"


const BrandTable = ({brands}) => {

  const [opened, setOpened] = useState(false)
  const columns = ['brands', 'categories']
  const { isAdmin } = useCheckAdmin()

  const categories = ['foils', 'wings', 'boards']
  const createCategories = (brand) => {
    const brandCategories = []
    categories.forEach(category => {
      if (brand[category]) {
        brandCategories.push(category)
      }
    })
    return brandCategories
  }

  const [filteredBrands, setFilteredBrands] = useState(brands.map(brand => ({
    ...brand,
    categories: createCategories(brand)
  })))

  const initialFilters = {
    categories: [],
  }

  const [filters, setFilters] = useState(initialFilters)

  const [search, setSearch] = useState('')

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


  const [resultTotal, setResultTotal] = useState(filteredBrands.length)

  const numFilters = () => {
    let num = 0
    filters.categories.forEach(category => num++)
    return num
  }


  useEffect(() => {


    const filtered = brands.reduce((acc, brand) => {

      //if no filters then push brand and return acc
      if(filters.categories.length === 0 && search === '') {
        acc.push(brand)
        return acc
      }

      // if not all filter cateogires in brand categores skip
      if(!(filters.categories.every(category => brand[category]))) {
        return acc
      }

      //if search is not in brand name skip
      if(!brand.brand.toLowerCase().includes(search.toLowerCase())) {
        return acc
      }

      acc.push(brand)
      return acc

    }, []) 


    setFilteredBrands(filtered)

  }, [filters, brands, search])

  return (
    <>
      <Modal
        opened={opened}
        size='lg'
        onClose={() => setOpened(false)}
        withCloseButton={false}
        sx={{
          '& .mantine-Modal-modal': {
            padding: 0
          }
        }}
      >
          <Box>
            <Box sx={{display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center'}} py='md' px='lg'>
              <IconX onClick={() => setOpened(false)} size={16} />
              <Text weight={600} align='center'>Filters</Text>
            </Box>
            <Divider />
          </Box>
        <Box
          py='md'
          px='lg'
          sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gap: '1rem',
            height: '50vh',
            alignContent: 'start',
            overflowY: 'scroll'
          }}
        >
        <MultiSelect
          size='sm'
          label="Categories"
          placeholder="Filter by category"
          value={filters.categories}
          data={[
            { label: 'Foils', value: 'foils' },
            { label: 'Wings', value: 'wings' },
            { label: 'Boards', value: 'boards' },
          ]}
          onChange={(value) => setFilters({ ...filters, categories: value })}
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
        <Box py='md' px='lg' sx={{display: 'grid', gridTemplateColumns: 'auto auto', justifyContent: 'space-between', alignItems: 'center'}}>
          <Button size='sm' color='dark' variant='subtle' compact
            onClick={() => setFilters(initialFilters)}
          >Clear All</Button>
          <Button size='sm' color='dark'
            onClick={() => setOpened(false)}
          >Show {filteredBrands.length} Brands</Button>
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
          <Box sx={{display: 'grid', gridTemplateColumns: isAdmin ? 'auto auto' : 'auto', gap: '1rem'}}>
            {
              isAdmin && (
                <Button size='xs' color='dark' variant='subtle'>Add New</Button>
              )
            }
            <Indicator label={numFilters()} showZero size={22} color='dark' withBorder>
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
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          <Paper withBorder radius='md'>
            <Box sx={{
              display: 'grid', 
              gridTemplateColumns: isAdmin ? `repeat(${columns.length}, 1fr) 100px 18px` : `repeat(${columns.length}, 1fr) 18px`,
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
                filteredBrands.map((row, index) => (
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
                          gridTemplateColumns: isAdmin ? `repeat(${columns.length}, 1fr) 100px 18px` : `repeat(${columns.length}, 1fr) 18px`,
                          padding: '.75rem 1.5rem', 
                          borderBottom: `1px solid ${theme.colors.gray[2]}`,
                          alignItems: 'center',
                          gap: '1rem'
                        })}
                      >
                        <Text weight={600} size='md'>{row.brand}</Text>
                        <Text transform='capitalize' color='dimmed'>{checkOfferings(row)}</Text>
                        {
                          isAdmin &&
                          <Button variant='subtle' size='sm' onClick={(e) => {
                            e.preventDefault()
                            alert('hey')
                          }}>Edit</Button>
                        }
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