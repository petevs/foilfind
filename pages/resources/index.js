import { Container, Box, Title, TextInput } from '@mantine/core';
import BasicShell from '../../components/shells/BasicShell';
import ResourceCard from '../../components/productListing/ResourceCard';
import { getCollection } from '../../helpers/firebaseHelpers';
import { IconSearch } from '@tabler/icons';


//get static props
export async function getStaticProps() {
    const resources = await getCollection('resources')
    return {
        props: {
            resources: resources
        }
    }
}

export default function ResourcesPage(props) {

    const { resources } = props

    return (
        <BasicShell>
            <Container size='lg' py='xl'>
                <Title order={1}>Resources</Title>
                <TextInput
                    placeholder='Search for a resource'
                    radius='md'
                    shadow='sm'
                    mt='md'
                    mb='xl'
                    icon={<IconSearch size={16} />}
                />
                <Box
                    sx={(theme) => ({
                        display: 'grid',
                        gridAutoFlow: 'row',
                        gap: '1rem'
                    })}
                >
                    {
                        resources.map((resource, index) => {
                            return (
                                <ResourceCard key={index} type={resource.type} title={resource.title} description={resource.description} path={resource.path} />
                            )
                        })
                    }
                </Box>

            </Container>
        </BasicShell>
    )
}

