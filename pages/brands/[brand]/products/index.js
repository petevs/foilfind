import { query, collection, getDocs, where } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { Box, Container, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AppShell from '../../../../components/appshell/AppShell'
import BrandHeader from '../../../../components/brand/BrandHeader'
import BrandProducts from '../../../../components/brand/BrandProducts'

export async function getStaticPaths(){

    const getBrands = async () => {
        const brandPaths = []
        const q = query(collection(db, 'brands'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          const brand = doc.data()
          brandPaths.push(brand)
        })

        return brandPaths

    }

    const brandPaths = await getBrands()

    const paths = brandPaths.map(item => ({
        params: { brand: (item.brandName) }
    }))
    

    return {
        paths,
        fallback: false
    }
    
}


export async function getStaticProps({ params }) {

    const getProducts = async () => {
        const productList = []
        const q = query(collection(db, 'products'), where("brand", "==", params.brand))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          const product = doc.data()
          productList.push(product)
        })
        return productList
    
      }
    
      const res = await getProducts()
      const products = JSON.parse(JSON.stringify(res))
    
      return {
        props: {
          products,
          brand: params.brand
        },
    
        revalidate: 900
      }
    
}


const Products = ({ products, brand}) => {

    // console.log(products)
    // console.log(brand)

    const { asPath } = useRouter()

    const toKebabCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
    }


    const cardStyle = (theme) => ({
        ':hover': {
            cursor: 'pointer'
        }
    })

    const outerWrapper = (theme) => ({
        height: '215px',
        width: '215px',
        position: 'relative',
        backgroundColor: '#08151F',
        borderRadius: theme.radius.md,
    })

    const imgStyle = (theme) => ({
        height: '100%',
        width: '100%',
        position: 'relative',
        borderRadius: theme.radius.md,
    })

    return (
        <AppShell>
            <BrandHeader brand={brand} />
            <BrandProducts 
                brand={brand} 
                products={products.map(item => ({
                    ...item, 
                    path: `${asPath}/${toKebabCase(item.title)}`
                }))} 
            />
            {/* <Container size='xl'>
                <Box>
                    {
                        products &&
                        products.map((product, index) => (
                            <Link
                                passHref={true}
                                href={`${asPath}/${toKebabCase(product.title)}`}
                                key={index}
                            >
                                <Box 
                                    sx={cardStyle}
                                >
                                    <Box 
                                        sx={outerWrapper}
                                    >
                                        <Box sx={imgStyle}>
                                            <Image 
                                                src={product.images[0]}  
                                                alt={product.title}
                                                layout='fill' 
                                                objectFit='cover'
                                            />
                                        </Box>
                                    </Box>
                                    <Text>{product.title}</Text>
                                </Box>
                            </Link>
                        ))
                    }
                </Box>
            </Container> */}
        </AppShell>
    )
}

export default Products