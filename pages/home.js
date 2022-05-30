import Homepage from "../components/homepage/Homepage"
import AppShell from "../components/appshell/AppShell"
import { getCollection } from "../getProps/getCollection"

export async function getStaticProps() {


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