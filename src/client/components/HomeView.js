import React from "react";

const HomeView = React.createClass({

  componentWillMount() {
    this.loadUserLikes(this.props.user.beaconId);
  },

  loadUserLikes(beaconId) {

    axios.get('http://104.236.71.66:3000/api/favorites/' + beaconId)
      .then(({data: {favorites}}) =>  {
        console.log(favorites);
      })
      .catch(console.log);

  },

  render: function() {
  
    return (
      <div>
        <h1>Logged in successfully as {this.props.user.email}!</h1>
      </div>
    );
  }
});

module.exports = HomeView;