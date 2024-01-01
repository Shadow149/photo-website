import React from "react"
import {Marker} from 'react-map-gl';
import './InteractiveMarker.css';
import Photo from '../photo/Photo'



function InteractiveMarker (props) {
  
  let info_class = (props.showInfo) ? 'info_popup_show' : 'info_popup_hidden'
  return (
    <div>
      <Marker latitude={props.photo.location.lat} longitude={props.photo.location.lng} offsetLeft={-15} offsetTop={-30}>
        <img className='locationMarker' onClick={props.onClick} src={process.env.PUBLIC_URL + "../marker.png"} width="30px" height="30px" alt=''/>
          <div className={info_class} style={{backgroundColor: props.photo.accentColour}}>
            <a href={"/photo/"+ props.photo.title} className='locationLink'>
              {props.photo.title}<br></br>
              <Photo className='galleryImage' url={props.photo.url} r_width="400"/>
            </a>
          </div>
      </Marker>
    </div>
  );
  
}

export default InteractiveMarker;
