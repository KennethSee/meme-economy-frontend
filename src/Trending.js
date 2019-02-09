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
    var memes = [];
    if (this.state.memes && this.state.memes.length != 0) {
      for (let i = 0; i < 10; i++) {
        memes.push(<img onClick={() => this.props.onTileClick(this.state.memes[i].memeId)} 
        src={this.state.memes[i].source} alt="meme"></img>)
      }
    }

    return (
      <TrendingStyles>
        <div>
          Trending 
          <br/>
          <div>
            {memes}
          </div>
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