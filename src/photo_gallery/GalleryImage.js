import React from 'react';
import './GalleryImage.css';
import Photo from '../photo/Photo'
import { Link } from "react-router-dom";


export default function GalleryImage (props) {

  return (
    <div className="galleryImageContainer">
      <div className='galleryImageTitle' style={{backgroundColor: props.accentColour}} >{props.title}</div>
      <Link to={"/photo/"+ props.title} >
        <Photo className='galleryImage' url={props.url} r_width={props.r_width} onLoad={props.onLoad}/>
      </Link>
    </div>
  );
  
}
