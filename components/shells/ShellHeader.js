import { Box, UnstyledButton, Container, Divider, Text, Button } from "@mantine/core"
import Link from "next/link"
import { useContext } from 'react'
import { UserContext } from '../../state/UserContext'
import { auth } from "../../firebase"
import { useRouter } from "next/router"
import HeaderLayout from './header/HeaderLayout'

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

  return(
    <Box sx={(theme) => ({width: '100%', borderBottom: fixed ? 'none' : `1px solid ${theme.colors.gray[3]}`})}>
      <HeaderLayout 
        fixed={fixed}
      />
    </Box>
  )
}