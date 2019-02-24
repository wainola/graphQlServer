import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './Home';
import Users from './Users';
import Messages from './Messages';
class App extends Component {
  componentDidMount() {
    fetch('http://localhost:9001/test')
      .then(d => d.json())
      .then(r => console.log(r))
      .catch(e => console.log('error', e));
  }
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/messages" component={Messages} />
        </div>
      </Router>
    );
  }
}

export default App;
