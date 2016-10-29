import React from "react";
import NewRegistration from "./NewRegistration";
import InvalidRegistration from "./InvalidRegistration";
import RegisteredBeacon from "./RegisteredBeacon";
import Spinner from "./Spinner";

const Register = React.createClass({

  getInitialState() {
    return({
      isRegistered: false, 
      registerComponent: <Spinner />
    })
  },

  componentWillMount() {
    axios.get('http://localhost:3000/api/' + this.props.params.beaconId)
      .then(({data: {msg}}) => {
        if (msg === "Invalid") {
          this.setState({registerComponent: <InvalidRegistration />})
        } else if (msg === "Registered") {
          console.log("regisss");
          this.setState({registerComponent: <RegisteredBeacon />})
        } else {
          this.setState({registerComponent: <NewRegistration beacon={this.props.params.beaconId} />});
        }
      })
      .catch(console.log);
  },

  render: function() {
    return (
      <div>
        {this.state.registerComponent}
      </div>
    );
  }
});

module.exports = Register;