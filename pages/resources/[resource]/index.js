import { Container } from "@mantine/core"
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

    return (
        <BasicShell>
            <Container size='lg'>
                <h1>{resource.title}</h1>
            </Container>
        </BasicShell>
    )
}
