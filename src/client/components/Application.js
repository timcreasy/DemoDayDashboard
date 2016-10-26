import React from "react";
import { Link } from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from "./Login";

let Application = React.createClass({
  render: function() {
    return (
      <MuiThemeProvider>
        <div>
          <ul>
            <li><Link to="/login">Login</Link></li>
          </ul>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
});

module.exports = Application;