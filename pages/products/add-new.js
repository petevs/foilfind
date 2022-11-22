import { Container, Select, TextInput, Box, Divider } from "@mantine/core"
import FormHeader from "../../components/pages/editRetailer/FormHeader"
import FormWrapper from "../../components/pages/editRetailer/FormWrapper"
import SectionWrapper from "../../components/pages/editRetailer/SectionWrapper"
import BasicShell from "../../components/shells/BasicShell"
import { useState } from "react"
import { getCollection, getDocument } from "../../helpers/firebaseHelpers"
import { createDocument } from "../../helpers/firebaseHelpers"
import { useRouter } from "next/router"
import ProductForm from "../../components/productForms/ProductForm"


export async function getServerSideProps(context){

  const brands = await getCollection('brands')

  const brandList = brands.map(brand => brand.brand)

  const product = context.query.pid ? await getDocument('products', context.query.pid) : null


  return {
    props: {
      brands: brandList,
      product: {...product, id: ''},

    }
  }
}

export default function AddNewProductPage(props){

  return (
    <BasicShell>
      <Container size='xl' p='lg'>
        <ProductForm {...props} />
      </Container>
    </BasicShell>
  )
}