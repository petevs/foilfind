import { Box, Text } from "@mantine/core"
import { IconStar, IconStarHalf } from "@tabler/icons"

const RatingsReadOnly = ({rating, size}) => {

  console.log(rating)

  // take the rating and create an array of 'full' stars and 'half' stars

  const stars = []

  for (let i = 0; i < rating; i++) {
    stars.push('full')
  }

  if (rating % 1 !== 0) {
    stars.pop()
    stars.push('half')
  }



  return (
    <>
      <Box sx={{position: 'relative'}}>
        <Box
          sx={(theme) => ({
            '& svg': {
              fill: theme.colors.gray[3],
              stroke: 'none'
            }
          })}
        >
          {[1,2,3,4,5].map((star, index) => (
            <IconStar size={size || 16} key={index} />
          ))}
        </Box>
        <Box sx={(theme) => ({
          position: 'absolute',
          top: 0,
          '& svg': {
            fill: theme.colors.yellow[5], 
            stroke: 'none'
          }})}>
          {
            stars.map((star, index) => (
              star === 'full' ? <IconStar size={size || 16} key={index} /> : <IconStarHalf size={16} key={index} />
            ))
          }
        </Box>
      </Box>
      {/* <Text size='xs' color='dimmed'>Based on 36 reviews</Text> */}
   </>
  )
}

export default RatingsReadOnly