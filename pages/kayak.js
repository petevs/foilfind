import { Autocomplete, Box, Button, Container, Group, Select, Slider, Text, Checkbox, RangeSlider, SegmentedControl } from "@mantine/core"
import Image from "next/image"
import { BsStarFill } from "react-icons/bs"
import ProductKCard from "../components/cards/ProductKCard"
import { useState } from "react"
import SliderFilter from "../components/filters/SliderFilter"
import RangeSliderFilter from '../components/filters/RangeSliderFilter'
import CheckboxListFilter from "../components/filters/CheckboxListFilter"

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
              <SliderFilter
                label='Price'
                initialValues={{
                  min: 0,
                  max: 2230
                }}
                sliderPrefix='C$'
                sliderSuffix=''
              />
              <CheckboxListFilter
                label='Style'
                options={[
                  'Carving / Freeride',
                  'High Speed',
                  'High Aspect'
                ]}
              />
              <CheckboxListFilter
                label='Brands'
                options={[
                  'Armstrong',
                  'Cabringha',
                  'Slingshot',
                  'F-One'
                ]}
              />

              <Text weight={700} size='sm' mb='sm' mt='sm'>
                Rider Weight
              </Text>
              <Checkbox label="Under 70KG (150 LBS)" mt='sm' size='xs'/>
              <Checkbox label="70-90KG (150-200 LBS)"mt='sm' size='xs' />
              <Checkbox label="90KG+ (200 LBS+)" mt='sm'size='xs' />
              <Text weight={700} size='sm' mb='sm' mt='sm'>
                Rider Skill Level
              </Text>
              <Checkbox label="Rookie" mt='sm' size='xs'/>
              <Checkbox label="Intermediate"mt='sm' size='xs' />
              <Checkbox label="Advanced" mt='sm'size='xs' />
              <Checkbox label="Expert" mt='sm'size='xs' />
              <RangeSliderFilter
                label='Surface Area'
                initialValues={{
                  min: 950,
                  max: 2500
                }}
                sliderPrefix=''
                sliderSuffix='cm²'
              />
              <RangeSliderFilter
                label='Wing Span'
                initialValues={{
                  min: 670,
                  max: 1800
                }}
                sliderPrefix=''
                sliderSuffix='mm'
              />
              <Text weight={700} size='sm' mb='sm' mt='sm'>
                Construction Material
              </Text>
              <Checkbox label="Carbon" mt='sm' size='xs'/>
              <Checkbox label="Aluminum"mt='sm' size='xs' />
            </Box>
            <Box sx={{display: 'grid', gap: '1rem', alignContent: 'start'}}>
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