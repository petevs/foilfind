import { Container, Select, TextInput, Box } from "@mantine/core"
import FormHeader from "../../components/pages/editRetailer/FormHeader"
import FormWrapper from "../../components/pages/editRetailer/FormWrapper"
import SectionWrapper from "../../components/pages/editRetailer/SectionWrapper"
import BasicShell from "../../components/shells/BasicShell"
import { useState } from "react"
import { getCollection } from "../../helpers/firebaseHelpers"
import { createDocument } from "../../helpers/firebaseHelpers"
import { useRouter } from "next/router"


export async function getStaticProps(){

  const brands = await getCollection('brands')

  const brandList = brands.map(brand => brand.brand)


  return {
    props: {
      brands: brandList
    }
  }
}

export default function AddNewProductPage(props){

  const router = useRouter()

  const initial = {
    name: '',
    category: '',
    brand: '',
  }

  const [product, setProduct] = useState(initial)


  const updateProduct = async () => {
    await createDocument('products', product.name, product)
    router.reload(window.location.pathname)
  }

  //check all keys in product
  const allFieldsFilled = Object.keys(product).every(key => product[key] !== '')


  return (
    <BasicShell>
      <Container size='xl' p='lg'>
        <SectionWrapper>
          <FormHeader title="Add New Product" />
          <FormWrapper
            disabled={!allFieldsFilled}
            onSave={updateProduct}
            reset={() => setProduct(initial)}
          >
            <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
            <TextInput
              label="Product Name"
              placeholder="Enter product name"
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.currentTarget.value})}
              required
            />
            <Select
              label="Category"
              placeholder="Select category"
              value={product.category}
              data={[
                { value: 'foils', label: 'Foils' },
                { value: 'wings', label: 'Wings' },
                { value: 'boards', label: 'Boards'}
              ]}
              onChange={(e) => setProduct({...product, category: e})}
              searchable
              required
            />
            <Select
              label="Brand"
              placeholder="Select brand"
              value={product.brand}
              data={props.brands}
              onChange={(e) => setProduct({...product, brand: e})}
              searchable
              required
            />
          </Box>
          </FormWrapper>
        </SectionWrapper>
      </Container>
    </BasicShell>
  )
}