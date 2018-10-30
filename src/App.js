import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import requireAuth from './utils/HOC/requireAuth';

import Header from './components/Header';
import Reset from './components/Signin/Reset';
import ChangePassword from './components/EditProfile/ChangePassword';
import HomePage from './layouts/HomePage';
import LandingPage from './layouts/LandingPage';
import EditProfile from './components/EditProfile';
import Movie from './components/Movie';
import NotFound from './layouts/NotFound';

class App extends Component { 
  render() {
      return (
          <Router>
              <div>
                  <Header/>
                  <Switch>
                      <Route exact path="/" component={LandingPage} />
                      <Route path="/reset" component={Reset} />
                      <Route path="/changePassword/:id" component={ChangePassword} />
                      <Route path="/homepage" component={requireAuth(HomePage)} />
                      <Route path="/profile/:id" component={requireAuth(EditProfile)} />
                      <Route path="/movie" component={requireAuth(Movie)} />
                      <Route component={NotFound} />
                  </Switch>
              </div>
          </Router>
      )
  }
}

export default App;
