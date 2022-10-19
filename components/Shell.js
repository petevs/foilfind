import { Box, Container, Divider, Text } from "@mantine/core"
import Link from "next/link"
import Logo from "./Logo"

export default function Shell({children}){
  return(
    <>
      <header>
        <Box p='md' sx={{height: 'auto'}}>
          <Logo />
        </Box>
        <Divider />
      </header>
      <main>
        <Box
          sx={{
            minHeight: 'calc(100vh - 60px)',
          }}
        >
          {children}
        </Box>
      </main>
      <footer>
        <Divider />
          <Box sx={(theme) => ({display: 'grid', gridAutoFlow: 'column', gap: '1rem', justifyContent: 'start', padding: `${theme.spacing.md}px`})}>
            <Text color='dimmed'>© 2022 Foil Find. All rights reserved.</Text>
            <Link href='/privacy'>Privacy</Link>
            <Link href='/terms'>Terms</Link>
          </Box>
      </footer>
    </>
  )
}