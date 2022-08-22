import { Autocomplete, Box, Button, Container, Group, Select, Slider, Text, Checkbox, RangeSlider, SegmentedControl, Divider, Switch, ActionIcon, Tooltip } from "@mantine/core"
import Image from "next/image"
import { BsStarFill } from "react-icons/bs"
import ProductKCard from "../components/cards/ProductKCard"
import { useEffect, useState } from "react"
import SliderFilter from "../components/filters/SliderFilter"
import RangeSliderFilter from '../components/filters/RangeSliderFilter'
import CheckboxListFilter from "../components/filters/CheckboxListFilter"
import TempHeader from "../components/header/TempHeader"
import { getCollection } from "../getProps/getCollection"
import SecondaryTempHeader from "../components/header/SecondaryTempHeader"
import Gear from "../components/gear/Gear"

const Kayak = () => {

  const [value, setValue] = useState('')
  const [gear, setGear] = useState([])

  const data =
    value.trim().length > 0 && !value.includes('@')
      ? ['Canada', 'United States', 'United Kingdom', 'Australia', 'New Zealand']
      : [];


  useEffect(() => {

    const fetchData = async () => {
      const products = await getCollection('foils')
      console.log(products)
      setGear(products)
    }

    fetchData()

  } , [value])


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
          <SecondaryTempHeader />
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
          <Gear 
            initialGear={gear}
          />
        </Box>
      </Box>
    </>
  )

}

export default Kayak