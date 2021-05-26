import React from 'react';
import './PhotoInput.css';
import { HexColorPicker } from "react-colorful";
import { SliderPicker  } from 'react-color';
import exifr from 'exifr'
import jimp from 'jimp';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import axios from 'axios';
import { createHash } from 'crypto';


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
      photoLoading: false,
    };
    this.onPhotoUpload = this.onPhotoUpload.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentToHex (c) {
    var hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  rgbToHex (r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  getAveragePixelValue(img){
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

    return this.rgbToHex(average[0],average[1],average[2])
  }

  onPhotoUpload (event) {
    this.setState({photoLoading: true});
    let file = event.target.files[0]    
      
    jimp.read(String(URL.createObjectURL(file)))
    .then(
      (img) => {
        let ratio = 200 / img.bitmap.width;
        img
          .scale(ratio, jimp.AUTO)
          .blur(25);
        return this.getAveragePixelValue(img);
      }
    ).then( (averageColor) => {
        exifr.parse(file)
        .then(output => {
          let exifData = {
            camera: output.Model,
            shutterSpeed: output.ExposureTime,
            aperture: output.FNumber,
            foc: output.FocalLength,
            iso: output.ISO
          };
          this.setState({
            file: URL.createObjectURL(file),
            metaData: exifData,
            accentColour: averageColor,
            photoLoading: false
          });
        }).catch(() => {
          let exifData = {
            camera: '',
            shutterSpeed: '',
            aperture: '',
            foc: '',
            iso: ''
          };
          this.setState({
            file: URL.createObjectURL(file),
            metaData: exifData,
            accentColour: averageColor,
            photoLoading: false
          });
        })
      }
    );
  } 

  generateCloudinarySignature(time, public_id){
    // Generate signature
    let string = "public_id="+public_id+"&timestamp="+time+process.env.REACT_APP_CLOUDINARY_API_SECRET
    console.log(string)
    const hash = createHash('sha1')
    let sig;
    hash.on('readable', () => {
      const data = hash.read();
      if (data) {
        console.log(data.toString('hex'))
        sig = data.toString('hex');
      }
    });
    hash.write(string);
    hash.end();
    return sig;
  }

  onSubmit(e) {
    e.preventDefault();

    const file = document.querySelector("[type=file]").files[0];
    const url = 'https://api.cloudinary.com/v1_1/dcobw61kt/upload';
    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    
    let time = Date.now();
    let public_id = this.state.title+'_'+time;

    formData.append("timestamp", time);
    formData.append("public_id", public_id);
    
    formData.append("signature", this.generateCloudinarySignature(time, public_id));

    let img_url;

    fetch(url, {
      method: "POST",
      body: formData
    }).then((response) => {
      return response.text();
    }).then((data) => {
      img_url = JSON.parse(data)['secure_url'];
    });
    

    const newPhoto = {
      title: this.state.title,
      accentColour: this.state.accentColour,
      url: img_url,
    };

    axios
      .post("http://localhost:3000/record/add", newPhoto)
      .then((res) => console.log(res.data));

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
              <form onSubmit={this.onSubmit}>
              
                <input type="file" name="file" onChange={this.onPhotoUpload}/>
                <br></br>
                <label>Title: </label><input class="PhotoInput-TextInput" onChange={event => this.setState({title: event.target.value})}></input>
                <br></br>
                <label>Description: </label><textarea class="PhotoInput-DescriptionInput"></textarea>
                <br></br>
                <label>Meta data: </label>
                <p>
                  Camera: {this.state.metaData.camera}<br></br>
                  Shutter Speed: {this.state.metaData.shutterSpeed != '' ? 1/this.state.metaData.shutterSpeed : ''}<br></br>
                  Aperture: {this.state.metaData.aperture}<br></br>
                  Focal Length: {this.state.metaData.foc}<br></br>
                  ISO: {this.state.metaData.iso}<br></br><br></br>
                  Colour: {this.state.accentColour}
                </p>
                <label>Elevation: </label><input class="PhotoInput-TextInput"></input><br></br>
                <label>Distance: </label><input class="PhotoInput-TextInput"></input><br></br>
                <label>Location: </label><input class="PhotoInput-TextInput"></input><br></br>
                <input
                  type="submit"
                  value="Add Photo"
                />
                
              </form>
            </div>
          </div>

          <div class="gridItem">
            <h2>Preview: </h2>
            <ClimbingBoxLoader color={"#123abc"} loading={this.state.photoLoading} speedMultiplier={1} />
            <br></br>
            <div class="PhotoInput-PrevContainer" >
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
