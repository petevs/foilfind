import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { TextInput, Select, Container, Box, Divider, MultiSelect, NumberInput, Text, Accordion, Textarea, Button, Paper } from "@mantine/core"
import { useState, useEffect } from "react"
import { createDocument } from "../../helpers/firebaseHelpers"
import { useRouter } from "next/router"
import FoilKitSpecs from "./FoilKitSpecs"
import ProductReviewsForm from "./ProductReviewsForm"

export default function ProductForm(props) {

  const { product } = props

  const router = useRouter()

  const initialProductInfo = {
    id: product.id || '',
    name: product.name || '',
    category: product.category || '',
    subCategory: product.subCategory || '',
    brand: product.brand || '',
  }

  const initialFoilKitSpecs = {
    style: product.style || '',
    riderWeight: product.riderWeight || '',
    riderSkillLevel: product.riderSkillLevel || [],
    constructionMaterial: product.constructionMaterial || '',
    disciplines: product.disciplines || [],
    frontWing: {
      areaCM: 0,
      weightGrams: 0,
      wingSpanMillimeters: 0,
      ar: 0,
    },
    tailWing: {
      areaCM: 0,
      weightGrams: 0,
      wingSpanMillimeters: 0,
    },
    fuselage: {
      lengthCM: 0,
      weightGrams: 0,
    },
    mast: {
      lengthCM: 0,
      weightGrams: 0,
    }
  }

  const initialReview = {
    title: '',
    content: '',
    rating: 0,
    source: '',
    link: ''
  }

  const createSlug = (str) => {
    return str.toLowerCase().replaceAll(" ", "-").replaceAll("'", "-").replaceAll("\"", "");
  };
  

  const [productInfo, setProductInfo] = useState(initialProductInfo)
  const [productSpecs, setProductSpecs] = useState(initialFoilKitSpecs)
  const [productImages, setProductImages] = useState([])
  const [productVideos, setProductVideos] = useState([])
  const [productReviews, setProductReviews] = useState([])
  const [productLinks, setProductLinks] = useState([])

  const updateProduct = async () => {
    await createDocument('products', (product.id === '' ? productInfo.name : product.id), {
      ...productInfo,
      ...productSpecs,
      path: createSlug(productInfo.name),
    })
    router.push('/products')

  }

  if(!props){
    return (
      <>
        loading...
      </>
    )
  }

  return (
    <>
      <SectionWrapper>
        <FormHeader title="Add New Product" />
        <FormWrapper
          // disabled={!allFieldsFilled}
          onSave={updateProduct}
          // reset={() => setProduct(initial)}
        >
          <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
          <TextInput
            label="Product Name"
            placeholder="Enter product name"
            value={productInfo.name}
            onChange={(e) => setProductInfo({...productInfo, name: e.currentTarget.value})}
            required
          />
          <Select
            label="Category"
            placeholder="Select category"
            value={productInfo.category}
            data={[
              { value: 'foils', label: 'Foils' },
              { value: 'wings', label: 'Wings' },
              { value: 'boards', label: 'Boards'},
              { value: 'accessories', label: 'Accessories' },
            ]}
            onChange={(e) => setProductInfo({...productInfo, category: e})}
            searchable
            required
          />
          <Select
            label="Subcategory"
            placeholder="Select subcategory"
            value={productInfo.subCategory}
            data={[
              { value: '', label: 'None' },
              { value: 'foil kits', label: 'Foil Kits' },
              { value: 'masts', label: 'Masts'},
              { value: 'front wings', label: 'Front Wings' },
              { value: 'tail wings', label: 'Tail Wings' },
              { value: 'fuselages', label: 'Fuselages' },
              { value: 'foil hardware', label: 'Foil Hardware' },
              { value: 'foil accessories', label: 'Foil Accessories' },
              { value: 'inflatable boards', label: 'Inflatable Boards' },
              { value: 'hard boards', label: 'Hard Boards' },
            ]}
            onChange={(e) => setProductInfo({...productInfo, subCategory: e})}
            searchable
          />

          <Select
            label="Brand"
            placeholder="Select brand"
            value={productInfo.brand}
            data={props.brands}
            onChange={(e) => setProductInfo({...productInfo, brand: e})}
            searchable
            required
          />
        </Box>
        </FormWrapper>
      </SectionWrapper>

      <Divider my='xl' />
      
      <FoilKitSpecs
        productSpecs={productSpecs}
        setProductSpecs={setProductSpecs}
      />
      <ProductReviewsForm
        productReviews={productReviews}
        setProductReviews={setProductReviews}
      />



    </>
  )
}

