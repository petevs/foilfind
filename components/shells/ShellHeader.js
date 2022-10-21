import { Box, Button, Container, Divider, Text } from "@mantine/core"
import Link from "next/link"
import Logo from "../Logo"
import { useContext } from 'react'
import { UserContext } from '../../state/UserContext'
import { auth } from "../../firebase"


export default function ShellHeader(){

  const { user } = useContext(UserContext)

  //log out user from firebase auth
  const logout = async () => {
    await auth.signOut()
  }

  return(
    <Box 
            component='header'  
            sx={(theme) => ({
              display: 'grid',
              gridTemplateColumns: '1fr',
              borderBottom: `1px solid ${theme.colors.gray[2]}`,
              height: `${theme.other.headerHeight}px`,
              '@media (max-width: 768px)': {
                height: `${theme.other.headerHeight}px`,
                position: 'fixed',
                width: '100%',
              }
            })}
          >
            <Box sx={(theme) => ({backgroundColor: theme.colors.violet[9], display: 'grid', alignItems: 'center'})}>
              <Text size='xs' weight={500} align='center' color='white'>This Site is Currently Under Construction</Text>
            </Box>
            <Box 
              px='md'
              sx={{
                display: 'grid', 
                gridTemplateColumns: 'auto 1fr',
                alignItems: 'center',
                columnGap: '1rem',
              }}
            >
              <Logo />
              <Box sx={{display: 'grid', gridAutoFlow: 'column', gap: '1rem', justifyContent: 'end'}}>
                <Link href='/retailers'>Retailers</Link>
                <Link href='/brands'>Brands</Link>
                {
                  user ? (
                    <>
                      <Link href='/profile'>Profile</Link>
                      <Button variant='outline' color='violet' size='sm' onClick={logout}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Link href='/sign-in'>Sign In</Link>
                    </>
                  )
                }
              </Box>
            </Box>
            </Box>
  )
}