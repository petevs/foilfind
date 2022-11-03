import { Box, Button, Checkbox, Container, Group, JsonInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { TextInput, Paper, Text, Divider } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { createDocument, deleteDocument } from "../../../helpers/firebaseHelpers";
import { useRouter } from "next/router";
import { sortArray } from "../../../helpers/formatters";
import FormHeader from "./FormHeader";
import FormWrapper from "./FormWrapper";
import SectionWrapper from "./SectionWrapper";

export default function EditRetailer({slug}) {

  const router = useRouter()
  const [initialRetailer, setInitialRetailer] = useState(null)
  const [retailer, setRetailer] = useState({})
  const [changed, setChanged] = useState(false)

  const daysOfTheWeek = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ]

  //update retailer in firestore
  const updateRetailer = async () => {
    await createDocument('retailers', retailer.id, retailer)
    router.reload(window.location.pathname)
  }

  useEffect(() => {

    const getRetailer = async () => {
      if(slug){
        const q = query(collection(db, 'retailers'), where('path', '==', slug));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, ...doc.data()});
          });
        setInitialRetailer(data[0])
        setRetailer(data[0])
      }
    }

    getRetailer()

  }, [slug])    

  console.log(retailer)

  if(!retailer){
    return(
      <Container>
        <Text>Loading...</Text>
      </Container>
    )
  }


  return (
    <Container size='xl' p='xl' sx={{height: '100%'}}>


<SectionWrapper>

    <FormHeader
      title='Contact Information'
      subtitle='Update contact information for retailer'
    />
              <FormWrapper
                disabled={!changed}
                onSave={updateRetailer}
                reset={() => setRetailer(initialRetailer)}
              >

                <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
                  <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                    <Checkbox
                      label='Featured'
                      checked={retailer.featured}
                      onChange={(e) => {
                        setRetailer({...retailer, featured: e.currentTarget.checked})
                        setChanged(true)
                      }}
                    />
                    <Checkbox
                      label='Hide Retailer'
                      checked={retailer.hideRetailer}
                      onChange={(e) => {
                        setRetailer({...retailer, hideRetailer: e.currentTarget.checked})
                        setChanged(true)
                      }}
                    />
                  </Box>
                  <TextInput
                    label="Name"
                    value={retailer.name}
                    onChange={(event) => {
                      setRetailer({...retailer, name: event.currentTarget.value})
                      setChanged(true)
                    }}
                  />
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
              </FormWrapper>
</SectionWrapper>

      <Divider my='xl' />


      <SectionWrapper>
        <FormHeader
          title='Hours'
          subtitle='Update open hours for retailer'
        />
        <FormWrapper
          disabled={!changed}
          onSave={updateRetailer}
          reset={() => setRetailer(initialRetailer)}
        >
          <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
            <Checkbox
              label='Hide Hours'
              checked={retailer.hideHours}
              onChange={(event) => {
                setRetailer({...retailer, hideHours: event.currentTarget.checked})
                setChanged(true)
              }}
            />    
            {
              ('hours' in retailer) &&
              daysOfTheWeek.map((day, index) => {
                return(
                  <Box key={index} sx={{
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 1fr auto 1fr', 
                    gap: '.5rem', 
                    alignItems: 'center',
                    '@media (max-width: 768px)': {
                      gridTemplateColumns: '1fr auto 1fr',
                      gap: '1rem'
                    }
                  }}>
                    <Text
                      size='md'
                      sx={{
                        '@media (max-width: 768px)': {
                          gridColumn: '1 / 2',
                        }}
                      } 
                      transform='capitalize'
                      >
                        {day}
                      </Text>
                    <Box sx={{justifySelf: 'center',
                      '@media (max-width: 768px)': {
                        gridColumn: '3',
                        justifySelf: 'end'
                      }
                  }}>
                      <Checkbox
                        label={'Closed'}
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
        </FormWrapper>
      </SectionWrapper>

      <Divider my='xl' />


      <SectionWrapper>
        <FormHeader
          title='Brands'
          subtitle='Update brands carried by retailer'
        />

        <FormWrapper
          disabled={!changed}
          onSave={updateRetailer}
          reset={() => setRetailer(initialRetailer)}
        >
          <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.5rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr 1fr'
            }
        }}>
            {
              ('brands' in retailer) &&
              sortArray(Object.keys(retailer.brands)).map((brand, index) => {
                return(
                      <Checkbox
                        key={brand}
                        label={brand.charAt(0).toUpperCase() + brand.slice(1)}
                        checked={retailer.brands[brand].carry}
                        onChange={(event) => {
                          setRetailer({
                            ...retailer, 
                            brands: {
                              ...retailer.brands, 
                              [brand]: {
                                ...retailer.brands[brand],
                                carry: event.currentTarget.checked
                              }}})
                          setChanged(true)
                        }}
                      />
                )
              }
              )
            }
          </Box>
        </FormWrapper>
      </SectionWrapper>


      <Divider my='xl' />


      <SectionWrapper>
        <FormHeader
          title='Services'
          subtitle='Update services provided by retailer'
        />

        <FormWrapper
          disabled={!changed}
          onSave={updateRetailer}
          reset={() => setRetailer(initialRetailer)}
        >
          <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '.5rem'}}>
            {
              ('services' in retailer) &&
              Object.keys(retailer.services).map((service, index) => {
                return(
                      <Checkbox
                        key={service}
                        label={service.charAt(0).toUpperCase() + service.slice(1)}
                        checked={retailer.services[service]}
                        onChange={(event) => {
                          setRetailer({...retailer, services: {...retailer.services, [service]: event.currentTarget.checked}})
                          setChanged(true)
                        }}
                      />
                )
              }
              )
            }
          </Box>
        </FormWrapper>
      </SectionWrapper>


      <Divider my='xl' />


      <SectionWrapper>
        <FormHeader
          title='Shopping Options'
          subtitle='Update shopping options provided by retailer'
        />
        <FormWrapper
          disabled={!changed}
          onSave={updateRetailer}
          reset={() => setRetailer(initialRetailer)}
        >
          <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '.5rem'}}>
            {
              ('shoppingOptions' in retailer) &&
              Object.keys(retailer.shoppingOptions).map((option, index) => {
                return(
                      <Checkbox
                        key={option}
                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                        checked={retailer.shoppingOptions[option]}
                        onChange={(event) => {
                          setRetailer({...retailer, shoppingOptions: {...retailer.shoppingOptions, [option]: event.currentTarget.checked}})
                          setChanged(true)
                        }}
                      />
                )
              }
              )
            }
          </Box>
        </FormWrapper>
      </SectionWrapper>

      <Divider my='xl' />


