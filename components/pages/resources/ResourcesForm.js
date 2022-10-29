import SectionWrapper from '../editRetailer/SectionWrapper'
import FormHeader from '../editRetailer/FormHeader'
import FormWrapper from '../editRetailer/FormWrapper'
import { Container, Box, TextInput, Select } from '@mantine/core'
import { useState } from 'react'

const ResourcesForm = () => {

    const [resource, setResource] = useState({
        title: '',
        description: '',
        link: '',
        type: '',
        tags: [],
        image: '',
    })

    const typesOfResources = [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Website', value: 'website' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'Other', value: 'other' },
    ]

  return (
    <Container size='xl' py='xl'>
        <SectionWrapper>
                <FormHeader 
                    title='Add New Resource'
                />
            <FormWrapper>
                <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
                    <TextInput
                        label="Title"
                        placeholder="Enter title"
                        value={resource.title}
                        onChange={(e) => setResource({...resource, title: e.currentTarget.value})}
                    />
                    <TextInput
                        label="Description"
                        placeholder="Enter description"
                        value={resource.description}
                        onChange={(e) => setResource({...resource, description: e.currentTarget.value})}
                    />
                    <TextInput
                        label="Link"
                        placeholder="Enter link"
                        value={resource.link}
                        onChange={(e) => setResource({...resource, link: e.currentTarget.value})}
                    />
                    <Select
                        label="Type"
                        placeholder="Select type"
                        value={resource.type}
                        data={typesOfResources}
                        onChange={(e) => setResource({...resource, type: e})}
                        searchable
                    />
                    <TextInput
                        label="Tags"
                        placeholder="Enter tags"
                        value={resource.tags}
                        onChange={(e) => setResource({...resource, tags: e.currentTarget.value})}
                    />
                </Box>
            </FormWrapper>
        </SectionWrapper>
    </Container>
  )
}

export default ResourcesForm