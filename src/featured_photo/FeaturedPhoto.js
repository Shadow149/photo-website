import React from 'react';
import './FeaturedPhoto.css';
import { BrowserRouter as Redirect, Link } from "react-router-dom";


class FeaturedPhoto extends React.Component {

  render() {
    return (
      <div className="container">
        <Link to={"/photo/"+ this.props.title} >
          <img className="FeaturedPhoto-Image" src={this.props.url} alt='featured'/>
        </Link>
        <div className="FeaturedPhoto-Title" style={{backgroundColor: this.props.accentColour}}>
          <div className="Foo">
            {this.props.title}
          </div>
        </div>
      </div>
    );
  }
  
}

export default FeaturedPhoto;
