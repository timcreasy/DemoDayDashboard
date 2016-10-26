import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

let Login = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Login Page</h1>
        <RaisedButton label="Default" />
      </div>
    );
  }
});

module.exports = Login;