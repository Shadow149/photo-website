import React from 'react';
import './PhotoInput.css';
import { HexColorPicker } from "react-colorful";
import { SliderPicker  } from 'react-color';
import exifr from 'exifr'
import jimp from 'jimp';


class PhotoInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accentColour: '#ffffff',
      title: '',
      imgFile: null,
      metaData: {
        camera: '',
        shutterSpeed: '',
        aperture: '',
        foc: '',
        iso: ''
      },
    };
    this.onPhotoUpload = this.onPhotoUpload.bind(this)
  }

  onPhotoUpload (event) {
    let file = event.target.files[0]    

    function componentToHex(c) {
      var hex = parseInt(c).toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    
    function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function getAveragePixelValue(img){
      let width = img.bitmap.width;
      let height = img.bitmap.height;
      let average = [0,0,0];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let pixel = jimp.intToRGBA(img.getPixelColor(x, y));
          average[0] += pixel.r;
          average[1] += pixel.g;
          average[2] += pixel.b;
        }
      }
      average[0] /= height*width
      average[1] /= height*width
      average[2] /= height*width

      return rgbToHex(average[0],average[1],average[2])
    }
      

    jimp.read(String(URL.createObjectURL(file)))
    .then(
      (img) => {
        let ratio = 200 / img.bitmap.width;
        img
          .scale(ratio, jimp.AUTO)
          .blur(25);
        return getAveragePixelValue(img);
      }
    ).then( (averageColor) => {
        exifr.parse(file)
        .then(output => {
          let exifData = {
            camera: output.Model,
            shutterSpeed: output.ExposureTime,
            aperture: output.FNumber,
            foc: output.FocalLength,
            iso:output.ISO
          };
          this.setState({
            file: URL.createObjectURL(file),
            metaData: exifData,
            accentColour: averageColor,
          });
        })
      }
    );


    
          
  } 
  
  handleChange = color => this.setState({ accentColour: color })
  handleChangeRC = color => this.setState({ accentColour: color.hex })
  
  render() {
    const { accentColour } = this.state
    console.log(this.state.metaData)
    return (
      <div class="PhotoInput-title">
        <div class="PhotoInput-Grid">

          <div class="gridItem">
            <div class="PhotoInput-DataCol">

              <h1>Add Photo</h1>
              <input type="file" name="file" onChange={this.onPhotoUpload}/>
              <br></br>
              <label>Title: </label><input class="PhotoInput-TextInput" onChange={event => this.setState({title: event.target.value})}></input>
              <br></br>
              <label>Description: </label><textarea class="PhotoInput-DescriptionInput"></textarea>
              <br></br>
              <label>Meta data: </label>
              <p>
                Camera: {this.state.metaData.camera}<br></br>
                Shutter Speed: {1/this.state.metaData.shutterSpeed}<br></br>
                Aperture: {this.state.metaData.aperture}<br></br>
                Focal Length: {this.state.metaData.foc}<br></br>
                ISO: {this.state.metaData.iso}<br></br>
                <br></br>
                Colour: {this.state.accentColour}
              </p>
              <label>Elevation: </label><input class="PhotoInput-TextInput"></input><br></br>
              <label>Distance: </label><input class="PhotoInput-TextInput"></input><br></br>
              <label>Location: </label><input class="PhotoInput-TextInput"></input>
            </div>
          </div>

          <div class="gridItem">
            <h2>Preview: </h2>
            <br></br>
            <div class="PhotoInput-PrevContainer">
              <img class="PhotoInput-ImagePrev" src={this.state.file}/>
              <div class="PhotoInput-TitlePrev" style={{backgroundColor: this.state.accentColour}}>{this.state.title}</div>
            </div>
          </div>
          <div class="gridItem">
            <HexColorPicker color={accentColour} onChange={this.handleChange} />

            <div class="PhotoInput-Slider">
              <SliderPicker  color={accentColour} onChange={this.handleChangeRC}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
  
}

export default PhotoInput;
