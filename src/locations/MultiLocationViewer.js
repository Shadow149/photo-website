import React, {useState, useEffect} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import InteractiveMarker from './InteractiveMarker';


function MultiLocationViewer (props) {

  const [viewport, setViewport] = useState({
    zoom: 6,
    latitude: props.mid.lat + 8,
    longitude: props.mid.lng,
    bearing: 0,
    pitch: 0
  });
  const [showMarkerInfo, setShowMarkerInfo] = useState(Array(props.photos.length).fill(false));
  const [showMarkerInfoPrev, setShowMarkerInfoPrev] = useState(null);


  const updateInfo = () => {
    setShowMarkerInfo(Array(props.photos.length).fill(false))
    console.log('map click')
  }

  const markerClick = (i) => {
    const _showMarkerInfo = showMarkerInfo.slice()
    _showMarkerInfo[i] = !_showMarkerInfo[i];
    if (showMarkerInfoPrev && showMarkerInfoPrev != i) {
      _showMarkerInfo[showMarkerInfoPrev] = false;
    }
    setShowMarkerInfo(_showMarkerInfo);
    setShowMarkerInfoPrev(i);
  }
  
  let interactiveMarkers = []

  for (let i = 0; i < props.photos.length; i++) {
    interactiveMarkers.push(
      <InteractiveMarker photo={props.photos[i]} showInfo={showMarkerInfo[i]} onClick={() => markerClick(i)}/>
    );
  }

  return (
    <MapGL
      {...viewport}
      width={props.width}
      height={props.height}
      mapStyle="mapbox://styles/alfredroberts/ckp9pct361c8p17pkbg6j74de"
      onViewportChange={nextViewport  => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onClick={updateInfo}
    >
      {interactiveMarkers}
    </MapGL>
  );
  
}

export default MultiLocationViewer;
