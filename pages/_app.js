import '../styles/globals.css'
import { AppShell, Container, MantineProvider, TypographyStylesProvider } from '@mantine/core'
import { theme } from '../theme'
import { cache } from '../emotion-cache'
import Shell from '../components/Shell'
import { UserContext } from '../state/UserContext'
import { useUserData } from '../hooks/useUserData'

function MyApp({ Component, pageProps }) {

  const userData = useUserData()

  return (
    <div>
      <UserContext.Provider value={userData}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: 'light', ...theme }}
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
      </UserContext.Provider>
    </div>
  )
}

export default MyApp