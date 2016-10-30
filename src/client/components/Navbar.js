import React from "react";
import { Link } from "react-router";
import Login from "./Login";

const Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <a className="navbar-brand" href="/">Demo Day Dashboard</a>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>
        </ul>
      </nav>
    );
  }
});

module.exports = Navbar;