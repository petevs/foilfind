import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import { useState } from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import UserContext from '../state/UserContext'
import useUserData from '../hooks/useUserData';


function MyApp({ Component, pageProps }) {


  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const userData = useUserData()

  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
      >
        <UserContext.Provider value={userData}>
          <Component {...pageProps} />
        </UserContext.Provider>
    </MantineProvider>
   </ColorSchemeProvider>
  )
}

export default MyApp
