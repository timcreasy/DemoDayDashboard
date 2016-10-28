import React from "react";
import { Link } from "react-router";
import Navbar from "./Navbar";
import Home from "./Home";

const Application = React.createClass({
  render: function() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       ...this.props
     })
    );
    return (
      <div>
        <Navbar />
        <div className="container">
          {childrenWithProps}
        </div>
      </div>
    );
  }
});

module.exports = Application;