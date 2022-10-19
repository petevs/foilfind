import '../styles/globals.css'
import { AppShell, Container, MantineProvider, TypographyStylesProvider } from '@mantine/core'
import { cache } from '../emotion-cache'
import Shell from '../components/Shell'

function MyApp({ Component, pageProps }) {

  return (
    <div>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'light'}}
        emotionCache={cache}
      >
        {/* <UserContext.Provider value={userData}> */}
        <TypographyStylesProvider>
          <Shell>
            <Component {...pageProps} />
          </Shell>
        </TypographyStylesProvider>
        {/* </UserContext.Provider> */}
    </MantineProvider>
    </div>
  )
}

export default MyApp