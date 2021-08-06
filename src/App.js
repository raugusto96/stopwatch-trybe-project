import React from 'react';
import './css/theme.css'
import StopWatch from './components/StopWatch';
class App extends React.Component {
  render () {
    return (
      <div id="App">
        <StopWatch />
      </div>
    );
  }
}

export default App;
