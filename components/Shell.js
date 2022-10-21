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
            sx={(theme) => ({
              display: 'grid',
              gridTemplateColumns: '1fr',
              borderBottom: `1px solid ${theme.colors.gray[2]}`,
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
                <Link href='/sign-in'>Sign In</Link>
              </Box>
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