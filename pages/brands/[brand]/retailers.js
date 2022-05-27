import { Box, Text } from "@mantine/core"
import BrandHeader from "../../../components/brand/BrandHeader"
import { useRouter } from "next/router"
import AppShell from "../../../components/appshell/AppShell"
import BrandRetailers from "../../../components/brand/BrandRetailers"
import { getBrands } from "../../../getPaths/getProductRoutes"
import { query, collection, getDocs, where } from 'firebase/firestore'
import { db } from '../../../firebase'

export async function getStaticPaths(){

    const brandPaths = await getBrands()

    const paths = brandPaths.map(item => ({
        params: { brand: item.toLowerCase() }
    }))
    

    return {
        paths,
        fallback: false
    }
    
}


export async function getStaticProps({ params }) {

    const getRetailers = async () => {
        const retailerList = []
        const q = query(collection(db, 'retailers'), where("brands", "array-contains", params.brand))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          const retailer = doc.data()
          retailerList.push(retailer)
        })

        return retailerList
    }

    const res = await getRetailers()
    const retailers = JSON.parse(JSON.stringify(res))

    
    return {
      props: {
          retailers: retailers,
      },
    }
  
}


const Retailers = ({ retailers }) => {

    const router = useRouter()
    const { brand } = router.query


    console.log(retailers)

    return (
        <AppShell>
            <BrandHeader
                active='retailers'
                brand={brand}
            />
            <BrandRetailers 
                retailers={retailers}
            />
        </AppShell>
    )
}

export default Retailers