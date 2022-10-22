import '../styles/globals.css'
import { MantineProvider, TypographyStylesProvider } from '@mantine/core'
import { theme } from '../theme'
import { cache } from '../emotion-cache'
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
              <Component {...pageProps} />
          </TypographyStylesProvider>
          {/* </UserContext.Provider> */}
      </MantineProvider>
      </UserContext.Provider>
    </div>
  )
}

export default MyApp