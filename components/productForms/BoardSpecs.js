import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { Box, Select, MultiSelect, Text, Button, Accordion, NumberInput, Divider } from "@mantine/core"
import { styles, riderWeights, riderSkillLevels, disciplines, constructionMaterials } from "../productForms/productSchemas"

const BoardSpecs = ({ productSpecs, setProductSpecs, onSave}) => {

  console.log(productSpecs)

  const numberInputs = [
    { label: 'Length (in)', value: 'length'},
    { label: 'Width (in)', value: 'width'},
    { label: 'Thickness (in)', value: 'thickness'},
    { label: 'Volume (litres)', value: 'volume'},
    { label: 'Weight (g)', value: 'weight'},
  ]

  const selectInputs = [
    { label: 'Rider Weight', value: 'riderWeight', data: riderWeights },
    { label: 'Rider Skill Level', value: 'riderSkillLevel', data: riderSkillLevels },
    { label: 'Disciplines', value: 'disciplines', data: disciplines },
  ]


  return (
    <>
    <Divider my='xl' />
    <SectionWrapper>
        <FormHeader title="Board Specs" />
        <FormWrapper 
          onSave={onSave}
        >
          <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
                      {
              selectInputs.map((input, index) => (
                <Select
                  key={input.label}
                  label={input.label}
                  placeholder={`Select ${input.label}`}
                  value={productSpecs[input.value]}
                  data={input.data}
                  onChange={(e) => setProductSpecs({...productSpecs, [input.value]: e})}
                  searchable
                />
              ))
            }
            <Divider sx={{margin: '.5rem -1.5rem'}}/>
            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem',
             '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' }
            }}
            >
              {
                numberInputs.map((input, index) => (
                  <NumberInput
                    key={input.label}
                    label={input.label}
                    value={productSpecs[input.value]}
                    onChange={(e) => setProductSpecs({...productSpecs, [input.value]: e})}
                    min={0}
                    precision={2}
                  />
                ))
              }
            </Box>
          </Box>
          </FormWrapper>
          </SectionWrapper>
    </>

  )
}

export default BoardSpecs