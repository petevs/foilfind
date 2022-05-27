import { Container } from "@mantine/core"
import PopularBrands from "./PopularBrands"

const Homepage = ({ brands }) => {

    return (
        <Container size='xl' sx={{minHeight: '75vh'}}>
            <PopularBrands 
                brands={brands}
            />
        </Container>
    )
}

export default Homepage