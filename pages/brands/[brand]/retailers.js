import { Box, Text } from "@mantine/core"
import BrandHeader from "../../../components/brand/BrandHeader"
import { useRouter } from "next/router"
import AppShell from "../../../components/appshell/AppShell"
import BrandRetailers from "../../../components/brand/BrandRetailers"


const Retailers = () => {

    const router = useRouter()
    const { brand } = router.query

    return (
        <AppShell>
            <BrandHeader
                active='retailers'
                brand={brand}
            />
            <BrandRetailers />
        </AppShell>
    )
}

export default Retailers