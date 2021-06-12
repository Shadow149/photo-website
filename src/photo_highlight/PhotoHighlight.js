import React, {useEffect, useState} from 'react';
import './PhotoHighlight.css';
import { useParams , useLocation, Link} from 'react-router-dom'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import LocationViewer from './LocationViewer'
import BackgroundImage from './BackgroundImage'
import Photo from '../photo/Photo'



function ScrollToBot() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

function PhotoHighlight() {

  const { photo } = useParams();

  const [title, setTitle] = useState(null);
  const [accentColor, setAccentColor] = useState(null);
  const [url, setUrl] = useState(null);
  const [animal, setAnimal] = useState(null);
  const [desc, setDesc] = useState(null);
  // const [elevation, setElevation] = useState(null);
  // const [distance, setDistance] = useState(null);
  const [location, setLocation] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  const [imgZoomAmount, setImgZoomAmount] = useState(50);

  const [time, setTime] = useState(19);
  const [sunRise, setSunRise] = useState(4)
  const [sunSet, setSunSet] = useState(19)

  useEffect( () => getPhotoData(photo),[]);

  const getPhotoData = (ptitle) => {
    axios
    .get("http://localhost:3000/record/title/" + ptitle)
    .then((response) => {
      
      setTitle(ptitle);
      setUrl(response.data[0].url);
      setAccentColor(response.data[0].accentColour);
      setAnimal(response.data[0].animal);
      setDesc(response.data[0].desc);
      // setElevation(response.data[0].elevation);
      // setDistance(response.data[0].distance);
      setLocation(response.data[0].location);
      setMetaData(response.data[0].metaData);
      setLoading(false);
      
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  const onPhotoClick = () => {
    setZoomed(!zoomed);
  }

  if (loading){
    return (
      <div className="highlight_loader">
        <ClipLoader color={"#123abc"} speedMultiplier={1.3} size={150}/>
      </div>
    );
  }

  let sunX = (((time - sunRise)/(sunSet-sunRise)) * 80);
  let sunY = 40 - Math.sqrt((40**2) - ((sunX - 40) ** 2));

  return (
    <div className="photo_highlight">
      <ScrollToBot/>
      <div className='photo_zoom' style={{display: zoomed ? 'block' : 'none'}}>
        <Photo className='zoomed_photo' url={url} onClick={() => console.log('clock')}/>
        <div className='photo_zoom_background' onClick={onPhotoClick}>
        </div>
      </div>
      <div className="photo_hightlight_container">

        <BackgroundImage className="photo" src={url} onClick={onPhotoClick}/>
          
        <div className="info_area">
          <div className="title_bar" style={{backgroundColor: accentColor}}>
            {title}
          </div>
          <div className="top header">
            <Link className='animal_link' to={'/gallery?animal=' + animal}>
              {animal}
              <img alt='' className="externalImage" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI4My4xNzggMjgzLjE3OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjgzLjE3OCAyODMuMTc4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMjMxRjIwOyIgZD0iTTI1NC44MTIsMTQwLjcxM2gtMjBjLTQuMTQyLDAtNy41LDMuMzU4LTcuNSw3LjV2OTEuMTg2YzAsNC44NC0zLjkzOSw4Ljc3OC04Ljc3OSw4Ljc3OEg0My43NzYNCgkJYy00LjgzOSwwLTguNzc1LTMuOTM4LTguNzc1LTguNzc4VjY0LjY0NWMwLTQuODQxLDMuOTM2LTguNzgsOC43NzUtOC43OGg5NS44NTVjNC4xNDIsMCw3LjUtMy4zNTgsNy41LTcuNXYtMjANCgkJYzAtNC4xNDItMy4zNTgtNy41LTcuNS03LjVINDMuNzc2Yy0yNC4xMzgsMC00My43NzUsMTkuNjQtNDMuNzc1LDQzLjc4djE3NC43NTVjMCwyNC4xNCwxOS42MzgsNDMuNzc4LDQzLjc3NSw0My43NzhoMTc0Ljc1Ng0KCQljMjQuMTQsMCw0My43NzktMTkuNjM5LDQzLjc3OS00My43Nzh2LTkxLjE4NkMyNjIuMzEyLDE0NC4wNzEsMjU4Ljk1NCwxNDAuNzEzLDI1NC44MTIsMTQwLjcxM3oiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMjMxRjIwOyIgZD0iTTI3NS42NzcsMGgtNzkuNTUzYy00LjE0MiwwLTcuNSwzLjM1OC03LjUsNy41djIwYzAsNC4xNDIsMy4zNTgsNy41LDcuNSw3LjVoMjcuMzA0DQoJCUwxMjAuNjgzLDEzNy43NDNjLTIuOTI5LDIuOTI5LTIuOTI5LDcuNjc3LDAsMTAuNjA3bDE0LjE0MiwxNC4xNDNjMS40MDcsMS40MDcsMy4zMTQsMi4xOTcsNS4zMDQsMi4xOTcNCgkJYzEuOTg5LDAsMy44OTctMC43OSw1LjMwMy0yLjE5N0wyNDguMTc3LDU5Ljc0OHYyNy4zMDNjMCw0LjE0MiwzLjM1OCw3LjUsNy41LDcuNWgyMGM0LjE0MiwwLDcuNS0zLjM1OCw3LjUtNy41VjcuNQ0KCQlDMjgzLjE3NywzLjM1OCwyNzkuODE5LDAsMjc1LjY3NywweiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" />
            </Link>
          </div>
          <div className="text">
            {desc}
          </div>
          <div class="camera_data">
            <div className="header">
              Camera Settings
            </div>
            <div className="photoInfo">
                <img alt='' className="metaDataIcon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDIwLjggNDIwLjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQyMC44IDQyMC44OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDA2LjgsOTYuNGMtOC40LTguOC0yMC0xNC0zMy4yLTE0aC02Ni40di0wLjhjMC0xMC00LTE5LjYtMTAuOC0yNmMtNi44LTYuOC0xNi0xMC44LTI2LTEwLjhoLTEyMA0KCQkJCWMtMTAuNCwwLTE5LjYsNC0yNi40LDEwLjhjLTYuOCw2LjgtMTAuOCwxNi0xMC44LDI2djAuOGgtNjZjLTEzLjIsMC0yNC44LDUuMi0zMy4yLDE0Yy04LjQsOC40LTE0LDIwLjQtMTQsMzMuMnYxOTkuMg0KCQkJCUMwLDM0Miw1LjIsMzUzLjYsMTQsMzYyYzguNCw4LjQsMjAuNCwxNCwzMy4yLDE0aDMyNi40YzEzLjIsMCwyNC44LTUuMiwzMy4yLTE0YzguNC04LjQsMTQtMjAuNCwxNC0zMy4yVjEyOS42DQoJCQkJQzQyMC44LDExNi40LDQxNS42LDEwNC44LDQwNi44LDk2LjR6IE00MDAsMzI4LjhoLTAuNGMwLDcuMi0yLjgsMTMuNi03LjYsMTguNHMtMTEuMiw3LjYtMTguNCw3LjZINDcuMg0KCQkJCWMtNy4yLDAtMTMuNi0yLjgtMTguNC03LjZjLTQuOC00LjgtNy42LTExLjItNy42LTE4LjRWMTI5LjZjMC03LjIsMi44LTEzLjYsNy42LTE4LjRzMTEuMi03LjYsMTguNC03LjZoNzcuMg0KCQkJCWM2LDAsMTAuOC00LjgsMTAuOC0xMC44VjgxLjJjMC00LjQsMS42LTguNCw0LjQtMTEuMnM2LjgtNC40LDExLjItNC40aDExOS42YzQuNCwwLDguNCwxLjYsMTEuMiw0LjRjMi44LDIuOCw0LjQsNi44LDQuNCwxMS4yDQoJCQkJdjExLjZjMCw2LDQuOCwxMC44LDEwLjgsMTAuOEgzNzRjNy4yLDAsMTMuNiwyLjgsMTguNCw3LjZzNy42LDExLjIsNy42LDE4LjRWMzI4Ljh6Ii8+DQoJCQk8cGF0aCBkPSJNMjEwLjQsMTMwLjhjLTI3LjIsMC01MiwxMS4yLTY5LjYsMjguOGMtMTgsMTgtMjguOCw0Mi40LTI4LjgsNjkuNnMxMS4yLDUyLDI4LjgsNjkuNmMxOCwxOCw0Mi40LDI4LjgsNjkuNiwyOC44DQoJCQkJczUyLTExLjIsNjkuNi0yOC44YzE4LTE4LDI4LjgtNDIuNCwyOC44LTY5LjZzLTExLjItNTItMjguOC02OS42QzI2Mi40LDE0MiwyMzcuNiwxMzAuOCwyMTAuNCwxMzAuOHogTTI2NC44LDI4NA0KCQkJCWMtMTQsMTMuNi0zMy4yLDIyLjQtNTQuNCwyMi40UzE3MCwyOTcuNiwxNTYsMjg0Yy0xNC0xNC0yMi40LTMzLjItMjIuNC01NC40YzAtMjEuMiw4LjgtNDAuNCwyMi40LTU0LjQNCgkJCQljMTQtMTQsMzMuMi0yMi40LDU0LjQtMjIuNHM0MC40LDguOCw1NC40LDIyLjRjMTQsMTQsMjIuNCwzMy4yLDIyLjQsNTQuNEMyODcuNiwyNTAuOCwyNzguOCwyNzAsMjY0LjgsMjg0eiIvPg0KCQkJPGNpcmNsZSBjeD0iMzUyLjgiIGN5PSIxNTAiIHI9IjE5LjYiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
              <div className="text">
                {metaData.camera}
              </div>
            </div>
            <div className="photoInfo">
                <img alt='' className="metaDataIcon" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSItNDAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTM4Mi44NjcxODggMTU3LjM3ODkwNiAyMC4wNzQyMTgtMjAuMDc0MjE4YzcuODAwNzgyLTcuODAwNzgyIDcuODAwNzgyLTIwLjQ0OTIxOSAwLTI4LjI0NjA5NC03LjgwMDc4MS03LjgwMDc4Mi0yMC40NDUzMTItNy44MDA3ODItMjguMjQ2MDk0IDBsLTIwLjA3NDIxOCAyMC4wNzQyMThjLTMzLjY3OTY4OC0yOC4wNjI1LTc0LjYwNTQ2OS00NS4wMTU2MjQtMTE4LjI2MTcxOS00OC45ODQzNzR2LTQwLjE5OTIxOWgxOS4zMDg1OTRjMTEuMDMxMjUgMCAxOS45NzI2NTYtOC45NDUzMTMgMTkuOTcyNjU2LTE5Ljk3NjU2M3MtOC45NDE0MDYtMTkuOTcyNjU2LTE5Ljk3MjY1Ni0xOS45NzI2NTZoLTc4LjU2NjQwN2MtMTEuMDMxMjUgMC0xOS45NzI2NTYgOC45NDE0MDYtMTkuOTcyNjU2IDE5Ljk3MjY1NnM4Ljk0MTQwNiAxOS45NzY1NjMgMTkuOTcyNjU2IDE5Ljk3NjU2M2gxOS4zMDg1OTR2NDAuMTk5MjE5Yy0xMDkuMjgxMjUgOS45Mzc1LTE5Ni40MTAxNTYgMTAxLjc0MjE4Ny0xOTYuNDEwMTU2IDIxNS40NjQ4NDMgMCAxMTkuNTkzNzUgOTYuNzc3MzQ0IDIxNi4zODY3MTkgMjE2LjM4NjcxOSAyMTYuMzg2NzE5IDExOS41ODk4NDMgMCAyMTYuMzgyODEyLTk2Ljc3NzM0NCAyMTYuMzgyODEyLTIxNi4zODY3MTkgMC01MS4wODU5MzctMTcuNTkzNzUtOTkuNDY0ODQzLTQ5LjkwMjM0My0xMzguMjM0Mzc1em0tMTY2LjQ4NDM3NiAzMTQuNjcxODc1Yy05Ny4yODUxNTYgMC0xNzYuNDM3NS03OS4xNDg0MzctMTc2LjQzNzUtMTc2LjQzNzUgMC05Ny4yODUxNTYgNzkuMTUyMzQ0LTE3Ni40MzM1OTMgMTc2LjQzNzUtMTc2LjQzMzU5MyA5Ny4yODkwNjMgMCAxNzYuNDM3NSA3OS4xNDg0MzcgMTc2LjQzNzUgMTc2LjQzMzU5MyAwIDk3LjI4OTA2My03OS4xNDg0MzcgMTc2LjQzNzUtMTc2LjQzNzUgMTc2LjQzNzV6bTkyLjU2NjQwNy0yNjljNy44MDA3ODEgNy44MDA3ODEgNy44MDA3ODEgMjAuNDQ5MjE5IDAgMjguMjQ2MDk0bC03OC40NDE0MDcgNzguNDQxNDA2Yy03LjgwMDc4MSA3LjgwMDc4MS0yMC40NDkyMTggNy44MDA3ODEtMjguMjQ2MDkzIDAtNy44MDA3ODEtNy44MDA3ODEtNy44MDA3ODEtMjAuNDQ5MjE5IDAtMjguMjQ2MDkzbDc4LjQzNzUtNzguNDQxNDA3YzcuODAwNzgxLTcuODAwNzgxIDIwLjQ0OTIxOS03LjgwMDc4MSAyOC4yNSAwem0wIDAiLz48L3N2Zz4=" />
              <div className="text">
                1/{1/metaData.shutterSpeed}s
              </div>
            </div>
            <div className="photoInfo">
                <img alt='' className="metaDataIcon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yNTYsMEMxMTcuNjY3LDAsMCwxMDkuNzc5LDAsMjU2czExOSwyNTYsMjU2LDI1NmMxMzIuMzMzLDAsMjU2LTEwNC4zMzMsMjU2LTI1NkM1MTIsMTE3LjA3Miw0MDIuMzMzLDAsMjU2LDB6DQoJCQkgTTE5MC42NjYsMzkuNjQyQzIxMS4zNiwzMy4zODEsMjMzLjI5MSwzMCwyNTYsMzBjNDguMjI4LDAsOTIuOTY4LDE1LjE5NCwxMjkuNzA2LDQxLjAzM2wtMTk1LjA0LDExMi42MDZWMzkuNjQyeg0KCQkJIE0xNjAuNjY3LDUxLjEyM1YyNzYuNEwzNS45NTEsMjA0LjM5NUM1MS45MDEsMTM2LjM2Nyw5OC42NzIsODAuMDg2LDE2MC42NjcsNTEuMTIzeiBNMzAsMjU2YzAtNi43MDIsMC4zMTEtMTMuMzMzLDAuODg1LTE5Ljg4OQ0KCQkJTDIyNiwzNDguNzYxbC0xMjQuNTkxLDcxLjkzM0M1Ny40ODUsMzc5LjQzOSwzMCwzMjAuODczLDMwLDI1NnogTTMyMS4zMzMsNDcyLjM1OUMzMDAuNjQsNDc4LjYxOSwyNzguNzA5LDQ4MiwyNTYsNDgyDQoJCQljLTQ4LjIyNywwLTkyLjk2OC0xNS4xOTQtMTI5LjcwNi00MS4wMzNsMTk1LjAzOS0xMTIuNjA2VjQ3Mi4zNTl6IE0zMjEuMzMzLDI5My43MkwyNTYsMzMxLjQ0bC02NS4zMzMtMzcuNzJ2LTc1LjQ0TDI1NiwxODAuNTYNCgkJCWw2NS4zMzMsMzcuNzJWMjkzLjcyeiBNMzUxLjMzMyw0NjAuODc3VjIzNS42bDEyNC43MTYsNzIuMDA1QzQ2MC4wOTksMzc1LjYzMyw0MTMuMzI4LDQzMS45MTQsMzUxLjMzMyw0NjAuODc3eiBNMjg2LDE2My4yMzkNCgkJCWwxMjQuNTkxLTcxLjkzM0M0NTQuNTE2LDEzMi41NjEsNDgyLDE5MS4xMjcsNDgyLDI1NmMwLDYuNzAzLTAuMzExLDEzLjMzMy0wLjg4NSwxOS44ODlMMjg2LDE2My4yMzl6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" />
              <div className="text">
                f/{metaData.aperture}
              </div>
            </div>
            <div className="photoInfo">
                <img alt='' className="metaDataIcon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTExLjk5OSA1MTEuOTk5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTEuOTk5IDUxMS45OTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNTA4Ljc0NSwyNDYuMDQxYy00LjU3NC02LjI1Ny0xMTMuNTU3LTE1My4yMDYtMjUyLjc0OC0xNTMuMjA2UzcuODE4LDIzOS43ODQsMy4yNDksMjQ2LjAzNQ0KCQkJYy00LjMzMiw1LjkzNi00LjMzMiwxMy45ODcsMCwxOS45MjNjNC41NjksNi4yNTcsMTEzLjU1NywxNTMuMjA2LDI1Mi43NDgsMTUzLjIwNnMyNDguMTc0LTE0Ni45NSwyNTIuNzQ4LTE1My4yMDENCgkJCUM1MTMuMDgzLDI2MC4wMjgsNTEzLjA4MywyNTEuOTcxLDUwOC43NDUsMjQ2LjA0MXogTTI1NS45OTcsMzg1LjQwNmMtMTAyLjUyOSwwLTE5MS4zMy05Ny41MzMtMjE3LjYxNy0xMjkuNDE4DQoJCQljMjYuMjUzLTMxLjkxMywxMTQuODY4LTEyOS4zOTUsMjE3LjYxNy0xMjkuMzk1YzEwMi41MjQsMCwxOTEuMzE5LDk3LjUxNiwyMTcuNjE3LDEyOS40MTgNCgkJCUM0NDcuMzYxLDI4Ny45MjMsMzU4Ljc0NiwzODUuNDA2LDI1NS45OTcsMzg1LjQwNnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTI1NS45OTcsMTU0LjcyNWMtNTUuODQyLDAtMTAxLjI3NSw0NS40MzMtMTAxLjI3NSwxMDEuMjc1czQ1LjQzMywxMDEuMjc1LDEwMS4yNzUsMTAxLjI3NQ0KCQkJczEwMS4yNzUtNDUuNDMzLDEwMS4yNzUtMTAxLjI3NVMzMTEuODM5LDE1NC43MjUsMjU1Ljk5NywxNTQuNzI1eiBNMjU1Ljk5NywzMjMuNTE2Yy0zNy4yMywwLTY3LjUxNi0zMC4yODctNjcuNTE2LTY3LjUxNg0KCQkJczMwLjI4Ny02Ny41MTYsNjcuNTE2LTY3LjUxNnM2Ny41MTYsMzAuMjg3LDY3LjUxNiw2Ny41MTZTMjkzLjIyNywzMjMuNTE2LDI1NS45OTcsMzIzLjUxNnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />
              <div className="text">
                {metaData.foc}mm
              </div>
            </div>
            <div className="photoInfo">
                <img alt='' className="metaDataIcon"  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0wLDg1djM0Mmg1MTJWODVIMHogTTQ4MiwzOTdIMzBWMTE1aDQ1MlYzOTd6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9IjExOS4yNCIgeT0iMTgzLjkiIHdpZHRoPSIyOS43MTEiIGhlaWdodD0iMTI4LjYyIi8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yNjQuODAyLDI1OS40NDFjLTEuODc0LTQuMjI2LTQuNTI5LTcuODE3LTcuOTcxLTEwLjc3OGMtMy40NDItMi45NTgtNy42NC01LjQzNi0xMi41OTEtNy40MjgNCgkJCWMtNC45NTQtMS45OTMtMTAuNTA3LTMuODMzLTE2LjY2Ny01LjUyNWMtNC40Ny0xLjIwNi04LjM5Ni0yLjI5My0xMS43NzYtMy4yNjJjLTMuMzgyLTAuOTY1LTYuMTkxLTIuMDItOC40MjQtMy4xNw0KCQkJYy0yLjIzNi0xLjE0Ni0zLjkyNi0yLjQ0NS01LjA3My0zLjg5NWMtMS4xNDktMS40NS0xLjcyMS0zLjI2Mi0xLjcyMS01LjQzNmMwLTcuMTI1LDUuMzEzLTEwLjY4OCwxNS45NDItMTAuNjg4DQoJCQljMy44NjQsMCw3LjcyOCwwLjU0NCwxMS41OTUsMS42MzFjMy44NjQsMS4wODcsNy40MjcsMi4zNTUsMTAuNjg5LDMuODA0YzMuMjYxLDEuNDQ5LDUuOTc5LDIuODQsOC4xNTIsNC4xNjcNCgkJCWMyLjE3NCwxLjMzLDMuNDQyLDIuMjM2LDMuODA0LDIuNzE4bDEzLjA0NC0yNC42MzljLTIuODk5LTEuNjg5LTYuMDY5LTMuMzgtOS41MTEtNS4wNzJjLTMuNDQyLTEuNjg5LTcuMTU2LTMuMTk4LTExLjE0Mi00LjUyOQ0KCQkJYy0zLjk4NS0xLjMyNy04LjE1Mi0yLjQxNC0xMi41LTMuMjYxYy00LjM0OC0wLjg0NC04Ljc1OC0xLjI2OC0xMy4yMjUtMS4yNjhjLTYuNDAzLDAtMTIuNDcyLDAuOTA1LTE4LjIwNiwyLjcxNw0KCQkJYy01LjczOCwxLjgxMi0xMC43NzksNC41MDEtMTUuMTI3LDguMDYyYy00LjM0OCwzLjU2NC03Ljc5LDcuOTQzLTEwLjMyNywxMy4xMzVjLTIuNTM2LDUuMTk0LTMuODA0LDExLjE3My0zLjgwNCwxNy45MzUNCgkJCWMwLDQuODMyLDAuNjkzLDkuMDU5LDIuMDgzLDEyLjY4MmMxLjM4NywzLjYyMywzLjUwMSw2LjgyNSw2LjM0LDkuNjAyYzIuODM2LDIuNzgsNi40MzIsNS4yMjYsMTAuNzc5LDcuMzM3DQoJCQljNC4zNDgsMi4xMTUsOS40OCw0LjA3NiwxNS4zOTksNS44ODljNC40NjcsMS4zMyw4LjYwNSwyLjUzNiwxMi40MSwzLjYyM2MzLjgwNCwxLjA4Nyw3LjA5NCwyLjI2NSw5Ljg3NCwzLjUzMg0KCQkJYzIuNzc3LDEuMjY4LDQuOTUxLDIuNjg5LDYuNTIxLDQuMjU4YzEuNTY4LDEuNTcsMi4zNTUsMy41NjMsMi4zNTUsNS45NzdjMC4wMDIsNi40MDItNS4yNTIsOS42MDEtMTUuNzU5LDkuNjAxDQoJCQljLTQuOTU0LDAtOS44NDUtMC42NjMtMTQuNjc0LTEuOTkzYy00LjgzMi0xLjMyOC05LjIxMS0yLjgzNi0xMy4xMzQtNC41MjljLTMuOTI2LTEuNjg5LTcuMjE4LTMuMzgtOS44NzQtNS4wNzINCgkJCWMtMi42NTgtMS42OS00LjIyOS0yLjgzNy00LjcxLTMuNDQybC0xMy4wNDQsMjUuOTA2YzMuNzQyLDIuNTM2LDcuODE4LDQuNzcyLDEyLjIyOSw2LjcwM2M0LjQwOCwxLjkzNCw4Ljk2OCwzLjU5NSwxMy42NzgsNC45ODINCgkJCWM0LjcxLDEuMzksOS41NCwyLjQ0NSwxNC40OTMsMy4xN2M0Ljk1MSwwLjcyNSw5Ljc4MywxLjA4NywxNC40OTMsMS4wODdjNi4xNTksMCwxMi4xMzgtMC42OTYsMTcuOTM1LTIuMDgzDQoJCQljNS43OTctMS4zODgsMTAuOTI5LTMuNjIzLDE1LjM5OC02LjcwM2M0LjQ2Ny0zLjA4LDguMDYyLTcuMTI1LDEwLjc3OS0xMi4xMzhjMi43MTgtNS4wMTEsNC4wNzYtMTEuMTQyLDQuMDc2LTE4LjM4OQ0KCQkJQzI2Ny42MSwyNjguNzQzLDI2Ni42NzMsMjYzLjY3MSwyNjQuODAyLDI1OS40NDF6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00MDAuOTQ0LDIyNC42NThjLTMuMDItNy44NDktNy4zMDktMTQuODU1LTEyLjg2My0yMS4wMTVjLTUuNTU3LTYuMTU5LTEyLjI1OS0xMS4xMS0yMC4xMDktMTQuODU1DQoJCQljLTcuODUzLTMuNzQyLTE2LjU0OC01LjYxNS0yNi4wODctNS42MTVjLTkuMzAyLDAtMTcuODc1LDEuNzgzLTI1LjcyNSw1LjM0NGMtNy44NTIsMy41NjMtMTQuNjQ2LDguMzM0LTIwLjM4MSwxNC4zMTENCgkJCWMtNS43MzgsNS45NzktMTAuMjA4LDEyLjg5NS0xMy40MDYsMjAuNzQzYy0zLjIwMiw3Ljg1Mi00LjgwMSwxNi4wMDUtNC44MDEsMjQuNDU3YzAsOC4zMzQsMS41MzksMTYuNDI3LDQuNjIsMjQuMjc2DQoJCQljMy4wOCw3Ljg1Miw3LjM5NywxNC44MjgsMTIuOTUzLDIwLjkyNGM1LjU1NCw2LjEwMSwxMi4yNTYsMTEuMDIzLDIwLjEwOSwxNC43NjVjNy44NSwzLjc0NSwxNi41NDUsNS42MTYsMjYuMDg3LDUuNjE2DQoJCQljOS4yOTksMCwxNy44NzMtMS44MTEsMjUuNzI1LTUuNDM1YzcuODQ5LTMuNjIzLDE0LjYxMi04LjQyNCwyMC4yOS0xNC40MDJjNS42NzYtNS45NzksMTAuMTE0LTEyLjg5MiwxMy4zMTYtMjAuNzQzDQoJCQljMy4xOTktNy44NSw0LjgwMS0xNi4wMDIsNC44MDEtMjQuNDU3QzQwNS40NzMsMjQwLjQ4Miw0MDMuOTYxLDIzMi41MSw0MDAuOTQ0LDIyNC42NTh6IE0zNzMuMTM2LDI2Mi4yNQ0KCQkJYy0xLjM5LDQuNjUtMy40NzMsOC44MTctNi4yNSwxMi41Yy0yLjc4LDMuNjg1LTYuMjgxLDYuNjc1LTEwLjUwNyw4Ljk2OGMtNC4yMjksMi4yOTYtOS4xOCwzLjQ0Mi0xNC44NTUsMy40NDINCgkJCWMtNS40MzUsMC0xMC4yNjctMS4wODgtMTQuNDkzLTMuMjYyYy00LjIyOS0yLjE3NC03Ljc2Mi01LjA3Mi0xMC41OTgtOC42OTVjLTIuODM5LTMuNjIzLTQuOTgyLTcuNzU5LTYuNDMyLTEyLjQxDQoJCQljLTEuNDQ5LTQuNjQ3LTIuMTc0LTkuNDQ4LTIuMTc0LTE0LjQwMmMwLTQuODMsMC42OTMtOS41NzEsMi4wODMtMTQuMjIxYzEuMzg3LTQuNjQ4LDMuNTAxLTguNzg2LDYuMzQtMTIuNDENCgkJCWMyLjgzNi0zLjYyMyw2LjM0MS02LjU1LDEwLjUwOC04Ljc4NmM0LjE2Ni0yLjIzMyw5LjA4Ni0zLjM1MiwxNC43NjUtMy4zNTJjNS40MzUsMCwxMC4yMzYsMS4wNTksMTQuNDAyLDMuMTcxDQoJCQljNC4xNjcsMi4xMTQsNy42OTksNC45NTMsMTAuNTk4LDguNTE1YzIuODk4LDMuNTYzLDUuMDcyLDcuNjcxLDYuNTIyLDEyLjMxOGMxLjQ1LDQuNjUxLDIuMTc0LDkuNDUyLDIuMTc0LDE0LjQwMg0KCQkJQzM3NS4yMTksMjUyLjg2LDM3NC41MjMsMjU3LjYwMSwzNzMuMTM2LDI2Mi4yNXoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />
              <div className="text">
                {metaData.iso}
              </div>
            </div>
          </div>
          <div className='sunDialContainer'>
            <svg width="105" height="70">
              <path d="M -13.5 26.5 a 1 1 0 0 0 80 0" className="sunDial"></path>
              <g style={{transform: `translate(${sunX}px, ${sunY}px)`}}>
                <circle cx="12" cy="12" r="12" fill="#ffeb3b"></circle>
              </g>
            </svg>
            <div className='sunDialTime'>
              11:56
            </div>
          </div>
          <LocationViewer className="locationViewer" lng={location.lng} lat={location.lat} width="100%" height="30%"/>
        </div>
      </div>
      {/* <div className="extraInfo">
        asdasdasds
      </div> */}
    </div>
  );
  
}

export default PhotoHighlight;