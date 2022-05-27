import {
    Marker,
    MarkerClusterer,
  } from "@react-google-maps/api";

const MapMarkers = ({ listings }) => {

    return (
        <MarkerClusterer
            onClick={() => alert('more than one click')}
        >
        {(clusterer) => 
            listings.map((listing, idx) => {
                if(listing.geo.latitude !== null && listing.geo.longitude !== null){
                    return (
                        <Marker
                            key={idx}
                            position={{lat: listing.geo.latitude, lng: listing.geo.longitude}}
                            clusterer={clusterer}
                            // onClick={() => setCurrentListing(listing)}
                        />
                    )
                }
            })
        }
        </MarkerClusterer>
    )
}

export default MapMarkers