import { Box, RangeSlider, Text } from "@mantine/core";
import FilterLabel from "./FilterLabel";
import { useState } from "react";
import { GripVertical } from 'tabler-icons-react';

const RangeSliderFilter = ({initialValues, label, sliderPrefix, sliderSuffix}) => {

  const [value, setValue] = useState([initialValues.min, initialValues.max]);

  const sliderStyle = (theme) => ({
    thumb: { 
      width: 14,
      height: 18,
      backgroundColor: theme.white,
      color: theme.colors.gray[5],
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[3]
      }`,
    } 
  });

  return (
    <Box my='md'>
      <FilterLabel text={label} />
      <Text size='xs' color='dimmed' mb='xs'>
        {
          `${sliderPrefix}${value[0]}${sliderSuffix} - ${sliderPrefix}${value[1]}${sliderSuffix}`
        }
      </Text>
      <RangeSlider 
        size='sm'
        value={value}
        onChange={setValue}
        min={initialValues.min}
        max={initialValues.max}
        styles={sliderStyle}
        thumbChildren={<GripVertical />}
        label={null}
      />
    </Box>
  )


}

export default RangeSliderFilter