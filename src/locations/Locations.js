import React from 'react';
import './Locations.css';
import { BrowserRouter as useParams, withRouter } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'
import MultiLocationViewer from './MultiLocationViewer'


class Gallery extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photoData: null,
      photos: null,
      loading: true,
      mid: null,
    };
  }

  componentDidMount() {
    this.setState({
      photoData: this.getPhotos(),
    });
  }

  getPhotos = () => {
    axios
    .get("http://localhost:3000/record/")
    .then((response) => {
      console.log(response.data)

      let photos = []
      let aLng = 0
      let aLat = 0
      for (let photo of response.data) {
        if (photo.location.lat == null || photo.location.lng == null) {continue}
        photos.push(photo);
        aLat += photo.location.lat;
        aLng += photo.location.lng;
      }
      aLat /= response.data.length;
      aLng /= response.data.length;

      this.setState({
        photoData: response.data,
        photos: photos,
        loading: false,
        mid: {lat: aLat, lng: aLng}
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  };

  render() {
    if (this.state.loading){
      return (
        <div className="highlight_loader">
          <ClipLoader color={"#123abc"} speedMultiplier={1.3} size={150}/>
        </div>
      );
    }

    return (
      <div>
        <div className="locations_title_bar">
          Locations
        </div>
        <MultiLocationViewer width='1000px' height='800px' mid={this.state.mid} photos={this.state.photos}/>
      </div>
    );
  }
  
}

export default withRouter(Gallery);
