import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './components/About'
import Home from './components/Home'
import Preferences from './components/Preferences'

class App extends React.Component {
  render () {
    return (
      <div id="App">
        <BrowserRouter>
          <Switch>
            <Route path="/about" component={ About } />
            <Route path="/settings" component={ Preferences } />
            <Route path="/" component={ Home }  />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
