import React, { Component } from 'react';

class Ticker extends Component {

  constructor(props) {
    super(props);
    this.state = {left: -120, color: 'red'};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      50
    );

    this.timerID2 = setInterval(
      () => this.tick2(),
      500
    );
  }

  tick() {
    this.setState({
      left: (this.state.left > window.innerWidth) ? -60 : this.state.left + 1,
      color: this.state.color
    });
  }

  tick2() {
    this.setState({
      left: this.state.left,
      color: (this.state.color === 'red') ? 'green' : 'red'
    });
  }

  render() {
    return (
        <div className="ticker">
          <div style={this.state} className="ticking">Buy! Buy! Buy!</div>
        </div>
    );
  }
}

export default Ticker;