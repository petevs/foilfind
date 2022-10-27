import RichTextEditor from '../RichText'
import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"

const BrandDescription = ({onSave}) => {
  return (
    <>
            <SectionWrapper>
          <FormHeader title="Description from Brand" />
          <FormWrapper 
            onSave={onSave}
          >

    <RichTextEditor id='rte' />
          </FormWrapper>
      </SectionWrapper>
    </>
  )
}

export default BrandDescription