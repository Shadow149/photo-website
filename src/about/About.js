import React, { useEffect, useState } from 'react';
import './About.css';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import FeaturedPhotoSection from '../featured_photo_section/FeaturedPhotoSection';
import FeaturedPhoto from '../featured_photo/FeaturedPhoto';


function Gallery(props) {


  return (
    <div className='about_container'>
      <div className='title_portrait_container'>
        <img className='portait' src={process.env.PUBLIC_URL + '/portrait.jpg'}/>
        <div>
          <h1 className="name_title" style={{textAlign: "left"}}>Alfred Roberts</h1>
          <h1 className="name_subtitle" style={{textAlign: "left"}}>Wildlife Photographer</h1>
          <div className="bio_desc" style={{textAlign: "left"}}>
            21 year old wildlife photographer and computer science student at the University of Nottingham. Since starting photographing wildlife in 2019 I have some special, personal and unique experiences with British wildlife. 
          </div>
        </div>
      </div>
      <div className='fav_container'>

        <h1 className="fav_title">Favourite Photos</h1>
        <div className="fav_photos_container">
          <FeaturedPhoto className="featured_photo" accentColour='#e1dfdc' url='https://res.cloudinary.com/dcobw61kt/image/upload/v1622301327/Fishing_1622301326596.jpg' title='Fishing'/>
          <FeaturedPhoto className="featured_photo" accentColour='#4e4c48' url='https://res.cloudinary.com/dcobw61kt/image/upload/v1622320535/Fly%20by_1622320527620.jpg' title='Fly by'/>
          <FeaturedPhoto className="featured_photo" accentColour='#605f39' url='https://res.cloudinary.com/dcobw61kt/image/upload/v1622322204/Among%20the%20Grass_1622322198607.jpg' title='Among the Grass'/>
          <FeaturedPhoto className="featured_photo" accentColour='#87b862' url='https://res.cloudinary.com/dcobw61kt/image/upload/v1622379964/Feeding%20Time_1622379952702.jpg' title='Feeding Time'/>
          <FeaturedPhoto className="featured_photo" accentColour='#9d76bf' url='https://res.cloudinary.com/dcobw61kt/image/upload/v1622392989/Bluebells_1622392977729.jpg' title='Bluebells'/>
        </div>
      </div>
    </div>
  );


}

export default Gallery;
