import { getProductRoutes } from '../../../../getPaths/getProductRoutes'
import { getProduct } from '../../../../getProps/getProduct'
import ProductLayout from '../../../../components/product/ProductLayout'
import AppShell from '../../../../components/appshell/AppShell'

export async function getStaticPaths(){

    const paths = await getProductRoutes()

    return {
        paths,
        fallback: false
    }
    
}


export async function getStaticProps({ params }) {

    const productDetails = await getProduct(params.product)
    
    return {
    props: {
        brand: params.brand,
        product: params.product,
        productDetails: productDetails
    },
    revalidate: 900
    }
    
}


const Product = ({ productDetails}) => {


    return(
        <AppShell>
            <ProductLayout
                product={productDetails}
            />
        </AppShell>
    )
}

export default Product