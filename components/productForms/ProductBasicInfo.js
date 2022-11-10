import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { Box, Button, MultiSelect, NumberInput, Select, Textarea, TextInput } from "@mantine/core"
import { useState } from "react"

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

  const [includeOptions, setIncludeOptions] = useState(productInfo?.includes || [])
  const [keywordOptions, setKeywordOptions] = useState(productInfo?.keywords || [])


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
            autosize
          />
          <Textarea
            label='Our Summary'
            placeholder="Enter our summary"
            value={productInfo.summary}
            onChange={(e) => setProductInfo({...productInfo, summary: e.currentTarget.value})}
            autosize
          />
          <Button
            disabled
          >Generate Our Summary</Button>
          <MultiSelect
            label='Keywords'
            placeholder='Select keywords'
            data={keywordOptions}
            value={productInfo.keywords}
            onChange={(e) => setProductInfo({...productInfo, keywords: e})}
            creatable
            getCreateLabel={(value) => `Add "${value}" as a new keyword`}
            onCreate={(value) => {
              setProductInfo({...productInfo, keywords: [...productInfo.keywords, value]})
              setKeywordOptions([...keywordOptions, value])
            }}
            searchable
          />
          <MultiSelect
            label='Includes'
            placeholder='Select includes'
            data={includeOptions}
            value={productInfo.includes}
            onChange={(e) => setProductInfo({...productInfo, includes: e})}
            creatable
            searchable
            getCreateLabel={(value) => `Add "${value}"`}
            onCreate={(value) => {
              setProductInfo({...productInfo, includes: [...productInfo.includes, value]})
              setIncludeOptions([...includeOptions, value])
            }
            }
          />

        </Box>
        </FormWrapper>
      </SectionWrapper>
    </>
  )
}

export default ProductBasicInfo