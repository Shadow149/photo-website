import React, {useState} from 'react';
import Map, {  
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import InteractiveMarker from './InteractiveMarker';


function MultiLocationViewer (props) {

  const [viewport, setViewport] = useState({
    zoom: 6,
    latitude: props.mid.lat,
    longitude: props.mid.lng,
    bearing: 0,
    pitch: 0
  });
  const [showMarkerInfo, setShowMarkerInfo] = useState(Array(props.photos.length).fill(false));
  const [showMarkerInfoPrev, setShowMarkerInfoPrev] = useState(null);


  const updateInfo = () => {
    setShowMarkerInfo(Array(props.photos.length).fill(false))
  }

  const markerClick = (i) => {
    const _showMarkerInfo = showMarkerInfo.slice()
    _showMarkerInfo[i] = !_showMarkerInfo[i];
    if (showMarkerInfoPrev != null && showMarkerInfoPrev !== i) {
      _showMarkerInfo[showMarkerInfoPrev] = false;
    }
    console.log(_showMarkerInfo)
    setShowMarkerInfo(_showMarkerInfo);
    setShowMarkerInfoPrev(i);
  }
  
  let interactiveMarkers = []
  
  for (let i = 0; i < props.photos.length; i++) {
    interactiveMarkers.push(
      <InteractiveMarker key={i} photo={props.photos[i]} showInfo={showMarkerInfo[i]} onClick={() => markerClick(i)}/>
    );
  }

  return (
    <Map
      initialViewState = {viewport}
      style={{width: props.width, height: props.height}}
      mapStyle="mapbox://styles/alfredroberts/ckp9pct361c8p17pkbg6j74de"
      onViewportChange={nextViewport  => setViewport(nextViewport)}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      // onClick={updateInfo}
    >
      <GeolocateControl position="top-right" />
      <FullscreenControl position="top-right" />
      <NavigationControl position="top-right" />
      <ScaleControl />
      {interactiveMarkers}
    </Map>
  );
  
}

export default MultiLocationViewer;
