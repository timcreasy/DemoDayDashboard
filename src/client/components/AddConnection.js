import React from "react";
import NewConnection from "./NewConnection";
import Spinner from "./Spinner";
import { browserHistory } from 'react-router';

const AddConnection = React.createClass({

  getInitialState() {
    return({
      isLoggedIn: false, 
      viewComponent: <Spinner />
    })
  },

  componentWillMount() {
    axios.get('https://demodaydashboard.herokuapp.com/api/user')
      .then(({data}) => {
        if (data.msg === "No user") {
          browserHistory.push('/login');
        } else {
          this.setState({viewComponent: <NewConnection />});
        }
      })
      .catch(console.log);
  },

  render: function() {
    return (
      <div>
        <h1>{this.state.viewComponent}</h1>
      </div>
    );
  }
});

module.exports = AddConnection;