import { Box, Divider, Text } from "@mantine/core"
import Link from "next/link"
import Logo from "./Logo"

export default function Header(){
  return (
    <header>
    <Box p='md' sx={{height: 'auto', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem'}}>
      <Logo />
      <Box sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '1rem', alignContent: 'end'}}>
        <Link href='/brands'>
          <Text>Brands</Text>
        </Link>
        <Link href='/retailers'>
          <Text>Retailers</Text>
        </Link>
      </Box>
    </Box>
    <Divider />
  </header>
  )
}