import AppShell from "../../components/appshell/AppShell";
import { Container, Box, Text } from "@mantine/core";
import { getRetailerPaths } from "../../getPaths/getRetailerRoutes";
import { getRetailer } from "../../getPaths/getRetailerRoutes";
import RetailerLayout from "../../components/retailer/RetailerLayout";

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

    return (
        <AppShell>
            <RetailerLayout
                retailer={props.retailer}
            />
        </AppShell>
    );
}

export default Retailer