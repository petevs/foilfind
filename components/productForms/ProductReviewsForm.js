import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import { Box, Paper, Button, Accordion, NumberInput, Divider, TextInput, Textarea, MultiSelect, Select } from "@mantine/core"
import { retailerList } from './retailerList'
import { DatePicker } from "@mantine/dates"


const ProductReviewsForm = ({productReviews, setProductReviews, brands}) => {

  const initialReview = {
    reviewTitle: '',
    review: '',
    rating: 0,
    source: '',
    link: ''
  }

  const reviewSources = () => {
    const sources = []
    brands.forEach(brand => sources.push(brand))
    retailerList.forEach(retailer => sources.push(retailer.name))
    return sources
  }


  return (
    <>
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
                        <Select
                          label='Source'
                          placeholder='Enter source'
                          data={reviewSources()}
                          searchable
                          value={review.source}
                          onChange={(e) => setProductReviews(productReviews.map((review, i) => i === index ? { ...review, source: e } : review))}
                        />
                        {/* <DatePicker
                          label='Date'
                          placeholder='Enter date'
                          sx={{
                            '& .mantine-DatePicker-calendarBase': {
                              maxWidth: '300px'
                            }
                          }}
                          value={review.date}
                          onChange={(e) => setProductReviews(productReviews.map((review, i) => i === index ? { ...review, date: e } : review))}
                        /> */}
                        <TextInput
                          label='Link'
                          placeholder='Enter link'
                          value={review.link}
                          onChange={(e) => setProductReviews(productReviews.map((review, i) => i === index ? { ...review, link: e.currentTarget.value } : review))}
                        />
                        <TextInput
                          label='Review Title'
                          placeholder='Enter review title'
                          value={review.reviewTitle}
                          onChange={(e) => setProductReviews(productReviews.map((review, i) => i === index ? { ...review, reviewTitle: e.currentTarget.value } : review))}
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

export default ProductReviewsForm