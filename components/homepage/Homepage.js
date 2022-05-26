import { Container } from "@mantine/core"
import { getProductRoutes } from "../../getPaths/getProductRoutes"
import PopularBrands from "./PopularBrands"
import { getProduct } from "../../getProps/getProduct"

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