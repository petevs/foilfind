import { useRouter } from 'next/router'
import { getCollection } from '../../../helpers/firebaseHelpers';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import Link from 'next/link';
import { Button, Text } from '@mantine/core';
import BasicShell from '../../../components/shells/BasicShell';
import MapShell from '../../../components/shells/MapShell';
import MapPageWrapper from '../../../components/pages/retailerMap/MapPageWrapper';



//get static paths for retailers from firebase
export async function getStaticPaths() {
  const retailers = await getCollection('retailers');
  const paths = retailers.map((retailer) => ({
    params: { retailer: retailer.path },
  }))
  return { paths, fallback: false }
}

//get static props for retailer from firebase
export async function getStaticProps({ params }) {

  const q = query(collection(db, 'retailers'), where('path', '==', params.retailer));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });

  const retailer = data[0];
  const allRetailers = JSON.stringify(data)


  return {
    props: {
      retailer,
      allRetailers
    },
  }
}


export default function RetailersPage(props) {

  //get slug from url
  const router = useRouter()
  const { retailer, allRetailers } = props
  const parsedRetailers = JSON.parse(allRetailers)

  return(
    <MapShell>
      <MapPageWrapper
        parsedRetailers={parsedRetailers}
        selectedRetailer={retailer}
        retailerPage={true}
      />
    </MapShell>
  )
}