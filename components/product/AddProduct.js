import { TextInput, Select, Button, Text, Group, ActionIcon, Box } from "@mantine/core"
import { formList, useForm } from "@mantine/form"
import { randomId } from "@mantine/hooks"
import RichTextEditor from '../RichText'
import { Trash } from "tabler-icons-react"
import { toKebabCase } from "../../getPaths/getProductRoutes"
import { addProduct } from "../../firebaseHelpers/addProduct"

const AddProduct = () => {

    const form = useForm({
        initialValues: {
            title: '',
            brand: '',
            category: '',
            discipline: '',
            description: '',
            images: formList([{ url: '', key: randomId()}]),
            videoFields: formList([{ url: '', key: randomId()}]),
        }
    })


    const formStyle = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem'
    })


    const handleSubmit = async (values) => {
        // addProduct()
        const product = {
            ...values,
            images: values.images.map(image => image.url),
            brandVideos: values.videoFields.map(video => video.url),
            brandPath: toKebabCase(values.brand),
            path: toKebabCase(values.title),
            summary: 'Coming later',
        }
        await addProduct(product)
        console.log('done')
    }

    const videoFields = form.values.videoFields.map((item, index) => (
        <Group key={item.key} mt='xs'>
            <TextInput
                placeholder='Video URL'
                required
                sx={{ flex: 1 }}
                {...form.getListInputProps('videoFields', index, 'url')}
            />
            <ActionIcon
                color="red"
                variant="hover"
                onClick={() => form.removeListItem('videoFields', index)}
            >
                <Trash size={16} />
            </ActionIcon>
        </Group>
    ))

    const imageFields = form.values.images.map((item, index) => (
        <Group key={item.key} mt='xs'>
            <TextInput
                placeholder='Image URL'
                required
                sx={{ flex: 1 }}
                {...form.getListInputProps('images', index, 'url')}
            />
            <ActionIcon
                color="red"
                variant="hover"
                onClick={() => form.removeListItem('images', index)}
            >
                <Trash size={16} />
            </ActionIcon>
        </Group>
    ))

    return (
        <div>
        <h1>Add Product</h1>
        <Box component='form' sx={formStyle}  onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
                label="Product Name"
                required
                placeholder='Product Name'
                onChange={(e) => form.setFieldValue('title', e.currentTarget.value)}
                {...form.getInputProps('title')}
            />
            <Select
                label="Brand"
                placeholder='Select Brand'
                data={[
                    { value: 'Armstrong', label: 'Armstrong' },
                  ]}
                onChange={(e) => form.setFieldValue('brand', e.currentTarget.value)}
                {...form.getInputProps('brand')}
            />
            <Select
                label="Category"
                placeholder='Select Category'
                data={[
                    { value: 'hydrofoils', label: 'Hydrofoils' },
                    { value: 'wing', label: 'Wing' },
                    { value: 'wing board', label: 'Wing Board' },
                    { value: 'harnesses', label: 'Harnesses' },
                    { value: 'boarg bags', label: 'Board Bags' },
                    { value: 'leashes', label: 'Leashes' },
                    { value: 'accessories', label: 'Accessories' },
                    { value: 'wetsuits', label: 'Wetsuits' },
                ]}
                onChange={(e) => form.setFieldValue('category', e.currentTarget.value)}
                {...form.getInputProps('category')}
            />
            <Select
                label="Discipline"
                placeholder='Select Discipline'
                data={[
                    { value: 'wing', label: 'Wing' },
                ]}
                onChange={(e) => form.setFieldValue('discipline', e.currentTarget.value)}
                {...form.getInputProps('discipline')}
            />
            <Box>
                <Text size='sm' weight={500}>Description</Text>
                <RichTextEditor
                    controls={[
                    ['bold', 'italic', 'underline', 'link'],
                    ['unorderedList', 'h1', 'h2', 'h3'],
                    ['sup', 'sub'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ]}
                    {...form.getInputProps('description')}
                    onChange={(e) => form.setFieldValue('description', e)}
                />
            </Box>
            <Box>
                <Text size='sm' weight={500}>Images</Text>
                {imageFields}
                <Box>
                    <Button
                        onClick={() => form.addListItem('images', { url: '', key: randomId() })}
                        size='xs'
                        variant='default'
                        mt='sm'
                    >
                        Add Image
                    </Button>
                </Box>
            </Box>
            <Box>
                <Text size='sm' weight={500}>Videos</Text>
                {videoFields}
                <Box>
                    <Button
                        onClick={() => form.addListItem('videoFields', { url: '', key: randomId() })}
                        size='xs'
                        variant='default'
                        mt='sm'
                    >
                        Add Video
                    </Button>
                </Box>
            </Box>

            <Button sx={{justifySelf: 'end'}} type='submit' mt='lg' mb='xl'>Submit</Button>
        </Box>
        </div>
    )
}

export default AddProduct