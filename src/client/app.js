import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router';
import Application from "./components/Application";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Test from "./components/Test";

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="/login" component={Login}/>
    <Route path="register/:beaconId" component={Register}/>
    <Route path="*" component={Test} />
  </Router>
), document.getElementById('app'));