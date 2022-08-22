import { Box, Container, Checkbox } from "@mantine/core"
import ProductKCard from "../cards/ProductKCard"
import FoilFilters from "../filters/FoilFilters"
import { useEffect, useState } from "react"
import { testGear } from "./testGear"
import FilterLabel from "../filters/FilterLabel"
import { reduceFilter } from "../../helpers/reduceFilter"



const Gear = ({initialGear}) => {

  const [gear, setGear] = useState(initialGear)

  const [filters, setFilters] = useState({
    style: {
      'High Speed': true,
      'High Aspect': true,
      'Carving / Freeride': true
    },
    brands: {}
  })

  useEffect(() => {
    setGear(initialGear)
    setFilters({
      ...filters,
      brands: getAvailableOptions(initialGear, 'brand')
    })
  },[initialGear])

  const getAvailableOptions = (arr, key) => {
    const options = {}
    arr.forEach(item => {
      if (!options[item[key]] && item[key]) {
        options[item[key]] = true
      }
    })
    return options
  }

  const brands = Object.keys(getAvailableOptions(initialGear, 'brand'))

  useEffect(() => {
    setGear(reduceFilter(initialGear, filters))

  },[filters])

  console.log(filters)

  return (
    <>
      <Box
            sx={{
              backgroundColor: '#F0F3F5',
              minHeight: 'calc(100vh - 200px)',
            }}
          >
            <Container size='xl' p='xl'>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: '220px 1fr 300px',
                gap: '2rem'
              }}>
                <Box>
                  {/* <FoilFilters /> */}
                  <FilterLabel text='Style' />
                  <Checkbox
                    label={'High Speed'}
                    checked={filters.style['High Speed']}
                    onChange={(e) => setFilters({
                      ...filters, 
                      style: {
                        ...filters.style,
                        'High Speed': e.currentTarget.checked
                      }
                    })}
                    size='xs'
                    mb='sm'
                  />
                  <Checkbox
                    label={'High Aspect'}
                    checked={filters.style['High Aspect']}
                    onChange={(e) => setFilters({
                      ...filters, 
                      style: {
                        ...filters.style,
                        'High Aspect': e.currentTarget.checked
                      }
                    })}
                    size='xs'
                    mb='sm'
                  />
                  <Checkbox
                    label={'Carving / Freeride'}
                    checked={filters.style['Carving / Freeride']}
                    onChange={(e) => setFilters({
                      ...filters, 
                      style: {
                        ...filters.style,
                        'Carving / Freeride': e.currentTarget.checked
                      }
                    })}
                    size='xs'
                    mb='sm'
                  />
                  {
                    filters.brands &&
                    <>
                    
                    <FilterLabel text='Brands' />
                    {
                      Object.keys(filters.brands).map((brand, idx) => (
                        <Checkbox
                          key={idx}
                          label={brand}
                          checked={filters.brands[brand]}
                          onChange={(e) => setFilters({
                            ...filters,
                            brands: {
                              ...filters.brands,
                              [brand]: e.currentTarget.checked
                            }
                          })}
                          size='xs'
                          mb='sm'
                        />
                      ))
                    }
                    </>
                  }
                </Box>
                <Box sx={{display: 'grid', gap: '1rem', alignContent: 'start'}}>
                  <ProductKCard />
                  {
                    gear.map(product => (
                      <h1>{product.productName}</h1>
                    ))
                  }
                </Box>
              </Box>
            </Container>
          </Box>

    </>
  )
}

export default Gear