import React, { Component } from 'react';
import Menu from './Menu';
import Countdown from './Stopwatch';

class Home extends Component {
  render() {
    return (
      <>
        <Menu />
        <Countdown />
      </>
    )
  }
}

export default Home;