import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import FormWrapper from "../pages/editRetailer/FormWrapper"
import { TextInput, Select, Container, Box, Divider, MultiSelect, NumberInput, Text, Accordion, Textarea, Button, Paper } from "@mantine/core"
import { useState, useEffect } from "react"
import { createDocument } from "../../helpers/firebaseHelpers"
import { useRouter } from "next/router"

export default function ProductForm(props) {

  const { product } = props

  const router = useRouter()

  const initialProductInfo = {
    id: product.id || '',
    name: product.name || '',
    category: product.category || '',
    brand: product.brand || '',
  }

  const riderWeights = [
    { label: 'Light', value: 'light' },
    { label: 'Medium', value: 'medium' },
    { label: 'Heavy', value: 'heavy' },
  ]

  const riderSkillLevels = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ]

  const disciplines = [
    { label: 'Wing', value: 'wing' },
    { label: 'Kite', value: 'kite'},
    { label: 'Wake', value: 'wake' },
    { label: 'Surf', value: 'surf' },
    { label: 'SUP', value: 'sup' },
    { label: 'Wind', value: 'wind'},
    { label: 'Tow', value: 'tow'}
  ]

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
  
  const constructionMaterials = [
    { label: 'Aluminum', value: 'aluminum' },
    { label: 'Carbon', value: 'carbon' },
  ]
  
  const styles = [
    { label: 'High Aspect', value: 'high aspect' },
    { label: 'High Speed', value: 'high speed' },
    { label: 'Carving / Freeride', value: 'carving freeride' },
  ]

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
              { value: 'foil kits', label: 'Foil Kits' },
              { value: 'wings', label: 'Wings' },
              { value: 'boards', label: 'Boards'}
            ]}
            onChange={(e) => setProductInfo({...productInfo, category: e})}
            searchable
            required
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

      <SectionWrapper>
        <FormHeader title="Foil Kit Specs" />
        <FormWrapper 
          onSave={updateProduct}
        >
          <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
          <Select
            label="Style"
            placeholder="Select style"
            value={productSpecs.style}
            data={styles}
            onChange={(e) => setProductSpecs({...productSpecs, style: e})}
            searchable
            required
          />
          <MultiSelect
            label="Rider Weight"
            placeholder="Select rider weight"
            value={productSpecs.riderWeight}
            data={riderWeights}
            onChange={(e) => setProductSpecs({...productSpecs, riderWeight: e})}
            searchable
            required
          />
          <MultiSelect
            label="Rider Skill Level"
            placeholder="Select rider skill level"
            value={productSpecs.riderSkillLevel}
            data={riderSkillLevels}
            onChange={(e) => setProductSpecs({...productSpecs, riderSkillLevel: e})}
            searchable
            required
          />
          <MultiSelect
            label="Disciplines"
            placeholder="Select disciplines"
            value={productSpecs.disciplines}
            data={disciplines}
            onChange={(e) => setProductSpecs({...productSpecs, disciplines: e})}
            searchable
            required
          />
          <Select
            label="Construction Material"
            placeholder="Select construction material"
            value={productSpecs.constructionMaterial}
            data={constructionMaterials}
            onChange={(e) => setProductSpecs({...productSpecs, constructionMaterial: e})}
            searchable
          />
          </Box>
          </FormWrapper>
          </SectionWrapper>

          <Divider my='xl' />

          <SectionWrapper>
            <FormHeader title="Measurements" />
            <FormWrapper 
              onSave={updateProduct}
            >

          <Accordion sx={(theme) => ({
            margin: '0 -1.5rem', 
            '& .mantine-Accordion-label': {fontWeight: 500, fontSize: theme.fontSizes.md, textTransform: 'uppercase'},
            '& .mantine-Accordion-control': { 
              padding: '1rem 1.5rem .5rem 1.5rem'
            }, 
            '& .mantine-Accordion-panel': { 
              padding: '0 .5rem .5rem .5rem'
            }
            })}
            >

            <Accordion.Item value='Front Wing Specs'>
              <Accordion.Control>Front Wing Specs</Accordion.Control>
              <Accordion.Panel>
                <NumberInput
                  label="Front Wing Area (cm²)"
                  placeholder="Enter front wing area"
                  value={productSpecs.frontWing.areaCM}
                  onChange={(e) => {setProductSpecs({...productSpecs, frontWing: {...productSpecs.frontWing, areaCM: e}})}}
                  min={0}
                />
                <NumberInput
                  label="Front Wing Weight (g)"
                  placeholder="Enter front wing weight"
                  value={productSpecs.frontWing.weightGrams}
                  onChange={(e) => setProductSpecs({...productSpecs, frontWing: {...productSpecs.frontWing, weightGrams: e}})}
                  min={0}
                />
                <NumberInput
                  label="Front Wing Wing Span (mm)"
                  placeholder="Enter front wing wing span"
                  value={productSpecs.frontWing.wingSpanMillimeters}
                  onChange={(e) => setProductSpecs({...productSpecs, frontWing: {...productSpecs.frontWing, wingSpanMillimeters: e}})}
                  min={0}
                />
              </Accordion.Panel>
            </Accordion.Item>
        
            <Accordion.Item value='Tail Wing Specs'>
              <Accordion.Control>Tail Wing Specs</Accordion.Control>
              <Accordion.Panel>
                <NumberInput
                  label="Tail Wing Area (cm²)"
                  placeholder="Enter tail wing area"
                  value={productSpecs.tailWing.areaCM}
                  onChange={(e) => setProductSpecs({...productSpecs, tailWing: {...productSpecs.tailWing, areaCM: e}})}
                  min={0}
                />

                <NumberInput
                  label="Tail Wing Weight (g)"
                  placeholder="Enter tail wing weight"
                  value={productSpecs.tailWing.weightGrams}
                  onChange={(e) => setProductSpecs({...productSpecs, tailWing: {...productSpecs.tailWing, weightGrams: e}})}
                  min={0}
                />

                <NumberInput
                  label="Tail Wing Wing Span (mm)"
                  placeholder="Enter tail wing wing span"
                  value={productSpecs.tailWing.wingSpanMillimeters}
                  onChange={(e) => setProductSpecs({...productSpecs, tailWing: {...productSpecs.tailWing, wingSpanMillimeters: e}})}
                  min={0}
                />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value='Fueselage Specs'>
              <Accordion.Control>Fueselage Specs</Accordion.Control>
              <Accordion.Panel>
                <NumberInput
                  label="Fuselage Length (cm)"
                  placeholder="Enter fuselage length"
                  value={productSpecs.fuselage.lengthCM}
                  onChange={(e) => setProductSpecs({...productSpecs, fuselage: {...productSpecs.fuselage, lengthCM: e}})}
                  min={0}
                />

                <NumberInput
                  label="Fuselage Weight (g)"
                  placeholder='Enter fuselage weight'
                  value={productSpecs.fuselage.weightGrams}
                  onChange={(e) => setProductSpecs({...productSpecs, fuselage: {...productSpecs.fuselage, weightGrams: e}})}
                  min={0}
                />
              </Accordion.Panel>
            </Accordion.Item>




            <Accordion.Item value='Mast Specs'>
              <Accordion.Control>Mast Specs</Accordion.Control>
              <Accordion.Panel>
                <NumberInput
                  label="Mast Length (cm)"
                  placeholder='Enter mast length'
                  value={productSpecs.mast.lengthCM}
                  onChange={(e) => setProductSpecs({...productSpecs, mast: {...productSpecs.mast, lengthCM: e}})}
                  min={0}
                />

                <NumberInput
                  label="Mast Weight (g)"
                  placeholder='Enter mast weight'
                  value={productSpecs.mast.weightGrams}
                  onChange={(e) => setProductSpecs({...productSpecs, mast: {...productSpecs.mast, weightGrams: e}})}
                  min={0}
                />
              </Accordion.Panel>
            </Accordion.Item>


          </Accordion>


        </FormWrapper>
      </SectionWrapper>

      <Divider my='xl' />

      <SectionWrapper>
        <FormHeader title="Reviews" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Paper shadow='sm' withBorder> 
            <Accordion>
              {
                productReviews.map((review, index) => (
                  <Accordion.Item key={review.title} value={`Review ${index + 1}`}>
                    <Accordion.Control>Review {index + 1}</Accordion.Control>
                    <Accordion.Panel>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <NumberInput
                          label={`Rating ${productReviews[index].rating} / 5`}
                          placeholder="Enter rating"
                          value={review.rating}
                          onChange={(e) => setProductReviews(productReviews.map((review, i) => i === index ? { ...review, rating: e } : review))}
                          min={0}
                          max={5}
                        />
                        <TextInput
                          label='Source'
                          placeholder='Enter source'
                          value={review.source}
                          onChange={(e) => setProductReviews(productReviews.map((review, i) => i === index ? { ...review, source: e.currentTarget.value } : review))}
                        />
                        <TextInput
                          label='Link'
                          placeholder='Enter link'
                          value={review.link}
                          onChange={(e) => setProductReviews(productReviews.map((review, i) => i === index ? { ...review, link: e.currentTarget.value } : review))}
                        />
                        <TextInput
                          label='Review Title'
                          placeholder='Enter review title'
                          value={review.title}
                          onChange={(e) => setProductReviews(productReviews.map((review, i) => i === index ? { ...review, title: e.currentTarget.value } : review))}
                        />
                        <Textarea
                          label="Review"
                          placeholder="Enter review"
                          value={review.review}
                          onChange={(e) => setProductReviews(productReviews.map((review, i) => i === index ? { ...review, review: e.currentTarget.value } : review))}
                          autosize
                        />
                      </Box>
                      <Divider my='md' />
                      <Box>
                        <Button
                          variant='outline'
                          size='xs'
                          onClick={() => setProductReviews(productReviews.filter((_, i) => i !== index))}
                        >Delete</Button>
                      </Box>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))
              }
            </Accordion>
          </Paper>
            <Button
              variant="outline"
              color="gray"
              onClick={() => setProductReviews([...productReviews, initialReview])}
            >Add Review</Button>
          </Box>
      </SectionWrapper>



    </>
  )
}

