import { Autocomplete, Box, Button, Container, Group, Select, Slider, Text, Checkbox } from "@mantine/core"
import Image from "next/image"
import { BsStarFill } from "react-icons/bs"
import ProductKCard from "../components/cards/ProductKCard"
import { useState } from "react"

const Kayak = () => {

  const [value, setValue] = useState('')

  const data =
    value.trim().length > 0 && !value.includes('@')
      ? ['hs1850', 'hs1550']
      : [];



  return (
    <>
      <Box
        sx={{
          height: '200px',
          borderBottom: '1px solid #e9ecef',
        }}
      >
        <Container size='xl'>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr 300px'
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                height: '200px',
                alignContent: 'end',
                padding: '1rem',
                gap: '1rem',
                gridColumn: '1 / 3'
              }}
            >
              <Select
                placeholder="Category"
                data={[
                  { value: 'wing', label: 'Wings' },
                  { value: 'foil', label: 'Foils' },
                  { value: 'board', label: 'Boards' },
                ]}
              />
              <Autocomplete
                value={value}
                onChange={setValue}
                placeholder="Product"
                data={data}
              />
              <Select
                placeholder="Location"
                data={[
                  { value: 'canada', label: 'Canada' },
                  { value: 'usa', label: 'United States' },

                ]}
              />
            </Box>
          </Box>
        </Container>
      </Box>
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
              <Text weight={700} size='sm' mb='sm'>
                Price
              </Text>
              <Slider
                label={(value) => `$${value}`}
                marks={[
                  { value: 1000, label: '$100' },
                ]}
              />
              <Text weight={700} size='sm' mb='sm' mt='sm'>
                Brands
              </Text>
              <Checkbox label="Armstrong" />
              <Checkbox label="Cabrinha" />
              <Checkbox label="Slingshot" />
              <Checkbox label="F-One" />
            </Box>
            <Box sx={{display: 'grid', gap: '1rem'}}>
              <ProductKCard />
              <ProductKCard />
              <ProductKCard />
              <ProductKCard />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )

}

export default Kayak