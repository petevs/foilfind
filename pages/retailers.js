import { getCollection } from '../helpers/firebaseHelpers'
import { useState } from 'react'
import MapPageWrapper from '../components/pages/retailerMap/MapPageWrapper';


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

  const [showList, setShowList] = useState(true)

  return (
    <>
      <MapPageWrapper />
    </>
  );
}