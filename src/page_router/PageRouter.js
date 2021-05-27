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


function About() {
  return <h2>About</h2>;
}

class PageRouter extends React.Component {

  render() {
    return (
      <Router>
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
                <Link to="/photoupload">Upload Photo</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/about" children={<About/>} />
            <Route path="/photoupload" children={<PhotoInput/>} />
            <Route path="/" children={<HomePage/>} />
          </Switch>
        
        </div>
      </Router>
    );
  }
  
}

export default PageRouter;
