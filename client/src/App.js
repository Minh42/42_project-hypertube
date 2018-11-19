import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import requireAuth from './utils/HOC/requireAuth';
import Header from './components/Header';
import Reset from './components/Signin/Reset';
import ChangePassword from './components/EditProfile/ChangePassword';
import HomePage from './layouts/HomePage';
import LandingPage from './layouts/LandingPage';
import EditProfile from './components/EditProfile';
import Movie from './components/Movie';
import NotFound from './layouts/NotFound';
import UserProfile from './components/UserProfile';
import User from './components/User/User';

class App extends Component { 
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/homepage" component={requireAuth(HomePage)} />
                        <Route path="/profile/:id" component={requireAuth(User)} />
                        <Route path="/movie/:id" component={requireAuth(Movie)} />
                        <Route path="/user/:id" component={requireAuth(EditProfile)} />
                        <Route exact path="/reset" component={Reset} />
                        <Route path="/changePassword/:id" component={ChangePassword} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }

}

export default withNamespaces('common')(App);