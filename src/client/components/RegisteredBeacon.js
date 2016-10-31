import React from "react";

const RegisteredBeacon = React.createClass({

  render: function() {

    return (
      <div className="mainView">
        <h1>Beacon already registered!</h1>
        <div className="center">
          <a href="/login" className="btn btn-primary">Login</a>
        </div>
      </div>
    );
  }
});

module.exports = RegisteredBeacon;