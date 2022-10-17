import React, { useEffect } from 'react';
import {
  HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginForm from '../LoginForm/LoginForm';
import RegisterPage from '../RegisterPage/RegisterPage';
import ChildForm from '../ChildForm/ChildForm';
import Results from '../Results/Results';
import CreateProfile from '../UserPage/CreateProfile';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    // need to fetch children and render
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* // shows AboutPage at all times (logged in or not) */}
          <Route exact path="/about">
            <AboutPage />
          </Route>
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          {/* // logged in shows UserPage else shows LoginPage */}
          <ProtectedRoute exact path="/user"> 
            <UserPage />
          </ProtectedRoute>

          {/* // logged in shows InfoPage else shows LoginPage */}
          <ProtectedRoute exact path="/info">
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute exact path='/addChild'>
            <ChildForm />
          </ProtectedRoute>

          <ProtectedRoute exact path='/results'>
            <Results />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ?
              // If the user is already logged in, redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginForm />
            }
          </Route>

          <Route exact path="/registration">
            {user.id ?
              // If the user is already logged in, redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <ProtectedRoute exact path="/createProfile"> 
            <CreateProfile />
          </ProtectedRoute>

          <Route exact path="/home">
            {user.id ?
              // If the user is already logged in, redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
