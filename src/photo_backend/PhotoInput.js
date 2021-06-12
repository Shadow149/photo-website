import React, {useState} from 'react';
import './PhotoInput.css';
import { HexColorPicker } from "react-colorful";
import exifr from 'exifr'
import jimp from 'jimp';
import axios from 'axios';
import { createHash } from 'crypto';
import LocationPicker from './LocationPicker'
import ClipLoader from "react-spinners/ClipLoader";


function PhotoInput (props) {

  const [accentColour, setAccentColour] = useState('#ffffff');
  const [title, setTitle] = useState('');
  const [animal, setAnimal] = useState('');
  const [desc, setDesc] = useState('');
  const [elevation, setElevation] = useState(0);
  const [distance, setDistance] = useState(0);
  const [marker, setMarker] = useState({
    lat: null,
    lng: null,
  });
  const [imgFile, setImgFile] = useState(null);
  const [metaData, setMetaData] = useState({
    camera: '',
    shutterSpeed: '',
    aperture: '',
    foc: '',
    iso: '',
    time: '',
  });
  const [photoLoading, setPhotoLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadState, setUploadState] = useState(1);
  const [uploadMessage, setUploadMessage] = useState('');

  const componentToHex = c => {
    let hex = parseInt(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  
  const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  const getAveragePixelValue = img => {
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

  const onPhotoUpload = event => {
    setPhotoLoading(true);
    let file = event.target.files[0]    
      
    jimp.read(String(URL.createObjectURL(file)))
    .then(
      (img) => {
        let ratio = 200 / img.bitmap.width;
        img
          .scale(ratio, jimp.AUTO)
          .blur(25);
        return getAveragePixelValue(img);
      })
    .then( (averageColor) => {
        exifr.parse(file)
        .then(output => {
          let exifData = {
            camera: output.Model,
            shutterSpeed: output.ExposureTime,
            aperture: output.FNumber,
            foc: output.FocalLength,
            iso: output.ISO,
            time: output.CreateDate,
          };

          setImgFile(URL.createObjectURL(file))
          setMetaData(exifData)
          setAccentColour(averageColor)
          setPhotoLoading(false)

        }).catch(() => {
          let exifData = {
            camera: '',
            shutterSpeed: '',
            aperture: '',
            foc: '',
            iso: '',
            time: '',
          };

          setImgFile(URL.createObjectURL(file))
          setMetaData(exifData)
          setAccentColour(averageColor)
          setPhotoLoading(false)

        })
      }
    );
  } 

  const generateCloudinarySignature = (time, public_id) => {
    // Generate signature
    let string = "public_id="+public_id+"&timestamp="+time+process.env.REACT_APP_CLOUDINARY_API_SECRET
    const hash = createHash('sha1')
    let sig;
    hash.on('readable', () => {
      const data = hash.read();
      if (data) {
        sig = data.toString('hex');
      }
    });
    hash.write(string);
    hash.end();
    return sig;
  }

  const onSubmit = e => {
    e.preventDefault();

    const file = document.querySelector("[type=file]").files[0];
    const url = 'https://api.cloudinary.com/v1_1/dcobw61kt/upload';
    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    
    let time = Date.now();
    let public_id = title+'_'+time;

    formData.append("timestamp", time);
    formData.append("public_id", public_id);
    
    formData.append("signature", generateCloudinarySignature(time, public_id));

    setUploadLoading(true);

    fetch(url, {
      method: "POST",
      body: formData
    }).then((response) => {
      if (!response.ok) {
        setUploadState(0);
        setUploadLoading(false);
        setUploadMessage('Image failed to upload');
        return null;
      }
      return response.text();
    }).then((data) => {
      if (data == null){
        return;
      }
      let img_url = JSON.parse(data)['secure_url'];
  
      const newPhoto = {
        title: title,
        accentColour: accentColour,
        url: img_url,
        animal: animal,
        desc: desc,
        elevation: elevation,
        distance: distance,
        location: marker,
        metaData: metaData,
      };
  
      axios
        .post("http://localhost:3000/record/add", newPhoto)
        .then((res) => {
          if (res.status !== 200) {
            setUploadState(0);
            setUploadLoading(false);
            setUploadMessage('Database entry failed');
          }
          setUploadState(1);
          setUploadLoading(false);
          setUploadMessage('Upload Successful!');
        });

    }).catch(function (error) {
      console.log(error);
    });

  }
  
  const handleChange = color => setAccentColour(color)

  const onMapClick = event => {
    setMarker({
      lat: event.lngLat[1],
      lng: event.lngLat[0],
    });
  };
  
  if (uploadLoading){
    return (
      <div className="highlight_loader">
        <ClipLoader color={"#123abc"} speedMultiplier={1.3} size={150}/>
      </div>
    );
  }
  return (
    <div className="PhotoInput-title">
      <h2 style={{color: uploadState ? "rgb(153, 233, 78)" : "rgb(241, 56, 56)"}}>{uploadMessage}</h2>
      <div className="PhotoInput-Grid">

        <div className="gridItem">
          <div className="PhotoInput-DataCol">

            <h1>Add Photo</h1>
            <input type="file" name="file" onChange={onPhotoUpload}/>
            <form onSubmit={onSubmit}>
              <div className='formGrid'>
                <label>Title: </label><input className="PhotoInput-TextInput" onChange={event => setTitle(event.target.value)}></input>
                <label>Animal: </label><input className="PhotoInput-TextInput" onChange={event => setAnimal(event.target.value)}></input>
                <label>Description: </label><textarea className="PhotoInput-DescriptionInput" onChange={event => setDesc(event.target.value)}></textarea>
                <label>Meta data: </label>
                <p>
                  Camera: {metaData.camera}<br></br>
                  Shutter Speed: {metaData.shutterSpeed !== '' ? 1/metaData.shutterSpeed : ''}<br></br>
                  Aperture: {metaData.aperture}<br></br>
                  Focal Length: {metaData.foc}<br></br>
                  ISO: {metaData.iso}<br></br>
                  Time: {metaData.time !== '' ? (metaData.time.getFullYear() + ' ' + metaData.time.getTime()) : ''}
                  Colour: {accentColour}
                </p>
                <label>Elevation: </label><input type="number" className="PhotoInput-TextInput" onChange={event => setElevation(event.target.value)}></input>
                <label>Distance: </label><input type="number" className="PhotoInput-TextInput" onChange={event => setDistance(event.target.value)}></input>
                <label>Location: </label>
              </div>
              <LocationPicker onClick={onMapClick} mLat={marker.lat} mLng={marker.lng}/>
              <input
                type="submit"
                value="Add Photo"
                className='addPhoto'
              />
              
            </form>
          </div>
        </div>

        <div className="gridItem">
          <div>
            <h2>Preview: </h2>
            <ClipLoader color={"#123abc"} loading={photoLoading} speedMultiplier={1} />
            <br></br>
            <div className="PhotoInput-PrevContainer" >
              <img className="PhotoInput-ImagePrev" src={imgFile} alt=''/>
              <div className="PhotoInput-TitlePrev" style={{backgroundColor: accentColour}}>{title}</div>
            </div>
          </div>
        </div>
        <div className="gridItem">
          <HexColorPicker color={accentColour} onChange={handleChange} />
        </div>

      </div>
    </div>
  );
  
  
}

export default PhotoInput;
