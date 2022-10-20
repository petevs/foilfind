import { Title, Box, Text, Group, ActionIcon, Button, Divider } from "@mantine/core"
import { IconBrandFacebook, IconBuildingStore, IconDirections, IconHeart, IconMapPin, IconMessageDots, IconPackgeExport, IconPhone, IconReceipt, IconSchool, IconShoppingCart, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconStar, IconShare, IconLink, IconMail } from "@tabler/icons"


const RetailerDetailCard = ({retailer}) => {


  const createArrayIfTrue = (obj) => {
    const array = []
    for (const key in obj) {
      if (obj[key]) {
        array.push(key)
      }
    }
    return array
  }

  const convertFirestoreTimestampToTime = (timestamp) => {

    if(!timestamp){
      return 'No Data'
    }

    const date = new Date(timestamp.seconds * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'pm' : 'am'
    const hours12 = hours % 12
    const minutesFormatted = minutes < 10 ? '0' + minutes : minutes
    const strTime = hours12 + ':' + minutesFormatted + ' ' + ampm
    return strTime
  }

  const daysOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  console.log(retailer)

  return (
    <>
          <Text sx={{fontSize: '1.6rem'}} weight={700} mt='lg'>{retailer.name}</Text>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem'}}>
            <Text size='sm' color='dimmed'>Storefront · Online · Rentals · Lessons · Retreat</Text>
          {/* <Box>
            <Group spacing='xs'>
              <IconBuildingStore size={14} />
              <Text size='sm'>Storefront</Text>
            </Group>
            <Group spacing='xs'>
              <IconReceipt size={14} />
              <Text size='sm'>Rentals</Text>
            </Group>
            <Group spacing='xs'>
              <IconSchool size={14} />
              <Text size='sm'>Lessons</Text>
            </Group>
          </Box>
          <Box>
            <Group spacing='xs'>
              <IconMessageDots size={14} />
              <Text size='sm'>Live Chat</Text>
            </Group>
            <Group spacing='xs'>
              <IconShoppingCart size={14} />
              <Text size='sm'>Order Online</Text>
            </Group>
            <Group spacing='xs'>
              <IconPackgeExport size={14} />
              <Text size='sm'>Ships to You</Text>
            </Group>
          </Box> */}
        </Box>

        {/* <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', margin: '1rem 0'}}>
          <Button 
            variant='outline' 
            color='dark' 
            radius='lg'
            size='xs' 
            leftIcon={<IconPhone size={14}/>}
          >
            {retailer.phone}
          </Button>
          <Button 
            variant='outline' 
            color='dark' 
            radius='lg'
            size='xs' 
            leftIcon={<IconDirections size={14}/>}
            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${retailer.address}`, "_blank")}
          >
            Directions
          </Button> */}
          {/* <ActionIcon radius='xl' size='lg' variant='outline'>
            <IconHeart size={16} />
          </ActionIcon> */}
        {/* </Box> */}
        <Box sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'space-between', padding: '1rem 0'}}>
          <Box sx={{display: 'grid', justifyItems: 'center'}}>
            <ActionIcon color='dark' radius='xl' size='lg' variant='outline'>
              <IconPhone size={16} />
            </ActionIcon>
            <Text size='xs' sx={{marginTop: '.25rem'}} color='dimmed'>Call</Text>
          </Box>

          <Box sx={{display: 'grid', justifyItems: 'center'}}>
            <ActionIcon color='dark' radius='xl' size='lg' variant='outline'>
              <IconMapPin size={16} />
            </ActionIcon>
            <Text size='xs' sx={{marginTop: '.25rem'}} color='dimmed'>Directions</Text>
          </Box>

          <Box sx={{display: 'grid', justifyItems: 'center'}}>
            <ActionIcon color='dark' radius='xl' size='lg' variant='outline'>
              <IconStar size={16} />
            </ActionIcon>
            <Text size='xs' sx={{marginTop: '.25rem'}} color='dimmed'>Review</Text>
          </Box>

          <Box sx={{display: 'grid', justifyItems: 'center'}}>
            <ActionIcon color='dark' radius='xl' size='lg' variant='outline'>
              <IconShare size={16} />
            </ActionIcon>
            <Text size='xs' sx={{marginTop: '.25rem'}} color='dimmed'>Share</Text>
          </Box>

          <Box sx={{display: 'grid', justifyItems: 'center'}}>
            <ActionIcon color='dark' radius='xl' size='lg' variant='outline'>
              <IconHeart size={16} />
            </ActionIcon>
            <Text size='xs' sx={{marginTop: '.25rem'}} color='dimmed'>Favorite</Text>
          </Box>

        </Box>
       

        <Button variant='outline' color='dark' radius='xl' fullWidth>Vist Website</Button>

        <Divider my='lg' />
        <Text size='md' mb='md' weight={700}>Hours of Operation</Text>
        {
          daysOfTheWeek.map((day) => (
            <Box
              key={day}
              sx={{display: 'grid', gridTemplateColumns: '1fr 2fr'}}
            >
              <Text size='sm' transform='capitalize' color='dimmed'>{day}</Text>
              {
                retailer.hours[day].closed ?
                <Text size='sm'>Closed</Text>
                :
                <Text size='sm'>{convertFirestoreTimestampToTime(retailer.hours[day].open)} to {convertFirestoreTimestampToTime(retailer.hours[day].close)}</Text>
              }
            </Box>
        ))
      }
        <Divider my='lg' />
        <Text size='md' mb='md' weight={700}>Brands Carried</Text>
        <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 50%)'}}>
          {
            createArrayIfTrue(retailer.brands).map(brand => (
                <Box key={brand}>
                  <Text size='sm' key={brand} color='dark'>{brand}</Text>
                </Box>
            ))
          }
        </Box>
        <Divider my='lg' />
        <Text size='md' mb='md' weight={700}>Contact</Text>
        <Group mb='xs'>
          <IconPhone size={16} />
          <Text size='sm'>{retailer.phone}</Text>
        </Group>
        <Group mb='xs'>
          <IconLink size={16} />
          <Text size='sm'>{retailer.website}</Text>
        </Group>
        <Group mb='xs'>
          <IconMail size={16} />
          <Text size='sm'>{retailer.email}</Text>
        </Group>
        <Box sx={{display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px'}}>
          <IconMapPin size={16} />
          <Box>
            <Text size='sm'>{retailer.address}</Text>
          </Box>
        </Box>
        <Divider my='lg' />
        <Text size='md' mb='md' weight={700}>Social</Text>
        <Group spacing='sm'>
          {
            retailer.socialMedia['facebook'] && (
              <ActionIcon variant='outline' radius='xl' onClick={() => window.open(retailer.socialMedia.facebook, "_blank")}>
                <IconBrandFacebook size={16} />
              </ActionIcon>
            )
          }
          {
            retailer.socialMedia['instagram'] && (
              <ActionIcon variant='outline' radius='xl' onClick={() => window.open(retailer.socialMedia.instagram, "_blank")}>
                <IconBrandInstagram size={16} />
              </ActionIcon>
            )
          }
          {
            retailer.socialMedia['twitter'] && (
              <ActionIcon variant='outline' radius='xl' onClick={() => window.open(retailer.socialMedia.twitter, "_blank")}>
                <IconBrandTwitter size={16} />
              </ActionIcon>
            )
          }
          {
            retailer.socialMedia['youtube'] && (
              <ActionIcon variant='outline' radius='xl' onClick={() => window.open(retailer.socialMedia.youtube, "_blank")}>
                <IconBrandYoutube size={16} />
              </ActionIcon>
            )
          }
        </Group>
    </>
  )
}

export default RetailerDetailCard