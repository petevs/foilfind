import { getCollection } from "../helpers/firebaseHelpers";
import Head from "next/head";
import { Box, ActionIcon, Text } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import MapCard from "../components/MapCard";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { useLocalStorage } from "@mantine/hooks";
import "mapbox-gl/dist/mapbox-gl.css"
import { checkIfPositionInViewport } from '../helpers/withinBounds';
import useSuperCluster from 'use-supercluster'

export async function getStaticProps() {
  const retailers = await getCollection('retailers');
  return {
    props: {
      retailers,
    },
  };
}


export default function Retailers(props) {

  const { retailers } = props;
  const parsedRetailers = JSON.parse(retailers);
  const [showList, setShowList] = useState(true);
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

  const updateFilteredListings = (bounds) => {
    const newFiltered = parsedRetailers.filter(retailer => checkIfPositionInViewport(retailer.geo.latitude, retailer.geo.longitude, bounds))

    setFilteredListings(newFiltered)
  }

  useEffect(() => {

    if (mapRef.current){
      mapRef.current.resize()
      const bounds = mapRef.current.getMap().getBounds()
      const newFiltered = parsedRetailers.filter(retailer => checkIfPositionInViewport(retailer.geo.latitude, retailer.geo.longitude, bounds))
      setFilteredListings(newFiltered)
    }

  },[showList, viewState, parsedRetailers])

  const [currentListing, setCurrentListing] = useState(null)
  const [hoveredListing, setHoveredListing] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const handleMarkerClick = (e, listing) => {
    e.originalEvent.stopPropagation()
    setCurrentListing(listing)
  }

  const handlePopupClose = () => {
    setCurrentListing(null)
  }

  const handleBounds = () => {
    if(mapRef.current){
      const bounds = mapRef.current.getMap().getBounds()
      updateFilteredListings(bounds)
      setLoaded(true)
    }
  }


  const points = filteredListings.map((listing,idx) => {
    return {
      type: 'Feature',
      properties: {
        id: idx,
        cluster: false,
        ...listing
      },
      geometry: {
        type: 'Point',
        coordinates: [listing.geo.longitude, listing.geo.latitude]
      }
    }
  })

  // get clusters

  const { clusters, supercluster } = useSuperCluster({
    points,
    zoom: viewState.zoom,
    bounds: mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null,
    options: { radius: 75, maxZoom: 20 }
  })


  const highlightCluster = (clustID) => {
    const storesInside = supercluster.getLeaves(clustID).map(item => item.properties.name)
    if(storesInside.includes(highlightedListing)){
      return true
    }

    return false
  }


  const wrapper = (theme) => ({
    display: 'grid',
    gridTemplateColumns: showList ? '375px 1fr' : '1fr',
    width: '100%',
    height: 'calc(100vh - 130px)',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  })

  const desktopWrapper = (theme) => ({
    height: 'calc(100vh - 130px)',
    '@media (max-width: 768px)': {
      position: 'fixed',
      top: 75,
      left: 0,
      width: '100%',
      height: '100%'
    }
  })

  const headerArea = (theme) => ({
    '@media (max-width: 768px)': {
      display: 'none'
    }
  })

  return (
    <>
      <Head>
        <title>Wingfoil Retailers</title>
      </Head>
      <main>
        <Box sx={(theme) => ({...headerArea, padding: '1rem', borderBottom: `1px solid ${theme.colors.gray[2]}`})}>
          <h1>Retailers</h1>
        </Box>
        <Box sx={wrapper}>
          <Box sx={{height: '100%', overflowY: 'scroll', padding: '1rem'}}>
            {
              filteredListings.map(retailer => {
                return (
                  <MapCard
                    listing={retailer}
                    key={retailer.name}
                    setListingDetail={setCurrentListing}
                  />
                )
              }
              )
            }
          </Box>
          <Box sx={desktopWrapper}>
            <Box
              sx={{
                height: '100%',
                width: '100%',
              }}
            >
            <ReactMapGl
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              mapStyle="mapbox://styles/foilfind/cl80o676o000i14p8dhkmhfft"
              ref={(instance) => mapRef.current = instance}
              onMoveEnd={handleBounds}
              onZoomEnd={handleBounds}
              onLoad={handleBounds}
            >
              {
          clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates
            const { cluster: isCluster, point_count: pointCount } = cluster.properties

            if (isCluster) {
              return (
                <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
                  <div
                    className="cluster-marker"
                    style={{
                      width: `${10 + (pointCount / points.length) * 20}px`,
                      height: `${10 + (pointCount / points.length) * 20}px`,
                      background: highlightCluster(cluster.id) ? '#FA5252' : '#2C2E33'
                    }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      )
                      setViewState({
                        ...viewState,
                        latitude,
                        longitude,
                        zoom: expansionZoom,
                        transitionDuration: 'auto'
                      })
                    }}
                    >
                    {pointCount}
                    </div>
                </Marker>
              )
          }

          return (
            <Marker
              key={cluster.properties.id}
              latitude={latitude}
              longitude={longitude}
              offsetLeft={-15}
              offsetTop={-15}
              onClick={(e) => handleMarkerClick(e, cluster.properties)}
              style={{
                zIndex: (highlightedListing === cluster?.properties?.name || hoveredListing === cluster?.properties?.name || currentListing?.properties?.name === cluster?.properties?.name ) ? 1 : 0
              }}
            >
              <ActionIcon 
                variant='filled' 
                color={(highlightedListing === cluster.properties.name || currentListing?.name === cluster.properties.name) ? 'red' : 'dark'}
                radius='xl'
                size={14}
                sx={{
                  border: '1px solid white',
                  boxShadow: '0 0 0 2px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.1s ease-in-out',
                  }
                }}
                onMouseEnter={() => setHoveredListing(cluster.properties.name)}
                onMouseLeave={() => setHoveredListing(null)}
              >
                {/* <IconPoint size={12}/> */}
              </ActionIcon>
            </Marker>
          )
        })}
        {
          currentListing && 
            <Popup
              latitude={currentListing.geo.latitude}
              longitude={currentListing.geo.longitude}
              closeButton={false}
              onClose={handlePopupClose}
              offset={20}
            >
              {/* <Link href={`/retailers/${currentListing.path}`}> */}
                <Box 
                  p='xs'
                  onClick={() => setListingDetail(currentListing)}
                  sx={{
                    textAlign: 'center',
                    '&:hover': {
                      cursor: 'pointer',
                    }
                }}
                >
                    <Text weight={700} size='sm'>{currentListing.name}</Text>
                    <Text size='xs' color='dimmed'>Sales · Lessons · Rentals</Text>
                </Box>
              {/* </Link> */}
            </Popup>
        }
            </ReactMapGl>
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
}