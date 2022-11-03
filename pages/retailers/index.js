import { getCollection } from '../../helpers/firebaseHelpers'
import MapPageWrapper from '../../components/pages/retailerMap/MapPageWrapper';
import Shell from '../../components/Shell';
import MapShell from '../../components/shells/MapShell';


export async function getStaticProps() {
  const rawRetailers = await getCollection('retailers');

  const northAmericaRetailers = rawRetailers.filter(retailer => (retailer.place.country_code === 'us' || retailer.place.country_code === '' || retailer.place.country_code === 'ca'));

  const retailers = JSON.stringify(northAmericaRetailers.filter(retailer => retailer?.hideRetailer !== true));

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