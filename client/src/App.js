import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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

    let routes = (
        <Switch>
            <Route exact path="/reset" component={Reset} />
            <Route path="/changePassword/:id" component={ChangePassword} />
            <Route path="/" component={LandingPage} />
            <Redirect from="/" to="/"/>
        </Switch>
    )

    if (this.props.isAuthenticated) {
        routes = (
            <Switch>
                <Route exact path="/homepage" component={requireAuth(HomePage)} />
                <Route path="/profile/:id" component={requireAuth(EditProfile)} />
                <Route path="/movie/:id" component={requireAuth(Movie)} />
                <Route path="/user/:id" component={requireAuth(User)} />
                <Redirect from="/" to="/homepage"/>
            </Switch>
        )
    }

      return (
          <Router>
              <div>
                  <Header/>
                  <Switch> 
                        {routes}
                      {/* <Route component={NotFound} /> */}
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