import React, { Component } from 'react';
import NavBarStyles from './styles/NavBarStyles';

class NavBar extends Component {
  render() {
    return (
      <NavBarStyles>
        The Meme Economy
        <input type="text" placeholder="Search for a meme..."></input>
        <button type="submit"><span role="img" aria-label="search">🔎</span></button>
      </NavBarStyles>
    );
  }
}

export default NavBar;