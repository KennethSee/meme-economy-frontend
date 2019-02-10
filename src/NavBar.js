import React, { Component } from 'react';
import NavBarStyles from './styles/NavBarStyles';
import ImageUploader from 'react-images-upload';

class NavBar extends Component {

  constructor(props) {
    super(props);
     this.state = { file: '' };
     this.onDrop = this.onDrop.bind(this);
  }

  onDrop(file) {
    console.log(file);
    this.setState({
      file: file
    });
  }

  render() {
    return (
      <NavBarStyles>
          The Meme Economy
        <div className="search">
          <ImageUploader
                withIcon={false}
                buttonText='Search by image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={5242880}
            />
          <button type="submit"><span role="img" aria-label="search">🔎</span></button>
          <input type="text" placeholder="Search for a meme..."></input>
        </div>
      </NavBarStyles>
    );
  }
}

export default NavBar;