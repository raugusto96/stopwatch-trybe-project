import React, { Component } from 'react';

export default class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds + 1}));
    }, ONE_SECOND);
  }

  render() {
    const { seconds } = this.state;
    return (
      <h2>{ seconds }</h2>
    );
  }
}
