import { Title, Box, Text, Group, ActionIcon, Button, Divider, UnstyledButton, Anchor } from "@mantine/core"
import { IconBrandFacebook, IconBuildingStore, IconDirections, IconHeart, IconMapPin, IconMessageDots, IconPackgeExport, IconPhone, IconReceipt, IconSchool, IconShoppingCart, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconStar, IconShare, IconLink, IconMail } from "@tabler/icons"
import { deleteDoc } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from 'react'
import { deleteDocument } from "../../../helpers/firebaseHelpers"
import { sortArray } from "../../../helpers/formatters"
import useCheckAdmin from "../../../hooks/useCheckAdmin"
import { UserContext } from '../../../state/UserContext'


const RetailerDetailCard = ({retailer}) => {

  const { isAdmin }   = useCheckAdmin()
  const router = useRouter()

  const checkOfferings = () => {
    const offerings = []
    if (retailer.shoppingOptions.shopInStore) {
      offerings.push('Storefront')
    }
    if (retailer.shoppingOptions.orderOnline) {
      offerings.push('Online Shop')
    }
    if (retailer.services.rentals) {
      offerings.push('Rentals')
    }
    if (retailer.services.lessons) {
      offerings.push('Lessons')
    }

    //add a · in between each offering
    return offerings.join(' · ')
  }

  const daysOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  const checkforHTTP = () => {
    if (retailer.website.includes('http')) {
      return retailer.website
    } else {
      return `https://${retailer.website}`
    }
  }

  //check if retailer has hours, if not then return false
  const checkHasHours = () => {
    if(retailer?.hideHours){ return false }
    const days = []
    daysOfTheWeek.forEach(day => {
      if( !retailer.hours[day].open && !retailer.hours[day].close && !retailer.hours[day].closed) {
       days.push(false)
      }
      else {
        days.push(true)
      }
    })
    
    return ! days.every(check => check === false) 

  }


  const createArrayIfTrue = (obj) => {
    const array = []
    for (const key in obj) {
      if (obj[key].carry) {
        array.push(key)
      }
    }
    return sortArray(array)
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

  const checkAllCategory = (category, fields) => {
    const checks = fields.map(field => retailer[category][field])
    const pass = checks.every(check => check === '')
    return !pass
  }

  const convertToToday = (seconds) => {
    const date = new Date(seconds * 1000);
    const today = new Date();
    today.setHours(date.getHours());
    today.setMinutes(date.getMinutes());
    today.setSeconds(date.getSeconds());
    return today;
};

  const checkIfOpen = (listing) => {
    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
    const date = new Date();
    const dayNum = date.getDay();
    const day = daysOfTheWeek[dayNum].toLowerCase();

    const open = convertToToday(listing.hours[day].open.seconds);
    const close = convertToToday(listing.hours[day].close.seconds);
    const now = date
    
    if(listing.hours[day].closed === true){
        return false
    }

    return now > open && now < close 

  }

console.log(checkIfOpen(retailer))

  return (
    <>
          <Text sx={{fontSize: '1.6rem'}} weight={700} mt='lg'>{retailer.name}</Text>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem'}}>
            <Text size='sm' color='dimmed'>{checkOfferings()}</Text>
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
            <ActionIcon color='dark' radius='xl' size='lg' variant='outline' disabled={!retailer.address}
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${retailer.address}`, "_blank")}
            >
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
       
        {
          retailer.website &&
          <Button
            variant='outline' 
            color='dark' 
            radius='xl' 
            fullWidth
            onClick={() => window.open(checkforHTTP(), '_blank')}
            >Vist Website</Button>
        }
        {
          checkHasHours() && 
          <>
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
        </>
        }
        <Divider my='lg' />
        <Text size='md' mb='md' weight={700}>Brands Carried</Text>
        <Box sx={(theme) => ({display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 50%)', '& a': {color: theme.colors.gray}})}>
          {
            createArrayIfTrue(retailer.brands).map(brand => (
                <Box key={brand}>
                  <Link href={`/brands/${retailer.brands[brand].path}`} passHref>
                    <Anchor 
                      component='a' 
                      size='sm' 
                      key={brand}
                    >
                      {brand}
                    </Anchor>
                  </Link>
                </Box>
            ))
          }
        </Box>
        <Divider my='lg' />
        <Text size='md' mb='md' weight={700}>Contact</Text>
        {
          retailer.phone &&
          <Group mb='xs'>
            <IconPhone size={16} />
            <Text size='sm'>{retailer.phone}</Text>
          </Group>
        }
        {
          retailer.website && 
          <Group mb='xs'>
            <IconLink size={16} />
            <Text size='sm'>{retailer.website}</Text>
          </Group>
        }
        {
          retailer.email &&
          <Group mb='xs'>
            <IconMail size={16} />
            <Text size='sm'>{retailer.email}</Text>
          </Group>
        }
        {
          retailer.address &&
          <Box sx={{display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px'}}>
            <IconMapPin size={16} />
            <Box>
              <Text size='sm'>{retailer.address}</Text>
            </Box>
          </Box>
        }
        {
          checkAllCategory('socialMedia', ['facebook', 'instagram', 'twitter', 'youtube']) &&
          <>
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
        }
        {
          isAdmin
          &&
          <Box sx={{display: 'grid', justifyContent: 'start', gridTemplateColumns: '1fr 1fr', alignItems: 'center'}}>
            <Button fullWidth my='xl' size='xs' variant='subtle'
              onClick={() => {
                router.push('/retailers/' + retailer.path + '/edit')
              }}
            >
              Edit Details
            </Button>
            {/* <Button size='xs' color='red' variant='subtle'
              onClick={() => {
                deleteDocument('retailers', retailer.id)
                router.push('/retailers')
              }}
            >
              Delete
            </Button> */}
          </Box>
        }
    </>
  )
}

export default RetailerDetailCard