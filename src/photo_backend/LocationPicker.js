import React from "react"
import MapGL, {Marker} from 'react-map-gl';


class LocationPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 52.2630288,
        longitude: 0.6060746,
        zoom: 11,
        bearing: 0,
        pitch: 0
      }
    };
    console.log(process.env)
  }
  
  render() {
    if (this.props.mLat == null){
      return(
      <MapGL
        {...this.state.viewport}
        width="600px"
        height="400px"
        mapStyle="mapbox://styles/alfredroberts/ckp9pct361c8p17pkbg6j74de"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClick={this.props.onClick}
      ></MapGL>)
    }
    return (
      <MapGL
        {...this.state.viewport}
        width="600px"
        height="400px"
        mapStyle="mapbox://styles/alfredroberts/ckp9pct361c8p17pkbg6j74de"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClick={this.props.onClick}
      >
        <Marker latitude={this.props.mLat} longitude={this.props.mLng} offsetLeft={-15} offsetTop={-30}>
          <img src={process.env.PUBLIC_URL + "marker.png"} width="30px" height="30px"/>
        </Marker>
      </MapGL>
    );
  }
}

export default LocationPicker;
