import { query, collection, getDocs, where } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { Box, Container, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getProductRoutes } from '../../../../getPaths/getProductRoutes'
import { getProduct } from '../../../../getProps/getProduct'
import ProductPage from '../../../../components/productPage/ProductPage'
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




const Product = ({brand, product, productDetails}) => {


    return(
        <AppShell>
            <ProductLayout
                product={productDetails}
            />
        </AppShell>
    )
}

export default Product