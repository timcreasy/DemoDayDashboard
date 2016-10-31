import React from "react";
import { Link } from "react-router";
import Navbar from "./Navbar";
import Home from "./Home";

const Application = React.createClass({

  render: function() {
    
    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Application;