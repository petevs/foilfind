import { Slider, Text } from "@mantine/core";
import FilterLabel from "./FilterLabel";
import { useState } from "react";
import { GripVertical } from 'tabler-icons-react';

const SliderFilter = ({initialValues, label, sliderPrefix, sliderSuffix}) => {

  const [value, setValue] = useState(initialValues.max);

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
    <>
      <FilterLabel text={label} />
      <Text size='xs' color='dimmed' mb='xs'>
        {
          `${sliderPrefix}${initialValues.min}${sliderSuffix} - ${sliderPrefix}${value}${sliderSuffix}`
        }
      </Text>
      <Slider 
        size='sm'
        value={value}
        onChange={setValue}
        max={initialValues.max}
        styles={sliderStyle}
        thumbChildren={<GripVertical />}
      />
    </>
  )


}

export default SliderFilter