<SectionWrapper>
  <FormHeader
    title='Support'
    subtitle='Update support options'
  />
  <FormWrapper
    disabled={!changed}
    onSave={updateRetailer}
    reset={() => setRetailer(initialRetailer)}
  >
    <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '.5rem'}}>
      {
        ('support' in retailer) &&
        Object.keys(retailer.support).map((supportType, index) => {
          return(
                <Checkbox
                  key={supportType}
                  label={supportType.charAt(0).toUpperCase() + supportType.slice(1)}
                  checked={retailer.support[supportType]}
                  onChange={(event) => {
                    setRetailer({...retailer, support: {...retailer.support, [supportType]: event.currentTarget.checked}})
                    setChanged(true)
                  }}
                />
          )
        }
        )
      }
    </Box>
  </FormWrapper>
</SectionWrapper>


<Divider my='xl' />


<SectionWrapper>
  <FormHeader
    title='Social Media'
    subtitle='Update social media accounts'
  />
  <FormWrapper
    disabled={!changed}
    onSave={updateRetailer}
    reset={() => setRetailer(initialRetailer)}
  >
    <Box sx={{display: 'grid', gridAutoFlow: 'row', gap: '.5rem'}}>
      {
        ('socialMedia' in retailer) &&
        Object.keys(retailer.socialMedia).map((socialMediaType, index) => {
          return(
                <TextInput
                  key={socialMediaType}
                  label={socialMediaType.charAt(0).toUpperCase() + socialMediaType.slice(1)}
                  value={retailer.socialMedia[socialMediaType]}
                  onChange={(event) => {
                    setRetailer({...retailer, socialMedia: {...retailer.socialMedia, [socialMediaType]: event.currentTarget.value}})
                    setChanged(true)
                  }}
                />
          )
        }
        )
      }
    </Box>
  </FormWrapper>
</SectionWrapper>

      <Divider my='xl' />
      <Box sx={{display: 'grid', gridTemplateColumns: 'auto', alignContent: 'end'}}>
        <Button
          sx={{justifySelf: 'end'}}
          onClick={() => {
            deleteDocument('retailers', retailer.id)
            router.push('/retailers')
          }}
          color='red'
        >Delete</Button>
      </Box>

    </Container>
  )

}