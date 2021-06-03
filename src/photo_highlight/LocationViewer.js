import React, {useState} from "react"
import MapGL, {Marker} from 'react-map-gl';


function LocationViewer (props) {

  const [viewport, setViewport] = useState({
    latitude: props.lat,
    longitude: props.lng,
    zoom: 11,
    bearing: 0,
    pitch: 0
  });
  
  if (props.lat == null) {
    return null;
  }
  return (
    <MapGL
      {...viewport}
      width={props.width}
      height={props.height}
      mapStyle="mapbox://styles/alfredroberts/ckp9pct361c8p17pkbg6j74de"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onClick={props.onClick}
    >
      <Marker latitude={props.lat} longitude={props.lng} offsetLeft={-15} offsetTop={-30}>
        <img src={process.env.PUBLIC_URL + "../marker.png"} width="30px" height="30px"/>
      </Marker>
    </MapGL>
  );
  
}

export default LocationViewer;
