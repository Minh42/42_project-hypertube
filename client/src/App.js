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
import { connect } from 'react-redux'
import Aux from './utils/HOC/Aux';

class App extends Component { 
  render() {
      return (
          <Router>
              <div>
                  <Header/>
                  <Switch> 
                        {
                          this.props.isAuthenticated
                            ?
                                <Aux>
                                    <Route path="/homepage" component={requireAuth(HomePage)} />
                                    <Route path="/profile/:id" component={requireAuth(EditProfile)} />
                                    <Route path="/movie/:id" component={requireAuth(Movie)} />
                                    <Route path="/user/:id" component={requireAuth(User)} />
                                    <Route path="/" component={requireAuth(HomePage)} />
                                </Aux>
                            :
                                <Aux>
                                    <Route path="/reset" component={Reset} />
                                    <Route path="/changePassword/:id" component={ChangePassword} />
                                    <Route path="/" component={LandingPage} />
                                </Aux>
                        } 
                      <Route component={NotFound} />
                  </Switch>
              </div>
          </Router>
      )
  }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, null) (translate('common')(App));