import ProductForm from "./ProductForm"
import { useState, useEffect } from 'react'
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";



const EditProduct = (props) => {

  const [product, setProduct] = useState(props.product)

  console.log(props)

  useEffect(() => {

    if('pid' in props){
      const getClonedDoc = async () => {
        const clonedDoc = await getDocument('products', props.pid)
        setProduct(clonedDoc)
      }

      getClonedDoc()
      return
    }


    const getProduct = async () => {
    const docRef = doc(db, 'products', props.product.id);
    const docSnap = await getDoc(docRef);
    setProduct(docSnap.data())
    }

    getProduct()
    

  },[props])

  return (
    <ProductForm brands={props.brands} product={props.product} /> 
  )
}

export default EditProduct