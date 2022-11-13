import { Divider, Box, Paper, NumberInput, Button, Select, Checkbox, TextInput } from "@mantine/core"
import SectionWrapper from "../pages/editRetailer/SectionWrapper"
import FormHeader from "../pages/editRetailer/FormHeader"
import { retailerList } from "./retailerList"

const ProductInventory = ({productInventory, setProductInventory}) => {

  const initialInventory = {
    retailer: '',
    price: '',
    currency: '',
    inStock: false,
    link: '',
    retailerPath: '',
    retailerID: '',
    geo: {
        latitude: 0,
        longitude: 0
    }
    }

  return (
    <>
        <Divider my='xl' />
      <SectionWrapper>
        <FormHeader title="Inventory" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Paper shadow='sm' withBorder> 
            {
                productInventory.map((inventory, index) => (

                    <>
                    <Box key={index}
                        p='md'
                        sx={(theme) => ({
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '.5rem',
                            alignItems: 'center',
                            alignContent: 'center'
                        })}
                    >
                        <Select
                            label='Retailer'
                            placeholder='Enter retailer'
                            data={retailerList.map((retailer) => retailer.name)}
                            searchable
                            value={inventory.retailer}
                            onChange={(e) => setProductInventory(productInventory.map((inventory, i) => i === index ? { ...inventory, 
                                retailer: e,
                                retailerId: retailerList.find((retailer) => retailer.name === e).id,
                                retailerPath: retailerList.find((retailer) => retailer.name === e).path,
                                geo: retailerList.find((retailer) => retailer.name === e).geo
                            } : inventory))}
                        />
                        <NumberInput
                            label={`Price ${productInventory[index].price}`}
                            placeholder="Enter price"
                            value={inventory.price}
                            onChange={(e) => setProductInventory(productInventory.map((inventory, i) => i === index ? { ...inventory, price: e } : inventory))}
                            min={0}
                            max={100000}
                        />
                        <Select
                            label='Currency'
                            placeholder='Enter currency'
                            data={['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CNY', 'INR']}
                            searchable
                            value={inventory.currency}
                            onChange={(e) => setProductInventory(productInventory.map((inventory, i) => i === index ? { ...inventory, currency: e } : inventory))}
                        />

                        <TextInput
                            label='Link'
                            placeholder='Enter link'
                            value={inventory.link}
                            onChange={(e) => setProductInventory(productInventory.map((inventory, i) => i === index ? { ...inventory, link: e.currentTarget.value } : inventory))}
                        />

                        <Checkbox
                            label='In Stock'
                            size='xs'
                            checked={inventory.inStock}
                            onChange={(e) => setProductInventory(productInventory.map((inventory, i) => i === index ? { ...inventory, inStock: e.currentTarget.checked } : inventory))}
                        />
                        <Button
                            variant='filled'
                            color='red'
                            size='xs'
                            compact
                            onClick={() => setProductInventory(productInventory.filter((inventory, i) => i !== index))}
                            sx={{
                                gridColumn: '2 / 5',
                                justifySelf: 'end'
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                    <Divider />
                    </>
                ))
            }
            <Box p='md'>
                <Button
                    variant='outline'
                    size='xs'
                    color='gray'
                    onClick={() => setProductInventory([...productInventory, initialInventory])}
                >
                    Add  Inventory
                </Button>
            </Box>
          </Paper>
          </Box>
        </SectionWrapper>
    </>
  )
}

export default ProductInventory