import React from 'react';
import './GalleryImage.css';
import Photo from '../photo/Photo'
import { BrowserRouter as Redirect, Link } from "react-router-dom";


class GalleryImage extends React.Component {

  render() {
    return (
      <div className="galleryImageContainer">
        <div className='galleryImageTitle'>{this.props.title}</div>
        <Link to={"/photo/"+ this.props.title} >
          <Photo className='galleryImage' url={this.props.url} r_width="500"/>
        </Link>
      </div>
    );
  }
  
}

export default GalleryImage;
