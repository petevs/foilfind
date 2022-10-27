import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { Box, Select, MultiSelect, Text, Button, Accordion, NumberInput, Divider } from "@mantine/core"
import { styles, riderWeights, riderSkillLevels, disciplines, constructionMaterials } from "../productForms/productSchemas"

const WingSpecs = ({ productSpecs, setProductSpecs, onSave}) => {

  const numberInputs = [
    { label: 'Size (m)', value: 'size'},
    { label: 'Weight (g)', value: 'weight'},
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

export default WingSpecs