import BasicShell from "../../components/shells/BasicShell"
import { Container } from "@mantine/core"
import ResourcesForm from "../../components/pages/resources/ResourcesForm"

export default function AddNewRetailerPage(){
    return (
        <BasicShell>
            <Container size='xl' py='xl'>
                <h1>Add New Retailer</h1>
                <ResourcesForm />
            </Container>
        </BasicShell>
    )
}