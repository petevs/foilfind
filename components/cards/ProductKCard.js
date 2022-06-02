import { Box, Button, Group, Text } from "@mantine/core"
import Image from "next/image"
import { BsStarFill } from "react-icons/bs"


const ProductKCard = () => {

  const rating = 5

  const handleRating = ( rating ) => {
      return [...Array(rating).keys()]
  }


  return (
    <Box sx={{
      border: '1px solid #e9ecef',
      borderRadius: '6px',
      boxShadow: '0 0 2px 0 rgba(19,26,31,0.12),0 2px 4px 0 rgba(19,26,31,0.22)',
      backgroundColor: '#fff'
    }}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '.5fr 2fr 1fr',
        gap: '2rem',
        padding: '1rem'
      }}>
        <Box
          sx={{padding: '0 1rem', position: 'relative'}}
        >
          <Image src='https://cdn.shopify.com/s/files/1/2062/5873/products/1850-money-3_1da9322a-b980-4b56-bf8e-229cf48f1b57_x700.png?v=1623675727' layout='fill' objectFit="contain" />
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr',
          '& svg': {
            height: '12px',
            width: '12px',
            color: '#f6c347'
          }
        }}>
          <Text weight={700}>HS1550 V2 Foil Kit</Text>
          <Group spacing='xs'>
            <Box>
              {
                  handleRating(rating).map( (item, index) => (
                  <BsStarFill key={index} />
                  ))
              }
            </Box>
            <Text size='sm' color='dimmed'>7 reviews</Text>
          </Group>
          <Text
            size='xs'
            color='dimmed'
            sx={{alignSelf: 'end'}}
          ><strong>foilfind summary:</strong> this thand that</Text>
        </Box>
        <Box
          sx={{
            borderLeft: '1px solid #e9ecef',
            paddingLeft: '1rem',
            display: 'grid',
            gridTemplateRows: '1fr auto',
          }}
        >
          <Box sx={{display: 'grid', alignContent: 'center'}}>
            <Text size='xl' weight={700}>$1,499 - $1,873</Text>
            <Text color='dimmed' size='xs'>New (5) · Used (3)</Text>
          </Box>
          <Button variant='filled' mt='xs' size='sm' sx={{alignSelf: 'end'}}>Compare Offers</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductKCard