import React from 'react';
import './PageRouter.css';
import {
    BrowserRouter as Router,
    Switch,
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
            {/* <li>
              <Link to="/photoupload">Upload Photo</Link>
            </li> */}
          </ul>
        </nav>

        <Switch>
          {/* <Route path="/about" children={ <About/> } /> */}
          <Route path="/gallery" component={Gallery} />
          <Route path="/photo/:photo" children={ <PhotoHighlight/> } />
          {/* <Route path="/photoupload" children={ <PhotoInput/> } /> */}
          <Route path="/locations" children={ <Locations/> } />
          <Route exact path="/" render={ () => <HomePage/> } />
        </Switch>
      
      </div>
    </Router>
  );
  
  
}

export default PageRouter;
