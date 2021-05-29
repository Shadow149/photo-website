import React from 'react';
import './FeaturedPhotoSection.css';
import FeaturedPhoto from '../featured_photo/FeaturedPhoto';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

class FeaturedPhotoSection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      featuredPhotos: null,
    }
  }

  componentDidMount(){
    const num = '4';
    axios
      .get("http://localhost:3000/last_documents/" + num)
      .then((response) => {
        console.log(response.data)
        this.setState({
          featuredPhotos: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.featuredPhotos == null){
      return (
        <div className="loader_container">
          <div className="loader">
            <ClipLoader color={"#123abc"} speedMultiplier={1.3} size={150}/>
          </div>
        </div>
      );
    }
    return (
      <div className="featured_photos_container">
        <FeaturedPhoto className="featured_photo" accentColour={this.state.featuredPhotos[0].accentColour} url={this.state.featuredPhotos[0].url} title={this.state.featuredPhotos[0].title}/>
        <FeaturedPhoto className="featured_photo" accentColour={this.state.featuredPhotos[1].accentColour} url={this.state.featuredPhotos[1].url} title={this.state.featuredPhotos[1].title}/>
        <FeaturedPhoto className="featured_photo" accentColour={this.state.featuredPhotos[2].accentColour} url={this.state.featuredPhotos[2].url} title={this.state.featuredPhotos[2].title}/>
        <FeaturedPhoto className="featured_photo" accentColour={this.state.featuredPhotos[3].accentColour} url={this.state.featuredPhotos[3].url} title={this.state.featuredPhotos[3].title}/>
      </div>
    );
  }
  
}

export default FeaturedPhotoSection;
