import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './Home';
import Users from './Users';
import Messages from './Messages';
import ErrorComponent from './Error';
import Navigation from './Navigation';
class App extends Component {
  componentDidMount() {
    fetch('http://localhost:9001/test')
      .then(d => d.json())
      .then(r => console.log(r))
      .catch(e => console.log('error', e));
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/users" component={Users} />
              <Route path="/messages" component={Messages} />
              <Route component={ErrorComponent} />
            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
