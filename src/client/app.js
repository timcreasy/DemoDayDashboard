import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router';
import Application from "./components/Application";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Test from "./components/Test";
import NewConnection from "./components/NewConnection";

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Application} >
      <IndexRoute component={Home} />
      <Route path="/login" component={Login}/>
      <Route path="register/:beaconId" component={Register}/>
      <Route path="/new" component={AddConnection}/>
      <Route path="*" component={Test} />
    </Route>
  </Router>
), document.getElementById('app'));