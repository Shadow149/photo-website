import React from 'react';
import './Photo.css';


export default function Photo (props) {

  const resize = (width) => {
    if (width){
      let url_a = props.url.split('/');
      url_a.splice(6,0,'w_'+width);
      return url_a.join('/');
    }
    return props.url
  }

  return <img className={props.className} src={resize(props.r_width)} alt=''/>;
  
}

