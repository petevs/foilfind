import { useMemo, useCallback, useRef } from "react"
import { Box } from "@mantine/core"
import { GoogleMap } from "@react-google-maps/api"
import { useLoadScript } from '@react-google-maps/api'


const Map = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
      })

    const mapRef = useRef()

    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
        zoomControl: true,
        gestureHandling: 'greedy'
    }),[])

    const center = useMemo(() => ({
        lat: 43,
        lng: -80,
    }), [])

    const onLoad = useCallback(map => (mapRef.current = map), [])

    

    if (!isLoaded) return <div>Loading...</div>

    return (    
        <Box>
            <GoogleMap
                zoom={10}
                center={center}
                options={options}
                mapContainerStyle={{
                    width: '100%',
                    height: 'calc(100vh - 62px - 60px)'
                }}
                onLoad={onLoad}
                // onIdle={onIdle}

            >
            </GoogleMap>
        </Box>
    )
}

export default Map