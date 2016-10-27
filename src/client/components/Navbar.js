import React from "react";
import { Link } from "react-router";
import Login from "./Login";
import Register from "./Register";

const Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Demo Day Dashboard</a>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;

