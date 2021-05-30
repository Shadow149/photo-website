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
import ScrollToTop from './ScrollToTop';


function About() {
  return <h2>About</h2>;
}

class PageRouter extends React.Component {


  render() {
    return (
      <Router>
        <ScrollToTop/>
        <div className="RouterContainer">

          <nav>
            <ul>
              <li className="home">
                <Link to="/">Alfred Roberts</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/photoupload">Upload Photo</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/about" children={<About/>} />
            <Route path="/gallery" children={<Gallery/>} />
            <Route path="/photo/:photo" children={<PhotoHighlight/>} />
            <Route path="/photoupload" children={<PhotoInput/>} />
            <Route path="/" render={ () => <HomePage/>} />
          </Switch>
        
        </div>
      </Router>
    );
  }
  
}

export default PageRouter;
