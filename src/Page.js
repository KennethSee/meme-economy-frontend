import styled, { createGlobalStyle } from 'styled-components';
import React, { Component } from 'react';
import BarChart from './BarChart';
import VisibleNavBar from './NavBar'
import PopUp from './PopUp';
import { getMemeUrl, getGraph, getGraphBySite, getTrending, getPlotPoints } from './database/helper';
import Ticker from './Ticker';
import VisibleTrending from './Trending';
import {connect} from 'react-redux';

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

  body {
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
         -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;
  }

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`;

const GlobalWrapper = styled.div`
  height: 100%;
`;

const PageWrapper = styled.div`
  height: calc(100% - 189px);
`;

class Page extends Component {

  render() {
    return (
      <GlobalWrapper>
        <GlobalStyle />
        <VisibleNavBar />
        <Ticker />
        <PageWrapper>
          <VisibleTrending isSearching={this.props.isSearching} query={this.props.query}/>
          <BarChart></BarChart>
        </PageWrapper>
      </GlobalWrapper>
    );
  }
  
  async handleClick() {
    const url = await getMemeUrl("48e8d382-24f6-4fb7-9d3f-b11c94cf9b34");
    console.log(url);
    const graph = await getGraph("48e8d382-24f6-4fb7-9d3f-b11c94cf9b34");
    console.log(graph);
  }
}

const mapStateToProps = state => {
  return {
    isSearching: state.isSearching,
    query: state.query
  }
}

const VisiblePage = connect(
  mapStateToProps
)(Page)


export default VisiblePage;
