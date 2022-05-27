import Homepage from "../components/homepage/Homepage"
import AppShell from "../components/appshell/AppShell"
import useFirebase from "../hooks/useFirebase"

export async function getStaticProps() {

  const { getCollection } = useFirebase()
    
  const res = await getCollection('brands')
  const brands = JSON.parse(JSON.stringify(res))
    
  return {
    props: {
      brands,
    },

    revalidate: 900
  }
    
}

const HomePage = ({brands}) => {

    return (
      <AppShell>
        <Homepage
            brands={brands}
        />
      </AppShell>
    )
}

export default HomePage