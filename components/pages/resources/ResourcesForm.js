import SectionWrapper from '../editRetailer/SectionWrapper'
import FormHeader from '../editRetailer/FormHeader'
import FormWrapper from '../editRetailer/FormWrapper'
import { Container, Box, TextInput, Select, MultiSelect } from '@mantine/core'
import { useState, useEffect } from 'react'
import { createDocument, getCollection } from '../../../helpers/firebaseHelpers'
import { useRouter } from 'next/router'

const ResourcesForm = (props) => {
 
    const productList = props.products.map(product => {
        return {
            label: product.name,
            value: product.id
        }
    })

    const retailerList = props.retailers.map(retailer => {
        return {
            label: retailer.name,
            value: retailer.id
        }
    })

    const router = useRouter()

    const [resource, setResource] = useState({
        title: '',
        description: '',
        link: '',
        type: '',
        tags: [],
        image: '',
        relatedProducts: [],
        relatedRetailers: []
    })

    const typesOfResources = [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Website', value: 'website' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'Other', value: 'other' },
    ]

    const updateResource = async () => {
        await createDocument('resources', resource.title, resource)
        router.reload(window.location.pathname)
    }

  return (
    <Container size='xl' py='xl'>
        <SectionWrapper>
                <FormHeader 
                    title='Add New Resource'
                />
            <FormWrapper
                onSave={updateResource}
            >
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
                    <MultiSelect
                        label='Related Products'
                        placeholder='Select related products'
                        value={resource.relatedProducts}
                        data={productList}
                        onChange={(e) => setResource({...resource, relatedProducts: e})}
                        searchable
                    />
                    <MultiSelect
                        label='Related Retailers'
                        placeholder='Select related retailers'
                        value={resource.relatedRetailers}
                        data={retailerList}
                        onChange={(e) => setResource({...resource, relatedRetailers: e})}
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