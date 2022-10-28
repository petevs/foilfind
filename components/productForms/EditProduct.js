import ProductForm from "./ProductForm"
import { useState, useEffect } from 'react'
import { db } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { getCollection } from "../../helpers/firebaseHelpers";


const EditProduct = ({slug}) => {

  const [product, setProduct] = useState(null)
  const [brandSelection, setBrandSelection] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      if(slug){
          const q = query(collection(db, 'products'), where('path', '==', slug));
          const querySnapshot = await getDocs(q);
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()});
            });
          setProduct(data[0]);
      }
    }

    getProduct()

  }, [slug])

  useEffect(() => {
    const getBrands = async () => {
      const brands = await getCollection('brands')
      const brandList = brands.map(brand => brand.brand)
      setBrandSelection(brandList)
    }
    getBrands()
  },[])

  return (
    <ProductForm brands={brandSelection} product={product} /> 
  )
}

export default EditProduct