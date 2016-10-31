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
        return axios.get('http://104.236.71.66:3000/api/beacon/' + beaconId)
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

            let employerPosition = this.state.employers
                                      .map(employer => {
                                        return employer._id; 
                                      })
                                      .indexOf(favorite.employer);
            let employer = this.state.employers[employerPosition];

            let emailLink = "mailto:" + employer.email;

            return (
              <div className="col-sm-6" key={index}>
                <div className="card card-block">
                  <h3 className="card-title">{employer.name}</h3>
                  <p className="card-text company">{employer.company}</p>
                  <a href={emailLink} className="btn btn-primary">Email</a>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
});

module.exports = HomeView;