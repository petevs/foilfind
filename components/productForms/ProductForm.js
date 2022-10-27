import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { TextInput, Select, Container, Box, Divider, MultiSelect, NumberInput, Text, Accordion, Textarea, Button, Paper } from "@mantine/core"
import { useState, useEffect } from "react"
import { createDocument } from "../../helpers/firebaseHelpers"
import { useRouter } from "next/router"
import FoilKitSpecs from "./FoilKitSpecs"
import ProductReviewsForm from "./ProductReviewsForm"
import { initialFoilKitSpecs, initialBoardSpecs, initialProductInfo } from "./productSchemas"
import ProductBasicInfo from "./ProductBasicInfo"
import BoardSpecs from "./BoardSpecs"
import ProductIncludedForm from "./ProductIncludedForm"


export default function ProductForm(props) {

  const { product } = props

  const router = useRouter()

  const createSlug = (str) => {
    return str.toLowerCase().replaceAll(" ", "-").replaceAll("'", "-").replaceAll("\"", "");
  };
  

  const [productInfo, setProductInfo] = useState(initialProductInfo(product))
  const [included, setIncluded] = useState(product?.included || '')
  const [foilKitSpecs, setFoilKitSpecs] = useState(initialFoilKitSpecs(product))
  const [boardSpecs, setBoardSpecs] = useState(initialBoardSpecs(product))
  const [productImages, setProductImages] = useState([])
  const [productVideos, setProductVideos] = useState([])
  const [productReviews, setProductReviews] = useState([])
  const [productLinks, setProductLinks] = useState([])

  const updateProduct = async () => {
    await createDocument('products', (product.id === '' ? productInfo.name : product.id), {
      ...productInfo,
      ...foilKitSpecs,
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
      <ProductBasicInfo
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        onSave={updateProduct}
        brands={props.brands}
      />

      <Divider my='xl' />
      <ProductIncludedForm
        included={included}
        setIncluded={setIncluded}
        onSave={updateProduct}
      />

      {
        //If foils category selected then show foil specs form

        productInfo.category === 'foils' &&
        <FoilKitSpecs
          productSpecs={foilKitSpecs}
          setProductSpecs={setFoilKitSpecs}
          onSave={updateProduct}
        />
      }

      {
        // If boards category selected then show board specs form
        productInfo.category === 'boards' &&
        <BoardSpecs
          productSpecs={foilKitSpecs}
          setProductSpecs={setFoilKitSpecs}
          onSave={updateProduct}
        />

      }
      

      <ProductReviewsForm
        productReviews={productReviews}
        setProductReviews={setProductReviews}
      />



    </>
  )
}

