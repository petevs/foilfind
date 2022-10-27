import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { Divider, TextInput, Button, Box, NumberInput, Textarea } from "@mantine/core"

const ProductIncludedForm = ({included, setIncluded, onSave}) => {
  return (
    <>
      <Divider my='xl' />
      <SectionWrapper>
          <FormHeader title="What's Included" />
          <FormWrapper 
            onSave={onSave}
          >
              <Textarea
                label="Included"
                placeholder="Enter included"
                value={included}
                onChange={(e) => setIncluded(e.currentTarget.value)}
                autosize
              />
          </FormWrapper>
      </SectionWrapper>
    </>
  )
}

export default ProductIncludedForm