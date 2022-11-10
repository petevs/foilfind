import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { Box, Button, NumberInput, Select, Textarea, TextInput } from "@mantine/core"

const ProductBasicInfo = ({productInfo, setProductInfo, onSave, brands}) => {


  const subcategories = {
    foils: [
      {label: 'Foil Kits', value: 'foil kits'},
      {label: 'Front Wings', value: 'front wings'},
      {label: 'Tail Wings', value: 'tail wings'},
      {label: 'Masts', value: 'masts'},
      {label: 'Fuselages', value: 'fuselages'},
      {label: 'Accessories', value: 'accessories'},
      {label: 'Hardware', value: 'hardware'}
    ],
    boards: [
      { label: 'Inflatable Boards', value: 'inflatable boards' },
      { label: 'Hard Boards', value: 'hard boards' },
    ],
  }


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
            label="Brand"
            placeholder="Select brand"
            value={productInfo.brand}
            data={brands}
            onChange={(e) => setProductInfo({...productInfo, brand: e})}
            searchable
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
          {
            subcategories[productInfo.category] &&
            <Select
              label="Subcategory"
              placeholder="Select subcategory"
              value={productInfo.subCategory}
              data={subcategories[productInfo.category] || []}
              onChange={(e) => setProductInfo({...productInfo, subCategory: e})}
              searchable
            />
          }
          <TextInput
            label="Release Year"
            placeholder="Enter release year"
            value={productInfo.releaseYear}
            onChange={(e) => setProductInfo({...productInfo, releaseYear: e.currentTarget.value})}
          />
          <NumberInput
            label="MSRP"
            placeholder="Enter MSRP"
            value={productInfo.msrp}
            onChange={(e) => setProductInfo({...productInfo, msrp: e})}
          />
          <Textarea 
            label="Brand Description"
            placeholder="Enter brand description"
            value={productInfo.brandDescription}
            onChange={(e) => setProductInfo({...productInfo, brandDescription: e.currentTarget.value})}
          />
          <Textarea
            label='Our Summary'
            placeholder="Enter our summary"
            value={productInfo.ourSummary}
            onChange={(e) => setProductInfo({...productInfo, ourSummary: e.currentTarget.value})}
          />
          <Button>Generate Our Summary</Button>
        </Box>
        </FormWrapper>
      </SectionWrapper>
    </>
  )
}

export default ProductBasicInfo