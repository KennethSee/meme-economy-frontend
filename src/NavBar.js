import React, { Component } from 'react';
import NavBarStyles from './styles/NavBarStyles';
import ImageUploader from 'react-images-upload';
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

  onDrop(file) {
    this.setState({
      file: file
    });
  }

  search() {
    this.props.setIsSearching();
    this.props.setQuery(this.state.query);
    this.setState({query: ''})
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