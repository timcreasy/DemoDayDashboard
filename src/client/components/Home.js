import React from "react";
import Spinner from "./Spinner";
import HomeView from "./HomeView";
import { browserHistory } from 'react-router';

const Home = React.createClass({

  getInitialState() {
    return({
      currentUser: "",
      isLoggedIn: false, 
      viewComponent: <Spinner />
    })
  },

  componentWillMount() {
    axios.get('http://localhost:3000/api/user')
      .then(({data}) => {
        if (data.msg === "No user") {
          browserHistory.push('/login');
        } else {
          this.setState({viewComponent: <HomeView />});
          this.setState({currentUser: data});
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

module.exports = Home;


