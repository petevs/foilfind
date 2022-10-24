import { Box, UnstyledButton, Container, Divider, Text } from "@mantine/core"
import Link from "next/link"
import Logo from "../Logo"
import { useContext } from 'react'
import { UserContext } from '../../state/UserContext'
import { auth } from "../../firebase"
import { useRouter } from "next/router"

const HeaderLink = ({text, path, currentURL}) => {


  const reg = (theme) => ({
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    color: theme.black,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    borderRadius: theme.radius.md,
    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  })

  const active = (theme) => ({
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    color: theme.black,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.blue[0],
    color: theme.colors.blue[5],
    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  })

  return (
    <Box>
      <Link href={path}>
        <UnstyledButton
          sx={currentURL === path ? active : reg}
        >
          {text}
        </UnstyledButton>
      </Link>
    </Box>
  )
}


export default function ShellHeader({fixed}){

  const { user } = useContext(UserContext)

  //log out user from firebase auth
  const logout = async () => {
    await auth.signOut()
  }

  const router = useRouter()

  console.log(router.asPath)

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
                position: fixed ? 'fixed' : 'relative',
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
                <HeaderLink text='Retailers' path='/retailers' currentURL={router.asPath} />
                <HeaderLink text='Brands' path='/brands' currentURL={router.asPath} />
                {/* {
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
                } */}
              </Box>
            </Box>
            </Box>
  )
}