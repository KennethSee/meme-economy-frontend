import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import VisiblePage from './Page';

const AppWrapper = styled.div`
  text-align: center;
  font-size: 50px;
  height: 100vh;
  width: 100vw;
`;


class App extends Component {
  render() {
    return (
      <div className="App">
        <AppWrapper>
          <VisiblePage />
        </AppWrapper>
      </div>
    );
  }
}

export default App;
