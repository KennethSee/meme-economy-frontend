import React, { Component } from 'react';
import { getTrending } from './database/helper';

const trendingStyle = {
  width: '40%',
  borderRight: '1px solid black',
  height: '100%',
  fontSize: '30px',
  float: 'left'
}
const initState = [

]

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = { trendingMemes: props.memes}
  }
  render() {
    return (
      <div style={trendingStyle}>
        Trending
      </div>
    );
  }
}


class MemeView {
  constructor(props) {
    super(props);
    this.state = { trendingMemes: [] }
  }
  componentDidMount() {
    getTrending().then(result => 
      this.setState({trendingMemes: result})
    );
  }
}

export default MemeView;