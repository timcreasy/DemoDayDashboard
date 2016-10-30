import React from "react";

const HomeView = React.createClass({

  getInitialState() {
    return({
      favorites: [],
      employers: []
    });
  },

  componentWillMount() {
    this.loadUserLikes(this.props.user.beaconId);
  },

  loadUserLikes(beaconId) {

    axios.get('http://104.236.71.66:3000/api/users/')
      .then(({data: {users}}) => {
        return this.setState({employers: users});
      })
      .then(() => {
        return axios.get('http://104.236.71.66:3000/api/favorites/' + beaconId)
      })
      .then(({data: {favorites}}) =>  {
        this.setState({favorites: favorites});
      })
      .catch(console.log);

  },

  render: function() {
  
    return (
      <div>
        <h1>Favorites</h1>
        {
          this.state.favorites.map((favorite, index) => {

            console.log("A", favorite.employer);

            let employerPosition = this.state.employers
                                      .map(employer => {
                                        return employer._id; 
                                      })
                                      .indexOf(favorite.employer);
            let employer = this.state.employers[employerPosition];

            return (
              <div key={index}>
                <h1>{employer.name}</h1>
              </div>
            );
          })
        }
      </div>
    );
  }
});

module.exports = HomeView;