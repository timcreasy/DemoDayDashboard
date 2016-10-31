import React from "react";

const HomeView = React.createClass({

  getInitialState() {
    return({
      favorites: [],
      employers: [],
      notes: []
    });
  },

  componentWillMount() {
    this.loadUserData(this.props.user);
  },

  loadUserData(user) {

    axios.get('http://104.236.71.66:3000/api/users/')
      .then(({data: {users}}) => {
        return this.setState({employers: users});
      })
      .then(() => {
        return axios.get('http://104.236.71.66:3000/api/note/' + user._id)
      })
      .then(({data: {notes}}) => {
        this.setState({notes: notes});
      })
      .then(() => {
        return axios.get('http://104.236.71.66:3000/api/beacon/' + user.beaconId)
      })
      .then(({data: {favorites}}) =>  {
        this.setState({favorites: favorites});
      })
      .catch(console.log);

  },

  addNote(event, employer) {
    const noteText = event.currentTarget.parentElement.previousSibling.value;
    const note = {
      note: noteText,
      employer: employer,
      student: this.props.user._id
    };
    axios.post('http://104.236.71.66:3000/api/note', note)
      .then(() => {
        this.loadUserData(this.props.user);
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

            let notes = this.state.notes.filter((note) => {
              return note.employer === employer._id;
            });

            let emailLink = "mailto:" + employer.email;

            return (
              <div className="col-sm-6" key={index}>
                <div className="card card-block">
                  <h3 className="card-title">{employer.name}</h3>
                  <p className="card-text company">{employer.company}</p>
                  <a href={emailLink} className="btn btn-primary">Email</a>
                  <h5>Notes:</h5>
                  {
                    notes.map(note => {
                      return (
                        <div key={note._id}>
                          <h6>{note.note}</h6>
                        </div>
                      )
                    })
                  }
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="New note" />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="button" onClick={(event) => {
                        this.addNote(event, this.state.favorites[index].employer); 
                        event.currentTarget.parentElement.previousSibling.value = "";
                      }}>Add</button>
                    </span>
                  </div>
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