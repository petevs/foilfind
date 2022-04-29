import { Box, Title, Text } from '@mantine/core'
import Head from 'next/head'
import Shell from '../components/Shell'

export default function Home() {

  const boxStyle = {
    display: 'grid',
    justifyItems: 'center',
    minHeight: '100vh',
    alignContent: 'center',
  }

  return (
    <div>
      <Head>
        <title>Foil Find</title>
        <meta name="description" content="Foil Find" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shell>
        {/* <Box sx={boxStyle}>
          <Title>Foil Find</Title>
          <Text>The world&apos;s best place to find foil answers</Text>
        </Box> */}
      </Shell>
    </div>
  )
}
