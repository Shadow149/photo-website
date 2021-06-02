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
      showMarkerInfo: Array(this.props.photos.length).fill(false),
      showMarkerInfoPrev: null,
    };

  }

  updateInfo = () => {
    this.setState({showMarkerInfo: Array(this.props.photos.length).fill(false)})
    console.log('map click')
  }

  markerClick = (i) => {
    console.log('marker click')
    const showMarkerInfo = this.state.showMarkerInfo.slice()
    showMarkerInfo[i] = !showMarkerInfo[i];
    if (this.state.showMarkerInfoPrev && this.state.showMarkerInfoPrev != i) {
      showMarkerInfo[this.state.showMarkerInfoPrev] = false;
    }
    this.setState({showMarkerInfo: showMarkerInfo})
    this.setState({showMarkerInfoPrev: i})
  }
  
  render() {
    let markers = []
    for (let i = 0; i < this.props.photos.length; i++) {
      markers.push(
        <InteractiveMarker photo={this.props.photos[i]} showInfo={this.state.showMarkerInfo[i]} onClick={() => this.markerClick(i)}/>
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
        onClick={this.updateInfo}
      >
        {markers}
      </MapGL>
    );
  }
}

export default MultiLocationViewer;
