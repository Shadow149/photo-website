import React, {useState} from "react"
import MapGL, {Marker} from 'react-map-gl';


function LocationPicker (props) {
  
  const [viewport, setViewport] = useState({
    latitude: 52.2630288,
    longitude: 0.6060746,
    zoom: 11,
    bearing: 0,
    pitch: 0
  });

  if (props.mLat == null){
    return(
    <MapGL
      {...viewport}
      width="600px"
      height="400px"
      mapStyle="mapbox://styles/alfredroberts/ckp9pct361c8p17pkbg6j74de"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onClick={props.onClick}
    ></MapGL>)
  }
  return (
    <MapGL
      {...viewport}
      width="600px"
      height="400px"
      mapStyle="mapbox://styles/alfredroberts/ckp9pct361c8p17pkbg6j74de"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onClick={props.onClick}
    >
      <Marker latitude={props.mLat} longitude={props.mLng} offsetLeft={-15} offsetTop={-30}>
        <img src={process.env.PUBLIC_URL + "marker.png"} width="30px" height="30px" alt=''/>
      </Marker>
    </MapGL>
  );
  
}

export default LocationPicker;
