import React from "react";
import { browserHistory } from 'react-router';

const HomeView = React.createClass({

  getInitialState() {
    return({
      favorites: [],
      employers: [],
      notes: []
    });
  },

  componentWillMount() {
    this.loadUserData(this.props.user)
    this.updateData();
  },

  updateData() {
    this.loadUserData(this.props.user);
    setTimeout(() => {
      this.updateData();
    }, 15000);
  },

  removeNote(noteId) {

    axios.post('https://demodaydashboard.herokuapp.com/api/remove/note', {noteId: noteId})
      .then(response => {
        this.loadUserData(this.props.user);
      })
      .catch(console.log);
  },

  loadUserData(user) {

    let postObj = {
      userId: user._id, 
      beaconId: user.beaconId
    };

    axios.post('https://demodaydashboard.herokuapp.com/api/user', postObj)
      .then(response => {
        this.setState({
          favorites: response.data.favorites,
          employers: response.data.employers,
          notes: response.data.notes
        });
      })

  },

  logoutPressed() {
    axios.delete('https://demodaydashboard.herokuapp.com/api/logout')
      .then(response => {
        browserHistory.push('/login');
      })
  },

  addNote(noteText, employer) {

    const date = Date.now();
    const timestamp = moment(date).format('MM/DD/YYYY');

    const note = {
      note: noteText,
      employer: employer,
      student: this.props.user._id,
      timestamp: timestamp
    };
    axios.post('https://demodaydashboard.herokuapp.com/api/note', note)
      .then(() => {
        this.loadUserData(this.props.user);
      })
      .catch(console.log);
  },

  render: function() {
  
    return (
      <div className="mainView">
        <div id="titleContainer">
          <button className="btn btn-danger" type="button" id="logoutButton" onClick={this.logoutPressed}>Logout</button>
          <h1 id="mainTitle">Connections</h1>
          <a href="/new" className="btn btn-primary" id="newConnectionButton">+</a>
        </div>
        <div id="cardContainer">
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
            let firstName = employer.name.split(" ")[0];
            let lastName = employer.name.split(" ")[1];
            let linkedInLink = `https://www.linkedin.com/vsearch/p?keywords=${firstName}%20${lastName}`;

            return (
              <div className="col-lg-6" key={index}>
                <div className="card card-block">
                  <div>
                    <h3 className="card-title cardText">{employer.name}</h3>
                    <a href={emailLink} className="btn btn-primary emailButton">Email</a>
                  </div>
                  <div>
                    <h3 className="card-text company">{employer.company}</h3>
                    <a href={linkedInLink} className="btn btn-primary emailButton">Search LinkedIn</a>
                  </div>
                  <hr />
                  <h6><strong>Notes:</strong></h6>
                  {
                    notes.map(note => {
                      return (
                        <div className="note" key={note._id} onClick={() => this.removeNote(note._id)}>
                          <i className="fa fa-minus-circle removeNote"></i>
                          <h6 className="noteText"><span className="timestamp">{note.timestamp}: </span>{note.note}</h6>
                        </div>
                      )
                    })
                  }
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="New note" onKeyPress={(target) => {if (target.charCode === 13) { this.addNote(target.currentTarget.value, this.state.favorites[index].employer); target.currentTarget.value = ""; }}}/>
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="button" onClick={(event) => {
                        this.addNote(event.currentTarget.parentElement.previousSibling.value, this.state.favorites[index].employer); 
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
      </div>
    );
  }
});

module.exports = HomeView;