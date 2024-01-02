import React from 'react';
import './HomePage.css';
import FeaturedPhotoSection from '../featured_photo_section/FeaturedPhotoSection';
import About from '../about/About';


function HomePage () {

  return (
    <div className="page">
      <div className="para_photo">
        <div className="bio">
          <h1 className="name_title">Alfred Roberts</h1>
          <h1 className="name_subtitle">Wildlife Photographer</h1>
          <div className="bio_desc">
          21 year old wildlife photographer and computer science student at the University of Nottingham. Since starting photographing wildlife in 2019 I have some special, personal and unique experiences with British wildlife. 
          </div>
        </div>
      </div>

      <div className="featured_photos">
        <div className="featured_title">Featured Photos</div>
        <FeaturedPhotoSection />
        {/* <div className='about_section'>
          <About/>
        </div> */}
      </div>
      
    </div>
  );
  
  
}

export default HomePage;
