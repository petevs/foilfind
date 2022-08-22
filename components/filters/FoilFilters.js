
import CheckboxListFilter from './CheckboxListFilter';
import RangeSliderFilter from './RangeSliderFilter';
import { Divider } from '@mantine/core'


const FoilFilters = () => {

  return (
    <>
       {/* <CheckboxListFilter
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
        <Divider mt='xl' /> */}
        <CheckboxListFilter
          label='Style'
          options={[
            'Carving / Freeride',
            'High Speed',
            'High Aspect'
          ]}
        />
        {/* <Divider mt='xl' />
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
        /> */}
    </>
  )
  }


export default FoilFilters;