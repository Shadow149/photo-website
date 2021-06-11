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
          <h1 className="name_title">Alfred Roberts</h1>
          <h1 className="name_subtitle">Wildlife Photographer</h1>
          <div className="bio_desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales tellus id justo pellentesque ornare. Sed dapibus risus ac aliquet vehicula. Praesent suscipit ullamcorper efficitur. Cras venenatis scelerisque neque, id maximus ipsum condimentum eu. In hac habitasse platea dictumst. Fusce sollicitudin id arcu ac dignissim. Morbi massa magna, sollicitudin ut tellus in, congue venenatis nibh. Ut justo nulla, feugiat vitae quam fringilla, dapibus luctus magna. Phasellus vitae est nec risus eleifend scelerisque sed a ex. Mauris fermentum, orci sed rhoncus suscipit, massa purus pharetra neque, id fermentum nulla nibh a ex. Donec a dolor nec ex blandit consectetur vel vel purus.
          </div>
          <div className="bio_desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales tellus id justo pellentesque ornare. Sed dapibus risus ac aliquet vehicula. Praesent suscipit ullamcorper efficitur. Cras venenatis scelerisque neque, id maximus ipsum condimentum eu. In hac habitasse platea dictumst. Fusce sollicitudin id arcu ac dignissim. Morbi massa magna, sollicitudin ut tellus in, congue venenatis nibh. Ut justo nulla, feugiat vitae quam fringilla, dapibus luctus magna. Phasellus vitae est nec risus eleifend scelerisque sed a ex. Mauris fermentum, orci sed rhoncus suscipit, massa purus pharetra neque, id fermentum nulla nibh a ex. Donec a dolor nec ex blandit consectetur vel vel purus.
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
