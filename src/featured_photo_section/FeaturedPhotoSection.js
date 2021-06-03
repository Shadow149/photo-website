import React, {useState, useEffect} from 'react';
import './FeaturedPhotoSection.css';
import FeaturedPhoto from '../featured_photo/FeaturedPhoto';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

function FeaturedPhotoSection (props) {
  
  const [featuredPhotos, setFeaturedPhotos] = useState(null);

  useEffect(() => {
    const num = '4';
    axios
      .get("http://localhost:3000/last_documents/" + num)
      .then((response) => {
        setFeaturedPhotos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (featuredPhotos === null){
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
      <FeaturedPhoto className="featured_photo" accentColour={featuredPhotos[0].accentColour} url={featuredPhotos[0].url} title={featuredPhotos[0].title}/>
      <FeaturedPhoto className="featured_photo" accentColour={featuredPhotos[1].accentColour} url={featuredPhotos[1].url} title={featuredPhotos[1].title}/>
      <FeaturedPhoto className="featured_photo" accentColour={featuredPhotos[2].accentColour} url={featuredPhotos[2].url} title={featuredPhotos[2].title}/>
      <FeaturedPhoto className="featured_photo" accentColour={featuredPhotos[3].accentColour} url={featuredPhotos[3].url} title={featuredPhotos[3].title}/>
    </div>
  );
  
  
}

export default FeaturedPhotoSection;
