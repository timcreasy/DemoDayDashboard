import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory} from 'react-router';
import Application from "./components/Application";
import Login from "./components/Login";
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Application} >
      <Route path="/login" component={Login}/>
    </Route>
  </Router>
), document.getElementById('app'));