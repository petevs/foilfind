import { getCollection } from '../../helpers/firebaseHelpers'
import MapPageWrapper from '../../components/pages/retailerMap/MapPageWrapper';
import Shell from '../../components/Shell';
import MapShell from '../../components/shells/MapShell';


export async function getStaticProps() {
  const rawRetailers = await getCollection('retailers');

  const retailers = JSON.stringify(rawRetailers)

  return {
    props: {
      retailers,
    },
  };
}



export default function RetailersPage(props) {

  const { retailers } = props
  const parsedRetailers = JSON.parse(retailers)

  return (
    <MapShell>
      <MapPageWrapper 
        parsedRetailers={parsedRetailers}
      />
    </MapShell>
  );
}