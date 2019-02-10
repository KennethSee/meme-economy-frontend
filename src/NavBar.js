import React, { Component, Fragment } from 'react';
import NavBarStyles from './styles/NavBarStyles';
import ImageUploader from 'react-images-upload';
import { getTagsFromImageFile, getTagsFromUrl } from './database/clarifai';
import ReactDropzone from 'react-dropzone';

class NavBar extends Component {

  constructor(props) {
    super(props);
     this.state = { file: '' };
     this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files, rejected) {
    if (rejected.length > 0) {
      console.log(rejected);
    } else {
      let ourFile = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event);
        getTagsFromImageFile(event.target.result.split(',')[1])
          .then(result => {
            console.log(result);
          })
      };
      reader.readAsDataURL(ourFile);
    }
    // getTagsFromImageFile(something)
    //   .then(result => console.log(result));
    // this.setState({
    //   file: file
    // });
  }

  render() {
    return (
        <NavBarStyles>
      <ReactDropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <span
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <Fragment>Search Meme</Fragment>:
                  <Fragment>Meme Economy</Fragment>
              }
            </span>
          )
        }}
      </ReactDropzone>
          <div className="search">
            <button type="submit"><span role="img" aria-label="search">🔎</span></button>
            <input type="text" placeholder="Search for a meme..."></input>
          </div>
        </NavBarStyles>
    );
  }
}

/*
            <ImageUploader
                  withIcon={false}
                  buttonText='Search by image'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png']}
                  maxFileSize={5242880}
              />
              */
export default NavBar;