

// Get Server Side Props for User

import { getCollectionWhere } from "../../helpers/firebaseHelpers";
import BasicShell from "../../components/shells/BasicShell"
import { Box, Card, Container, Title, Text, Avatar, ActionIcon, Paper, Divider } from "@mantine/core";
import RatingsReadOnly from "../../components/RatingsReadOnly";
import Link from "next/link";
import { IconHeart } from "@tabler/icons";

export async function getServerSideProps(context) {
  const { username } = context.query;

  const userDocs = await getCollectionWhere("users", "username", "==", username);
  const user = userDocs[0]

  return {
    props: {
      user,
    },
  }

}


export default function UserPage({ user }) {

  const {
    retailerReviews,
    favoriteRetailers
  } = user

  return (
    <BasicShell>
      
      <Container size='lg' sx={(theme) => ({
        minHeight: `calc(100vh - ${theme.other.headerHeight}px)`
      })}>

        <Box py='md' sx={{display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem', alignItems: 'center'}}>
          <Avatar src={user.avatar} size='lg' radius='xl' />
          <Box>
            <Text weight={700} sx={{fontSize: '1.5rem'}}
            >
              @{user.username}
              </Text>
            <Text color='dimmed' size='sm'>{user.location}</Text>
          </Box>
        </Box>

        <Paper withBorder radius='md'>

          <Title px='md' pt='md' pb='xs' order={3}>Favorites</Title>
          <Box px='md' sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '1rem'}}>
            <Box pb='xs'>
              <Text>Gear</Text>
            </Box>
            <Box  pb='xs' sx={{borderBottom: '2px solid blue', color: 'blue', fontWeight: 500}}>
              <Text>Retailers</Text>
            </Box>
          </Box>
          <Divider />
          <Box p='md' sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
            {
              favoriteRetailers.map((retailer) => {
                return (
                  <Card withBorder key={retailer}>
                    <Box sx={{display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center'}}>
                      <Text weight={700}>{retailer}</Text>
                      <ActionIcon>
                        <IconHeart size={18} />
                      </ActionIcon>
                    </Box>
                  </Card>
                )
              }
              )
            }
          </Box>
        </Paper>


        <Paper withBorder radius='md' mt='md'>
        <Title px='md' pt='md' pb='xs' order={3}>Retailer Reviews</Title>
        <Box px='md' sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '1rem'}}>
            <Box pb='xs'>
              <Text>Gear</Text>
            </Box>
            <Box  pb='xs' sx={{borderBottom: '2px solid blue', color: 'blue', fontWeight: 500}}>
              <Text>Retailers</Text>
            </Box>
          </Box>
          <Divider />
        <Box p='md' sx={{display: 'grid', gridAutoFlow: 'row', gap: '1rem'}}>
          {
            Object.keys(retailerReviews).map((retailer) => {
              return (
                <Card withBorder key={retailer}>
                  <Link href={`/retailers/${retailerReviews[retailer].path}`}>
                    <Text weight={700}>{retailer}</Text>
                  </Link>
                  <RatingsReadOnly
                    rating={retailerReviews[retailer].rating}
                  />
                  <Text
                    color='dimmed'
                  >
                    {retailerReviews[retailer].review}
                  </Text>
                </Card>
              )
            }
            )
          }
        </Box>
        </Paper>


      </Container>
    </BasicShell>
  )
}