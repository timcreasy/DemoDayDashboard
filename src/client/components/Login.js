import React from "react";
import { browserHistory } from 'react-router';

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

    axios.post('http://104.236.71.66:3000/api/student/login', user)
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
      <div>
        <h1>Login</h1>
        <h1>{this.state.error}</h1>
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