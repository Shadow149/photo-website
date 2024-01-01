import React from 'react';
import './FeaturedPhoto.css';
import { Link } from "react-router-dom";
import Photo from '../photo/Photo'


function FeaturedPhoto (props) {

  return (
    <div className="container">
      <Link className='featuredLink' to={"/photo/"+ props.title} >
        <Photo className="FeaturedPhoto-Image" url={props.url} r_width="1000" alt='featured'/>
        <div className="FeaturedPhoto-Title" style={{backgroundColor: props.accentColour}}>
          <div className="Foo">
            {props.title}
          </div>
        </div>
      </Link>
    </div>
  );
  
}

export default FeaturedPhoto;
