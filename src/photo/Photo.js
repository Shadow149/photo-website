import React from 'react';
import './Photo.css';


class Photo extends React.Component {

  resize(width) {
    if (width){
      let url_a = this.props.url.split('/');
      url_a.splice(6,0,'w_'+width);
      return url_a.join('/');
    }
    return this.props.url
  }

  render() {
    return <img className={this.props.className} src={this.resize(this.props.r_width)} alt=''/>;
  }
  
}

export default Photo;
