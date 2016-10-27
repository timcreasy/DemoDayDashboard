import React from "react";
import { Link } from "react-router";
import Navbar from "./Navbar";

const Application = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Application;