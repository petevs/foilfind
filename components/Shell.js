import { Box, Container, Divider, Text } from "@mantine/core"
import Link from "next/link"
import Logo from "./Logo"

export default function Shell({children}){
  return(
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          minHeight: '100vh',
        }}
      >
          <Box component='header' p='md' sx={(theme) => ({borderBottom: `1px solid ${theme.colors.gray[2]}` })}>
            <Logo />
          </Box>

          <Box component='main'>
            {children}
          </Box>
      </Box>
      <Box component='footer'>
        <Divider />
        <Box sx={(theme) => ({display: 'grid', gridAutoFlow: 'column', gap: '1rem', justifyContent: 'start', padding: `${theme.spacing.md}px`})}>
          <Text color='dimmed'>© 2022 Foil Find. All rights reserved.</Text>
          <Link href='/privacy'>Privacy</Link>
          <Link href='/terms'>Terms</Link>
        </Box>
      </Box>
    </>
  )
}