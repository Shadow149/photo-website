import React from 'react';
import './HomePage.css';
import FeaturedPhotoSection from '../featured_photo_section/FeaturedPhotoSection';

class HomePage extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      featuredPhotos : {},
    }
  }

  render() {
    return (
      <div className="page">
        <div className="para_photo">
          <div className="bio">
            <h1 className="name_title">Alfred Roberts</h1>
            <h1 className="name_subtitle">Wildlife Photographer</h1>
            <div className="bio_desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales tellus id justo pellentesque ornare. Sed dapibus risus ac aliquet vehicula. Praesent suscipit ullamcorper efficitur. Cras venenatis scelerisque neque, id maximus ipsum condimentum eu. In hac habitasse platea dictumst. Fusce sollicitudin id arcu ac dignissim. Morbi massa magna, sollicitudin ut tellus in, congue venenatis nibh. Ut justo nulla, feugiat vitae quam fringilla, dapibus luctus magna. Phasellus vitae est nec risus eleifend scelerisque sed a ex. Mauris fermentum, orci sed rhoncus suscipit, massa purus pharetra neque, id fermentum nulla nibh a ex. Donec a dolor nec ex blandit consectetur vel vel purus.
            </div>
          </div>
        </div>

        <div className="featured_photos">
          <div className="featured_title">Featured Photos</div>
          <FeaturedPhotoSection />
        </div>
        
      </div>
    );
  }
  
}

export default HomePage;
