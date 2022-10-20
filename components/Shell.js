import { Box, Container, Divider, Text } from "@mantine/core"
import Link from "next/link"
import Logo from "./Logo"

export default function Shell({children}){
  return(
    <>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateRows: `${theme.other.headerHeight}px calc(100vh - ${theme.other.headerHeight}px)`,
        })}
      >
          <Box 
            component='header' 
            p='md' 
            sx={(theme) => ({
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              alignItems: 'center',
              gap: '1rem',
              borderBottom: `1px solid ${theme.colors.gray[2]}`,
              '@media (max-width: 768px)': {
                height: `${theme.other.headerHeight}px`,
                position: 'fixed',
              }
            })}
          >
            <Logo />
            <Box sx={{display: 'grid', gridAutoFlow: 'column', gap: '1rem', justifyContent: 'end'}}>
              <Link href='/retailers'>Retailers</Link>
              <Link href='/brands'>Brands</Link>
            </Box>
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