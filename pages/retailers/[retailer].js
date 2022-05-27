import AppShell from "../../components/appshell/AppShell";
import { Container, Box, Text } from "@mantine/core";
import { getRetailerPaths } from "../../getPaths/getRetailerRoutes";
import { getRetailer } from "../../getPaths/getRetailerRoutes";

export async function getStaticPaths(){

    const retailerPaths = await getRetailerPaths()

    const paths = [...retailerPaths]
    

    return {
        paths,
        fallback: false
    }
    
}

export async function getStaticProps({ params }) {

    const res = await getRetailer(params.retailer)
    const retailer = JSON.parse(JSON.stringify(res))
    
    return {
        props: {
            retailer: retailer,
        },
        revalidate: 900
    }
    
}


const Retailer = (props) => {

    console.log(props)

    return (
        <AppShell>
            <Container size='xl'>
                <Box>
                    <Text>{props.retailer.name}</Text>
                </Box>
            </Container>
        </AppShell>
    );
}

export default Retailer