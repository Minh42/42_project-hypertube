import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
                  {/* <Header/> */}
                  <Switch>
                      <Route exact path="/" component={LandingPage} />
                      <Route path="/homepage" render={() => (<HomePage cookies={this.props.cookies}/>)} />
                      <Route path="/edit" component={EditProfile} />
                      <Route path="/movie" component={Curtain} />
                      {/* <Route component={NotFound} /> */}
                  </Switch>
              </div>
          </Router>
      )
  }
}

export default withCookies(App);
