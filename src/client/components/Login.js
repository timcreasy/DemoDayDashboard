import React from "react";
import { browserHistory, Link } from 'react-router';

let Login = React.createClass({

  getInitialState() {
    return ({email: "", password: "", error: ""});
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

    axios.post('http://localhost:3000/api/login', user)
      .then(({data}) =>  {
        if (data.student) {
          this.setState({error: ""});
          browserHistory.push('/');
        }

        if (data.msg) {
          this.setState({error: data.msg});
        }
      })
      .catch(console.log);

  },

  clearForm() {
    this.setState({email: "", password: ""});
  },

  render: function() {
    return (
      <div className="mainView">
        <h1>Login</h1>
        { this.state.error ? <div className="alert alert-danger" role="alert">{this.state.error}</div> : <h1></h1> }
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" className="form-control" onChange={this.emailInputChanged} id="email" value={this.state.email} onKeyPress={(t) => {if (t.charCode === 13) { this.loginPressed() }}}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" onChange={this.passwordInputChanged} id="password" value={this.state.password} onKeyPress={(t) => {if (t.charCode === 13) { this.loginPressed() }}} />
        </div>
        <div className="center">
          <button type="button" className="btn btn-primary" onClick={this.loginPressed}>Login</button>
        </div>
      </div>
    );
  }
});

module.exports = Login;