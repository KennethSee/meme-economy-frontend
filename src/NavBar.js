import React, { Component, Fragment } from 'react';
import NavBarStyles from './styles/NavBarStyles';
import { getTagsFromImageFile } from './database/clarifai';
import ReactDropzone from 'react-dropzone';
import {isSearching, changeQuery} from './actions/memeActions';
import {connect} from 'react-redux';

class NavBar extends Component {
  constructor(props) {
    super(props);
     this.state = { file: '', query: ''};
     this.onDrop = this.onDrop.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.search = this.search.bind(this);
  }

  handleChange(e) {
    this.setState({query: e.target.value});
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
  }

  search() {
    this.props.setIsSearching();
    this.props.setQuery(this.state.query);
    this.setState({query: ''})
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
            <button onClick={this.search} type="submit"><span role="img" aria-label="search">🔎</span></button>
            <input type="text" onChange={this.handleChange} value={this.state.query} placeholder="Search for a meme..."></input>
          </div>
      </NavBarStyles>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setIsSearching: () => {
      dispatch(isSearching(true))
    },
    setQuery: query => {
      dispatch(changeQuery(query))
    }
  }
}

const VisibleNavBar = connect(
  null,
  mapDispatchToProps
)(NavBar)

export default VisibleNavBar;
