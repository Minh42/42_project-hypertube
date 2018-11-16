import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { translate, Trans } from 'react-i18next';
import requireAuth from './utils/HOC/requireAuth';

import Header from './components/Header';
import Reset from './components/Signin/Reset';
import ChangePassword from './components/EditProfile/ChangePassword';
import HomePage from './layouts/HomePage';
import LandingPage from './layouts/LandingPage';
import EditProfile from './components/EditProfile';
import Movie from './components/Movie';
import NotFound from './layouts/NotFound';
import User from './components/User/User';

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
                      <Route path="/movie/:id" component={requireAuth(Movie)} />
                      <Route path="/user/:id" component={requireAuth(User)} />
                      <Route component={NotFound} />
                  </Switch>
              </div>
          </Router>
      )
  }
}

export default translate('common')(App);