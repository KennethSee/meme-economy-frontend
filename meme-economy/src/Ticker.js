import React, { Component } from 'react';

class Ticker extends Component {

  constructor(props) {
    super(props);
    this.state = {left: -60};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      50
    );
  }

  tick() {
    this.setState({
      left: (this.state.left > window.innerWidth) ? -60 : this.state.left + 1
    });
  }

  render() {
    return (
        <div className="ticker">
          <div style={this.state} className="ticking">Boom</div>
        </div>
    );
  }
}

export default Ticker;