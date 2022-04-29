import Shell from "../../components/Shell"
import { Box } from "@mantine/core"
import Listings from "../../components/Listings"
import Map from "../../components/Map"
import FilterBar from "../../components/FilterBar"

const AllDealers = () => {

    const wrapper = (theme) => ({
        height: '100%',
    })

    const innerWrapper = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '576px 1fr',
    })


    return (
        <Shell>
            <Box sx={wrapper}>
                <FilterBar />
                <Box sx={innerWrapper}>
                    <Box>
                        <Listings />
                    </Box>
                    <Box>
                        <Map />
                    </Box>
                </Box>
            </Box>
        </Shell>
    )
}

export default AllDealers