import React, { Component } from 'react';
import { getMemeUrl, getGraph, getGraphBySite, getTrending, getPlotPoints } from './database/helper';
import TrendingStyles from './styles/TrendingStyles';
import { changeMeme } from './actions/memeActions';
import { connect } from 'react-redux';

class Trending extends Component {

  constructor(props) {
    super(props);
    this.state = {memes: []};
  }

  componentDidMount() {
    getTrending().then(result => {
      console.log("trending", result);
      this.setState({memes: result})
    })
    .catch (err => console.log(err));
  }
  render() {

    let memes = "";

    if (this.state.memes && this.state.memes.length != 0) {
      memes = <div>
        <img onClick={() => this.props.onTileClick(this.state.memes[0].memeId)} 
                       src={this.state.memes[0].source} alt="meme"></img>
                       <img onClick={() => this.props.onTileClick(this.state.memes[1].memeId)} 
                       src={this.state.memes[1].source} alt="meme"></img>
                       </div>
    }

    return (
      <TrendingStyles>
        <div>
          Trending 
          <br/>
          {memes}
        </div>
      </TrendingStyles>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTileClick: id => {
      dispatch(changeMeme(id))
    }
  }
}

const VisibleTrending = connect(
  null,
  mapDispatchToProps
)(Trending)

export default VisibleTrending;