import '../styles/globals.css'
import { AppShell, Container, MantineProvider, TypographyStylesProvider, Box } from '@mantine/core'
import { theme } from '../theme'
import { cache } from '../emotion-cache'
import Shell from '../components/Shell'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextLink } from '@mantine/next'

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  return (
    <div>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'light', ...theme }}
        emotionCache={cache}
      >
        {/* <UserContext.Provider value={userData}> */}
        <TypographyStylesProvider>
          {/* <Shell> */}
          <Box>
            <Link href='/' passHref>Home</Link>
            <Link href='/brands' passHref>Brands</Link>
            <Link href='/terms' passHref>Terms</Link>
          </Box>
            <Component {...pageProps} />
          {/* </Shell> */}
        </TypographyStylesProvider>
        {/* </UserContext.Provider> */}
    </MantineProvider>
    </div>
  )
}

export default MyApp