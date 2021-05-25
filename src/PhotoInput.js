import React from 'react';
import ReactDOM from 'react-dom';
import './PhotoInput.css';
import { HexColorPicker } from "react-colorful";
import { SliderPicker  } from 'react-color';
import exifr from 'exifr'

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

    exifr.parse(file)
      .then(output  => {
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
        });
      })
          
    
    
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
              </p>
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
