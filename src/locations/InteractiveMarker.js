import React from "react"
import MapGL, {Marker} from 'react-map-gl';
import './InteractiveMarker.css';
import { BrowserRouter as Link } from "react-router-dom";


class InteractiveMarker extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   showInfo: false,
    // }
  }

  render() {
    let info_class = (this.props.showInfo) ? 'info_popup_show' : 'info_popup_hidden'
    return (
      <div>
        <Marker latitude={this.props.photo.location.lat} longitude={this.props.photo.location.lng} offsetLeft={-15} offsetTop={-30}>
          <img className='locationMarker' onClick={this.props.onClick} src={process.env.PUBLIC_URL + "../marker.png"} width="30px" height="30px"/>
            <div className={info_class} style={{backgroundColor: this.props.photo.accentColour}}>
              <a href={"/photo/"+ this.props.photo.title} className='locationLink'>{this.props.photo.title}</a>
            </div>
        </Marker>
      </div>
    );
  }
}

export default InteractiveMarker;
