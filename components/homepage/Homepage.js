import { Container } from "@mantine/core"
import PopularBrands from "./FeaturedBrands"

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