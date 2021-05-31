import React from "react"
import MapGL, {Marker} from 'react-map-gl';
import InteractiveMarker from './InteractiveMarker';


class MultiLocationViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        zoom: 6,
        latitude: this.props.mid.lat + 8,
        longitude: this.props.mid.lng,
        bearing: 0,
        pitch: 0
      },
      markers: null,
    };

  }
  
  render() {
    let markers = []
    for (let photo of this.props.photos) {
      markers.push(
        <InteractiveMarker photo={photo} />
      );
    }
    return (
      <MapGL
        {...this.state.viewport}
        width={this.props.width}
        height={this.props.height}
        mapStyle="mapbox://styles/alfredroberts/ckp9pct361c8p17pkbg6j74de"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        {markers}
      </MapGL>
    );
  }
}

export default MultiLocationViewer;
