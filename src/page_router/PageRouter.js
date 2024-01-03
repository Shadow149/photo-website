import React from 'react';
import './PageRouter.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import HomePage from '../home_page/HomePage';
import PhotoInput from '../photo_backend/PhotoInput';
import PhotoHighlight from '../photo_highlight/PhotoHighlight';
import Gallery from '../photo_gallery/Gallery';
import Locations from '../locations/Locations';
import About from '../about/About';
import ScrollToTop from './ScrollToTop';


function PageRouter () {

  return (
    <Router>
      <ScrollToTop/>
      <div className="RouterContainer">

        <nav>
          <ul>
            <li className="home">
              <Link to="/">Alfred Roberts</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li> */}
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/locations">Locations</Link>
            </li>
            <li>
              <a href="https://github.com/Shadow149/photo-website">Source Code</a>
            </li>
            {/* <li>
              <Link to="/photoupload">Upload Photo</Link>
            </li> */}
          </ul>
        </nav>

        <Routes>
          {/* <Route path="/about" children={ <About/> } /> */}
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/photo/:photo" element={ <PhotoHighlight/> } />
          {/* <Route path="/photoupload" children={ <PhotoInput/> } /> */}
          <Route path="/locations" element={ <Locations/> } />
          <Route exact path="/" element={ <HomePage/> } />
        </Routes>
      
      </div>
    </Router>
  );
  
  
}

export default PageRouter;
