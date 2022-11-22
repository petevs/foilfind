import { getCollectionWhere } from '../../helpers/firebaseHelpers'
import MapPageWrapper from '../../components/pages/retailerMap/MapPageWrapper';
import Shell from '../../components/Shell';
import MapShell from '../../components/shells/MapShell';


export async function getStaticProps() {
  const rawRetailers = await getCollectionWhere('retailers', 'public', '==', true);

  const retailers = JSON.stringify(rawRetailers);

  //find all the unique brands in retailers

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