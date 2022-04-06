import Head from 'next/head'
import Shell from '../components/Shell'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Foil Find</title>
        <meta name="description" content="Foil find" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shell>
        Now
      </Shell>
    </div>
  )
}
