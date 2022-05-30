import { Container } from '@mantine/core';
import AppShell from '../../components/appshell/Appshell';
import AddProduct from '../../components/product/AddProduct';
const AddProductPage = () => {

    return (

        <AppShell>
            <Container size='xl'>
                <AddProduct />
            </Container>
        </AppShell>
    )
}

export default AddProductPage