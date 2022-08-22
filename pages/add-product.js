import TempHeader from "../components/header/TempHeader"
import { Button, Container, TextInput } from "@mantine/core"
import { db } from '../firebase'
import { doc, addDoc, Timestamp, collection } from 'firebase/firestore'

const AddProduct = () => {

  const emptyProduct = {
    brand: '',
    brandPath: '',
    productName: '',
    style: '',
    foilAreaCM: 0,
    wingSpanMM: 0,
    weightGM: 0,
    constructionMaterial: '',
    msrpUSD: 10.00,
    skillLevel: {
      rookie: false,
      intermediate: true,
      advanced: true,
      expert: true,
    },
    riderWeight: {    
      light: true,
      medium: true,
      heavy: false
    },
    images: [],
    disciplines: [],
    summary: '',
    brandVideos: [],
    productVideos: [],
    reviews: [],
    description: ''
  }



  const setProduct = async () => {

    const docRef = await addDoc(collection(db, 'foils'), emptyProduct)
}

  return (
    <>
      <TempHeader />
      <Container size='xl' p='xl'>
        <Button onClick={setProduct}>Add New Empty</Button>
      </Container>
    </>
  )
}

export default AddProduct;