import { Box, Title, Text } from '@mantine/core'
import Head from 'next/head'
import ComingSoon from '../components/ComingSoon'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import dayjs from 'dayjs'



export async function getStaticProps() {
  

  const getPosts = async () => {
    const updateList = []
    const q = query(collection(db, 'updates'), orderBy('date', 'desc'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const post = doc.data()
      const friendlyDate = dayjs(post.date.toDate()).format('MMMM DD YYYY h:mm A')
      updateList.push({
        ...post,
        date: friendlyDate
      })
    })
    return updateList

  }

  const res = await getPosts()
  const posts = JSON.parse(JSON.stringify(res))

  return {
    props: {
      posts,
    },

    revalidate: 900
  }

}


export default function Home({ posts }) {

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

      <ComingSoon 
        posts={posts}
      />
    </div>
  )
}
