import React from "react"
import MapGL, {Marker} from 'react-map-gl';


class LocationViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: this.props.lat,
        longitude: this.props.lng,
        zoom: 11,
        bearing: 0,
        pitch: 0
      }
    };
    console.log(process.env)
  }
  
  render() {
    if (this.props.lat == null) {
      return null;
    }
    return (
      <MapGL
        {...this.state.viewport}
        width={this.props.width}
        height={this.props.height}
        mapStyle="mapbox://styles/alfredroberts/ckp9pct361c8p17pkbg6j74de"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClick={this.props.onClick}
      >
        <Marker latitude={this.props.lat} longitude={this.props.lng} offsetLeft={-15} offsetTop={-30}>
          <img src={process.env.PUBLIC_URL + "../marker.png"} width="30px" height="30px"/>
        </Marker>
      </MapGL>
    );
  }
}

export default LocationViewer;
