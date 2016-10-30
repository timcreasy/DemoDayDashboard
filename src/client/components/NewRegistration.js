import React from "react";

const NewRegistration = React.createClass({

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
      beaconId: this.props.beacon,
      email: this.state.email,
      password: this.state.password
    };

    axios.post('http://104.236.71.66:3000/api/students', user)
      .then(response =>  {
        console.log(response);
        this.clearForm();
      })
      .catch(console.log);
  },

  clearForm() {
    this.setState({email: "", password: ""});
  },

  render: function() {

    return (
      <div>
        <h1>Register</h1>
        <h3>Beacon: {this.props.beacon}</h3>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" className="form-control" onChange={this.emailInputChanged} id="email" value={this.state.email}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" onChange={this.passwordInputChanged} id="password" value={this.state.password}/>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.registerPressed}>Register</button>
      </div>
    );
  }
});

module.exports = NewRegistration;