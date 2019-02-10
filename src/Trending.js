import React, { Component } from 'react';
import { getTrending, searchMemes } from './database/helper';
import TrendingStyles from './styles/TrendingStyles';
import { changeMeme, isSearching } from './actions/memeActions';
import { connect } from 'react-redux';

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

  componentDidUpdate() {
    if (this.props.isSearching) {
      searchMemes(this.props.query).then(result => {
        if (!this.memeArrayEquals(result, this.state.memes)) {
          this.setState({memes: result});
        }
      })
    } else {
      getTrending().then(result => {
        if (!this.memeArrayEquals(result, this.state.memes)) {
          this.setState({memes: result});
        }
      })
      .catch (err => console.log(err));
    }
  }

  memeArrayEquals = (array1, array2) => {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i].memeId !== array2[i].memeId) {
        return false;
      }
    }

    return true;
  }

  select(e, i) {
    this.setState({memes: this.state.memes, selected: i})
    this.props.onTileClick(this.state.memes[i].memeId || this.state.memes[i].id);
  }

  render() {
    let memes = [];
    if (this.state.memes && this.state.memes.length !== 0) {
      for (let i = 0; i < Math.min(10, this.state.memes.length); i++) {
        if (i === this.state.selected) {
          memes.push(
            <div key={this.state.memes[i].memeId || this.state.memes[i].id} className="tile selected">
              <img onClick={(e) => this.select(e, i)} 
                   src={this.state.memes[i].source || this.state.memes[i].url} alt="meme"></img>
            </div>)
        } else {
          memes.push(
            <div key={this.state.memes[i].memeId || this.state.memes[i].id} className="tile">
              <img onClick={(e) => this.select(e, i)} 
                   src={this.state.memes[i].source || this.state.memes[i].url} alt="meme"></img>
            </div>)
        }
      }
    }


    let title = this.props.isSearching ? <div className="title">Search Results for "{this.props.query}" 
      <button onClick={this.onSearchClose}>X</button></div> : <div className="title">
      Trending <span role="img" aria-label="up-and-to-the-right">📈</span></div>

    return (
      <TrendingStyles>
        {title}
        <div className="meme-container">
        {memes}
        </div>
      </TrendingStyles>
    );
  }

  onSearchClose = () => {
    this.props.onExit();
    this.props.onTileClick(null);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTileClick: id => {
      dispatch(changeMeme(id));
    },
    onExit: () => {
      dispatch(isSearching(false))
    }
  }
}

const VisibleTrending = connect(
  null,
  mapDispatchToProps
)(Trending)

export default VisibleTrending;
