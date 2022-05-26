import { Container } from "@mantine/core"
import PopularBrands from "./PopularBrands"

const Homepage = ({ brands }) => {

    return (
        <Container size='xl'>
            <PopularBrands 
                brands={brands}
            />
        </Container>
    )
}

export default Homepage