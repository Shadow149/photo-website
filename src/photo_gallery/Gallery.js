import React, { useEffect, useState } from 'react';
import './Gallery.css';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'
import GalleryImage from './GalleryImage'
import { useNavigate, useLocation } from 'react-router-dom'


function Gallery(props) {

  let history = useNavigate();
  
  const [photoData, setPhotoData] = useState(null);
  const [shuffledPhotoData, setShuffledPhotoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);
  const [cols, setCols] = useState(parseInt(window.innerWidth/360));
  const [filtered, setFiltered] = useState(false);

  useEffect(() => getPhotos(), [setPhotoData]);
  
  const useQuery = () => new URLSearchParams(useLocation().search);

  const getPhotos = () => {
    axios
      .get("https://alfredroberts.netlify.app/.netlify/functions/server/record/")
      .then((response) => {
        setPhotoData(response.data);
        setShuffledPhotoData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const queryAnimal = (e) => {
    let animalFilter = e.target.value;

    if (animalFilter.length === 0) { 
      setShuffledPhotoData(photoData); 
      history.push({
        search: '',
      })
      return; 
    }
    history.push({
      search: '?animal=' + animalFilter,
    })

    filterPhoto(animalFilter);
  }

  const filterPhoto = (animal) => {
    let regex = new RegExp('^.*' + animal + '.*', 'i');
    let shuffledPhotoData = photoData.filter(element => regex.exec(element.animal) != null)
    setShuffledPhotoData(shuffledPhotoData);
    setFiltered(true)
  }

  const queryTitle = (e) => {
    if (e.target.value.length === 0) { 
      setShuffledPhotoData(photoData); 
      history.push({
        search: '',
      })
      return; 
    }
    history.push({
      search: '?title=' + e.target.value,
    })

    let regex = new RegExp('^.*' + e.target.value + '.*', 'i');
    let shuffledPhotoData = photoData.filter(element => regex.exec(element.title) != null)
    setShuffledPhotoData(shuffledPhotoData);
  }

  const galleryImageLoaded = () => {
    setLoadingImages(loadingImages + 1);
    if (loadingImages >= shuffledPhotoData.length - 1) {
      setImgLoading(false);
    }
  }

  const GalleryView = () => {
    let query = useQuery();
    const animalQuery = query.get('animal');

    let gallery;

    if (loading) {
      gallery = null;
    } else {
      let photos = []

      // Get initial filter from url
      if (animalQuery && !filtered) {
        filterPhoto(animalQuery)
        document.getElementById('animalFilter').value = animalQuery
      } 

      for (let photo of shuffledPhotoData) {
        photos.push(<GalleryImage title={photo.title} url={photo.url} accentColour={photo.accentColour} r_width={500} onLoad={galleryImageLoaded}/>);
      }

      gallery = (
        <div className="photo_gallery" style={{ columnCount: cols, display: imgLoading ? 'none' : 'block' }}>
          {photos}
        </div>
      );

    }

    return (
      <div>
        <div className="highlight_loader" style={imgLoading ? {} : { display: 'none' }}>
          <ClipLoader color={"#123abc"} speedMultiplier={1.3} size={150} />
        </div>
        {gallery}
      </div>
    );
  }

  // const shuffle = (photos) => {return photos.sort(() => Math.random() - 0.5)}

  return (
    <div>
      <div className="gallery_title_bar">
        Gallery
      </div>

      <div className="searches">
        {/* <input className="colsInput" type="number" value={cols} onChange={(e) => this.setState({cols: parseInt(e.target.value)})}></input> */}
        <div>
          <label className='searchLabel'>Zoom</label>
          <input className="colsInput" type="range" min="1" max="7" value={7 - cols} step="1" onChange={(e) => setCols(7 - parseInt(e.target.value))} />
        </div>
        <div>
          {/* <label className='searchLabel'>Title</label> <input type="search" className='searchInput' onChange={queryTitle}></input> */}
        </div>
        <div>
          <label className='searchLabel'>Animal</label> <input id='animalFilter' type="search" className='searchInput' onChange={queryAnimal}></input>
        </div>
      </div>
      {GalleryView()}
    </div>
  );


}

export default Gallery;
