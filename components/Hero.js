import { Box, Button, Text } from "@mantine/core"

const Hero = ({subhead, head, buttonText, buttonOnClick, bgImg}) => {

  const wrapper = (theme) => ({
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:
      `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(${bgImg})`,
    height: '300px',
    borderRadius: `${theme.radius.lg}px`,
  })

  const innerWrapper = (theme) => ({
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridTemplateRows: '1fr',
    height: '100%',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  })

  const colOne = (theme) => ({
    display: 'grid',
    alignContent: 'center',
    justifyItems: 'center',
  })

  return (
    <Box sx={wrapper}>
      <Box sx={innerWrapper}>
        <Box sx={colOne} >
          {/* <Text size='lg' weight={700} color='white'>Search hundreds of foil shops at once</Text>
          <Text sx={{fontSize: '3rem'}} weight={700} color='white'>Find Your Foil Gear</Text>
          <Button radius='xl' size='lg' mt='md'>Search Now</Button> */}
          <Text size='lg' weight={700} color='white'>{subhead}</Text>
          <Text sx={{fontSize: '3rem'}} weight={700} color='white'>{head}</Text>
          <Button radius='xl' size='lg' mt='md'>{buttonText}</Button>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  )
}

export default Hero;