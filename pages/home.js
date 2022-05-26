import { Box, Card, Title, Text, Container } from "@mantine/core"
import { db } from "../firebase"
import { query, collection, getDocs } from "firebase/firestore"
import Image from "next/image"
import BrandCard from "../components/cards/BrandCard"
import SectionTitle from "../components/titles/SectionTitle"
import Homepage from "../components/homepage/Homepage"



export async function getStaticProps() {


    const getBrands = async () => {
        const brandList = []
        const q = query(collection(db, 'brands'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          const brand = doc.data()
          brandList.push(brand)
        })
        return brandList
    
      }
    
      const res = await getBrands()
      const brands = JSON.parse(JSON.stringify(res))
    
      return {
        props: {
          brands,
        },
    
        revalidate: 900
      }
    
}

const HomePage = ({brands}) => {

    return (
        <Homepage
            brands={brands}
        />
    )
}

export default HomePage