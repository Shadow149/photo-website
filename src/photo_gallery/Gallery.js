import React from 'react';
import './Gallery.css';
import { BrowserRouter as useParams, withRouter } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'
import GalleryImage from './GalleryImage'


class Gallery extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photoData: null,
      loading: true
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
      this.setState({
        photoData: response.data,
        loading: false,
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
    let photos = []
    for (let photo of this.state.photoData) {
      photos.push(<GalleryImage title={photo.title} url={photo.url}/>);
    }
    return (
      <div>
        <div className="photo_gallery">
          {photos}
        </div>
      </div>
    );
  }
  
}

export default withRouter(Gallery);
