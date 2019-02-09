import React, { Component } from 'react';
import { getMemeUrl, getGraph, getGraphBySite, getTrending, getPlotPoints } from './database/helper';
import TrendingStyles from './styles/TrendingStyles';
import { changeMeme } from './actions/memeActions';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';

class Trending extends Component {

  constructor(props) {
    super(props);
    this.state = {
      memes: [],
      selected: ''
    
    }

    // this.select = this.select.bind(this);
  }


  componentDidMount() {
    getTrending().then(result => {
      console.log("trending", result);
      this.setState({memes: result})
    })
    .catch (err => console.log(err));
  }

  select(e, i) {
    console.log(i);
    // console.log(e.target.style.border = "3px solid green");
    this.setState({memes: this.state.memes, selected: i})
    this.props.onTileClick(this.state.memes[i].memeId);
  }

  render() {

    // const IMAGES = this.state.memes.map((meme) => {
    //   console.log(meme);
    //   return {src: meme.source, thumbnail: meme.source, thumbnailHeight: 50}
    // })

    var memes = [];
    if (this.state.memes && this.state.memes.length !== 0) {
      for (let i = 0; i < 10; i++) {
        if (i === this.state.selected) {
          memes.push(
            <div className="tile selected">
              <img key={i} onClick={(e) => this.select(e, i)} 
                   src={this.state.memes[i].source} alt="meme"></img>
            </div>)
        } else {
          memes.push(
            <div className="tile">
              <img key={i} onClick={(e) => this.select(e, i)} 
                   src={this.state.memes[i].source} alt="meme"></img>
            </div>)
        }
      }
    }

    return (
      <TrendingStyles>
        <div>
          Trending 
        </div>
        <div>
          {memes}
          {/* <Gallery images={IMAGES}/> */}
        </div>
      </TrendingStyles>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTileClick: id => {
      dispatch(changeMeme(id));
    }
  }
}

const VisibleTrending = connect(
  null,
  mapDispatchToProps
)(Trending)

export default VisibleTrending;