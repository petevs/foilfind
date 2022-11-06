import { Divider, Box, Paper } from "@mantine/core"
import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"

const ProductInventory = () => {
  return (
    <>
        <Divider my='xl' />
      <SectionWrapper>
        <FormHeader title="Inventory" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Paper shadow='sm' withBorder> 

            hello
          </Paper>
          </Box>
        </SectionWrapper>
    </>
  )
}

export default ProductInventory