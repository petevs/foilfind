import SectionWrapper from '../editRetailer/SectionWrapper'
import FormHeader from '../editRetailer/FormHeader'
import FormWrapper from '../editRetailer/FormWrapper'
import { Container, Box } from '@mantine/core'

const ResourcesForm = () => {
  return (
    <Container size='xl' py='xl'>
        <SectionWrapper>
                <FormHeader 
                    title='Add New Retailer'
                />
            <FormWrapper>
                <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
                    yep
                </Box>
            </FormWrapper>
        </SectionWrapper>
    </Container>
  )
}

export default ResourcesForm