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
      loading: true,
      photos_shuffled: false,
      cols: 5
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
      this.setState({
        photoData: response.data,
        loading: false,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  queryAnimal = (e) => {
    if (e.target.value.length < 1) { this.getPhotos(); return; }
    axios
    .get("http://localhost:3000/record/animal/" + e.target.value)
    .then((response) => {
      if (response.data.length == 0) {
        this.getPhotos();
      } else {
        this.setState({
          photoData: response.data,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  queryTitle = (e) => {
    if (e.target.value.length < 1) { this.getPhotos(); return; }
    axios
    .get("http://localhost:3000/record/title/" + e.target.value)
    .then((response) => {
      if (response.data.length == 0) {
        this.getPhotos();
      } else {
        this.setState({
          photoData: response.data,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  shuffle = (photos) => {return photos.sort(() => Math.random() - 0.5)}

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
      photos.push(<GalleryImage title={photo.title} url={photo.url} accentColour={photo.accentColour}/>);
    }

    // console.log(this.state.photos_shuffled)

    // if (!this.state.photos_shuffled){
    //   console.log('shuffle', this.state.photoData)
    //   photos = this.shuffle(photos)
    //   this.setState({photos_shuffled: true})
    // }

    return (
      <div>
        <div className="gallery_title_bar">
          Gallery
        </div>

        <div className="searches">
          <input className="colsInput" type="number" value={this.state.cols} onChange={(e) => this.setState({cols: parseInt(e.target.value)})}></input>
          <div>
            <label>Title</label> <input  className='searchInput' onChange={this.queryTitle}></input>
          </div>
          <div>
            <label>Animal</label> <input className='searchInput' onChange={this.queryAnimal}></input>
          </div>
        </div>
        {/* <label></label> <input type="number" value={this.state.cols}></input> */}

        <div className="photo_gallery" style={{columnCount: this.state.cols}}>
          {photos}
        </div>
      </div>
    );
  }
  
}

export default withRouter(Gallery);
