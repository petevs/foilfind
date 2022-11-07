import BasicShell from "../../components/shells/BasicShell"
import { Container } from "@mantine/core"
import ResourcesForm from "../../components/pages/resources/ResourcesForm"
import { getCollection } from "../../helpers/firebaseHelpers"

// get static props
export async function getStaticProps() {
    const products = await getCollection('products')
    const retailers = await getCollection('retailers')
    return {
        props: {
            products,
            retailers
        }
    }
}

export default function AddNewRetailerPage(props){

    return (
        <BasicShell>
            <Container size='xl' py='xl'>
                <h1>Add New Resource</h1>
                <ResourcesForm 
                    {...props}
                />
            </Container>
        </BasicShell>
    )
}