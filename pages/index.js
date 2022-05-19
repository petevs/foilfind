import { Box, Title, Text } from '@mantine/core'
import Head from 'next/head'
import ComingSoon from '../components/ComingSoon'
import Shell from '../components/Shell'

export default function Home() {

  const boxStyle = {
    display: 'grid',
    justifyItems: 'center',
    minHeight: '100vh',
    alignContent: 'center',
    overflowY: 'scroll'
  }

  return (
    <div>
      <Head>
        <title>Foil Find</title>
        <meta name="description" content="Foil Find" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ComingSoon />
    </div>
  )
}
