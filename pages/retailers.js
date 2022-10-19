import { getCollection } from "../helpers/firebaseHelpers";
import Head from "next/head";
import { Box, ScrollArea } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import MapCard from "../components/MapCard";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { useLocalStorage } from "@mantine/hooks";
import "mapbox-gl/dist/mapbox-gl.css"

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

  const [viewState, setViewState] = useLocalStorage({
    key: 'viewState',
    defaultValue: {
      latitude: 41.79,
      longitude: -102.65,
      zoom: 4
    }
  })


  const wrapper = (theme) => ({
    display: 'grid',
    gridTemplateColumns: showList ? '375px 1fr' : '1fr',
    width: '100%',
    height: 'calc(100vh - 106.7px - 120px)',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  })

  const desktopWrapper = (theme) => ({
    height: 'calc(100vh - 120px - 106.7px)',
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
        <title>Windfoil Retailers</title>
      </Head>
      <main>
        <Box sx={{...headerArea, padding: '1rem'}}>
          <h1>Retailers</h1>
        </Box>
        <Box sx={wrapper}>
          <Box sx={{height: '100%', overflowY: 'scroll', padding: '1rem'}}>
            {
              parsedRetailers.map(retailer => {
                return (
                  <MapCard
                    listing={retailer}
                    key={retailer.name}
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
              // style={{
              //   width: '100%',
              //   height: 'calc(100vh - 64px)',
              // }}
              // onMove={evt => setViewState(evt.viewState)}
              mapStyle="mapbox://styles/foilfind/cl80o676o000i14p8dhkmhfft"
              ref={(instance) => mapRef.current = instance}
              // onMoveEnd={handleBounds}
              // onZoomEnd={handleBounds}
              // onLoad={handleBounds}
              // minZoom={30}
              // maxZoom={100}
            >
              
            </ReactMapGl>
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
}