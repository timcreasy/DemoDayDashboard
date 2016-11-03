import React from "react";
import { browserHistory, Link } from 'react-router';

const NewConnection = React.createClass({

  getInitialState() {
    return ({email: "", name: "", company: ""});
  },

  emailInputChanged(e) {
    this.setState({email: e.target.value});
  },

  nameInputChanged(e) {
    this.setState({name: e.target.value});
  },

  companyInputChanged(e) {
    this.setState({company: e.target.value});
  },

  createConnectionPressed() {

    const newConnection = {
      name: this.state.name,
      email: this.state.email,
      company: this.state.company
    };

    axios.post('https://demodaydashboard.herokuapp.com/api/employer', newConnection)
      .then(response =>  {
        this.clearForm();
        // alert("Account successfully created!");
        // browserHistory.push('/login');
      })
      .catch(console.log);
  },

  clearForm() {
    this.setState({email: "", name: "", company: ""});
  },

  render: function() {

    return (
      <div className="mainView">
        <h1>New Connection</h1>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" value={this.state.name}  onChange={this.nameInputChanged}/>
        </div>
        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input type="text" className="form-control" onChange={this.companyInputChanged} id="company" value={this.state.company}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" onChange={this.emailInputChanged} id="email" value={this.state.email} onKeyPress={(t) => {if (t.charCode === 13) { this.createConnectionPressed() }}}/>
        </div>
        <div className="center">
          <button type="button" className="btn btn-primary" onClick={this.createConnectionPressed}>Add Connection</button>
        </div>
      </div>
    );
  }
});

module.exports = NewConnection;