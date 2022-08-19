import { Anchor, Box, Button, Checkbox, Divider, Group, Spoiler, Text } from "@mantine/core"
import FilterLabel from "./FilterLabel"
import { useState } from "react";

const CheckboxListFilter = ({options, label}) => {

  const initialOptions = {}
  const initialUncheckedOptions = {}

  options.forEach(option => {
    initialOptions[option] = true
    initialUncheckedOptions[option] = false
  })

  const [values, setValues] = useState(initialOptions);

  const selectorStyle = (theme) => ({
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'start',
    gap: '.5rem',
    alignItems: 'baseline',
  })

  const clearAll = () => {
    setValues(initialUncheckedOptions)
  }

  const selectAll = () => {
    setValues(initialOptions)
  }

  const spoilerStyle = (theme) => ({
    '& .mantine-Spoiler-control': {
      fontSize: '.75rem',
      paddingTop: '1rem'
    }
  })

  return (
    <Box my='md'>
      <Spoiler maxHeight={160} showLabel={`Show More ${label}`} hideLabel='Show Less' sx={spoilerStyle}>
      <FilterLabel text={label} />
      {
        options.length > 3 &&
        <Box sx={selectorStyle} my='xs'>
          <Anchor size='xs' onClick={() => selectAll()}>Select All</Anchor>
          <Text color='gray' size='xs'>|</Text>
          <Anchor size='xs' onClick={() => clearAll()}>Clear All</Anchor>
        </Box>
      }
      {
        options.map((option, idx) => (
          <Checkbox
            key={idx}
            label={option}
            checked={values[option]}
            onChange={(e) => setValues({...values, [option]: e.currentTarget.checked})}
            size='xs'
            mb='sm'
          />
        ))
      }
      </Spoiler>
    </Box>
  )
}

export default CheckboxListFilter