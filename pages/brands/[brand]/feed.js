import { useRouter } from "next/router"
import AppShell from "../../../components/appshell/AppShell"
import BrandFeed from "../../../components/brand/BrandFeed"
import BrandHeader from "../../../components/brand/BrandHeader"


const Feed = () => {

    const router = useRouter()
    const { brand } = router.query

    return (
        <AppShell>
            <BrandHeader
                active='feed'
                brand={brand}
            />
            <BrandFeed 
                brand={brand}
            />
        </AppShell>
    )
}

export default Feed