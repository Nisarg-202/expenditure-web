import React, {useEffect, useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import NewPage from './components/NewPage';
import Loading from './components/Loading';
import {checkUser, userExpense} from './actions';

function App({checkUser, auth, userExpense}) {
  const [isLoggedin, setisLoggedin] = useState();

  useEffect(
    function () {
      if (auth) {
        getUserExpenses();
      }
    },
    [auth]
  );

  async function getUserExpenses() {
    await userExpense();
  }

  useEffect(function () {
    getUserLogin();
  }, []);

  async function getUserLogin() {
    await checkUser();
  }

  useEffect(
    function () {
      if (auth) {
        setisLoggedin(true);
      } else {
        if (auth == false) {
          setisLoggedin(false);
        } else {
          setisLoggedin(null);
        }
      }
    },
    [auth]
  );

  let router;

  if (isLoggedin) {
    router = (
      <Switch>
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/new" component={NewPage} exact />
        <Redirect to="/dashboard" exact />
      </Switch>
    );
  } else {
    if (isLoggedin == false) {
      router = (
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Redirect to="/" exact />
        </Switch>
      );
    } else {
      router = (
        <Switch>
          <Route path="/" component={Loading} exact />
          <Redirect to="/" exact />
        </Switch>
      );
    }
  }

  return <BrowserRouter>{router}</BrowserRouter>;
}

function mapStateToProps(state) {
  return {auth: state.Auth};
}

export default connect(mapStateToProps, {checkUser, userExpense})(App);
