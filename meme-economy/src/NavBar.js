import React, { Component } from 'react';
import NavBarStyles from './styles/NavBarStyles';

class NavBar extends Component {
  render() {
    return (
      <NavBarStyles>
        The Meme Economy
        <div className="search">
          <button type="submit"><span role="img" aria-label="search">🔎</span></button>
          <input type="text" placeholder="Search for a meme..."></input>
        </div>
      </NavBarStyles>
    );
  }
}

export default NavBar;