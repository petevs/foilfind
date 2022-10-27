import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { Box, Select, TextInput } from "@mantine/core"

const ProductBasicInfo = ({productInfo, setProductInfo, onSave, brands}) => {
  return (
    <>
      <SectionWrapper>
        <FormHeader title="Add New Product" />
        <FormWrapper
          // disabled={!allFieldsFilled}
          onSave={onSave}
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
            data={brands}
            onChange={(e) => setProductInfo({...productInfo, brand: e})}
            searchable
            required
          />
        </Box>
        </FormWrapper>
      </SectionWrapper>
    </>
  )
}

export default ProductBasicInfo