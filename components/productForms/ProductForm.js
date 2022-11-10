import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { TextInput, Select, Container, Box, Divider, MultiSelect, NumberInput, Text, Accordion, Textarea, Button, Paper } from "@mantine/core"
import { useState, useEffect } from "react"
import { createDocument } from "../../helpers/firebaseHelpers"
import { useRouter } from "next/router"
import FoilKitSpecs from "./FoilKitSpecs"
import ProductReviewsForm from "./ProductReviewsForm"
import { initialFoilKitSpecs, initialBoardSpecs, initialProductInfo, initialWingSpecs } from "./productSchemas"
import ProductBasicInfo from "./ProductBasicInfo"
import BoardSpecs from "./BoardSpecs"
import ProductIncludedForm from "./ProductIncludedForm"
import BrandDescription from "./BrandDescription"
import WingSpecs from "./WingSpecs"
import ProductInventory from "./ProductInventory"


export default function ProductForm(props) {

  const { product } = props

  const router = useRouter()

  const createSlug = (str) => {
    return str.toLowerCase().replaceAll(" ", "-").replaceAll("'", "-").replaceAll("\"", "");
  };
  

  const [productInfo, setProductInfo] = useState(initialProductInfo(product))
  const [included, setIncluded] = useState(initialWingSpecs(product))
  const [foilKitSpecs, setFoilKitSpecs] = useState(initialFoilKitSpecs(product))
  const [boardSpecs, setBoardSpecs] = useState(initialBoardSpecs(product))
  const [wingSpecs, setWingSpecs] = useState(product?.wingSpecs || '')
  const [productImages, setProductImages] = useState([])
  const [productVideos, setProductVideos] = useState([])
  const [productReviews, setProductReviews] = useState(product.reviews || [])
  const [productLinks, setProductLinks] = useState([])
  const [productInventory, setProductInventory] = useState(product.inventory || [])

  console.log(productInfo)

  // function to get min and max price from productInventory

  const getPriceRange = () => {
    const prices = productInventory.map(item => item.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    return {
      minPrice,
      maxPrice
    }
  }

  const getNumOfInStock = () => {
    let totalStock = 0
    productInventory.forEach(item => {
      if(item.inStock){
        totalStock += 1
      }
    })

    return totalStock
  }

  const reviewSummary = () => {
    let total = 0
    productReviews.forEach(review => {
      total += review.rating
    })

    return {
      rating: total / productReviews.length,
      numOfReviews: productReviews.length
    }
  }

  
  const updateProduct = async () => {

    const specs = () => {
      //switch based on productInfo.category
      switch (productInfo.category) {
        case 'foils':
          return foilKitSpecs
        case 'boards':
          return boardSpecs
        case 'wings':
          return wingSpecs
        default:
          return
    }
  }

    await createDocument('products', ((product?.id === '' || !product) ? productInfo.name : product.id), {
      ...productInfo,
      ...specs(),
      reviews: productReviews,
      reviewSummary: reviewSummary(),
      inventory: productInventory,
      priceRange: getPriceRange(),
      numOfInStock: getNumOfInStock(),
      path: createSlug(productInfo.name),
    })
    router.push(`/products/${product.path}`)

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
      {/* <ProductIncludedForm
        included={included}
        setIncluded={setIncluded}
        onSave={updateProduct}
      /> */} 

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


    {
      // If wings category selected then show wing specs form
      productInfo.category === 'wings' &&
      <WingSpecs
        productSpecs={wingSpecs}
        setProductSpecs={setWingSpecs}
        onSave={updateProduct}
      />

    }

    <ProductInventory 
      productInventory={productInventory}
      setProductInventory={setProductInventory}
    />
      

      <ProductReviewsForm
        productReviews={productReviews}
        setProductReviews={setProductReviews}
      />



    </>
  )
}

