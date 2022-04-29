import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {


  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
    <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
        }}
    >
      <Component {...pageProps} />
  </MantineProvider>
   </ColorSchemeProvider>
  )
}

export default MyApp
