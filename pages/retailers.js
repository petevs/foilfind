import { getCollection } from '../helpers/firebaseHelpers'
import { useState, useRef } from 'react'
import MapPageWrapper from '../components/pages/retailerMap/MapPageWrapper';
import { useLocalStorage } from '@mantine/hooks';


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
  const mapRef = useRef(null)
  const [filteredListings, setFilteredListings] = useState(parsedRetailers)
  const [highlightedListing, setHighlightedListing] = useState(null)

  const [viewState, setViewState] = useLocalStorage({
    key: 'viewState',
    defaultValue: {
      latitude: 41.79,
      longitude: -102.65,
      zoom: 4
    }
  })

  return (
    <>
      <MapPageWrapper />
    </>
  );
}