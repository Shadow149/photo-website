import React, {useState, useEffect} from 'react';
import './Locations.css';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'
import MultiLocationViewer from './MultiLocationViewer'


function Locations (props) {

  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mid, setMid] = useState(null);
  
  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = () => {
    axios
    .get("http://localhost:3000/record/")
    .then((response) => {
      let photos = []
      let aLng = 0
      let aLat = 0
      for (let photo of response.data) {
        if (photo.location.lat == null || photo.location.lng == null) {continue}
        photos.push(photo);
        aLat += photo.location.lat;
        aLng += photo.location.lng;
      }
      aLat /= response.data.length;
      aLng /= response.data.length;

      setPhotos(photos);
      setMid({
        lat: aLat, 
        lng: aLng
      });
      setLoading(false);      

    })
    .catch(function (error) {
      console.log(error);
    });
  };

  if (loading){
    return (
      <div className="highlight_loader">
        <ClipLoader color={"#123abc"} speedMultiplier={1.3} size={150}/>
      </div>
    );
  }

  return (
    <div style={{width: '100%', height: '100%'}}>
      <MultiLocationViewer width='100%' height='100%' mid={mid} photos={photos}/>
      <div className="locations_title_bar">
        Locations
      </div>
    </div>
  );
  
  
}

export default Locations;
