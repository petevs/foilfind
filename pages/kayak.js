import { Autocomplete, Box, Button, Container, Group, Select, Slider, Text, Checkbox, RangeSlider, SegmentedControl, Divider, Switch, ActionIcon, Tooltip } from "@mantine/core"
import Image from "next/image"
import { BsStarFill } from "react-icons/bs"
import ProductKCard from "../components/cards/ProductKCard"
import { useState } from "react"
import SliderFilter from "../components/filters/SliderFilter"
import RangeSliderFilter from '../components/filters/RangeSliderFilter'
import CheckboxListFilter from "../components/filters/CheckboxListFilter"
import TempHeader from "../components/header/TempHeader"
import { Beach, ChevronDown, Dice5, MapPin, Scribble } from "tabler-icons-react"
import CategoryPicker from "../components/filters/CategoryPicker"

const Kayak = () => {

  const [value, setValue] = useState('')

  const data =
    value.trim().length > 0 && !value.includes('@')
      ? ['Canada', 'United States', 'United Kingdom', 'Australia', 'New Zealand']
      : [];



  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr'
        }}
      >
        <Box>
          <TempHeader />
          <Box>
            <Container size='xl' py='xs'>
              <Box sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                gap: '1rem',
                justifyContent: 'start'
              }}
              >
                <Text weight={600} size='sm' transform='uppercase'>Gear</Text>
                <Text weight={600} size='sm' transform='uppercase'>Brands</Text>
                <Text weight={600} size='sm' transform='uppercase'>Shops</Text>
                <Text weight={600} size='sm' transform='uppercase'>Lessons</Text>
                <Text weight={600} size='sm' transform='uppercase'>Rentals</Text>
                <Text weight={600} size='sm' transform='uppercase'>Stays</Text>
                <Text weight={600} size='sm' transform='uppercase'>Spots</Text>
                <Text weight={600} size='sm' transform='uppercase'>Learn</Text>
              </Box>
            </Container>
            <Divider />
          </Box>
          <Box
            sx={{
              // height: '200px',
              backgroundColor: '#F0F3F5',
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
                    // height: '200px',
                    alignContent: 'end',
                    gap: '1rem',
                    gridColumn: '1 / 3',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  py='xl'
                >
                  <Select
                    // label='Category'
                    defaultValue={'foil-kits'}
                    data={[
                      { value: 'foil-kits', label: 'Foil Kits'},
                      { value: 'wing', label: 'Wings'},
                      { value: 'board', label: 'Boards'},
                      { value: 'foil', label: 'Foils'},
                      { value: 'masts', label: 'Masts'},
                    ]}
                    searchable={true}
                    sx={{
                      '& :hover': {
                        cursor: 'pointer'
                      }
                    }}
                  />
                  <Text size='xs' color='dimmed'>
                    Gear / Foil-Kits
                  </Text>
                </Box>
              </Box>
              <Text sx={{fontSize: '1.8rem'}} weight={600}>Find Foil-Kits shipping to Canada</Text>
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
                  <CheckboxListFilter
                    label='Availability'
                    options={[
                      'Online (ship-to-me)',
                      'Locally (pick-up)',
                    ]}
                  />
                  <CheckboxListFilter
                    label='Condition'
                    options={[
                      'New',
                      'Used',
                    ]}
                  />
                  <Divider mt='xl' mb='md' />
                  <RangeSliderFilter
                    label='Price'
                    initialValues={{
                      min: 0,
                      max: 2230
                    }}
                    sliderPrefix='C$'
                    sliderSuffix=''
                  />
                  <Divider mt='xl' />
                  <CheckboxListFilter
                    label='Style'
                    options={[
                      'Carving / Freeride',
                      'High Speed',
                      'High Aspect'
                    ]}
                  />
                  <Divider mt='xl' />
                  <CheckboxListFilter
                    label='Brands'
                    options={[
                      'Armstrong',
                      'Cabrinha',
                      'Slingshot',
                      'F-One',
                    ]}
                  />
                  <Divider mt='xl' />
                  <CheckboxListFilter
                    label='Rider Weight'
                    options={[
                      "Under 70KG (150 LBS)",
                      "70-90KG (150-200 LBS)",
                      "90KG+ (200 LBS+)",
                    ]}
                  />
                  <CheckboxListFilter
                    label='Rider Skill'
                    options={[
                      "Rookie",
                      "Intermediate",
                      "Advanced",
                      "Expert",
                    ]}
                  />
                  <Divider mt='xl' />
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
                  <CheckboxListFilter
                    label='Construction Material'
                    options={[
                      "Carbon",
                      "Alumnimum",
                    ]}
                  />
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
        </Box>
      </Box>
    </>
  )

}

export default Kayak