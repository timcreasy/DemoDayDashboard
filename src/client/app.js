import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory} from 'react-router';
import Application from "./components/Application";
import Login from "./components/Login";
import Register from "./components/Register";

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Application} >
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </Route>
  </Router>
), document.getElementById('app'));