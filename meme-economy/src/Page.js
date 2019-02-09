import styled, { createGlobalStyle } from 'styled-components';
import React, { Component } from 'react';
import BarChart from './BarChart';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Roboto', sans-serif;
  }
  a {
    text-decoration: none;
    color: #000000;
  }
`;

const GlobalWrapper = styled.div`
  height: 100%;
`;

const NavBar = styled.div`
  text-align: left;
  border-bottom: 1px solid black;
  font-style: italic;
  padding: 0 20px;
`;

const PageWrapper = styled.div`
  height: 100%;
`;

const Trending = styled.div`
  width: 40%;
  border-right: 1px solid black;
  height: 100%;
  font-size: 30px;
  float: left;
`;


class Page extends Component {
  render() {
    return (
      <GlobalWrapper>
        <GlobalStyle />
        <NavBar>The Meme Economy</NavBar>
        <PageWrapper>
          <Trending> Trending</Trending>
          <BarChart></BarChart>
        </PageWrapper>
      </GlobalWrapper>
    );
  }
}

export default Page;