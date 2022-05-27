import { db } from "../../../firebase"
import { query, collection, getDocs } from 'firebase/firestore'
import AppShell from "../../../components/appshell/AppShell"
import BrandHeader from "../../../components/brand/BrandHeader"


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
        params: { brand: (item.brandName.toLowerCase()) }
    }))
    

    return {
        paths,
        fallback: false
    }
    
}

export async function getStaticProps({ params }){

    return {
        props: {
            brand: params.brand
        }
    }
}

const Brand = ({ brand }) => {

    return (
        <AppShell>
            <BrandHeader brand={brand} />
        </AppShell>
    )
}

export default Brand