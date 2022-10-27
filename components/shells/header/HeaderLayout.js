import React from 'react'
import Links from './Links'
import Logo from './Logo'
import MenuBox from './MenuBox'
import SearchBox from './SearchBox'
import { Box, Container } from '@mantine/core'
import Sidebar from './Sidebar'

const HeaderLayout = ({fixed}) => {
  return (

    <>    
      {/* DESKTOP LAYOUT */}

      <Box sx={(theme) => ({
        '@media (max-width: 1024px)': {
          display: 'none'
          }
        })}
      >
        <Container size='xl'>
          <Box sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            height: `${theme.other.headerHeight}px`,
          })}>
            <Box>
              <Logo />
            </Box>
            <Box>
              <SearchBox />
              <Links />
            </Box>
            <Box>
              <MenuBox 
                desktop={true}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* MOBILE LAYOUT */}

      <Box sx={{
        position: fixed ? 'fixed' : 'relative',
        width: '100%',
        '@media (min-width: 1024px)': {
          display: 'none'
      }}
      }>
        <Box sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          alignItems: 'center',
        })}
        >
          <Box>
            <Sidebar />
          </Box>
          <Box>
            <Logo />
          </Box>
          <Box>
            <MenuBox
              desktop={false}
            />
          </Box>
        </Box>
        <Box sx={{position: 'relative', width: '100%', overflow: 'hidden'}}>
          <Links />
        </Box>
      </Box>
    </>



  )
}

export default HeaderLayout