import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import requireAuth from './utils/HOC/requireAuth';

import Header from './components/Header';
import HomePage from './layouts/HomePage';
import LandingPage from './layouts/LandingPage';
import EditProfile from './components/EditProfile';
import Curtain from './components/Curtain';
// import NotFound from './layouts/NotFound';

class App extends Component { 
  render() {
      return (
          <Router>
              <div>
                  <Header/>
                  <Switch>
                      <Route exact path="/" component={LandingPage} />
                      <Route path="/homepage" component={requireAuth(HomePage)} />
                      <Route path="/profile" component={requireAuth(EditProfile)} />
                      <Route path="/movie" component={requireAuth(Curtain)} />
                      {/* <Route component={NotFound} /> */}
                  </Switch>
              </div>
          </Router>
      )
  }
}

export default App;
