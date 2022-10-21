import { Box, Checkbox, Container, Group, JsonInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { TextInput, Paper, Text, Divider } from "@mantine/core";
import { TimeInput } from "@mantine/dates";

export default function EditRetailer({slug}) {

  const [retailer, setRetailer] = useState({})
  const [changed, setChanged] = useState(false)
  const [timeTest, setTimeTest] = useState(null)

  const daysOfTheWeek = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ]

  useEffect(() => {
    console.log(retailer)
  },[retailer])

  useEffect(() => {

    const getRetailer = async () => {
      if(slug){
        const q = query(collection(db, 'retailers'), where('path', '==', slug));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, ...doc.data()});
          });

        setRetailer(data[0])
      }
    }

    getRetailer()

  }, [slug])

  if(!retailer){
    return(
      <Container>
        <Text>Loading...</Text>
      </Container>
    )
  }


  return (
    <Container size='xl' p='xl' sx={{height: '100%'}}>


      <Box 
        sx={{
          display: 'grid', 
          gridTemplateColumns: '1fr 3fr', 
          gap: '2rem',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
          }
        }}
      >
        <Box py='xl'>
          <Text weight={700} size='xl'>Contact Information</Text>
          <Text color='dimmed' size='sm'>Update contact information for retailer</Text>
        </Box>
        <Paper shadow='sm' withBorder p='xl'>
          <Box sx={{display: 'grid', gridAutFlow: 'row', gap: '1rem'}}>
            <TextInput
              label="Website"
              value={retailer.website}
              onChange={(event) => {
                setRetailer({...retailer, website: event.currentTarget.value})
                setChanged(true)
              }}
            />
            <TextInput
              label='Address'
              value={retailer.address}
              onChange={(event) => {
                setRetailer({...retailer, address: event.currentTarget.value})
                setChanged(true)
              }}
            />

            <TextInput
              label="Phone"
              value={retailer.phone}
              onChange={(event) => {
                setRetailer({...retailer, phone: event.currentTarget.value})
                setChanged(true)
              }}
            />

            <TextInput
              label="Email"
              value={retailer.email}
              onChange={(event) => {
                setRetailer({...retailer, email: event.currentTarget.value})
                setChanged(true)
              }}
            />
            
          </Box>
        </Paper>
      </Box>

      <Divider my='xl' />


      <Box sx={{
        display: 'grid', 
        gridTemplateColumns: '1fr 3fr', 
        gap: '2rem',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
        }
      }}
    >
        <Box py='xl'>
          <Text weight={700} size='xl'>Hours</Text>
          <Text color='dimmed' size='sm'>Update open hours for retailer</Text>
        </Box>
        <Paper shadow='sm' withBorder p='xl'>
          <Box sx={{display: 'grid', gridAutFlow: 'row', gap: '1rem'}}>
            <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto 1fr', gap: '.5rem', alignItems: 'center'}}>
              <Text></Text>
              <Text size='xs' transform='uppercase' align='center'>Closed</Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
            </Box>
            {
              ('hours' in retailer) &&
              daysOfTheWeek.map((day, index) => {
                return(
                  <Box key={index} sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto 1fr', gap: '.5rem', alignItems: 'center'}}>
                    <Text transform='capitalize'>{day}</Text>
                    <Box sx={{justifySelf: 'center'}}>
                      <Checkbox
                        checked={retailer.hours?.[day]['closed']}
                        onChange={(event) => {
                          setRetailer({...retailer, hours: {...retailer.hours, [day]: {...retailer.hours[day], closed: event.currentTarget.checked}}})
                          setChanged(true)
                        }}
                      />
                    </Box>

                    <TimeInput 
                      value={retailer.hours?.[day]['closed'] ? null :  new Date(retailer.hours?.[day].open.seconds * 1000)}
                      format='12'
                      onChange={(event) => {
                        setRetailer({
                          ...retailer, 
                          hours: {
                            ...retailer.hours, 
                            [day]: {
                              ...retailer.hours[day], 
                              open: {
                                ...retailer.hours[day].open,
                                seconds: event.getTime() / 1000
                              }}}})
                        setChanged(true)
                      }}
                      disabled={retailer.hours?.[day].closed}
                    />
                    <Box>-</Box>
                    <TimeInput
                      format='12' 
                      value={retailer.hours?.[day]['closed'] ? null : new Date(retailer.hours?.[day].close.seconds * 1000)}
                      onChange={(event) => {
                        setRetailer({
                          ...retailer, 
                          hours: {
                            ...retailer.hours, 
                            [day]: {
                              ...retailer.hours[day], 
                              close: {
                                ...retailer.hours[day].close,
                                seconds: event.getTime() / 1000
                              }}}})
                        setChanged(true)
                      }
                    }
                    disabled={retailer.hours?.[day].closed}
                    />
                  </Box>
                )
              })
            }            
          </Box>
        </Paper>
      </Box>

    </Container>
  )

}