import { Box, Checkbox, Text, Divider } from "@mantine/core"
import RangeSliderFilter from "../RangeSliderFilter"

const CategoryFilters = ({ filters, setFilters }) => {

  const handleFilterChange = (e, key) => {

    setFilters({
      ...filters,
      [key]: {
        ...filters[key],
        [e.target.name]: e.currentTarget.checked
      }
    })
    
  }

  const handlePriceChange = (e) => {
    setFilters({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        current: [e[0], e[1]]
      }
    })
  }

  const handleWeightLabels = (weight) => {
    if(weight === 'heavy'){
      return '90 KG+'
    }
    if(weight === 'light'){
      return '< 70 KG'
    }
    if(weight === 'medium'){
      return '70 KG - 90 KG'
    }
  }

  return (
    <Box>
      <Text weight={700} size='sm' mb='xs'>Availability</Text>
      <Text weight={700} size='sm' mb='xs'>Condition</Text>
      <Text weight={700} size='sm' mb='xs'>Sport</Text>
      <Text weight={700} size='sm' mb='xs'>Style</Text>
      {/* {
        Object.keys(filters.style).map(style => (
          <Checkbox
            key={style}
            name={style}
            label={style}
            onChange={(e) => handleFilterChange(e, 'style')}
            checked={filters.style[style]}
            size='xs'
            mb='sm'
          />
        ))
      } */}
      <Divider mt='lg' mb='md' />
      <Text weight={700} size='sm' mb='xs'>Brands</Text>
      {/* {
        Object.keys(filters.brands).map(brand => (
          <Checkbox
            key={brand}
            name={brand}
            label={brand}
            onChange={(e) => handleFilterChange(e, 'brands')}
            checked={filters.brands[brand]}
            size='xs'
            mb='sm'
          />
        ))
      } */}
      <Divider mt='xl' />
      {/* <RangeSliderFilter
        min={filters.priceRange.min}
        max={filters.priceRange.max}
        handleChange={handlePriceChange}
        value={filters.priceRange.current}
        label='Price'
        sliderPrefix='$'
        sliderSuffix=''
      /> */}
      <Divider my='xl' />
      <Text weight={700} size='sm' mb='xs'>Rider Weight</Text>
      {/* {
        Object.keys(filters.riderWeight).map(weight => (
          <Checkbox
            key={weight}
            name={weight}
            label={handleWeightLabels(weight)}
            onChange={(e) => handleFilterChange(e, 'riderWeight')}
            checked={filters.riderWeight[weight]}
            size='xs'
            mb='sm'
            sx={{textTransform: 'capitalize'}}
          />
        ))
      } */}
      <Text weight={700} size='sm' mb='xs'>Rider Skill Level</Text>
      {/* {
        Object.keys(filters.skillLevel).map(skill => (
          <Checkbox
            key={skill}
            name={skill}
            label={skill}
            onChange={(e) => handleFilterChange(e, 'skillLevel')}
            checked={filters.skillLevel[skill]}
            size='xs'
            mb='sm'
            sx={{textTransform: 'capitalize'}}
          />
        ))
      } */}
      <Divider my='xl' />
      <Text weight={700} size='sm' mb='xs'>Release Year</Text>
      <Text weight={700} size='sm' mb='xs'>Construction Material</Text>
      <Text weight={700} size='sm' mb='xs'>Wing Span</Text>
      <Text weight={700} size='sm' mb='xs'>Weight</Text>
    </Box>
  )
}

export default CategoryFilters