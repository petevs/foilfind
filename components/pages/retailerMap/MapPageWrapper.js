import { Box, Text, ActionIcon, Group, Divider, Title } from "@mantine/core";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css"
import { useLocalStorage } from '@mantine/hooks';
import { checkIfPositionInViewport } from '../../../helpers/withinBounds';
import useSuperCluster from 'use-supercluster'
import { useState, useRef, useEffect } from 'react'
import MapCard from './MapCard';
import SidebarToggle from "./SidebarToggle";
import ListingDrawer from "./ListingDrawer";
import RetailerDetailCard from "./RetailerDetailCard";
import { IconChevronLeft, IconX } from "@tabler/icons";
import { useRouter } from 'next/router'
import RetailerMapFilters from "./RetailerMapFilters";
import { filterListingsReducer } from "./filterListingsReducer";

export default function MapPageWrapper({ parsedRetailers, selectedRetailer, retailerPage, brandPage }) {


  const initialFilters = {
    onlineShop: false,
    storefront: false,
    lessons: false,
    rentals: false,
    featured: false,
    brands: []
  }




  const [showList, setShowList] = useState(true)
  const mapRef = useRef(null)
  const [filteredListings, setFilteredListings] = useState(parsedRetailers)
  const [highlightedListing, setHighlightedListing] = useState(selectedRetailer || null)
  const [listingDetail, setListingDetail] = useState(selectedRetailer || null)
  const [filters, setFilters] = useState(initialFilters)

  const router = useRouter()

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
      
      const withFilters = filterListingsReducer(newFiltered, filters)

      setFilteredListings(withFilters)
    }

  },[showList, viewState, parsedRetailers, filters])

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

  const headerHeight = '125px'

  const headerBox = (theme) => ({
    height: headerHeight,
    padding: `${theme.spacing.md}px`,
    borderBottom: `1px solid ${theme.colors.gray[2]}`,
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  })

  const wrapper = (theme) => ({
    display: 'grid',
    gridTemplateColumns: showList ? '375px 1fr' : '1fr',
    height: `calc(100vh - ${theme.other.headerHeight}px - ${headerHeight})`,
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  })

  return (
    <>
      <Box sx={headerBox}>
        <Title order={1}>Find Foil Shops</Title>
        <RetailerMapFilters
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
      <Box sx={wrapper}>
        {
          (!retailerPage && !brandPage) && (
          <SidebarToggle 
            showList={showList}
            setShowList={setShowList}
            headerHeight={headerHeight}
          />
          )
        }
        {
          showList && (
            <Box sx={(theme) => ({
              padding: `${theme.spacing.md}px`, 
              overflowY: 'scroll',
              '@media (max-width: 768px)': {
                display: 'none'
              }
            })}>

{
                listingDetail
                ?
                  <Box>
                    <Group
                      sx={{
                        '&:hover': {
                          cursor: 'pointer'
                        }
                      }}
                      spacing='xs' 
                      onClick={() => {
                        if(retailerPage){
                          router.push('/retailers')
                          return
                        }
                        setListingDetail(null)
                      }}
                    >
                      <IconChevronLeft size={14} />
                      <Text weight={600}>
                        Back to All Listings
                      </Text>
                    </Group>
                    <Divider mt='md' />
                  </Box>
                :
                <Box>
                  <Text weight={600} size='sm'>Showing Results 1 - {filteredListings.length}</Text>
                  <Divider my='md' />
                </Box>
              }

            {
                  showList &&

                  <>
                    {
                      listingDetail 
                    ?
                      <Box px='md'>
                        <RetailerDetailCard retailer={listingDetail} />
                      </Box>
                    :                  
                      filteredListings.map(retailer => {
                        return (
                          <MapCard
                            listing={retailer}
                            key={retailer.name}
                            mouseEnter={() => setHighlightedListing(retailer.name)}
                            mouseLeave={() => setHighlightedListing(null)}
                            setListingDetail={setListingDetail}
                          />
                        )
                      })
                    }
                  </>
                }
            </Box>
          )
        }
        <Box
          sx={(theme) => ({
            '@media (max-width: 768px)': {
              position: 'fixed',
              top: `${theme.other.headerHeight}px`,
              left: 0,
              width: '100%',
              height: `calc(100vh - ${theme.other.headerHeight}px)`,
            }
          })
        }
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

      <ListingDrawer
          listings={filteredListings}
          highlightedListing={highlightedListing}
          setHighlightedListing={setHighlightedListing}
          listingDetail={listingDetail}
          setListingDetail={setListingDetail}
      />
    </>
  )
}