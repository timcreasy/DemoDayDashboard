import React from "react";

const Register = React.createClass({

  getInitialState() {
    return ({email: "", password: ""});
  },

  emailInputChanged(e) {
    this.setState({email: e.target.value});
  },

  passwordInputChanged(e) {
    this.setState({password: e.target.value});
  },

  registerPressed() {
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.clearForm();

    console.log("Registering:", user);
  },

  clearForm() {
    this.state.email = "";
    this.state.password = "";
  },

  render: function() {

    return (
      <div>
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" className="form-control" onChange={this.emailInputChanged} id="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" onChange={this.passwordInputChanged} id="password"/>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.registerPressed}>Register</button>
      </div>
    );
  }
});

module.exports = Register;