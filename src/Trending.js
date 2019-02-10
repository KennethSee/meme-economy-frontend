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
  }


  componentDidMount() {
    getTrending().then(result => {
      this.setState({memes: result})
    })
    .catch (err => console.log(err));
  }

  select(e, i) {
    this.setState({memes: this.state.memes, selected: i})
    this.props.onTileClick(this.state.memes[i].memeId);
  }

  render() {
    var memes = [];
    if (this.state.memes && this.state.memes.length !== 0) {
      for (let i = 0; i < 10; i++) {
        if (i === this.state.selected) {
          memes.push(
            <div key={this.state.memes[i].memeId} className="tile selected">
              <img onClick={(e) => this.select(e, i)} 
                   src={this.state.memes[i].source} alt="meme"></img>
            </div>)
        } else {
          memes.push(
            <div key={this.state.memes[i].memeId} className="tile">
              <img onClick={(e) => this.select(e, i)} 
                   src={this.state.memes[i].source} alt="meme"></img>
            </div>)
        }
      }
    }

    return ( 
      <TrendingStyles>
        <div className="title">
          Trending <span role="img" aria-label="up-and-to-the-right">📈</span>
        </div>
        <div className="meme-container">
          {memes}
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
