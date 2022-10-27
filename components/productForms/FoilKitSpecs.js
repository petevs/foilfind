import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { Box, Select, MultiSelect, Text, Button, Accordion, NumberInput, Divider } from "@mantine/core"
import { styles, riderWeights, riderSkillLevels, disciplines, constructionMaterials, initialFoilKitSpecs } from "../productForms/productSchemas"


const FoilKitSpecs = ({ productSpecs, setProductSpecs, onSave}) => {



  return (
    <>
    <Divider my='xl' />
    <SectionWrapper>
        <FormHeader title="Foil Kit Specs" />
        <FormWrapper 
          onSave={onSave}
        >
          <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
          <Select
            label="Style"
            placeholder="Select style"
            value={productSpecs.style}
            data={styles}
            onChange={(e) => setProductSpecs({...productSpecs, style: e})}
            searchable
            required
          />
          <MultiSelect
            label="Rider Weight"
            placeholder="Select rider weight"
            value={productSpecs.riderWeight}
            data={riderWeights}
            onChange={(e) => setProductSpecs({...productSpecs, riderWeight: e})}
            searchable
            required
          />
          <MultiSelect
            label="Rider Skill Level"
            placeholder="Select rider skill level"
            value={productSpecs.riderSkillLevel}
            data={riderSkillLevels}
            onChange={(e) => setProductSpecs({...productSpecs, riderSkillLevel: e})}
            searchable
            required
          />
          <MultiSelect
            label="Disciplines"
            placeholder="Select disciplines"
            value={productSpecs.disciplines}
            data={disciplines}
            onChange={(e) => setProductSpecs({...productSpecs, disciplines: e})}
            searchable
            required
          />
          <Select
            label="Construction Material"
            placeholder="Select construction material"
            value={productSpecs.constructionMaterial}
            data={constructionMaterials}
            onChange={(e) => setProductSpecs({...productSpecs, constructionMaterial: e})}
            searchable
          />
          </Box>
          </FormWrapper>
          </SectionWrapper>

          <Divider my='xl' />

          <SectionWrapper>
            <FormHeader title="Measurements" />
            <FormWrapper 
              onSave={onSave}
            >

          <Accordion sx={(theme) => ({
            margin: '0 -1.5rem', 
            '& .mantine-Accordion-label': {fontWeight: 500, fontSize: theme.fontSizes.md, textTransform: 'uppercase'},
            '& .mantine-Accordion-control': { 
              padding: '1rem 1.5rem .5rem 1.5rem'
            }, 
            '& .mantine-Accordion-panel': { 
              padding: '0 .5rem .5rem .5rem'
            }
            })}
            >

            <Accordion.Item value='Front Wing Specs'>
              <Accordion.Control>Front Wing Specs</Accordion.Control>
              <Accordion.Panel>
                <NumberInput
                  label="Front Wing Area (cm²)"
                  placeholder="Enter front wing area"
                  value={productSpecs.frontWing.areaCM}
                  onChange={(e) => {setProductSpecs({...productSpecs, frontWing: {...productSpecs.frontWing, areaCM: e}})}}
                  min={0}
                />
                <NumberInput
                  label="Front Wing Weight (g)"
                  placeholder="Enter front wing weight"
                  value={productSpecs.frontWing.weightGrams}
                  onChange={(e) => setProductSpecs({...productSpecs, frontWing: {...productSpecs.frontWing, weightGrams: e}})}
                  min={0}
                />
                <NumberInput
                  label="Front Wing Wing Span (mm)"
                  placeholder="Enter front wing wing span"
                  value={productSpecs.frontWing.wingSpanMillimeters}
                  onChange={(e) => setProductSpecs({...productSpecs, frontWing: {...productSpecs.frontWing, wingSpanMillimeters: e}})}
                  min={0}
                />
              </Accordion.Panel>
            </Accordion.Item>
        
            <Accordion.Item value='Tail Wing Specs'>
              <Accordion.Control>Tail Wing Specs</Accordion.Control>
              <Accordion.Panel>
                <NumberInput
                  label="Tail Wing Area (cm²)"
                  placeholder="Enter tail wing area"
                  value={productSpecs.tailWing.areaCM}
                  onChange={(e) => setProductSpecs({...productSpecs, tailWing: {...productSpecs.tailWing, areaCM: e}})}
                  min={0}
                />

                <NumberInput
                  label="Tail Wing Weight (g)"
                  placeholder="Enter tail wing weight"
                  value={productSpecs.tailWing.weightGrams}
                  onChange={(e) => setProductSpecs({...productSpecs, tailWing: {...productSpecs.tailWing, weightGrams: e}})}
                  min={0}
                />

                <NumberInput
                  label="Tail Wing Wing Span (mm)"
                  placeholder="Enter tail wing wing span"
                  value={productSpecs.tailWing.wingSpanMillimeters}
                  onChange={(e) => setProductSpecs({...productSpecs, tailWing: {...productSpecs.tailWing, wingSpanMillimeters: e}})}
                  min={0}
                />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value='Fueselage Specs'>
              <Accordion.Control>Fueselage Specs</Accordion.Control>
              <Accordion.Panel>
                <NumberInput
                  label="Fuselage Length (cm)"
                  placeholder="Enter fuselage length"
                  value={productSpecs.fuselage.lengthCM}
                  onChange={(e) => setProductSpecs({...productSpecs, fuselage: {...productSpecs.fuselage, lengthCM: e}})}
                  min={0}
                />

                <NumberInput
                  label="Fuselage Weight (g)"
                  placeholder='Enter fuselage weight'
                  value={productSpecs.fuselage.weightGrams}
                  onChange={(e) => setProductSpecs({...productSpecs, fuselage: {...productSpecs.fuselage, weightGrams: e}})}
                  min={0}
                />
              </Accordion.Panel>
            </Accordion.Item>




            <Accordion.Item value='Mast Specs'>
              <Accordion.Control>Mast Specs</Accordion.Control>
              <Accordion.Panel>
                <NumberInput
                  label="Mast Length (cm)"
                  placeholder='Enter mast length'
                  value={productSpecs.mast.lengthCM}
                  onChange={(e) => setProductSpecs({...productSpecs, mast: {...productSpecs.mast, lengthCM: e}})}
                  min={0}
                />

                <NumberInput
                  label="Mast Weight (g)"
                  placeholder='Enter mast weight'
                  value={productSpecs.mast.weightGrams}
                  onChange={(e) => setProductSpecs({...productSpecs, mast: {...productSpecs.mast, weightGrams: e}})}
                  min={0}
                />
              </Accordion.Panel>
            </Accordion.Item>


          </Accordion>


        </FormWrapper>
      </SectionWrapper>
    </>

  )
}

export default FoilKitSpecs