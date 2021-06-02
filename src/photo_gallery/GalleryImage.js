import React from 'react';
import './GalleryImage.css';
import Photo from '../photo/Photo'
import { BrowserRouter as Redirect, Link } from "react-router-dom";


class GalleryImage extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div className="galleryImageContainer">
        <div className='galleryImageTitle' style={{backgroundColor: this.props.accentColour}} >{this.props.title}</div>
        <Link to={"/photo/"+ this.props.title} >
          <Photo className='galleryImage' url={this.props.url} r_width={this.props.r_width}/>
        </Link>
      </div>
    );
  }
  
}

export default GalleryImage;
