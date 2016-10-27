import React from "react";

let Login = React.createClass({

  getInitialState() {
    return ({email: "", password: ""});
  },

  emailInputChanged(e) {
    this.setState({email: e.target.value});
  },

  passwordInputChanged(e) {
    this.setState({password: e.target.value});
  },

  loginPressed() {
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.clearForm();

    console.log("Logging in:", user);
  },

  clearForm() {
    this.setState({email: "", password: ""});
  },

  render: function() {
    return (
      <div>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" className="form-control" onChange={this.emailInputChanged} id="email" value={this.state.email}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" onChange={this.passwordInputChanged} id="password" value={this.state.password}/>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.loginPressed}>Login</button>
      </div>
    );
  }
});

module.exports = Login;