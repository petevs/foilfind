import { Box, RangeSlider, Text } from "@mantine/core";
import { IconGripVertical } from '@tabler/icons';

const RangeSliderFilter = ({min, max, handleChange, value, label, sliderPrefix, sliderSuffix}) => {

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
      <Text weight={700} size='sm' mb='xs'>{label}</Text>
      <Text size='xs' color='dimmed' mb='xs'>
        {
          `${sliderPrefix}${value[0]}${sliderSuffix} - ${sliderPrefix}${value[1]}${sliderSuffix}`
        }
      </Text>
      <RangeSlider 
        size='sm'
        value={value}
        onChange={(e) => handleChange(e)}
        min={min}
        max={max}
        styles={sliderStyle}
        thumbChildren={<IconGripVertical />}
        label={null}
      />
    </Box>
  )


}

export default RangeSliderFilter