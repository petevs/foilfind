import { Container, Text, AspectRatio, Box } from "@mantine/core"
import BasicShell from "../../../components/shells/BasicShell"
import { getCollectionWhere, getDocument } from '../../../helpers/firebaseHelpers'

export async function getServerSideProps(context) {

    const resourceDoc = await getCollectionWhere('resources', 'path', '==', context.params.resource)
    const resource = resourceDoc[0]
    
    return {
        props: {
            resource: resource
        }
    }
}

export default function ResourcePage(props) {

    const { resource } = props

    const getIDFromYoutubeURL = (url) => {
        const id = url.split('v=')[1]
        const ampersandPosition = id.indexOf('&')
        if(ampersandPosition != -1) {
            return id.substring(0, ampersandPosition)
        }
        return id
    }


    return (
        <BasicShell>
            <Container size='lg' p='lg'>
                <h1>{resource.title}</h1>
                <Text>{resource.description}</Text>
                {
                    resource.type === 'youtube' &&
                    <Box py='xl'>
                        <AspectRatio ratio={16 / 9}>
                            <iframe width="560" height="315" 
                            src={`https://www.youtube.com/embed/${getIDFromYoutubeURL(resource.link)}`} 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            >
                            </iframe>
                        </AspectRatio>
                    </Box>

                }
            </Container>
        </BasicShell>
    )
}
