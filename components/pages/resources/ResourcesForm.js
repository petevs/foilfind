import SectionWrapper from '../editRetailer/SectionWrapper'
import FormHeader from '../editRetailer/FormHeader'
import FormWrapper from '../editRetailer/FormWrapper'
import { Container, Box, TextInput, Select, MultiSelect, Textarea } from '@mantine/core'
import { useState, useEffect } from 'react'
import { createDocument, getCollection, getDocument } from '../../../helpers/firebaseHelpers'
import { useRouter } from 'next/router'
import RichTextEditor from '../../RichText'

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

    const createPathFromTitle = (title) => {
        return title.toLowerCase().replace(/ /g, '-')
    }

    const [resource, setResource] = useState({
        id: props.resource?.id || '',
        title: props.resource?.title ||'',
        shortDescription: props.resource?.shortDescription || '',
        description: props.resource?.description || '',
        content: '',
        link: props.resource?.link || '',
        type: props.resource?.type || '',
        tags: props.resource?.tags || [],
        image: props.resource?.image || '',
        thumbnail: props.resource?.thumbnail || '',
        relatedProducts: props.resource?.relatedProducts || [],
        relatedRetailers: props.resource?.relatedRetailers || [],
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

        await createDocument('resources', (resource.id ? resource.id : resource.title), {
            ...resource,
            path: createPathFromTitle(resource.title)
        })
        router.reload(window.location.pathname)
    }
    
  return (
    <Container size='xl' py='xl'>
        <SectionWrapper>
                <FormHeader 
                    title={props.resource ? 'Edit Resource' : 'Add Resource'}
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
                    <Textarea
                        label="Short Description"
                        placeholder="Enter short description"
                        value={resource.shortDescription}
                        onChange={(e) => setResource({...resource, shortDescription: e.currentTarget.value})}
                        autosize
                    />
                    <RichTextEditor
                        label="Description"
                        placeholder="Enter description"
                        value={resource.description}
                        onChange={(e) => setResource({...resource, description: e})}
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